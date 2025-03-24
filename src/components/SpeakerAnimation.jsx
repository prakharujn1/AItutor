import React from "react";
import Lottie from "lottie-react";
import Speaker from "../assets/Speaker.json"

const SpeakerAnimation = () => {
    return (
        <div className="flex justify-center items-center">
            <Lottie
                animationData={Speaker}
                loop={true}
                style={{ width: 24, height: 24 }} // Adjust size here
            />
        </div>

    );
};

export default SpeakerAnimation;
