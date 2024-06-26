const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function connectMongo() {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo")
    .then(() => {
      console.log("MONGODB connected");
    })
    .catch((e) => {
      console.error("error connecting to mongodb\n", e);
    });
}

module.exports= {
  connectMongo
}
