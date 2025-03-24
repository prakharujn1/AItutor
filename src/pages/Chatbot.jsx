import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ReactMarkdown from "react-markdown";
import ProgressModal from '../components/ProgressModal'
import { useNavigate } from "react-router-dom";
import TutorAnimation from '../components/TutorAnimation';
import ThinkingAnimation from '../components/ThinkingAnimation';
import { UserData } from '../../context/UserContext';
import SpeakingAnimation from '../components/SpeakingAnimation';
import StudentAnimation from '../components/StudentAnimation';
import { Volume2, VolumeXIcon } from "lucide-react";
import remarkGfm from "remark-gfm";
import "./style.css";
// import { useSpeechSynthesis } from "react-speech-kit";
import SpeakerAnimation2 from "../components/SpeakerAnimation2";


const Chatbot = () => {
  const MATHS_URL = 'https://final-ai-tutor-72999161944.us-central1.run.app';
  const SCIENCE_URL = 'https://sciencetutor-api-804953929335.us-central1.run.app';

  const { username } = UserData();
  const navigate = useNavigate();
  if (!username) return navigate('/Login');

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classLevel, setClassLevel] = useState("Class 10");
  const [subject, setSubject] = useState("Mathematics");
  const [board, setBoard] = useState("CBSE");
  const [mathHistory, setMathHistory] = useState([]);
  const [scienceHistory, setScienceHistory] = useState([]);
  const [rate, setRate] = useState(1);

  const [progress, setProgress] = useState({});
  const [showProgress, setShowProgress] = useState(false);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  useEffect(() => {
    setQuestion(transcript);
  }, [transcript]);

  const fetchScienceResponse = async (question, username, scienceHistory) => {
    console.log(question);
    console.log(username);
    console.log(scienceHistory);
    try {
      const response = await axios.post(`${SCIENCE_URL}/chat`, {
        message: question,
        username,
        chat_history: scienceHistory,
      })

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      return null;
    }
  };

  const fetchMathResponse = async (question, username, mathHistory) => {
    console.log(username);
    try {
      const response = await axios.post(`${MATHS_URL}/chat/`, {
        query: question,
        username: String(username).trim(),
        chat_history: mathHistory
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      return null;
    }
  };


  const fetchScienceProgress = async (username) => {
    try {
      const response = await axios.get(`${SCIENCE_URL}/progress/${username}`);
      console.log("Science Progress Data:", response.data);

      setProgress((prev) => response.data); // Functional update
    } catch (error) {
      console.error("Error fetching science progress:", error);
    }
  }

  const fetchMathsProgress = async (username) => {
    try {
      const response = await axios.get(`${MATHS_URL}/user/${username}/progress`);
      console.log("Maths Progress Data:", response.data);

      setProgress((prev) => response.data); // Functional update
    } catch (error) {
      console.error("Error fetching maths progress:", error);
    }
  };


  useEffect(() => {
    if (username && username.trim() !== "") {
      if (subject === "Science") fetchScienceProgress(username);
      if (subject === "Mathematics") fetchMathsProgress(username);
    }
  }, [username, subject]);

  const fetchMathHistory = async (username) => {
    try {
      const response = await axios.get(`${MATHS_URL}/user/${username}/history`);

      // Extracting chat history from the response
      const chatHistory = response.data.chat_history || [];

      console.log(chatHistory);

      setMathHistory(chatHistory);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  useEffect(() => {
    if (username && username.trim() !== "" && subject === "Mathematics") {
      fetchMathHistory(username);
    }

  }, [username, subject]);


  const submitHandler = async (e) => {
    e.preventDefault();
    stopListening();
    resetTranscript();
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }
    console.log(subject);
    setLoading(true);
    setResponse('');
    try {
      const data = subject === "Mathematics"
        ? await fetchMathResponse(question, username, mathHistory)
        : await fetchScienceResponse(question, username, scienceHistory);
      if (data) {
        subject === "Mathematics" ? setResponse(data.response) : setResponse(data.answer);
        subject === "Mathematics" ? setMathHistory(data.chat_history) : setScienceHistory(data.chat_history);
      }
      setQuestion('');
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to get response. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const synth = window.speechSynthesis;
  const [voices, setVoices] = useState([]);
  
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
  
    // Load voices initially
    loadVoices();
  
    // Ensure voices are available on some browsers (e.g., Chrome)
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);
  
  const speakHandler = () => {
    if (response.trim() && !isSpeaking) {
      const selectedVoice =
        voices.find((voice) => voice.name.includes("India") || voice.lang.includes("en-IN")) ||
        voices[0]; // Fallback to first available voice
  
      const sanitizedResponse = response.replace(/[*_,`|\-]/g, ""); // Remove unwanted characters
  
      const utterance = new SpeechSynthesisUtterance(sanitizedResponse);
      utterance.rate = rate;
      utterance.voice = selectedVoice;
      utterance.onend = () => setIsSpeaking(false);
  
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };
  
  const stopSpeakingHandler = () => {
    synth.cancel();
    setIsSpeaking(false);
  };
  
  useEffect(() => {
    stopSpeakingHandler();
  }, [rate]);
  
  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.play().catch(err => console.log("Autoplay blocked:", err));
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-4">

      {/* Tab Section */}
      <div className="w-full flex flex-wrap justify-center gap-4 p-4 bg-gray-800 rounded-lg mb-6">
        <select
          className="p-2 rounded bg-gray-700 text-white w-40 sm:w-48 z-10"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
        >
          {/* <option>Class 8</option> */}
          <option>Class 9</option>
          <option>Class 10</option>
          {/* <option>Class 11</option>
          <option>Class 12</option> */}
        </select>
        <select
          className="p-2 rounded bg-gray-700 text-white w-40 sm:w-48 z-10"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option>Mathematics</option>
          <option>Science</option>
          {/* <option>English</option>
          <option>Social Studies</option> */}
        </select>
        <select
          className="p-2 rounded bg-gray-700 text-white w-40 sm:w-48 z-10"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        >
          <option>CBSE</option>
          {/* <option>ICSE</option>
          <option>State Board</option> */}
        </select>

        <button
          onClick={() => setShowProgress(!showProgress)}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md w-40 sm:w-48 hover:cursor-pointer  z-10"
        >
          See Your Progress
        </button>

        <button
          onClick={() => navigate('/Login')}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md w-40 sm:w-48 hover:cursor-pointer z-10"
        >
          Logout
        </button>

        <button
          onClick={() => navigate('/')}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md w-40 sm:w-48 hover:cursor-pointer z-10"
        >
          Exit
        </button>

      </div>

      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4 sm:p-6 w-full max-w-[95vw] mx-auto">



        {/* Glowing Circles */}
        <div className="absolute w-72 h-72 bg-blue-500 opacity-30 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-64 h-64 bg-green-500 opacity-20 blur-2xl rounded-full bottom-10 right-10"></div>


        {/* Show Progress Modal */}
        {showProgress && <ProgressModal progress={progress} subject={subject} onClose={() => setShowProgress(false)} />}

        {/* Stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-2">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
              }}
            />
          ))}
        </div>

        <motion.h2
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-500 drop-shadow-lg"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          animate={{
            rotateX: [0, 5, -5, 0], // Slight tilt
            rotateY: [0, -5, 5, 0],
            scale: [1, 1.05, 1], // Subtle zoom in/out
            textShadow: [
              "0px 0px 5px rgba(0, 255, 127, 0.5)",
              "0px 0px 10px rgba(0, 255, 127, 0.7)",
              "0px 0px 5px rgba(0, 255, 127, 0.5)",
            ],
          }}
          transition={{
            duration: 4, // Smooth transition time
            repeat: Infinity, // Loop forever
            repeatType: "mirror", // Reverse animation after each loop
            ease: "easeInOut",
          }}
        >
          🎓 Chat with Agility AI Chatbot, {username}! 🤖
        </motion.h2>

        <p className="text-center mt-2 text-lg font-semibold bg-gradient-to-r from-blue-300 to-green-500 bg-clip-text text-transparent tracking-wide drop-shadow-md">
          Your intelligent learning companion for all subjects
        </p>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row lg:flex-row items-start justify-center w-full 
          max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-[95vw] gap-6 p-4 sm:p-6 md:gap-8">



          {/* User Section */}
          <div className="box b border border-gray-700 w-full md:w-1/3 flex flex-col items-center gap-6 p-4 bg-gray-800 rounded-lg shadow-lg sm:w-full min-w-[250px] z-10">


            <div className="flex justify-center items-center h-40 md:h-56 w-40 md:w-56">
              <StudentAnimation />
            </div>
            <p className="text-xl font-semibold  text-cyan-300">Your Question</p>
            <textarea
              className="w-full max-w-md h-32 md:h-48 bg-gray-900 border border-gray-500 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type or speak your question..."
            />
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full max-w-md">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-lg rounded-lg transition-all shadow-md hover:shadow-lg" onClick={submitHandler}>
                Get response
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-lg rounded-lg transition-all shadow-md hover:shadow-lg" onClick={listening ? stopListening : startListening}>
                {listening ? "Stop Listening" : "Speak"}
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-lg rounded-lg transition-all shadow-md hover:shadow-lg" onClick={resetTranscript}>
                Reset
              </button>
            </div>
          </div>

          {/* Chatbot Section */}
          <div className="box a h-210 border border-gray-700 w-full md:w-2/3 flex flex-col items-center gap-6 p-4 bg-gray-800 rounded-lg shadow-lg sm:w-full min-w-[350px] z-10">


            {/* Animation Section */}
            {isSpeaking ? (
              <div className="flex justify-center items-center h-40 md:h-50 w-40 md:w-50">
                <SpeakingAnimation />
              </div>
            ) : (
              <div className="flex justify-center items-center h-40 md:h-56 w-50 md:w-100 ">
                <TutorAnimation />
              </div>
            )}

            {/* Title */}
            <p className="text-xl font-semibold text-emerald-300 mt-4">Tutor Response</p>

            {/* Response & Buttons Wrapper */}
            <div className="w-full flex flex-col flex-1 justify-between">

              {/* Response Section */}
              <div className="w-full flex-1 flex justify-center items-center overflow-hidden">
                {loading ? (
                  <div className="min-h-73">
                    <ThinkingAnimation />
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="output h-full max-h-[350px] min-h-[350px] text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg bg-gray-900 border border-gray-500 bg-opacity-30 rounded-xl p-4 overflow-y-auto whitespace-pre-line">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons (Fixed Position) */}
              <div className="w-full flex gap-6 mt-4 justify-center">
                <button className={` ${isSpeaking ? "px-4" : "px-5"} py-2  bg-blue-400 text-white rounded-md hover:bg-blue-200 transition-all ${isSpeaking ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white text-lg font-medium rounded-lg transition-all ${isSpeaking && 'shadow-sm'} hover:shadow-lg`} onClick={speakHandler} disabled={isSpeaking}>
                  {isSpeaking ? <SpeakerAnimation2 /> : <div className="flex justify-center items-center"><Volume2 size={24} stroke="white" fill="white" /></div>}
                </button>

                <div className="flex justify-center items-center mt-4">
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-40 md:w-60 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition-all 
      accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button className="p-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all" onClick={stopSpeakingHandler} disabled={!isSpeaking}>
                  <div className="flex justify-center items-center"><VolumeXIcon size={24} stroke="white" fill="white" /></div>
                </button>
              </div>

            </div>
          </div>


        </div>
        {/* main content ends */}
        {/* history */}
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px] h-[600px] sm:h-[700px] md:h-[800px] overflow-y-auto p-4 sm:p-6 mt-6 sm:mt-9 space-y-4 sm:space-y-6 border border-gray-700 rounded-lg shadow-lg bg-gray-900 text-white scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 z-10">

          {/* Heading */}
          <div className="p-6 border-b border-gray-700 bg-gray-900">
            <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-300 dark:to-green-500">
              📜 Chat History
            </h2>
          </div>

          {/* Mapping Chat History */}
          {subject == "Mathematics" &&
            <>
              {mathHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 max-w-2xl ${message.role === "ai" || message.role === "assistant" ? "ml-auto justify-end" : ""}`}
                >
                  {/* User Message */}
                  {message.role === "user" && (
                    <div className="flex items-start gap-2">
                      <img src="./student.jpg" alt="User" className="w-10 h-10 rounded-xl border-2 border-blue-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-blue-300">You:</span>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  {(message.role === "ai" || message.role === "assistant") && (
                    <div className="flex items-start gap-2 justify-end w-full">
                      <div className="flex-1 ">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="font-semibold text-green-300">Tutor:</span>
                        </div>
                        <div className="output bg-[#0891b2] bg-opacity-30 rounded-xl p-4 shadow-md">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                      <img src='/chatbot.jpg' alt="Tutor" className="w-10 h-10 rounded-xl border-2 border-green-400" />
                    </div>
                  )}
                </div>
              ))}

            </>}


          {
            subject === "Science" &&
            <>
              {scienceHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 max-w-2xl ${message.role === "ai" || message.role === "assistant" ? "ml-auto justify-end" : ""}`}
                >
                  {/* User Message */}
                  {message.role === "user" && (
                    <div className="flex items-start gap-2">
                      <img src="./student.jpg" alt="User" className="w-10 h-10 rounded-xl border-2 border-blue-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-blue-300">You:</span>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  {(message.role === "ai" || message.role === "assistant") && (
                    <div className="flex items-start gap-2 justify-end w-full">
                      <div className="flex-1 ">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="font-semibold text-green-300">Tutor:</span>
                        </div>
                        <div className="output bg-[#0891b2] bg-opacity-30 rounded-xl p-4 shadow-md">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                      <img src='/chatbot.jpg' alt="Tutor" className="w-10 h-10 rounded-xl border-2 border-green-400" />
                    </div>
                  )}
                </div>
              ))}
            </>
          }

          {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown> */}
        </div>
      </div>
    </div>
  );
}

export default Chatbot
