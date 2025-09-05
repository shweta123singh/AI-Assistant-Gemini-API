const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// ✅ Middleware
app.use(express.json()); // replaces body-parser (built into Express)
app.use(cors());

// ✅ Initialize Gemini client once (not inside every request)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // use env variable!
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Route for Gemini response
app.post("/getResponse", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    console.log("User Question:", question);

    const result = await model.generateContent(question);
    const responseText = result.response.text();

    console.log("Gemini Response:", responseText);

    res.status(200).json({ response: responseText });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// ✅ Handle invalid routes
app.all("*", (req, res) => {
  res.status(404).json({ msg: "Bad request" });
});

module.exports = app;
