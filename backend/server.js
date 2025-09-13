const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Default route (just to test in browser)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API route for your React app
app.post("/", (req, res) => {
  const { question } = req.body;
  res.json({ response: `You asked: ${question}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

