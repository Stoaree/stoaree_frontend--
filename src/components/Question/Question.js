import React from "react";
import { connect } from "react-redux";

import { enterSubQuestions, nextQuestion } from "../../redux/storyReducer";

function mapStateToProps(state) {
  return {
    allQuestions: state.storyReducer.allQuestions,
    currentQuestion: state.storyReducer.currentQuestion,
    currentQuestionSubset: state.storyReducer.currentQuestionSubset
  };
}

const mapDispatchToProps = {
  enterSubQuestions, nextQuestion
}

class Question extends React.Component {
  getTopLevelQuestions = (questions) => {
    questions = this.props.allQuestions.filter(question => question.isTopLevel);
    return questions.map(question => question._id);
  }

  getQuestionFromId = (id) => {
    return this.props.allQuestions.find(question => question._id === id);
  }

  enterSubQuestions = () => {
    const { enterSubQuestions, currentQuestion } = this.props;
    enterSubQuestions(currentQuestion.subQuestions);
  }

  goBackToParent = (childQuestionId) => {
    const { allQuestions } = this.props;
    return allQuestions.find(question => question.subQuestions.includes(childQuestionId));
  }

  nextQuestion = () => {
    const { currentQuestion, currentQuestionSubset } = this.props;

    let nextQuestionSubset = currentQuestionSubset;
    let nextIndex = currentQuestionSubset.indexOf(currentQuestion._id) + 1;
    let nextQuestion = this.getQuestionFromId(currentQuestionSubset[nextIndex]);

    while (!nextQuestion) {
      if (currentQuestion.isTopLevel) {
        console.log("oops! no more questions")
        break;
      }
      else {
        const parentQuestion = this.goBackToParent(currentQuestion._id);

        if (parentQuestion.isTopLevel) {
          const topLevelQuestions = this.getTopLevelQuestions();

          nextIndex = topLevelQuestions.indexOf(parentQuestion._id) + 1;
          nextQuestion = topLevelQuestions[nextIndex];
          nextQuestionSubset = topLevelQuestions;
        }
        else {
          const parentSubset = this.goBackToParent(parentQuestion._id).subQuestions;
          nextIndex = parentSubset.indexOf(parentQuestion._id) + 1;
          nextQuestion = this.getQuestionFromId(parentSubset[nextIndex]);
          nextQuestionSubset = parentSubset;
        }
      }
    }

    this.props.nextQuestion(nextQuestion, nextQuestionSubset);
  }

  renderQuestionType = () => {
    const { isYesOrNo } = this.props.question;
    if (isYesOrNo) {
      return (
        <div>
          <button onClick={this.enterSubQuestions}>Yes</button>
          <button onClick={this.nextQuestion}>No</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={this.nextQuestion}>Next</button>
        </div>
      )
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div style={{ marginLeft: 50 }}>
        <h2>{title}</h2>
        {this.renderQuestionType()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);