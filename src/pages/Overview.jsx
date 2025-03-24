import React from "react";
import Navbar from "../components/Navbar";

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-black text-white">
      <Navbar />

      <div className="w-full flex flex-wrap items-center justify-center px-5 md:px-10 py-2 min-h-[600px]">
        {/* Content Section */}
        <div className="bg-purple-500 rounded-lg px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full lg:w-3/4 min-h-[500px]">
          {/* Left Image */}
          <div className="flex justify-center md:w-1/2">
            <img src="./AI_robo.png" alt="AI Robot" className="w-80 h-auto" />
          </div>

          {/* Right Text Content */}
          <div className="md:w-1/2 flex-1 max-w-md text-center md:text-left">
            <h2 className="text-3xl font-bold">
              Redefining Education with <span className="text-yellow-300">Tutor.AI</span>
            </h2>
            <p className="mt-4 text-black font-semibold">
              Tutor.AI, our AI-based LMS, is reshaping teaching and learning. By leveraging AI, it streamlines course creation, delivers personalized learning resources, and tracks student progress.
            </p>
            <p className="mt-2 text-black font-semibold">
              Tutor.AI represents the future of education, harnessing AI solutions to offer flexible learning opportunities. With MeraTutor.AI, students can access education anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
