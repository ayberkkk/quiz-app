import React from "react";

const Result = ({ correctAnswers, totalQuestions, onRestartQuiz }) => {
  const calculateGrade = (correctAnswers, totalQuestions) => {
    const percentageCorrect = (correctAnswers / totalQuestions) * 100;

    if (percentageCorrect >= 90) {
      return {
        grade: "A+",
        className: "text-green-500",
        sentence: "Excellent! You got an A+!",
      };
    } else if (percentageCorrect >= 85) {
      return {
        grade: "A",
        className: "text-blue-500",
        sentence: "Great job! You got an A.",
      };
    } else if (percentageCorrect >= 80) {
      return {
        grade: "A-",
        className: "text-purple-500",
        sentence: "Well done! You got an A-.",
      };
    } else if (percentageCorrect >= 75) {
      return {
        grade: "B+",
        className: "text-yellow-500",
        sentence: "Good job! You got a B+.",
      };
    } else if (percentageCorrect >= 70) {
      return {
        grade: "B",
        className: "text-orange-500",
        sentence: "Nice work! You got a B.",
      };
    } else if (percentageCorrect >= 65) {
      return {
        grade: "B-",
        className: "text-pink-500",
        sentence: "Keep it up! You got a B-.",
      };
    } else if (percentageCorrect >= 60) {
      return {
        grade: "C+",
        className: "text-indigo-500",
        sentence: "Good effort! You got a C+.",
      };
    } else if (percentageCorrect >= 55) {
      return {
        grade: "C",
        className: "text-teal-500",
        sentence: "Not bad! You got a C.",
      };
    } else if (percentageCorrect >= 50) {
      return {
        grade: "C-",
        className: "text-cyan-500",
        sentence: "You passed with a C-.",
      };
    } else if (percentageCorrect >= 45) {
      return {
        grade: "D+",
        className: "text-lime-500",
        sentence: "You got a D+. Keep improving!",
      };
    } else if (percentageCorrect >= 40) {
      return {
        grade: "D",
        className: "text-red-500",
        sentence: "You got a D. Keep practicing!",
      };
    } else {
      return {
        grade: "F",
        className: "text-gray-500",
        sentence: "Unfortunately, you got an F. Don't give up!",
      };
    }
  };
  const { grade, className, sentence } = calculateGrade(
    correctAnswers,
    totalQuestions
  );

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="question-box p-10 mx-3 my-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 rounded-full w-28 h-28 flex items-center m-auto justify-center border-2 border-gray-100 grade-box">
              <p className={`text-5xl font-bold ${className}`}>{`${grade}`}</p>
            </div>
            <div className="md:col-span-9 flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-thin text-white">{sentence}</p>
                <p className="text-xl font-bold text-white mt-6">
                  {`You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`}
                </p>
                <button
                  className={`mt-6 grade-box text-white px-4 py-2 rounded-md restart-btn`}
                  onClick={onRestartQuiz}
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Result;
