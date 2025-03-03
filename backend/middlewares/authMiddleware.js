const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token found!" });
  }

  try {
    const decoded = await jwt.decode(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token!" });
  }
};

module.exports = { protect };
