import React from 'react';
import PropTypes from 'prop-types';
import arrowLeft from '../images/navigation-left-arrow.svg';
import arrowRight from '../images/navigation-right-arrow.svg';

const Arrow = ({ direction, allAnswers, progress, goToNextQuestion, goToPreviousQuestion }) => {
  const image = direction === 'left' ? arrowLeft : arrowRight;
  const isDisabled =
    (direction === 'left' && progress === 0) ||
    (direction === 'right' && !allAnswers[progress]);
  return (
    <button
      disabled={isDisabled}
      className={`arrow ${isDisabled ? 'is-disabled' : ''}`}
      onClick={() => {
        direction === 'left' ? goToPreviousQuestion() : goToNextQuestion();
      }}
    >
      <img alt="arrowImage" src={image} />
    </button>
  );
};

Arrow.defaultProps = {
  goToPreviousQuestion: PropTypes.any,
  goToNextQuestion: PropTypes.any,
};

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  allAnswers: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
  goToNextQuestion: PropTypes.func,
  goToPreviousQuestion: PropTypes.func,
};

export default Arrow;
