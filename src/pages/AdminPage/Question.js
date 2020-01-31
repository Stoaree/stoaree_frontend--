import React from "react";
import QuestionForm from "./QuestionForm";
import axiosAPI from "../../api/stoareeAPI";

class Question extends React.Component {
  state = {
    adding: false,
    editing: false
  }

  renderSubQuestions = () => {
    const { question, allQuestions } = this.props;
    if (question.subQuestions) {
      return question.subQuestions.map((subQuestionId, index, subQuestions) => {
        const childQuestion = allQuestions.find(foundQuestion => foundQuestion._id === subQuestionId);
        const lastIndex = subQuestions.length - 1;
        return <Question key={childQuestion._id} question={childQuestion} allQuestions={allQuestions} parent={question} setAllQuestions={this.props.setAllQuestions} isLast={index === lastIndex} />
      });
    }
  }

  onAdd = (values) => {
    const { question, parent } = this.props;

    // get the order no.

    axiosAPI.post("/questions/admin", {
      title: values.title,
      isTopLevel: question.isTopLevel,
      isYesOrNo: values.isYesOrNo,
      parentQuestionId: parent ? parent._id : null
    }).then(res => {
      this.props.setAllQuestions(res.data);
      this.setState({ adding: false });
    });
  }

  cancel = () => {
    this.setState({ adding: false, editing: false });
  }

  setAdding = () => {
    this.setState({ adding: true });
  }

  setEditing = () => {
    this.setState({ editing: true });
  }

  renderAddButtonOrForm = () => {
    if (this.props.isLast) {
      if (this.state.adding) {
        return <QuestionForm label={"Add question"} onSubmit={this.onAdd} cancel={this.cancel} />
      }
      else {
        return <button onClick={this.setAdding}>Add</button>
      }
    }
  }

  renderEditButtonOrForm = () => {
    if (this.state.editing) {
      return <QuestionForm label={"Add question"} onSubmit={this.onAdd} cancel={this.cancel} />
    }
    else {
      return <button onClick={this.setEditing}>Edit</button>
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div style={{ marginLeft: 50 }}>
        <h3>{title}</h3>
        {this.renderEditButtonOrForm()}
        {this.renderSubQuestions()}
        {this.renderAddButtonOrForm()}
      </div>
    )
  }
}

export default Question;