const express = require("express");
const router = express.Router();
const { analyzeReview } = require("../controllers/reviewController");

router.post("/analyze", analyzeReview);

module.exports = router;