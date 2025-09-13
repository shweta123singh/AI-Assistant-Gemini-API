const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai'); // or Gemini SDK

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY  // set in Render environment variables
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// AI route
app.post('/', async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',  // or Gemini model
      messages: [{ role: 'user', content: question }]
    });

    const answer = completion.choices[0].message.content;
    res.json({ response: answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Error fetching answer from AI.' });
  }
});

module.exports = app;

