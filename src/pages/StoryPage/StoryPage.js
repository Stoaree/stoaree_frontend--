import React from "react";

// Components
import StoryShow from "../../components/StoryShow/StoryShow";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm"
import Playback from "../../components/Playback/Playback";
import LikeButton from "../../components/LikeButton/LikeButton";

import axiosAPI from "../../api/stoareeAPI";

class StoryPage extends React.Component {
  state = {
    story: null,
    comments: null,
    sounds: null,
    currentIndex: 0
  };

  componentDidMount() {
    axiosAPI.get(`/stories/${this.props.match.params.id}`).then(res => {
      const foundStory = res.data;
      this.setState({
        story: foundStory,
        comments: foundStory.comments,
        sounds: foundStory.questions,
      });
    });
    // axiosAPI.get(`/`)
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

  handlePlay = (index = 0) => {
    const { sounds } = this.state;
    const updatedSounds = sounds.map((sound, i) => {
      if (i === index) {
        sound.play = true
        return sound
      } else {
        sound.play = false
        return sound
      }
    })

    this.setState({
      sounds: updatedSounds,
      currentIndex: index >= sounds.length - 1 ? 0 : index
    })
  }

  handlePause = (index) => {
    const updatedSounds = this.state.sounds.map((sound, i) => {
      sound.play = false
      return sound
    })
    this.setState({
      sounds: updatedSounds
    })
  }

  renderSounds() {
    return <div>
      {this.state.sounds.map((sound, index) =>
        <Playback {...sound}
          playing={sound.play ? true : false}
          index={index}
          handlePlay={this.handlePlay}
          key={sound._id} />
      )}
      <button onClick={() => this.handlePlay(this.state.currentIndex)}>
        Play
      </button>
      <button onClick={this.handlePause}>Pause</button>
    </div>

  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    // const { sounds } = this.state;

    if ((story && comments)) {
      return (
        <div>
          {" "}
          <StoryShow story={story} />
          {this.renderSounds()}
          {this.renderComments()}
          <CommentForm onSubmit={this.onCommentSubmit} />
          <LikeButton story={story} />
<<<<<<< HEAD
          <CommentForm onSubmit={this.onCommentSubmit} />



         </div>
=======
        </div>
>>>>>>> bd5e195ef9185eb4edd796959a08f0d6ef18eb7b
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
