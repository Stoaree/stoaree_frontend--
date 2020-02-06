import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import StoryForm from "../../components/StoryForm/StoryForm";
import fileUpload from "../../services/fileUpload";

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
      fileUpload(values, values.image, this.sendUpdate);
    }
    else {
      this.sendUpdate(values);
    }
  }

  renderForm = () => {
    const { story } = this.state;
    if (!story || Object.entries(story).length) {
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