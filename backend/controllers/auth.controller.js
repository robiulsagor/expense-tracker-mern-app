const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helper");

const register = async (req, res) => {
  const { fullName, email, password, profilePhotoUrl } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ user, token: generateToken(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "User not found or Credentials error!" });
    }

    return res.status(200).json({
      user,
      token: generateToken(user),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User login failed", error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  getUserInfo,
};
