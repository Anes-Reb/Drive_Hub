const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
