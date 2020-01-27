import React from "react";
import { ReactMic } from "react-mic";
import axios from "axios";
import { connect } from "react-redux";
import { setCurrentStory } from "../../redux/storyReducer";

// CSS
import "./../../css/main.css";

function mapStateToProps(state) {
  const { currentStory } = state.storyReducer;
  return {
    currentStory
  };
}

const mapDispatchToProps = {
  setCurrentStory
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

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);

    // const file = this.uploadInput.files[0];
    // Split the filename to get the name and type

    const fileName = Math.random().toString() + ".webm";
    const fileType = recordedBlob.options.mimeType;
    console.log("Preparing the upload");
    axios
      .post("https://polar-castle-01694.herokuapp.com/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        // var url = returnData.url;
        console.log("Received a signed request " + signedRequest);
        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType
          }
        };
        return axios
          .put(signedRequest, recordedBlob.blob, options)
          .then(result => {
            console.log("Response from s3");

            // save question in story
            // axios.post(`http://localhost:3001/questions/`, {
            //   story_id: this.props.currentStory._id,
            //   question: currentQuestion,
            //   audioFileURL: returnData.url
            // });
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