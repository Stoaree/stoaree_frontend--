import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import Question from "../../components/Question/Question";
import LinkButton from "../../components/LinkButton/LinkButton"
import { connect } from "react-redux";

import { setAllQuestions, nextQuestion, setCurrentStory } from "../../redux/storyReducer";

function mapStateToProps(state) {
  const { currentQuestion, currentQuestionSubset, currentStory } = state.storyReducer;
  return {
    currentQuestion,
    currentQuestionSubset,
    currentStory
  };
}

const mapDispatchToProps = {
  setAllQuestions, nextQuestion, setCurrentStory
}

class RecordPage extends React.Component {
  componentDidMount() {
    axiosAPI.get("/questions/all").then(response => this.props.setAllQuestions(response.data));
  }

  renderCurrentQuestion = () => {
    const { currentQuestion, currentStory } = this.props;
    if (currentQuestion) {
      if (currentQuestion === "finished") {
        return (
          <div>
            <h2>No more questions!</h2>
            <LinkButton to={`/stories/${currentStory}`}>Finish Story</LinkButton>
          </div>
        )
      }
      else {
        return <Question question={currentQuestion} story={currentStory} />
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