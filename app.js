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

const mainRoute = require("./src/routes/main/render", "./src/routes/auth/sign");

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

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/appointments", appointmentsRoutes);

// ui route
app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
