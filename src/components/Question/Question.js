import React from "react";

class Question extends React.Component {
  renderQuestionType = () => {
    const { isYesOrNo } = this.props.question;
    if (isYesOrNo) {
      return (
        <div>
          <button onClick={this.props.getSubQuestions}>Yes</button>
          <button onClick={this.props.nextQuestion}>No</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={this.props.nextQuestion}>Next</button>
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