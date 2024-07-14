const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINAI_API_KEY);

const getReport = async (weatherData) => {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const weatherDataString = JSON.stringify(weatherData);

    const prompt = `generate a text about the weather using ${weatherDataString}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        return text;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

module.exports = { getReport };