const xlsx = require("xlsx");
const IncomeModel = require("../models/Income.model");

const addIncome = async (req, res) => {
  const { icon, source, amount, date } = req.body;

  if (!source || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newIncome = IncomeModel({
      userId: req.user._id,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    return res.status(201).json({ message: "Income data added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding income data!", error: error.message });
  }
};

const getAllIncome = async (req, res) => {
  try {
    const data = await IncomeModel.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching income data!" });
  }
};

const deleteIncome = async (req, res) => {
  const id = req.params.id;
  try {
    await IncomeModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Income data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income data!" });
  }
};

const downloadIncome = async (req, res) => {
  try {
    const income = await IncomeModel.find({ userId: req.user._id }).sort({
      date: -1,
    });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income Data");
    xlsx.writeFile(wb, "income.xlsx");
    res.status(200).download("income.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading income data!",
      error: error.message,
    });
  }
};

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncome,
};
