const Movie = require("../Models/movieModel");
const ApiFeatures = require("../Utils/ApiFeatures");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");

exports.getAllMovies = asyncErrorHandler(async (req, res) => {
  // //Filtering based on query

  // const allowedFilterFields = ['sort', 'fields', 'page', 'limit']
  // let queryObj = {...req.query}
  // allowedFilterFields.forEach((el) => {
  //   delete queryObj[el]
  // })
  // let queryStr = JSON.stringify(queryObj)
  // queryObj = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`))

  // let movieQuery = Movie.find(queryObj)

  // //Sorting
  // if(req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ')
  //   movieQuery = movieQuery.sort(sortBy)
  // } else {
  //   movieQuery = movieQuery.sort('-createdAt')
  // }

  // //Limit fields
  // if(req.query.fields) {
  //   const Fields = req.query.fields.split(',').join(' ')
  //   console.log(Fields);

  //   movieQuery = movieQuery.select(Fields)
  // }

  // //Pagination
  // const page = +req.query.page || 1
  // const limit = +req.query.limit || 10
  // const skip = (page - 1)*limit

  // movieQuery = movieQuery.skip(skip).limit(limit)

  // if(req.query.page) {
  //   const moviesCount = await Movie.countDocuments()
  //   if(skip >= moviesCount) {
  //     throw new Error("Not Found!!")
  //   }
  // }

  const features = new ApiFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movies = await features.query;

  res.status(200).json({
    status: "success",
    count: movies.length,
    data: movies,
  });
});

exports.getMovieByID = asyncErrorHandler(async (req, res) => {
  const movie = await Movie.find({ name: req.params.name });

  if (!movie[0]) {
    throw new CustomError(`No movie with name: '${req.params.name}'`, 404);
  }

  res.status(200).json({
    status: "success",
    data: movie,
  });
});

exports.CreateMovie = asyncErrorHandler(async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    data: movie,
  });
});

exports.UpdateMovie = asyncErrorHandler(async (req, res) => {
  const updatedMovie = await Movie.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    { new: true }
  );

  if (!updatedMovie) {
    throw new CustomError(`No movie with name '${req.params.name}'`, 404);
  }

  res.status(200).json({
    status: "success",
    data: updatedMovie,
  });
});

exports.DeleteMovie = asyncErrorHandler(async (req, res) => {
  const deletedMovie = await Movie.findOneAndDelete({
    name: req.params.name,
  });

  if (!deletedMovie) {
    throw new CustomError(`No movie with name '${req.params.name}'`, 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
