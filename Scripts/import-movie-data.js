const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("./../Models/movieModel");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log("DB Connection Successful"))
  .catch((err) => console.log(`Error: ${err.message}`));

const movies = JSON.parse(fs.readFileSync("./JSON/movies2.json", "utf-8"));

const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Data imported!!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data deleted!!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importMovies();
}

if (process.argv[2] === "--delete") {
  deleteMovies();
}
