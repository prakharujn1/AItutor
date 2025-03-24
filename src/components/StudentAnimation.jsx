import React from "react";
import Lottie from "lottie-react";
import Student from "../assets/Student.json"

const StudentAnimation = () => {
  return (
    <>
      <Lottie animationData={Student} loop={true} />
    </>
  )
}

export default StudentAnimation
