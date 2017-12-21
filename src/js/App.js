import React, { Component } from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 1,
      allAnswers: [],
      correctAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      resultsLoaded: false,
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
      if(progress < allQuestions.length) {
        this.setState({
        progress: progress + 1,
          currentQuestion: allQuestions[progress],
          loadNewQuestion: false,
        });
      } else {
        this.setState({
          loadNewQuestion: false, 
          showResults: true,
          progress: progress + 1,
        });
      }
    }, 300);
  }

  onLoadResults = () => {
    this.setState({
      loadingResults: true,
    });

    // correct answers url https://api.myjson.com/bins/zgpjb
    fetch('https://api.myjson.com/bins/zgpjb')
      .then(response => response.json())
      .then(data => {
        const correctAnswers = data.correctAnswers;

        this.setState({
          correctAnswers,
          loadingResults: false,
          resultsLoaded: true,
        });
      })
      .catch(err => {
        console.log('Fetching failed', err);
        this.setState({
          loadingResults: false,
          resultsLoaded: true,
        });
      });

    // // fake delay 
    // setTimeout(() => {
    //   this.setState({
    //     loadingResults: false,
    //   });
    // }, 1000);
  } 

  render(){
    const { allQuestions, currentQuestion, loadNewQuestion, progress, showResults, allAnswers, loadingResults, correctAnswers, resultsLoaded } = this.state;

    const navIsActive = allAnswers.length > 0;

    return (
      <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>
            
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
          <Progress 
            progress={progress}
            allQuestions={allQuestions}
          />
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
              onLoadResults={this.onLoadResults}
              correctAnswers={correctAnswers}
            />
          }
          {/* Question - end */}

        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
          <Arrow 
            direction="left" 
            allAnswers={allAnswers} 
            progress={progress}
          />
          <Arrow 
            direction="right" 
            allAnswers={allAnswers} 
            progress={progress}
          />
        </div>
        {/* Navigation - end */}

      </div>
    );
  }
}

export default App;
