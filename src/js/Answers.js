import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions, correctAnswers }) => {
  return (
    <ol>
      {
        allQuestions.map((question, index) => {
          const isCorrect = correctAnswers && correctAnswers[index] === allAnswers[index];
          return <li key={`answer${index}`} className={`${isCorrect ? 'text-success' : 'text-danger'}`}>{question.question} <strong>{allAnswers[index]}</strong><br/>
            {correctAnswers && !isCorrect && <span className="correct-answer">&nbsp;&nbsp;Correct answer: {correctAnswers[index]}</span>}
          </li>
        })
      }
    </ol>
  )
}

Answers.propTypes = {
 allAnswers: PropTypes.array.isRequired,
 allQuestions: PropTypes.array.isRequired,
 correctAnswers: PropTypes.array,
};

export default Answers; 
