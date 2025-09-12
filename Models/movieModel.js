const mongoose = require("mongoose");

//Creating Schema
const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is a required field!"],
    minlength: [4, 'Movie name should contain at least 4 characters'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Movie description is a required field!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Movie duration is a required field!"],
  },
  ratings: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 1 && value <= 10;
      },
      message: "Ratings should be between 1 and 10",
    },
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "This is a required field!"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  genres: {
    type: [String],
    required: [true, "This is a required field!"],
  },
  directors: {
    type: [String],
    required: [true, "This is a required field!"],
  },
  coverImage: {
    type: String,
    required: [true, "This is a required field!"],
  },
  actors: {
    type: [String],
    required: [true, "This is a required field!"],
  },
  price: {
    type: Number,
    required: [true, "This is a required field!"],
  },
});

//Creating a model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
