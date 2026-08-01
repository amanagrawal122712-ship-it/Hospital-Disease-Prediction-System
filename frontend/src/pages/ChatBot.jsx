import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
       "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
        {
          message,
        }
      );

      const aiMessage = {
        sender: "AI Doctor",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI Doctor",
          text: "Something went wrong.",
        },
      ]);
    }

    setMessage("");
  };
    return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl h-[650px] flex flex-col">

        {/* Header */}

        <div className="bg-blue-700 text-white text-2xl font-bold p-5 rounded-t-2xl">
          🤖 AI Health Assistant
        </div>

        {/* Chat Messages */}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {messages.length === 0 ? (

            <p className="text-center text-gray-500 mt-10">
              Ask any health related question...
            </p>

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
                  className={`max-w-[75%] px-4 py-3 rounded-xl ${
                    msg.sender === "You"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
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

        </div>

        {/* Input */}

        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
            placeholder="Ask your health question..."
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
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 rounded-lg font-semibold"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatBot;