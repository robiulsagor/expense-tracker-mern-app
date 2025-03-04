const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpense,
} = require("../controllers/expense.controller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/download", protect, downloadExpense);

module.exports = router;
