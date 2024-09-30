require('dotenv').config();

const express = require('express');
const app = express();

const openaiApiKey = process.env.OPENAI_API_KEY;
const whatsappApiKey = process.env.WHATSAPP_API_KEY;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
