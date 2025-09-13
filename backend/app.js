const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// POST route
app.post("/getResponse", async (req, res) => {
  const { question } = req.body;
  const result = await model.generateContent(question);
  const responseText = result.response.text();
  res.json({ response: responseText });
});

app.get("/", (req, res) => res.send("Backend is running 🚀"));

module.exports = app;


