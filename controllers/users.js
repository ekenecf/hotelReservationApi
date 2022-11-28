import User from "../models/user.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Successful",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Successful",
      numOfHotels: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "Successful",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfully deleted user!!",
    });
  } catch (error) {
    next(error);
  }
};
