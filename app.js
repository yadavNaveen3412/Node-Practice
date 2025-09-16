const express = require("express");
const moviesRouter = require("./Routes/moviesRoutes");
const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require('hpp')

const app = express();

app.use(helmet());

let limiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  message: `We have received too many requests from this IP!! Please try again after an hour`,
});

app.use("/api", limiter);
app.use(express.json({ limit: "10kb"    }));

app.use(hpp({whitelist: ['duration', 'releaseYear', 'releaseDate', 'ratings', 'genres', 'directors', 'actors']}))

app.set("query parser", "extended");

//Routes
app.use("/api/movies", moviesRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.all("/{*splat}", (req, res, next) => {
  // res.status(404).json({
  //     status: "fail",
  //     message: `Can't find ${req.originalUrl} on the app`
  // })

  // const err = new Error(`Can't find ${req.originalUrl} on the app`)
  // err.status = 'fail'
  // err.statusCode = 404

  const err = new CustomError(`Can't find ${req.originalUrl} on the app`, 404);

  next(err);
});

//Global Error Handling
app.use(globalErrorHandler);

module.exports = app;
