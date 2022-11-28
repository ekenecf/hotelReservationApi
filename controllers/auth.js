import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { createError } from "../utils/error.js";

export const registerUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    // Instead of just using req.body in the create method, we use the req.body.username... to encode password
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    res.status(201).json({
      message: "User has been created",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Incorrect username or password"));
    //here, we create/sign our jwt into header having just id and isAdmin in it.
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    //We use ...otherDetails to specify other parameters
    //technically our user is inside the _.doc  thats why we use the user._doc you could check by console.log(user._doc) after line36
    const { isAdmin, password, ...otherDetails } = user._doc;
    //you need to install cookie parser before you can give cookie ie res.cookie(cookieName, token)
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "User found and loggedIn successfully!!",
        data: {
          ...otherDetails,
        },
      });
  } catch (error) {
    next(error);
  }
};
