import React from "react";

class Question extends React.Component {
  renderSubQuestions = () => {
    const { question, questions } = this.props;
    if (question.subQuestions) {
      return question.subQuestions.map(subQuestionId => {
        const questionObj = questions.find(foundQuestion => foundQuestion._id === subQuestionId);
        return <Question key={questionObj._id} question={questionObj} questions={questions} />
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