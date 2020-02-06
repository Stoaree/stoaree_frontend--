import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import Question from "./Question";
import QuestionForm from "./QuestionForm";

import { connect } from "react-redux";
import { setAllQuestions } from "../../redux/storyReducer";

function mapStateToProps(state) {
  return {
    allQuestions: state.storyReducer.allQuestions
  };
}

const mapDispatchToProps = {
  setAllQuestions
};

class AdminPage extends React.Component {
  componentDidMount() {
    axiosAPI.get("/questions/admin/").then(res => {
      this.props.setAllQuestions(res.data);
    });
  }

  addFirstQuestion = values => {
    axiosAPI
      .post("/questions/admin", {
        title: values.title,
        isTopLevel: true,
        isYesOrNo: values.isYesOrNo,
        order: 1
      })
      .then(res => {
        this.props.setAllQuestions(res.data);
      });
  };

  renderQuestions = () => {
    const { allQuestions } = this.props;

    console.log(allQuestions);
    if (allQuestions.length) {
      const topLevelQuestions = allQuestions.filter(
        question => question.isTopLevel
      );
      return topLevelQuestions.map((question, index, topLevelQuestions) => {
        const length = topLevelQuestions.length;
        return (
          <Question
            key={question._id}
            question={question}
            allQuestions={allQuestions}
            setAllQuestions={this.props.setAllQuestions}
            index={index}
            length={length}
          />
        );
      });
    } else {
      return (
        <QuestionForm
          label={"Add first question"}
          onSubmit={this.addFirstQuestion}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <h2>Question Master List</h2>
        {this.renderQuestions()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
