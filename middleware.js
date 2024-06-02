const jwt = require("jsonwebtoken");

const authJwt = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect("/auth");
      } else {
        console.log(decoded);
        req.token = token;
        req.user = jwt.decode(token);
        next();
      }
    });
  } else {
    console.log("token not found");
    res.redirect("/auth");
  }
};

const authAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied : Admin only" });
  }
  next();
};
module.exports = { authAdmin, authJwt };
