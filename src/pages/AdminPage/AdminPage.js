import React from 'react';
import axios from "axios";
import Question from "./Question";
// import { connect } from "react-redux";

class AdminPage extends React.Component {
  state = {
    questions: []
  }

  componentDidMount() {
    axios.get("http://localhost:3001/questions/admin/").then(response => {
      this.setState({ questions: response.data });
    })
  }

  renderQuestions = () => {
    const { questions } = this.state;
    if (questions) {
      const topLevelQuestions = questions.filter(question => question.isTopLevel);
      return topLevelQuestions.map(question => {
        return <Question key={question._id} question={question} questions={questions} />
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