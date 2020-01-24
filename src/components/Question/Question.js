import React from "react";

class Question extends React.Component {
  renderSubQuestions = () => {
    const { subQuestions } = this.props.question;
    if (subQuestions) {
    }
  }

  renderQuestionType = () => {
    const { isYesOrNo } = this.props.question;
    if (isYesOrNo) {
      return (
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button>Next</button>
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

export default Question;