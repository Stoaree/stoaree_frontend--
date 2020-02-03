import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import StoryForm from "../../components/StoryForm/StoryForm";

class EditStoryPage extends React.Component {
  state = {
    story: {}
  }

  componentDidMount() {
    axiosAPI.get(`/stories/${this.props.match.params.id}`).then(res => {
      this.setState({ story: res.data });
    });
  }

  renderForm = () => {
    const { story } = this.state;
    if (Object.entries(story).length) {
      return <StoryForm initialValues={{
        title: story.title,
        description: story.description || "",
        interviewee: story.interviewee,
        isPublic: story.isPublic,
        imageURL: story.imageURL
      }} editing={true} />
    }
  }

  render() {
    return (
      <div>
        <h3>Edit Story: {this.state.story.title}</h3>
        {this.renderForm()}
      </div>
    )
  }
}

export default EditStoryPage;