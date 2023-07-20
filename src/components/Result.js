import React from "react";

const Result = ({ correctAnswers, totalQuestions, questions }) => {
  console.log("Correct Answers:", correctAnswers);
  console.log("Total Questions:", totalQuestions);
  console.log("Questions Data:", questions);

  const calculateCorrectAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const selectedOption = question.options.find(
        (option) => option === question.correct_answer
      );
      if (selectedOption === question.correct_answer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const correctCount = calculateCorrectAnswers();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="question-box p-14 text-white">
        <p>{`You answered ${correctCount} out of ${totalQuestions} questions correctly.`}</p>
      </div>
    </div>
  );
};

export default Result;
