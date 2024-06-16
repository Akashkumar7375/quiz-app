import React, { useState, useEffect } from 'react';
import Question from '../Question';
import questionsData from '../questions.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem('currentQuestion');
    return savedQuestion ? JSON.parse(savedQuestion) : 0;
  });

  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? JSON.parse(savedTime) : 600;
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        localStorage.setItem('timer', JSON.stringify(prevTimer - 1));
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);

  const handleAnswerOptionClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert('Quiz completed!');
      localStorage.removeItem('currentQuestion');
      localStorage.removeItem('timer');
    }
  };

  if (timer <= 0) {
    return <div className="quiz-end">Time's up!</div>;
  }

  return (
    <div className="quiz">
      <div className="timer">Time left: {Math.floor(timer / 60)}:{timer % 60}</div>
      <Question
        question={questionsData[currentQuestion].question}
        options={questionsData[currentQuestion].options}
        answer={questionsData[currentQuestion].answer}
        onAnswerClick={handleAnswerOptionClick}
      />
    </div>
  );
};

export default Quiz;