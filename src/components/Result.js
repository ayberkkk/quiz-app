import React from 'react';

const Result = ({ correctAnswers, totalQuestions }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p>{`You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`}</p>
    </div>
  );
};

export default Result;
