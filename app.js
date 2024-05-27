const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000 || process.env.PORT;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
const url = "mongodb://localhost:27017/drivehub";

mongoose
  .connect(url, {})
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");

app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
