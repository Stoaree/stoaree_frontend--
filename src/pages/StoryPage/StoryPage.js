import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoryShow from "./../../components/StoryShow/StoryShow";
import Comment from "./../../components/Comment/Comment";
import Playback from "./../../components/Playback/Playback";



class StoryPage extends React.Component {
  state = {
    story: null,
    comments: null,
    sounds: null
  };

  async componentDidMount() {
    const foundStory = this.props.stories.find(story => {
      return story._id === this.props.match.params.id;
    });

    this.setState({
      story: foundStory,
      comments: foundStory.comments,
      sounds: foundStory.questions
    });

  
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment {...comment} />);
  }

  renderSounds() {
    return this.state.sounds.map(sound => <Playback {...sound} />);
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    const { sounds } = this.state;
    console.log(story);
    console.log(comments);
    console.log(sounds);


    if ((story, comments)) {
      return (
        <div>
          {" "}
          <StoryShow story={story} />
          {this.renderComments()}
          {this.renderSounds()}



        </div>
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
