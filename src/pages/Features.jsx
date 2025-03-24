import React from "react";
import Navbar from "../components/Navbar";

// Google Material Icons Mapping
const features = [
    { icon: "sms", text: "Text to Text AI" },
    { icon: "image", text: "Image to Text AI" },
    { icon: "smart_toy", text: "AI Chat Bot for Self Learning" },
    { icon: "timer", text: "Timed Tests" },
    { icon: "campaign", text: "Announcements" },
    { icon: "calculate", text: "Maths Editor" },
];

const FeatureItem = ({ icon, text }) => (
    <div className="flex flex-col items-center justify-center space-y-2 bg-purple-400 p-4 rounded-lg shadow-md hover:bg-purple-300 transition-all w-full min-w-[200px] min-h-[180px]">

        <span className="material-icons-outlined text-blue-500" style={{ fontSize: "60px" }}>
            {icon}
        </span>
        <span className="text-lg font-medium text-center text-black break-words leading-tight">
            {text}
        </span>
    </div>
);

const Features = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-900 to-black text-white">
            <Navbar />
            {/* Main Content */}
            <div className="w-full flex flex-wrap items-center justify-center px-5 md:px-10 py-16">
                {/* Combined Left Image & Right Features Section */}
                <div className="w-full lg:w-5/6 flex flex-col lg:flex-row items-stretch bg-purple-500 p-0 rounded-lg shadow-lg overflow-hidden">
                    {/* Left Section - Image */}
                    <div className="w-full lg:w-1/3 h-64 lg:h-auto">
                        <img
                            src="./AI_hand.jpg"
                            alt="AI Robot Hand"
                            className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                        />
                    </div>
                    {/* Right Section - Features */}
                    <div className="w-full lg:w-2/3 p-6 md:p-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black">Features</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">

                            {features.map((feature, index) => (
                                <FeatureItem key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
