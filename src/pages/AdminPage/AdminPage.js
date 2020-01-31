import React from 'react';
import axiosAPI from "../../api/stoareeAPI";
import Question from "./Question";
// import { connect } from "react-redux";

class AdminPage extends React.Component {
  state = {
    questions: []
  }

  componentDidMount() {
    axiosAPI.get("/questions/admin/").then(response => {
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