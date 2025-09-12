const express = require("express");
const moviesRouter = require("./Routes/moviesRoutes");
const authRouter = require("./Routes/authRoutes");
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./Controllers/errorController');

const app = express();
app.use(express.json());
app.set('query parser', 'extended')

//Routes
app.use("/api/movies", moviesRouter);
app.use("/api/users", authRouter);
app.all("/{*splat}", (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on the app`
    // })


    // const err = new Error(`Can't find ${req.originalUrl} on the app`)
    // err.status = 'fail'
    // err.statusCode = 404

    const err = new CustomError(`Can't find ${req.originalUrl} on the app`, 404)

    next(err)
})

//Global Error Handling
app.use(globalErrorHandler)

module.exports = app;
