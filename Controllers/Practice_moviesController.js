const fs = require("fs");

let movies = JSON.parse(fs.readFileSync('./JSON/movies.json', 'utf-8'))

exports.checkID = (req, res, next, value) => {
  let movie = movies.find((movie) => movie.id === +value);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `404: Movie with id: ${value} not found`,
    });
  }

  next();
};

exports.validateBody = (req, res, next) => {
  if (!req.body || !req.body.Title || !req.body.Year || !req.body.Runtime) {
    return res.status(400).json({
      status: "fail",
      message: "404: Bad Request! Please give data in correct format: {'Title': '<movieTitle>', 'Year': '<releaseYear>', 'Runtime': '<time> min'}",
    });
  }
};

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: movies,
  });
};

exports.getMovieByID = (req, res) => {
  // console.log(req.params);

  let id = +req.params.id; //Changing to numeric
  let movie = movies.find((movie) => movie.id === id);

  res.status(200).json({
    status: "success",
    data: movie,
  });
};

exports.CreateMovie = (req, res) => {
  // console.log(req.body)
  let newID = movies.length + 1;
  let newMovie = Object.assign({ id: newID }, req.body);

  movies.push(newMovie);

  fs.writeFile("../JSON/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      message: "Movie added successfully",
      data: newMovie,
    });
  });
};

exports.UpdateMovie = (req, res) => {
  let id = +req.params.id;
  let movie = movies.find((movie) => movie.id === id);
  let index = movies.indexOf(movie);

  if (req.body.id) {
    return res.status(403).json({
      status: "fail",
      message: `403: Forbidden!! Cannot change the id of the movie`,
    });
  } else {
    Object.assign(movie, req.body);
    movies[index] = movie;

    fs.writeFile("../JSON/movies.json", JSON.stringify(movies), (err) => {
      res.status(200).json({
        status: "success",
        data: movie,
      });
    });
  }
};

exports.DeleteMovie = (req, res) => {
  let id = +req.params.id;
  let movie = movies.find((movie) => movie.id === id);
  let index = movies.indexOf(movie);

  movies.splice(index, 1);

  fs.writeFile("../JSON/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
