require("./src/db/mongoose");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

// Routes
const authRoutes = require("./src/routes/auth/auth");
const signRoute = require("./src/routes/auth/sign");
const carsRoutes = require("./src/routes/main/cars");

// Set up EJS as the view engine
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Parse POST requeests with JSON data in body
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies (for form submissions)

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/", signRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
