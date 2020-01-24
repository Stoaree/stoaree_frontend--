import React from 'react';
import axios from "axios";
import Question from "./Question";

class AdminPage extends React.Component {
  state = {
    questions: [],
    currentQuestion: null
  }

  componentDidMount() {
    axios.get("http://localhost:3001/questions/admin/").then(response => {
      this.setState({ questions: response.data });
      this.setState({ currentQuestion: this.state.questions[0] });
    })
  }

  // renderCurrentQuestion = () => {
  //   const { currentQuestion } = this.state;
  //   if (currentQuestion) {
  //     return <Question question={currentQuestion} />
  //   }
  // }

  renderQuestions = () => {
    const { questions } = this.state;
    if (questions) {
      return questions.map(question => {
        return <Question key={question._id} question={question} />
      });
    }
  }

  render() {
    return (
      <div>{this.renderQuestions()}</div>
    )
  }
}

export default AdminPage;