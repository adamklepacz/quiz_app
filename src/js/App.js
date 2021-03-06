import React, { Component } from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';
import defaultImage from '../images/truck.svg';

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
      loadingResults: false,
      resultsLoaded: false,
      correctAnswers: null,
    };

    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.goToPreviousQuestion = this.goToPreviousQuestion.bind(this);
    this.onLoadResults = this.onLoadResults.bind(this);
    this.onRestart = this.onRestart.bind(this);
  }

  onSelectAnswer(answer) {
    // console.log('Selected answer' + answer);
    const { allAnswers, progress } = this.state;
    const currentAnswer = allAnswers[progress];

    // if currentAnswer exist replace it by new chosen answer
    if (currentAnswer) {
      // replace it
      allAnswers[progress] = answer;

      this.setState({
        allAnswers,
      }, this.goToNextQuestion());
    } else {
      // add answer to array
      this.setState({
        allAnswers: [...allAnswers, answer],
      }, this.goToNextQuestion());
    }
  }

  onRestart() {
    // restart state
    this.setState({
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      resultsLoaded: false,
      correctAnswers: null,
    });
  }

  onLoadResults() {
    this.setState({
      loadingResults: true,
    });

    // correct answers url https://api.myjson.com/bins/zgpjb
    fetch('https://api.myjson.com/bins/zgpjb')
      .then(response => response.json())
      .then((data2) => {
        const correctAnswers  = data2.correctAnswers;

        this.setState({
          correctAnswers,
          loadingResults: false,
          resultsLoaded: true,
        });
      })
      .catch((err) => {
        console.log('Fetching failed', err);
        this.setState({
          loadingResults: false,
          resultsLoaded: true,
        });
      });

    // fake delay
    // setTimeout(() => {
    //   this.setState({
    //     loadingResults: false,
    //   });
    // }, 1000);
  }

  goToNextQuestion() {
    const { progress, allQuestions } = this.state;

    this.setState({
      loadNewQuestion: true,
    });

    setTimeout(() => {
      // go to next question only till condition is fulfilled
      if (progress < allQuestions.length - 1) {
        this.setState({
          progress: progress + 1,
          currentQuestion: allQuestions[progress + 1],
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

  goToPreviousQuestion() {
    const { progress, allQuestions } = this.state;

    this.setState({
      loadNewQuestion: true,
    });

    setTimeout(() => {
      this.setState({
        progress: progress - 1,
        loadNewQuestion: false,
        currentQuestion: allQuestions[progress - 1],
        showResults: false,
      });
    }, 300);
  }

  render() {
    const { allQuestions, currentQuestion, loadNewQuestion, progress, showResults, allAnswers, loadingResults, correctAnswers, resultsLoaded } = this.state;

    const { image } = currentQuestion;
    const headerImage = !showResults ? image : defaultImage;

    const navIsActive = allAnswers.length > 0;

    return (
      <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>

        {/* Header - start */}
        <header>
          <img
            alt="headerImage"
            src={headerImage}
            className={`fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`}
          />
        </header>
        {/* Header - end */}

        {/* Content - start */}
        <div className="content">

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
              allAnswers={allAnswers}
            /> :
            <Results
              loadNewQuestion={loadNewQuestion}
              allAnswers={allAnswers}
              allQuestions={allQuestions}
              onLoadResults={this.onLoadResults}
              correctAnswers={correctAnswers}
              resultsLoaded={resultsLoaded}
              onRestart={this.onRestart}
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
            goToPreviousQuestion={this.goToPreviousQuestion}
          />
          <Arrow
            direction="right"
            allAnswers={allAnswers}
            progress={progress}
            goToNextQuestion={this.goToNextQuestion}
          />
        </div>
        {/* Navigation - end */}

      </div>
    );
  }
}

export default App;
