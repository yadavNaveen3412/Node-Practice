const { token } = require("morgan");
const CustomError = require("../Utils/CustomError");
const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: newUser,
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password is present in request body
  if (!email || !password) {
    const error = new CustomError(
      "Please provide email and password for login!",
      400
    );
    return next(error);
  }

  //Check if user with email and password exists in db
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const err = new CustomError(
      `User with email: '${email}' does not exists`,
      400
    );
    return next(err);
  } else if (!(await user.comparePasswordInDb(password, user.password))) {
    const err = new CustomError("Invalid password!!", 400);
    return next(err);
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
  //Check if token exists
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    return next(new CustomError("You are not logged in!!", 401));
  }

  //Validate the token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );

  console.log(decodedToken);
  
  next()
});
