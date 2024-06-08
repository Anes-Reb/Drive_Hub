require("./src/db/mongoose");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const { errorHandlingMiddleware } = require("./middleware");

// Routes
const authRoutes = require("./src/routes/auth/auth");
const carsRoutes = require("./src/routes/main/cars");
const appointmentsRoutes = require("./src/routes/main/appointments");
const mainRoutes = require("./src/routes/main/home");

// Set up EJS as the view engine
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Parse POST requeests with JSON data in body
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies (for form submissions)
app.use(cookieParser()); // Parse cookies
app.use(errorHandlingMiddleware); // Error handling middleware

// Serve static files from the public directory
//app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/auth", authRoutes);
app.use("/cars", carsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/", mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
