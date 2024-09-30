import React, { useState } from 'react';
import axios from 'axios';

const MealSuggestionForm = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isMessageSent, setIsMessageSent] = useState(false); // To track if the message is sent

    // Function to handle meal suggestion submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/openai', { prompt });
            setResponse(res.data.message); // Set the AI-generated response
            setIsMessageSent(false); // Reset message sent status when new response is generated
        } catch (error) {
            console.error('Error fetching meal suggestion:', error);
            setResponse('Error fetching meal suggestion.');
        }
    };

    // Function to handle sending the meal suggestion via WhatsApp
    const sendWhatsAppMessage = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/send-whatsapp', {
                message: response, // Send the AI-generated response
                userPhoneNumber: 'whatsapp:+923312658784', // Replace with actual user phone number
            });
            if (res.data.success) {
                alert('WhatsApp message sent successfully!');
                setIsMessageSent(true); // Set flag to true when the message is sent
            } else {
                alert('Failed to send WhatsApp message.');
            }
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            alert('Error sending WhatsApp message.');
        }
    };

    return (
        <div>
            <h1>Get Meal Suggestions</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your meal preference"
                    required
                />
                <button type="submit">Get Suggestion</button>
            </form>

            {response && (
                <div>
                    <h2>Suggestion:</h2>
                    <p>{response}</p>

                    {/* Button to send the meal suggestion via WhatsApp */}
                    <button onClick={sendWhatsAppMessage} disabled={isMessageSent}>
                        {isMessageSent ? 'Message Sent' : 'Send via WhatsApp'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MealSuggestionForm;
