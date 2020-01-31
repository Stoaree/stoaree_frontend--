import React from "react";
import { ReactMic } from "react-mic";
import axios from "axios";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";
import { confirmUploadComplete, resetUploadStatus } from "../../redux/storyReducer";

// CSS
import "./../../css/main.css";

function mapStateToProps(state) {
  const { currentStory, currentQuestion } = state.storyReducer;
  return {
    currentStory,
    currentQuestion
  };
}

const mapDispatchToProps = {
  confirmUploadComplete,
  resetUploadStatus
}

class Recording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
  }

  startRecording = () => {
    this.setState({ record: true });
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);

    // const file = this.uploadInput.files[0];
    // Split the filename to get the name and type

    const fileName = Math.random().toString() + ".webm";
    const fileType = recordedBlob.options.mimeType;
    console.log("Preparing the upload");
    axiosAPI
      .post("https://polar-castle-01694.herokuapp.com/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        console.log("Received a signed request " + signedRequest);
        
        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType
          }
        };
        console.log(signedRequest);
        console.log(options);

        return axios
          .put(signedRequest, recordedBlob.blob, options)
          .then(result => {
            console.log("Response from s3");

            // save question in story
            axiosAPI.post(`/questions/${this.props.currentStory}`, {
              question: this.props.currentQuestion,
              audioFileURL: returnData.url
            }).then(response => {
              this.props.confirmUploadComplete();
            });
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="recording">
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#e2725b"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Stop
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recording);