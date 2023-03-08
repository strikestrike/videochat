require("dotenv").config()
const mongoose = require("mongoose");
const Server = require("./app/server")

global.__basedir = __dirname;

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_DEV;

const begin = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      await new Server(PORT).start()
      console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${PORT}`)
    })
    .catch((err) => {
      console.log(MONGO_URI);
      console.log("database connection failed. Server not started", MONGO_URI);
      console.error(err);
    });
}

begin()


