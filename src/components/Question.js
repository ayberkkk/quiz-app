import React, { useState, useEffect } from "react";
import { getQuestions } from "../api/Api";
import Result from "./Result";
import Timer from "./Timer";

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
    if (selectedOption !== "") {
      return;
    }

    const currentQuestionData = questions[currentQuestion];
    const isCorrect = currentQuestionData.correct_answer === option;

    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }

    setSelectedOption(option);

    setTimeout(
      () => {
        setSelectedOption("");
        setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
      },
      isCorrect ? 1000 : 2000
    ); // Show the correct answer for 1 second, otherwise wait for 2 seconds before moving to the next question
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };

  if (questions.length === 0) {
    return (
      <div role="status" className="flex justify-center items-center h-screen">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <Result
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        onRestartQuiz={handleRestartQuiz}
      />
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const options = [...currentQuestionData.incorrect_answers];
  const correctAnswerIndex = Math.floor(Math.random() * 4);
  options.splice(correctAnswerIndex, 0, currentQuestionData.correct_answer);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-md question-box mx-3 my-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 flex items-center justify-center">
            <div className="w-full">
              <Timer className="question-box mx-3" />
            </div>
          </div>
          <div className="col-span-3 question-box text-center mt-2 mx-3">
            <span className="question-counter text-lg font-normal text-white">
              {`${currentQuestion + 1} `} /
            </span>
            <span className="total-question text-2xl font-medium opacity-50 text-white">
              {`${questions.length}`}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-white">
          {currentQuestionData.question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`p-4 rounded-md w-full text-white outline-none question-answer ${
                selectedOption === option
                  ? option === currentQuestionData.correct_answer
                    ? "selected-correct"
                    : "selected-incorrect"
                  : ""
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
