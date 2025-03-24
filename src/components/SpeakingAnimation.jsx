import React from "react";
import Lottie from "lottie-react";
import Speaking from "../assets/Speaking.json"

const SpeakingAnimation = () => {
  return (
    <>
      <Lottie animationData={Speaking} loop={true} />
    </>
  )
}

export default SpeakingAnimation;
