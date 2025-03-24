import Lottie from "lottie-react";
import Speaker2 from "../assets/Speaker2.json"

const SpeakerAnimation2 = () => {
    return (
        <div className="flex justify-center items-center">
            <Lottie
                animationData={Speaker2}
                loop={true}
                style={{ width: 35, height: 34 }} // Adjust size here
            />
        </div>
    );
};

export default SpeakerAnimation2;
