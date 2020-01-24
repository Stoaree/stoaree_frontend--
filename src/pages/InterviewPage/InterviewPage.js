import React from "react";
import axios from "axios";
import Question from "../../components/Question/Question";

class InterviewPage extends React.Component {
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

  renderCurrentQuestion = () => {
    const { currentQuestion } = this.state;
    if (currentQuestion) {
      return <Question question={currentQuestion} />
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

export default InterviewPage;