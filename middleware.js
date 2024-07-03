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

const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error for internal debugging

  // Determine the status code and message based on the error
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Send the response with the appropriate status code and error message
  res.status(statusCode).json({ error: message });
};

module.exports = { authAdmin, authJwt, errorHandlingMiddleware };
