import React, {Component} from 'react';
import axios from 'axios';
import {updateUserData} from './getUserData.js';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }

  handleUpload = (ev) => {

    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type

    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    
    console.log('Preparing the upload');

    axios.post("http://localhost:3001/sign_s3", {
      fileName: fileName,
      fileType: fileType
    }).then(response => {
      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      this.setState({url: url})

      console.log('Received a signed request ' + signedRequest);
      
      // The below function calls axios put and updates the database
      updateUserData(this.props.userId, this.state.url)
      
      const options = {
        headers: {
          'Content-Type': fileType
        }
      };
      
      axios.put(signedRequest, file, options).then(result => {
        console.log("Response from s3")
        this.setState({success: true, url: url});    
      }).catch(error => {
        alert("Error " + JSON.stringify(error));
      })
    }).catch(error => {
      alert(JSON.stringify(error));
    })
  }

  render() {
    const SUCCESS_MESSAGE = () => (
      <div>
        <h3> SUCCESSFUL UPLOAD </h3>
        <a href={this.state.url}> Access the file </a>
        <br />
      </div>
    ) 
    return (
      <div>
        <center>
          <h1> UPLOAD A FILE </h1>
          {this.state.success ? <SUCCESS_MESSAGE /> : null}
          <input onChange={this.handleChange} ref={(ref) => {this.uploadInput = ref; }} type="file"/>
          <br />
          <button onClick={this.handleUpload}> Upload </button>
        </center>
      </div>
    )
  }
};

export default ImageUpload;