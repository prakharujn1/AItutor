import React from "react";
import GLBViewer from "../components/Model";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-black text-white">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start py-16 px-5 gap-6 w-full">
        {/* Left Section */}
        <div className="w-full lg:w-2/5 space-y-8">
          <div className="flex items-center space-x-4">
            <img src="study_icon.png" alt="Learning" className="w-16 h-16 md:w-20 md:h-20" />
            <span className="text-base md:text-lg font-semibold">Personalised Learning</span>
          </div>
          <div className="flex items-center space-x-4">
            <img src="teacher.png" alt="Teacher" className="w-16 h-16 md:w-20 md:h-20" />
            <span className="text-base md:text-lg font-semibold">Enhance Teacher Insights</span>
          </div>
          <div className="flex items-center space-x-4">
            <img src="clock.png" alt="Time" className="w-16 h-16 md:w-20 md:h-20" />
            <span className="text-base md:text-lg font-semibold">Time Efficiency</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-red-500">Dive</span> into the Greatness of{" "}
            <span className="text-green-500">Learning</span>
          </h2>
          <p className="mt-4 text-white text-lg md:text-xl font-medium">
            Enhance learning with our AI-based LMS, Tutor.AI, offering personalised education
            tailored to individual needs for optimal learning outcomes.
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold">
            Explore
          </button>

          {/* GLBViewer */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <GLBViewer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;