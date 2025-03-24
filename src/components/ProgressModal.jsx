import { UserData } from "../../context/UserContext";

const ProgressModal = ({ progress, onClose, subject }) => {
    const { username } = UserData();
    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
            onClick={onClose} // Close modal when clicking outside the box
        >
            <div className="fixed top-0 left-0 w-full h-full bg-opacity-80 flex items-center justify-center z-50">
                <div
                    className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 border border-gray-700"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
                >
                    <h2 className="text-xl font-bold text-blue-400 mb-4">📊 Your Progress in {subject}</h2>
                    <p><span className="font-semibold">Username:</span> {username}</p>
                    <p>
                        <span className="font-semibold">Total Questions:</span>{" "}
                        {progress?.total_questions ? progress.total_questions : 0}
                    </p>
                    <p>
                        <span className="font-semibold">Correct Answers:</span> {progress?.correct_answers ? progress.correct_answers : 0}
                    </p>
                    <p>
                        <span className="font-semibold">Accuracy:</span> {progress?.accuracy ? `${progress.accuracy}%` : "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Topics Covered:</span>
                        {progress.topics_covered ? progress.topics_covered.join(", ") : "No topics covered"}
                    </p>
                    <p>
                        <span className="font-semibold">Last Session:</span> {progress?.last_session ? new Date(progress.last_session).toLocaleString() : "N/A"}
                    </p>

                    {/* Close Button */}
                    <button
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProgressModal;
