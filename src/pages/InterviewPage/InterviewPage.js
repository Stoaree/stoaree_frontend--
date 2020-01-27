import React from "react";
import axios from "axios";
import Question from "../../components/Question/Question";
import { connect } from "react-redux";

import { setAllQuestions, nextQuestion } from "../../redux/storyReducer";

function mapStateToProps(state) {
  return {
    allQuestions: state.storyReducer.allQuestions,
    currentQuestion: state.storyReducer.currentQuestion,
    currentQuestionSubset: state.storyReducer.currentQuestionSubset
  };
}

const mapDispatchToProps = {
  setAllQuestions, nextQuestion
}

class InterviewPage extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:3001/questions/admin/").then(response => this.props.setAllQuestions(response.data));
  }

  renderCurrentQuestion = () => {
    const { allQuestions, currentQuestion } = this.props;
    if (currentQuestion) {
      if (currentQuestion === "finished") {
        return (
          <div>
            <h2>No more questions!</h2>
            <button>Finish Story</button>
          </div>
        )
      }
      else {
        return <Question question={currentQuestion} allQuestions={allQuestions} nextQuestion={this.nextQuestion} />
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPage);