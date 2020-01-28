import React from "react";
import axios from "axios";

import StoryForm from "../../components/StoryForm/StoryForm"

class CreateStoryPage extends React.Component {
  onSubmit = (values) => {
    axios.post("http://localhost:3001/stories", { ...values }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  };

  render() {
    return (
      <div>
        <h3>Create New Story</h3>
        <StoryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default CreateStoryPage;