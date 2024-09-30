const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware to allow cross-origin requests

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/api/send-whatsapp', async (req, res) => {
  console.log('WhatsApp endpoint hit');
  res.json({ success: true, message: 'This is a test response!' });
  // const { message, userPhoneNumber } = req.body;

  // try {
  //   const response = await client.messages.create({
  //     body: message,
  //     from: process.env.TWILIO_WHATSAPP_NUMBER, 
  //     to: `whatsapp:${userPhoneNumber}`
  //   });
  //   res.json({ success: true, message: "WhatsApp message sent successfully!" });
  // } catch (error) {
  //   res.status(500).json({ success: false, message: "Failed to send WhatsApp message", error });
  // }
});


// Initialize OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
    console.error("OpenAI API key is missing! Make sure you have added it to the .env file.");
    process.exit(1);
}

const openai = new OpenAI({ apiKey: openaiApiKey });

// API endpoint to get meal suggestions
app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const mealSuggestion = response.choices[0].message.content;
        res.json({ message: mealSuggestion });
    } catch (error) {
        console.error('Error generating meal suggestion:', error);
        res.status(500).json({ error: 'Failed to generate meal suggestion.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
