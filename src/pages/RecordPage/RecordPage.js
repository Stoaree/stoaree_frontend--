import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";

// Components
import Question from "../../components/Question/Question";
import LinkButton from "../../components/LinkButton/LinkButton"

// CSS
import "./RecordPage.css";

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
          <div className="record-page-finish-container">
            <h2 className="record-page-text">No more questions!</h2>
            <LinkButton to={`/stories/${currentStory}`} className="record-page-finish-button">Finish Story</LinkButton>
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