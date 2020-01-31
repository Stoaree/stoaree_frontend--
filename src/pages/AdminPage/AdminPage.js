import React from 'react';
import axiosAPI from "../../api/stoareeAPI";
import Question from "./Question";
import { connect } from "react-redux";
import { setAllQuestions } from "../../redux/storyReducer";

function mapStateToProps(state) {
  return {
    allQuestions: state.storyReducer.allQuestions
  };
}

const mapDispatchToProps = {
  setAllQuestions
}

class AdminPage extends React.Component {
  componentDidMount() {
    axiosAPI.get("/questions/admin/").then(res => {
      this.props.setAllQuestions(res.data);
    });
  }

  renderQuestions = () => {
    const { allQuestions } = this.props;
    if (allQuestions) {
      const topLevelQuestions = allQuestions.filter(question => question.isTopLevel);
      return topLevelQuestions.map((question, index, topLevelQuestions) => {
        const lastIndex = topLevelQuestions.length - 1
        return <Question key={question._id} question={question} allQuestions={allQuestions} setAllQuestions={setAllQuestions} isLast={index === lastIndex} />
      });
    }
  }

  render() {
    return (
      <div>{this.renderQuestions()}</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);