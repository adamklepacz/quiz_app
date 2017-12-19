import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions }) => {
  return (
    <ol>
      {
        allQuestions.map(question => {
          return <li>{question.question} <strong>City</strong><br/></li>
        })
      }
    </ol>
  )
}

Answers.propTypes = {
 allAnswers: PropTypes.array.isRequired,
 allQuestions: PropTypes.array.isRequired,
};

export default Answers; 
