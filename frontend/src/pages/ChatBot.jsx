import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://hospital-disease-prediction-system.onrender.com/api/chat",
        {
          message: currentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI Doctor",
          text:
            res.data.reply ||
            res.data.response ||
            "No response received.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI Doctor",
          text:
            error.response?.data?.message ||
            "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[700px] flex flex-col">

        <div className="bg-blue-700 text-white text-2xl font-bold p-5 rounded-t-2xl">
          🤖 AI Health Assistant
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              Ask anything related to your health.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "You"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-5 py-3 ${
                    msg.sender === "You"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p className="font-bold mb-1">
                    {msg.sender}
                  </p>

                  <p>{msg.text}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <p className="text-gray-500">
              AI Doctor is typing...
            </p>
          )}

        </div>

        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            placeholder="Ask your health question..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatBot;