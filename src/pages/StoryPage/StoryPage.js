import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class StoryPage extends React.Component {
  
  state = {
    story: null
  };

  async componentDidMount() {
    const response = await axios.get(
      `http://localhost:3001/stories/${this.props.match.params.id}`
    );
    this.setState({
      story: response.data
    });
  }

  render() {
    const { story } = this.state;

    return story ? (
      <dl>
        {" "}
        <h1>Story:</h1> <dt>Title:{story.title}</dt>
        <dt>Description:{story.description}</dt>
        <dt>Tags:{story.tags}</dt>
        <dt>
          <Link to={"/"}>Home</Link>
        </dt>
      </dl>
    ) : null;
  }
}

export default StoryPage;
