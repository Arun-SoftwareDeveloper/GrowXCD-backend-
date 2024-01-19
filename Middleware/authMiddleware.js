// authMiddleware.js
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwtConfig.secret);
    req.user = decoded;
    next();
    console.log(decoded);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
