import React, { Component } from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';

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
    const { allQuestions, currentQuestion, loadNewQuestion, progress, showResults, allAnswers } = this.state;

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
                <div className="progress-container">
                  <div className="progress-label">1 of 5 answered</div>
                  <div className="progress">
                    <div className="progress-bar" style={{width: '20%' }}>
                      <span className="sr-only">20% Complete</span>
                    </div>
                  </div>
                </div>
                {/* Progress - end */}

                {/* Question - start */}
                {
                  // show question when it's true
                  !showResults ? <Question 
                    currentQuestion={currentQuestion}
                    onSelectAnswer={this.onSelectAnswer}
                    loadNewQuestion={loadNewQuestion}
                  /> : 
                  <Results 
                    loadNewQuestion={loadNewQuestion}
                    allAnswers={allAnswers}
                    allQuestions={allQuestions}
                  />
                }
                {/* Question - end */}

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
