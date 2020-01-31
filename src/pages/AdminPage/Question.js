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
        const length = subQuestions.length;
        return <Question key={childQuestion._id} question={childQuestion} allQuestions={allQuestions} parent={question} setAllQuestions={this.props.setAllQuestions} index={index} length={length} />
      });
    }
  }

  onAdd = (values) => {
    const { question, parent, length } = this.props;

    axiosAPI.post("/questions/admin", {
      title: values.title,
      isTopLevel: question.isTopLevel,
      isYesOrNo: values.isYesOrNo,
      order: length + 1,
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
    this.setState({ adding: true, editing: false });
  }

  setEditing = () => {
    this.setState({ editing: true, adding: false });
  }

  renderAddButtonOrForm = () => {
    const { index, length } = this.props;
    if (index === (length - 1)) {
      if (this.state.adding) {
        return <QuestionForm label={"Add question"} onSubmit={this.onAdd} cancel={this.cancel} />
      }
      else {
        return <button onClick={this.setAdding}>Add Question</button>
      }
    }
  }

  renderEditForm = () => {
    if (this.state.editing) {
      return <QuestionForm label={"Edit question"} onSubmit={this.onAdd} cancel={this.cancel} />
    }
  }

  renderEditButton = () => {
    if (!this.state.editing) {
      return <button onClick={this.setEditing}>Edit</button>
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div style={{ marginLeft: 50 }}>
        <h3>{title} {this.renderEditButton()}</h3>
        {this.renderEditForm()}
        {this.renderSubQuestions()}
        {this.renderAddButtonOrForm()}
      </div>
    )
  }
}

export default Question;