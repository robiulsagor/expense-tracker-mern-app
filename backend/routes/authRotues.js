const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authMiddleware");
const uploadPhoto = require("../controllers/upload.controller");
const upload = require("../middlewares/uploadMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", protect, getUserInfo);

router.post("/upload", uploadPhoto);

module.exports = router;
