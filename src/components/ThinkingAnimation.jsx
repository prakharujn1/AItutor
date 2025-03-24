import React from "react";
import Lottie from "lottie-react";
import Thinking from "../assets/Thinking.json"

const ThinkingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-17 w-17 md:h-22 md:w-22">
      <Lottie animationData={Thinking} loop={true} />
    </div>
  )
}

export default ThinkingAnimation
