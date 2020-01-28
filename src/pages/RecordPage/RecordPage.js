import React from "react";
import axios from "axios";
import Question from "../../components/Question/Question";
import { connect } from "react-redux";

import { setAllQuestions, nextQuestion, setCurrentStory } from "../../redux/storyReducer";

function mapStateToProps(state) {
  const { currentQuestion, currentQuestionSubset } = state.storyReducer;
  return {
    currentQuestion,
    currentQuestionSubset
  };
}

const mapDispatchToProps = {
  setAllQuestions, nextQuestion, setCurrentStory
}

class RecordPage extends React.Component {
  componentDidMount() {
    this.props.setCurrentStory(this.props.match.params.id);
    axios.get("http://localhost:3001/questions/all").then(response => this.props.setAllQuestions(response.data));
  }

  renderCurrentQuestion = () => {
    const { currentQuestion } = this.props;
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
        return <Question question={currentQuestion} story={this.props.match.params.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordPage);