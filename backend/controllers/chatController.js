const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are an AI Health Assistant.

Rules:
- Give only general health guidance.
- Never claim to be a doctor.
- If symptoms are serious, advise consulting a doctor immediately.
- Keep answers under 150 words.

User: ${message}
`,
    });

    return res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};