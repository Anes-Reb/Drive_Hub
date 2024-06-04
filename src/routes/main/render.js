const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("home");
});

route.get("/cars", (req, res) => {
  res.render("cars-list");
});

module.exports = route;
