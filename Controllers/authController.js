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

const sendResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("jwt", token, options);

  user.password = undefined;
  user.passwordChangedAt = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  sendResponse(newUser, 201, res);
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

  sendResponse(user, 200, res);
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
  //Check if token exists
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
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

  //Check if user with the token exists
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(
      new CustomError("The user with the given token does not exists!!", 401)
    );
  }

  req.user = user;
  next();
});

exports.restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const err = new CustomError(
        "You don't have the authorization to perform this action!!",
        403
      );
      next(err);
    }

    next();
  };
};

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  //Find user based on email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const err = new CustomError(
      `No user found with email: ${req.body.email}`,
      404
    );
    return next(err);
  }

  //Generate reset token
  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //send reset token to email
  const resetUrl = `${req.protocol}://${req.host}/api/users/resetPassword/${resetToken}`;
  const message = `We received a password reset request. Please click the below link to reset your password:\n\n${resetUrl}\n\nThis link will be valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to user email.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(err);

    return next(
      new CustomError(
        "Error sending password reset email!! Please try again later."
      ),
      500
    );
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    const err = new CustomError("Token is invalid or has expired!!", 400);
    return next(err);
  }

  if (!req.body) {
    const err = new CustomError(
      "Please fill the password and confirmPassword fields",
      400
    );
    return next(err);
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  sendResponse(user, 200, res);
});
