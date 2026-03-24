const axios = require("axios");

exports.analyze = async (text) => {
  try {
    const response = await axios.post(
       "http://127.0.0.1:8000/predict",
      { text }
    );

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", error.message);

    return {
      fake_probability: 0,
      trust_score: 0,
      error: "ML service not running",
    };
  }
};