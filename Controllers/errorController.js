const CustomError = require("./../Utils/CustomError");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try agian later!!",
    });
  }
};

const duplicateNameErrors = (error) => {
  const msg = `Movie with name: '${error.keyValue.name}' already exists. Please use another name`;
  return new CustomError(msg, 400);
};

const validationErrors = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const TokenExpiredErrors = (error) => {
  return new CustomError('Token Expired!! Please login again', 401)
}

const JsonWebTokenErrors = (error) => {
  return new CustomError('Invalid Token!! Please login again', 401)
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    
    let err = { ...error };
    
    if (error.code === 11000) err = duplicateNameErrors(error);
    if (error.name === "ValidationError") err = validationErrors(error);
    if (error.name === "TokenExpiredError") err = TokenExpiredErrors(error);
    if (error.name === "JsonWebTokenError") err = JsonWebTokenErrors(error);

    prodErrors(res, err);
  }
};
