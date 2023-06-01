import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/loader/Loader";
import fetchQuizById, {
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quiz";
import { connect } from "react-redux";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const { loading, quiz, isFinished, results, activeQuestion, answerState } =
      this.props;
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Fill answers</h1>

          {loading || !quiz ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              question={quiz[activeQuestion].question}
              answers={quiz[activeQuestion].answers}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { results, isFinished, activeQuestion, answerState, quiz, loading } =
    state.quiz;
  return {
    results,
    isFinished,
    activeQuestion,
    answerState,
    quiz,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
