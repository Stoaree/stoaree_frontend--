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

  onSubmit = (values) => {
    console.log(values);
    console.log('Preparing the upload');

    axios.post("http://localhost:3001/sign_s3", {
      fileName: values.image.name,
      fileType: values.image.type
    }).then(response => {
      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      console.log(url);

      console.log('Received a signed request ' + signedRequest);

      // The below function calls axios put and updates the database
      // updateUserData(this.props.userId, this.state.url)

      const options = {
        headers: {
          'Content-Type': values.image.type
        }
      };

      axios.put(signedRequest, values.image, options).then(result => {
        console.log("Response from s3");

        axiosAPI.post("/stories", { ...values, imageURL: url }).then(response => {
          console.log(response);
          if (response.status === 200) {
            this.setState({ recording: true });
            this.props.setCurrentStory(response.data._id);
          }
        });
      }).catch(error => {
        alert("Error " + JSON.stringify(error));
      })
    }).catch(error => {
      alert(JSON.stringify(error));
    })
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
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryPage);