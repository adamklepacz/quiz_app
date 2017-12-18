import React, { Component } from 'react';
import data from './data/Data';
import Question from './Question';
import ProgressBar from './ProgressBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
    };

    this.onSelectAnswer = this.onSelectAnswer.bind(this);
  }

  onSelectAnswer = (answer) => {
   // console.log('Selected answer' + answer);
   const { allAnswers } = this.state;

   this.setState({
     allAnswers: [...allAnswers, answer],
   }, this.goToNextQuestion());
  }

  goToNextQuestion = () => {
    const { progress, allQuestions } = this.state;

    this.setState({
      loadNewQuestion: true,
    });

    setTimeout(() => {
      // go to next question only till condition is fulfilled
      if(progress < allQuestions.length -1) {
        this.setState({
        progress: progress + 1,
          currentQuestion: allQuestions[progress + 1],
          loadNewQuestion: false,
        });
      } else {
        this.setState({
          loadNewQuestion: false, 
          showResults: true,
        });
      }
    }, 300);
  }

  render(){
    const { allQuestions, currentQuestion, loadNewQuestion, progress, showResults } = this.state;

    return (
            <div>
                  
              {/* Header - start */}
              <header>
                  <img 
                    src="https://ihatetomatoes.net/react-tutorials/abc-quiz/images/plane.svg"
                    className={`fade-out ${ loadNewQuestion ? 'fade-out-active' : '' }`} 
                  />
              </header>
              {/* Header - end */}

              {/* Content - start */}
              <div className={`content`}>

                {/* Progress - start */}
                <ProgressBar
                  progress={progress}
                />
                {/* Progress - end */}

                {/* Question - start */}
                {
                  // show question when it's true
                  !showResults && <Question 
                    currentQuestion={currentQuestion}
                    onSelectAnswer={this.onSelectAnswer}
                    loadNewQuestion={loadNewQuestion}
                  />
                }
                {/* Question - end */}

                {/* Results - start */}
                <div className="results">
                  <div className="loader"><div className="icon"></div></div>
                  <div className="results-overlay"></div>
                  <h1>Here are your answers:</h1>
                  <div className="answers">
                    <ol>
                      <li>What is the best city in the world? <br /><strong>Melbourne</strong></li>
                    </ol>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-dark">Submit</button>
                  </div>
                </div>
                {/* Results - end */}

              </div>
              {/* Content - end */}

              {/* Navigation - start */}
              <div className={`navigation text-center is-active`}>
                <button className={`arrow`}>
                    <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-left-arrow.svg" />
                </button>
                <button disabled className={`arrow is-disabled`}>
                  <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-right-arrow.svg" />
                </button>
              </div>
              {/* Navigation - end */}

            </div>
    );
  }
}

export default App;
