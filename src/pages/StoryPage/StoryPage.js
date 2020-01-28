import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoryShow from "./../../components/StoryShow/StoryShow";
import Comment from "./../../components/Comment/Comment";

class StoryPage extends React.Component {
  state = {
    story: null,
    comments: null
  };

  async componentDidMount() {
    const foundStory = this.props.stories.find(story => {
      return story._id === this.props.match.params.id;
    });

    this.setState({
      story: foundStory,
      comments: foundStory.comments
    });
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment {...comment} />);
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    console.log(story);
    console.log(comments);

    if ((story, comments)) {
      return (
        <div>
          {" "}
          <StoryShow story={story} />
          {this.renderComments()}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
