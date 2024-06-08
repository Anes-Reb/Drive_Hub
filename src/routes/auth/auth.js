const router = require("express").Router();
const User = require("../../models/User");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// POST /api/auth/login - User login
router.post("/login", body("email").isEmail().withMessage("Invalid email format"), body("password").exists().withMessage("Password is required"), async (req, res) => {
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

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5h" }); // generate token

    res.cookie("jwt", token, { httpOnly: true }); // set token in cookie

    res.redirect("/cars"); // redirect to cars page
  } catch (error) {
    console.log("error logging in user : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// POST /api/auth/register - User registration
router.post("/register", body("username").notEmpty().withMessage("Username is required"), body("email").isEmail().withMessage("Invalid email format"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), async (req, res) => {
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
    user = new User({ username, email, password });
    //waiting for user to be saved
    await user.save();
    //res.json({ message: "User registered successfully" });
    res.redirect("/auth/signin");
  } catch (error) {
    console.log("Error on registration : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = router;
