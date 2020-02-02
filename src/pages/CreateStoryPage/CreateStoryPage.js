import React from "react";
import axios from "axios";
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

  // onSubmit = (values) => {
  //   console.log(values);
  // }

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
      console.log('Preparing the upload');

      axiosAPI.post("/sign_s3", {
        fileName: Math.random().toString() + "/" + values.image.name,
        fileType: values.image.type
      }).then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;

        console.log('Received a signed request ' + signedRequest);

        const options = {
          headers: {
            'Content-Type': values.image.type
          }
        };

        axios.put(signedRequest, values.image, options).then(result => {
          console.log("Response from s3");

          this.postStory(values, url);
        });
      }).catch(error => {
        alert(JSON.stringify(error));
      });
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