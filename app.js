const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");

app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
