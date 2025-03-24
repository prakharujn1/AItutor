import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="w-full max-w-[90%] lg:max-w-[1200px] h-[800px] overflow-y-auto p-6 mt-9 space-y-6 border border-gray-700 rounded-lg shadow-lg bg-gray-900 text-white scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-300 dark:to-green-500">
        📜 Chat History
      </h2>

      {/* Mapping Chat History */}
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex gap-6 max-w-4xl ${message.role === "ai" ? "ml-auto" : ""}`}
        >
          {/* User Message */}
          {message.role === "user" && (
            <>
              <img
                src="./student.jpg"
                alt="User"
                className="w-12 h-12 rounded-xl border-2 border-blue-400"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-300">You:</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-md text-lg">
                  <p>{message.content}</p>
                </div>
              </div>
            </>
          )}

          {/* AI Response */}
          {message.role === "ai" && (
            <>
              <div className="flex-1">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="font-semibold text-green-300">Tutor:</span>
                </div>
                <div className="bg-[#0891b2] bg-opacity-30 rounded-xl p-4 shadow-md text-lg">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
              <img
                src="/chatbot.jpg"
                alt="Tutor"
                className="w-12 h-12 rounded-xl border-2 border-green-400"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
