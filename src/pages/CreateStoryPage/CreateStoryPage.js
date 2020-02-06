import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";

import { setCurrentStory } from "../../redux/storyReducer";
import fileUpload from "../../services/fileUpload";

import StoryForm from "../../components/StoryForm/StoryForm"
import RecordPage from "../RecordPage/RecordPage";

// CSS
import './CreateStoryPage.css';

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

  postStory = (values, url = "") => {
    axiosAPI.post("/stories", { ...values, imageURL: url }).then(response => {
      if (response.status === 200) {
        this.setState({ recording: true });
        this.props.setCurrentStory(response.data._id);
      }
    });
  }

  onSubmit = (values) => {
    if (values.image) {
      fileUpload(values, values.image, this.postStory);
    }
    else {
      this.postStory(values);
    }
  }

  renderFormOrQuestions = () => {
    if (this.state.recording) {
      return <RecordPage />;
    }
    else {
      return (
        <div className="create-story-page-container">
          <h2 className="create-story-page-text">Before we begin...</h2>
          <p className="create-story-page-text"> Our mission is to allow you to capture the interesting stories of your loved ones, friends, local heros and more. </p>
          <p className="create-story-page-text"> Before you being here are a few tips to help you get the most out of the interviewer and the story itself.</p>
          <ul className="create-story-page-list-container">
            <li className="create-story-page-text"> Ensure you're in a quiet environment where there is no background noise. </li>
            <li className="create-story-page-text"> Encourage the interviewee to tell smaller stories along the way and dig deeper into those stories. </li>
            <li className="create-story-page-text"> Everyone has a story lets enjoy listening to each others.  </li>
          </ul>
          <StoryForm onSubmit={this.onSubmit} />;
      </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderFormOrQuestions()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryPage);