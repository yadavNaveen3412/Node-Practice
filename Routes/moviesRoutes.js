const express = require('express')
const moviesController = require('../Controllers/moviesController')
const authController = require('../Controllers/authController')

const router = express.Router()

router.route('/')
    .get(authController.protect, moviesController.getAllMovies)
    .post(moviesController.CreateMovie)

router.route('/:name')
    .get(moviesController.getMovieByID)
    .patch(moviesController.UpdateMovie)
    .delete(moviesController.DeleteMovie)

module.exports = router