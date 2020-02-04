import React from "react";
import axios from "axios";
import axiosAPI from "../../api/stoareeAPI";
import StoryForm from "../../components/StoryForm/StoryForm";

class EditStoryPage extends React.Component {
  state = {
    story: {},
    updateSuccess: false
  }

  componentDidMount() {
    axiosAPI.get(`/stories/${this.props.match.params.id}`).then(res => {
      this.setState({ story: res.data });
    });
  }

  sendUpdate = (values, url = "") => {
    axiosAPI.put(`/stories/${this.state.story._id}`, { ...values, imageURL: url }).then(res => {
      if (res.status === 200) {
        this.setState({ updateSuccess: true, story: res.data });
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

          this.sendUpdate(values, url);
        });
      }).catch(error => {
        alert(JSON.stringify(error));
      });
    }
    else {
      this.sendUpdate(values);
    }
  }

  renderForm = () => {
    const { story } = this.state;
    if (Object.entries(story).length) {
      return <StoryForm initialValues={story} editing={true} onSubmit={this.onSubmit} imageURL={story.imageURL} />
    }
  }

  render() {
    return (
      <div>
        {this.state.updateSuccess && "Story updated successfully."}
        <h3>Edit Story: {this.state.story.title}</h3>
        {this.renderForm()}
      </div>
    )
  }
}

export default EditStoryPage;