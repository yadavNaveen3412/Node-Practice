const express = require('express')
const moviesController = require('../Controllers/moviesController')
const authController = require('../Controllers/authController')

const router = express.Router()

router.route('/')
    .get(authController.protect, moviesController.getAllMovies)
    .post(authController.protect, authController.restrict('admin'), moviesController.CreateMovie)

router.route('/:name')
    .get(authController.protect, moviesController.getMovieByID)
    .patch(authController.protect, authController.restrict('admin'), moviesController.UpdateMovie)
    .delete(authController.protect, authController.restrict('admin'), moviesController.DeleteMovie)

module.exports = router