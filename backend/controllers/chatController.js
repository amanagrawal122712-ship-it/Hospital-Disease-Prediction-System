const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are MedPredict AI, a healthcare assistant.

Rules:
- Give only general health guidance.
- Never claim to be a real doctor.
- Never prescribe medicines without advising consultation.
- Keep answers under 150 words.
- If symptoms seem serious, recommend visiting a doctor immediately.

User Question:
${message}
`,
    });

    return res.status(200).json({
      success: true,
      reply: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate response.",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};