const xlsx = require("xlsx");
const ExpenseModel = require("../models/Expense.model");

const addExpense = async (req, res) => {
  const { icon, category, amount, date } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newExpense = ExpenseModel({
      userId: req.user._id,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    return res.status(201).json({ message: "Expense data added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding income data!", error: error.message });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const data = await ExpenseModel.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense data!" });
  }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;
  try {
    await ExpenseModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income data!" });
  }
};

const downloadExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.find({ userId: req.user._id }).sort({
      date: -1,
    });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense Data");
    xlsx.writeFile(wb, "expense.xlsx");
    res.status(200).download("expense.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading expense data!",
      error: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpense,
};
