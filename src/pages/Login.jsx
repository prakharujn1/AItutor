import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Login = () => {
  const {username , setUsername} = UserData();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== "") {
      navigate(`/chatbot`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Enter Your Username</h2>
        <input
          type="text"
          className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg hover:cursor-pointer"
          onClick={handleLogin}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default Login;