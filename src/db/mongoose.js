// Connect to MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));
