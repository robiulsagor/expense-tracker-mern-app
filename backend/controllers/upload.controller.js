const upload = require("../middlewares/uploadMiddleware");

const uploadPhoto = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded!" });
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      filePath: `/uploads/${req.file.filename}`,
    });
  });
};

module.exports = uploadPhoto;
