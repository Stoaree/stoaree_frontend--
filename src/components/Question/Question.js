import React from "react";
import { connect } from "react-redux";

import Recording from "../Recording/Recording";
import { enterSubQuestions, nextQuestion } from "../../redux/storyReducer";

function mapStateToProps(state) {
  const { allQuestions, currentQuestion, currentQuestionSubset } = state.storyReducer;
  return {
    allQuestions,
    currentQuestion,
    currentQuestionSubset
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
    return this.props.allQuestions.find(question => {
      return question.subQuestions.includes(childQuestionId);
    });
  }

  nextQuestion = () => {
    const { currentQuestion, currentQuestionSubset } = this.props;

    let nextQuestionSubset = currentQuestionSubset;
    let nextIndex = currentQuestionSubset.indexOf(currentQuestion._id) + 1;
    let nextQuestion = this.getQuestionFromId(currentQuestionSubset[nextIndex]);

    // get the parent of the current subset of questions (if it exists)
    let parentQuestion = this.goBackToParent(currentQuestion._id);

    // current subset contains no more questions
    while (!nextQuestion) {
      // if on the top level of questions, that's all, folks!
      if (currentQuestion.isTopLevel) {
        nextQuestion = "finished";
        break;
      }
      else {
        // if the parent is a top level question, try to get the next top level question
        if (parentQuestion.isTopLevel) {
          nextQuestionSubset = this.getTopLevelQuestions();
          nextIndex = nextQuestionSubset.indexOf(parentQuestion._id) + 1;
          nextQuestion = this.getQuestionFromId(nextQuestionSubset[nextIndex]);
        }
        // else, try to get the next question in the parent subset of questions
        else {
          let parentOfParent = this.goBackToParent(parentQuestion._id);
          nextQuestionSubset = parentOfParent.subQuestions;
          nextIndex = nextQuestionSubset.indexOf(parentQuestion._id) + 1;
          nextQuestion = this.getQuestionFromId(nextQuestionSubset[nextIndex]);
          parentQuestion = parentOfParent;
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
          <Recording question={this.props.currentQuestion} />
          <button onClick={this.nextQuestion}>Next</button>
        </div>
      )
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div>
        <h2>{title}</h2>
        {this.renderQuestionType()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);