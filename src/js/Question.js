import React from 'react';
import PropTypes from 'prop-types';
import Choices from './Choices';

const Question = ({ currentQuestion }) => {
  const { question, choices } = currentQuestion;
  return (
    <div className={`question`}>

      <h1>{ question }</h1>

      {/* Choices - start */}
      <Choices choices={choices}/>
      {/* Choices - end */}

    </div>
  )
}

Question.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
};
 
export default Question;