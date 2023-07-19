import React, { useState, useEffect } from "react";
import { getQuestions } from "../api/Api";
import Result from "./Result";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response);
    } catch (error) {
      console.log("Fetch Questions Error:", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    const currentQuestionData = questions[currentQuestion];

    if (currentQuestionData.correct_answer === option) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }

    setTimeout(() => {
      setSelectedOption("");
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }, 1500);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestion >= questions.length) {
    return (
      <Result
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
      />
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-md">
        <div className="text-right mt-2">
          <span>{`${currentQuestion + 1} / ${questions.length}`}</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          {currentQuestionData.question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestionData.options.map((option) => (
            <button
              key={option}
              className={`p-4 border rounded-md w-full ${
                selectedOption === option
                  ? option === currentQuestionData.correct_answer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
