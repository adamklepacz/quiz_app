import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ progress, allQuestions }) => {
  return (
    <div className="progress-container">
      <div className="progress-label">{`${progress}`} of {`${allQuestions.length}`} answered</div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress * 20}%` }}>
          <span className="sr-only">{`${progress * 20}`}Complete</span>
        </div>
      </div>
    </div>
  )
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  allQuestions: PropTypes.array.isRequired,
};

export default Progress;
