const router = require("express").Router();
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// POST /api/auth/login - User login
router.post("/login", [body("email").isEmail(), body("password").notEmpty()], async (req, res) => {
  //validation of form data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "invalid form data", errors: errors.array() });
  }
  // extracting data from request body
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(500).json({ message: "invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/api/cars");
    //res.json({ message: "user logged in successfully" });
    //res.json({ message: "Login successful", redirectTo: "/api/cars", token: token });
    //res.json({ token, redirect: "/api/cars" }); //used for jwt token(more secure and manage protecting routes)
  } catch (error) {
    console.log("error logging in user : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// POST /api/auth/register - User registration
router.post("/register", [body("username").notEmpty(), body("email").isEmail(), body("password").isLength({ min: 6 })], async (req, res) => {
  //validation of form data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ massage: "invalid form data", errors: errors.array() });
  }
  // extracting data from request body
  const { username, email, password } = req.body;
  try {
    // checking if email already in use
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "email address already in use" });
    }
    user = new User({ username, email, password, role });
    //waiting for user to be saved
    await user.save();
    //res.json({ message: "User registered successfully" });
    res.redirect("/auth");
  } catch (error) {
    console.log("Error on registration : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = router;
