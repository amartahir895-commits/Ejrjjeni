const express = require('express');
const fetch = require('node-fetch'); // npm i node-fetch
const app = express();

// JSON parsing
app.use(express.json());

// Chat API endpoint
app.get('/api/chat', async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  try {
    const apiUrl = `https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`;
    const response = await fetch(apiUrl);
    const text = await response.text(); // अगर upstream JSON return करता है तो use response.json()
    
    res.json({
      model: "Professor Amar J.A.I.",
      original_prompt: prompt,
      response: text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
