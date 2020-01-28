import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";

import { setCurrentStory } from "../../redux/storyReducer";

import StoryForm from "../../components/StoryForm/StoryForm"
import RecordPage from "../RecordPage/RecordPage";

function mapStateToProps(state) {
  const { currentStory } = state.storyReducer;
  return {
    currentStory
  };
}

const mapDispatchToProps = {
  setCurrentStory
}

class CreateStoryPage extends React.Component {
  state = {
    recording: false
  }

  onSubmit = (values) => {
    console.log(values);
    // axiosAPI.post("/stories", { ...values }).then(response => {
    //   console.log(response);
    //   if (response.status === 200) {
    //     this.setState({ recording: true });
    //     this.props.setCurrentStory(response.data._id);
    //   }
    // }).catch(error => {
    //   console.error(error);
    // })
  }

  renderFormOrQuestions = () => {
    if (this.state.recording) {
      return <RecordPage />;
    }
    else {
      return <StoryForm onSubmit={this.onSubmit} />;
    }
  }

  render() {
    return (
      <div>
        <h3>Create New Story</h3>
        {this.renderFormOrQuestions()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryPage);