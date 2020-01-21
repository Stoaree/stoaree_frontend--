import React from "react";
import { ReactMic } from "react-mic";
import axios from "axios";

export default class Example extends React.Component {
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
      .post("http://localhost:3001/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        console.log("Recieved a signed request " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        return axios
          .put(signedRequest, recordedBlob.blob, options)
          .then(result => {
            console.log("Response from s3");
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Save
        </button>
      </div>
    );
  }
}
