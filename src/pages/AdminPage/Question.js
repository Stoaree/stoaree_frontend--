import React from "react";

class Question extends React.Component {
  renderSubQuestions = () => {
    const { subQuestions } = this.props.question;
    if (subQuestions) {
      return subQuestions.map(question => {
        return <Question key={question._id} question={question} />
      });
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div style={{ marginLeft: 50 }}>
        <h2>{title}</h2>
        {this.renderSubQuestions()}
      </div>
    )
  }
}

export default Question;