const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require('express-async-handler');
const { Order, OrderItem } = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

// 3. Call Gemini API
console.log("Calling Gemini API with model: gemini-2.5-flash");
try {
    // Initialize Gemini API lazily to prevent server crash on startup
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini API successful");

    res.json({ response: text });
} catch (error) {
    console.error("Error calling Gemini API:", error);
    // Force JSON response even for 500s
    res.status(500).json({
        message: 'Error generating AI response. Model gemini-2.5-flash used.',
        details: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
}
});

module.exports = {
    chatWithClientPlan
};
