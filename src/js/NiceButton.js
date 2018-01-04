import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NiceButton extends Component {
  get selected() {
    const { allAnswers, choice } = this.props;

    return allAnswers.includes(choice);
  }

  getLetter = (index) => {
    const letters = ["A", "B", "C", "D"];
    return letters[index];
  }; 

  handleClick = (e) => {
    const { choice, onSelectAnswer } = this.props;

    this.answerButton.classList.add('is-selected', 'is-highlighted');

    setTimeout(() => {
      onSelectAnswer(choice);
      this.answerButton.classList.remove('is-selected');
    }, 500);
  }

  render() { 
    const { choice, index, onSelectAnswer } = this.props;
    
    return (
      <button 
        ref={(input) => { this.answerButton = input; }}
        className={`btn btn-huge ${this.selected ? 'is-selected' : ''}`}
        onClick={(e) => this.handleClick(e)}
      ><span className="letter">{this.getLetter(index)}</span> {choice}
      </button> 
    )
  }
}

NiceButton.PropTypes = {
  choice: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onSelectAnswer: PropTypes.func.isRequired,
}
 
export default NiceButton;
