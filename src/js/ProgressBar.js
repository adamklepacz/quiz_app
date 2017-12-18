import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  let progressWidth = 20;
  switch (progress) {
    case 1:
      progressWidth = 40;
      break;
    case 2:
      progressWidth = 50;
      break;
    case 3:
      progressWidth = 75;
      break;
    case 4:
      progressWidth = 80;
      break;
    case 5: 
      progressWidth = 100;
      break;
    default:
      break;
  }

  return (
    <div className="progress-container">
      <div className="progress-label">1 of 5 answered</div>
      <div className="progress">
        <div className="progress-bar" style={{ 'width': `${progressWidth}%` }}>
          <span className="sr-only">20% Complete</span>
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
