import axios from "axios";
import axiosAPI from "../api/stoareeAPI";

export default function uploadFile(values, file, callback, fileName = null, fileType = null) {
  console.log('Preparing the upload');

  axiosAPI.post("/sign_s3", {
    fileName: fileName || Math.random().toString() + "/" + file.name,
    fileType: fileType || file.type
  }).then(response => {
    const returnData = response.data.data.returnData;
    const signedRequest = returnData.signedRequest;
    const url = returnData.url;

    console.log('Received a signed request ' + signedRequest);

    const options = {
      headers: {
        'Content-Type': fileType || file.type
      }
    };

    axios.put(signedRequest, file || file, options).then(result => {
      console.log("Response from s3");
      callback(values, url);
    });
  }).catch(error => {
    alert(JSON.stringify(error));
  });
}