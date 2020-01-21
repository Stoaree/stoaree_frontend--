import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    };
  }

  handleChange = ev => {
    this.setState({ success: false, url: "" });
  }; // Perform the upload
  handleUpload = ev => {
   // I've copied this whole function to Record.js
   // DOes this need to exist?
   
   
    const file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    
    const fileName = file.name;
    const fileType = file.type;
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
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios
          .put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3");
            this.setState({ success: true });
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    const SuccessMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br />
      </div>
    );
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage /> : null}
          <input
            onChange={this.handleChange}
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
          />
          <br />
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default App;
