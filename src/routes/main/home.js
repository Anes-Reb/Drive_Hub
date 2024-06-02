const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("<h1>DriveHUb Home<h1><br><button><a href='/auth'>SignIn</a></button>");
});

module.exports = route;
