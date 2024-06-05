const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("home");
});

route.get("/cars", (req, res) => {
  res.render("cars-list");
});

route.get("/signin", (req, res) => {
  res.render("signin");
});

route.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = route;
