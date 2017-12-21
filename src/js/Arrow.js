import React from 'react';
import PropTypes from 'prop-types';
import arrowLeft from '../images/navigation-left-arrow.svg';
import arrowRight from '../images/navigation-right-arrow.svg';

const Arrow = ({ direction, allAnswers, progress }) => {
  const image = direction === 'left' ? arrowLeft : arrowRight;
  const isDisabled = 
    (direction === 'left' && progress === 0) ||
    (direction === 'right' && !allAnswers[progress]);
  return (
    <button disabled={isDisabled} className={`arrow ${isDisabled ? 'is-disabled' : ''}`}>
      <img src={image} />
    </button>
  )
}

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  allAnswers: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Arrow;
