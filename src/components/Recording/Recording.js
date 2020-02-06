import React from "react";
import { ReactMic } from "react-mic";
// import axios from "axios";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";
import { confirmUploadComplete, resetUploadStatus } from "../../redux/storyReducer";
import fileUpload from "../../services/fileUpload";

// CSS
import "./Recording.css";

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

  submitQuestion = (values, url) => {
    // save question in story
    axiosAPI.post(`/questions/${this.props.currentStory}`, {
      ...values,
      audioFileURL: url
    }).then(res => {
      this.props.confirmUploadComplete();
    });
  }

  onStop = (recordedBlob) => {

    // Split the filename to get the name and type

    const fileName = Math.random().toString() + ".webm";
    const fileType = recordedBlob.options.mimeType;

    const values = {
      question: this.props.currentQuestion
    }
    fileUpload(values, recordedBlob.blob, this.submitQuestion, fileName, fileType);
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
        
        <div className="mic-icon-container">
          <i className="fas fa-microphone mic-icon" onClick={this.startRecording} ></i>
        </div>
        <button onClick={this.stopRecording} type="button" className="stop-recording">Stop and Save Recording</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recording);