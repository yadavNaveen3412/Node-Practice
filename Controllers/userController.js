const CustomError = require("../Utils/CustomError");
const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

const filterReqObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (allowedFields.includes(prop)) {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
};

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    count: users.length,
    data: users,
  });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!req.body) {
    const err = new CustomError(
      "Please fill the currentPassword, newPassword and confirmPassword fields",
      400
    );
    return next(err);
  }
  //check if given current password is correct
  if (
    !(await user.comparePasswordInDb(req.body.currentPassword, user.password))
  ) {
    return next(
      new CustomError("The current password you provided is wrong!!", 401)
    );
  }

  //if new password is same as current password
  if (req.body.newPassword === req.body.currentPassword) {
    return next(
      new CustomError(
        "The new password cannot be same as the current password!!",
        400
      )
    );
  }
  //if given current password is correct then update the password
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangedAt = Date.now();

  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});

exports.updateMe = asyncErrorHandler(async (req, res, next) => {
  const filterObj = filterReqObj(req.body, "name", "email");
  console.log(filterObj);

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteMe = asyncErrorHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
