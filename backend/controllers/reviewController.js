const mlService = require("../services/mlService");

exports.analyzeReview = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Call ML service
    const result = await mlService.analyze(text);

    // Send response
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};