import React from 'react';

const Question = ({ question, options, answer, onAnswerClick }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswerClick(index === answer)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;