import React from "react";

// Components
import StoryShow from "../../components/StoryShow/StoryShow";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm"
import Playback from "../../components/Playback/Playback";
import HeartButton from "../../components/LikeButton/LikeButton";

import axiosAPI from "../../api/stoareeAPI";

class StoryPage extends React.Component {
  state = {
    story: null,
    comments: null,
    sounds: null
  };

  componentDidMount() {
    axiosAPI.get(`stories/${this.props.match.params.id}`).then(res => {
      const foundStory = res.data;
      this.setState({
        story: foundStory,
        comments: foundStory.comments,
        sounds: foundStory.questions,
      });
    })
  }

  onCommentSubmit = (values) => {
    axiosAPI.post(`/comments/${this.props.match.params.id}`, {
      text: values.text
    }).then(res => {
      const { comments } = this.state;
      comments.push(res.data);
      this.setState({ comments });
    })
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment key={comment._id} {...comment} />);
  }

  nextSound = (index) => {
    const updatedSounds = this.state.sounds.map((sound, i) => {
      if (i === (index + 1)) {
        sound.play = true
        return sound
      } else {
        sound.play = false
        return sound
      }
    })
    this.setState({
      sounds: updatedSounds
    })
  }

  handlePlay = (index) => {
    const updatedSounds = this.state.sounds.map((sound, i) => {
      if (i === index) {
        sound.play = true
        return sound
      } else {
        sound.play = false
        return sound
      }
    })
    this.setState({
      sounds: updatedSounds
    })
  }

  renderSounds() {
    return this.state.sounds.map((sound, index) => <Playback {...sound} playing={sound.play ? true : false} index={index} handlePlay={this.handlePlay} nextSound={this.nextSound} key={sound._id} />);
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    const { sounds } = this.state;

    if ((story, comments)) {
      return (
        <div>
          {" "}
          <StoryShow story={story} />
          {this.renderSounds()}
          {this.renderComments()}
         </div>
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
