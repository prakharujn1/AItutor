import React from "react";
import Lottie from "lottie-react";
import Tutor from "../assets/Tutor.json"

const TutorAnimation = () => {
  return (
    <>
      <Lottie animationData={Tutor} loop={true} />
    </>
  )
}

export default TutorAnimation
