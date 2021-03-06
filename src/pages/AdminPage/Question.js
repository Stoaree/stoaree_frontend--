import React from "react";
import QuestionForm from "./QuestionForm";
import axiosAPI from "../../api/stoareeAPI";

class Question extends React.Component {
  state = {
    adding: false,
    editing: false,
    addingChild: false
  }

  onAddSubQuestion = (values) => {
    const { question } = this.props;

    axiosAPI.post("/questions/admin", {
      title: values.title,
      isYesOrNo: values.isYesOrNo,
      order: 1,
      parentQuestionId: question._id
    }).then(res => {
      this.props.setAllQuestions(res.data);
      this.cancel();
    });
  }

  renderSubQuestions = () => {
    const { question, allQuestions } = this.props;
    if (question.subQuestions.length) {
      return question.subQuestions.map((subQuestionId, index, subQuestions) => {
        const childQuestion = allQuestions.find(foundQuestion => foundQuestion._id === subQuestionId);
        const length = subQuestions.length;
        return <Question key={childQuestion._id} question={childQuestion} allQuestions={allQuestions} parent={question} setAllQuestions={this.props.setAllQuestions} index={index} length={length} />
      });
    }
  }

  cancel = () => {
    this.setState({ adding: false, editing: false, addingChild: false });
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
      this.cancel();
    });
  }

  onEdit = (values) => {
    const { question } = this.props;

    axiosAPI.put(`/questions/admin/${question._id}`, {
      title: values.title,
      isYesOrNo: values.isYesOrNo,
    }).then(res => {
      this.props.setAllQuestions(res.data);
      this.cancel();
    });
  }

  onDelete = () => {
    const { question } = this.props;
    axiosAPI.delete(`/questions/admin/${question._id}`).then(res => {
      this.props.setAllQuestions(res.data);
    })
  }

  setAdding = () => {
    this.setState({ adding: true, editing: false });
  }

  setEditing = () => {
    this.setState({ editing: true, adding: false });
  }

  setAddingChild = () => {
    this.setState({ addingChild: true });
  }

  renderAddButtonOrForm = () => {
    const { index, length } = this.props;
    if (index === (length - 1)) {
      if (this.state.adding) {
        return <QuestionForm label={"Add question"} onSubmit={this.onAdd} cancel={this.cancel} />
      }
      else {
        return <button onClick={this.setAdding}>Add Next Question</button>
      }
    }
  }

  renderEditForm = () => {
    if (this.state.editing) {
      return <QuestionForm label={"Edit question"} onSubmit={this.onEdit} cancel={this.cancel} initialValues={this.props.question} />
    }
  }

  renderEditButton = () => {
    if (!this.state.editing) {
      return <button onClick={this.setEditing}>Edit</button>
    }
  }

  renderAddChildFormOrButton = () => {
    const { question } = this.props;

    if (this.state.addingChild) {
      return <QuestionForm label={"Add child question"} onSubmit={this.onAddSubQuestion} cancel={this.cancel} />
    }
    else if (!question.subQuestions.length && question.isYesOrNo) {
      return <button onClick={this.setAddingChild}>Add Follow-up Question</button>
    }
  }

  render() {
    const { title } = this.props.question;

    return (
      <div style={{ marginLeft: 50 }}>
        <h3>{title} {this.renderEditButton()} <button onClick={this.onDelete}>Delete</button></h3>
        {this.renderEditForm()}
        {this.renderSubQuestions()}
        {this.renderAddChildFormOrButton()}
        {this.renderAddButtonOrForm()}
      </div>
    )
  }
}

export default Question;