const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncome,
} = require("../controllers/income.controller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download", protect, downloadIncome);

module.exports = router;
