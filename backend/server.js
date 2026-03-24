const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/reviews", reviewRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
