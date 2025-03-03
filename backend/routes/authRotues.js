const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
