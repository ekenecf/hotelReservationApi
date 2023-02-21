import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/user.js'
import { createError } from '../utils/error.js'
import sendEmail from '../utils/email.js'

export const registerUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)

  try {
    // Instead of just using req.body in the create method, we use the req.body.password... to encode password
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
    res.status(201).json({
      message: 'User has been created',
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'User not found'))
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!isPasswordCorrect)
      return next(createError(400, 'Incorrect username or password'))
    //here, we create/sign our jwt into header having just id and isAdmin in it.
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
    )
    //We use ...otherDetails to specify other parameters
    //technically our user is inside the _.doc  thats why we use the user._doc you could check by console.log(user._doc) after line36
    const { isAdmin, password, ...otherDetails } = user._doc
    //you need to install cookie-parser before you can give cookie ie res.cookie(cookieName, token)
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: 'User found and loggedIn successfully!!',
        data: {
          ...otherDetails,
        },
      })
  } catch (error) {
    next(error)
  }
}

export const forgotpassword = async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ username: req.body.username })
  if (!user) return next(createError(404, 'No user with that username'))
  //generate random token reset
  const resetToken = user.createResetPassword()
  //validateBeforeSave: false sets all validations to false incase theres a validation
  await user.save({ validateBeforeSave: false })
  //send it back to user email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/users/resetpassword/${resetToken}`

  try {
    const message = `Forgot your password? Submit patch request with your new password to: ${resetURL}. \nIf you didnt, forget your password simply ignore`
    sendEmail({
      email: user.email,
      subject: 'Your password reset token is valid for 10 mins',
      message,
    })
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      createError(
        500,
        'There was an error sending email, please try again later',
      ),
    )
  }
}

export const resetpassword = async (req, res, next) => {
  //1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  //2)If token is not expired and theres a user
  if (!user) return next(createError(400, 'Token is invalid or expired'))
  const salt = bcrypt.genSaltSync(10)
  user.password = bcrypt.hashSync(req.body.password, salt)
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  res.status(200).json({
    status: 'success',
  })
  //3)Update changedpasswordPropertyAt property for the user
  //4) Log the user in by sending JWT to the client
}

// export const updatePassword
