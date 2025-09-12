const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(`${err.name} => ${err.message}`);
  console.log("Uncaught Exception occured!! Shutting down the server...");
  process.exit(1);
});

const app = require("./app");

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB Connection successful");
  });

const server = app.listen(8000, () => {
  console.log("Server started");
});

process.on("unhandledRejection", (err) => {
  console.log(`${err.name} => ${err.message}`);
  console.log("Unhandles rejection occured!! Shutting down the server...");

  server.close(() => {
    process.exit(1);
  });
});
