import React from "react";
import axios from "axios";
import Question from "../../components/Question/Question";
import { connect } from "react-redux";

import { answerYes, setAllQuestions } from "../../redux/storyReducer";
import { getQuestionFromId } from "./functions";

function mapStateToProps(state) {
  return {
    allQuestions: state.allQuestions,
    currentQuestion: state.currentQuestion,
    currentQuestionSubset: state.currentQuestionSubset
  };
}

const mapDispatchToProps = {
  answerYes, setAllQuestions
}

class InterviewPage extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:3001/questions/admin/").then(response => this.props.setAllQuestions(response.data));
  }

  getSubQuestions = () => {
    const { currentQuestion } = this.state;
    return currentQuestion.subQuestions;
  }

  answerYes = () => {
    const subQuestions = this.getSubQuestions();
    // this.setState({ currentQuestionSubset: subQuestions });
    // this.setState({ currentQuestion: this.getQuestionFromId(subQuestions[0]) })
    this.props.answerYes(subQuestions);
  }

  nextQuestion = () => {
    const { currentQuestion, currentQuestionSubset } = this.props;
    const nextIndex = currentQuestionSubset.indexOf(currentQuestion._id) + 1;
    const nextQuestion = getQuestionFromId(currentQuestionSubset[nextIndex])
    console.log(nextQuestion)
    this.setState({ currentQuestion: nextQuestion });
  }

  renderCurrentQuestion = () => {
    const { allQuestions, currentQuestion } = this.props;
    if (currentQuestion) {
      return <Question question={currentQuestion} allQuestions={allQuestions} getSubQuestions={this.answerYes} nextQuestion={this.nextQuestion} />
    }
  }

  render() {
    return (
      <div>
        {this.renderCurrentQuestion()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPage);