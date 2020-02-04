import React from "react";

// Components
import StoryShow from "../../components/StoryShow/StoryShow";
import Comment from "../../components/Comment/Comment";
import CommentForm from "./../../components/CommentForm/CommentForm.js";
import Playback from "../../components/Playback/Playback";
import LikeButton from "../../components/LikeButton/LikeButton";
import Button from "../../components/Button/Button";

// CSS
import "./StoryPage.css";

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
        sounds: foundStory.questions
      });
    });
  }

  onCommentSubmit = values => {
    axiosAPI
      .post(`/comments/${this.props.match.params.id}`, {
        text: values.text
      })
      .then(res => {
        const { comments } = this.state;
        comments.push(res.data);
        this.setState({ comments });
      });
  };

  renderComments() {
    return this.state.comments.map(comment => (
      <Comment key={comment._id} {...comment} />
    ));
  }

  handlePlay = (index = 0) => {
    const { sounds } = this.state;
    const updatedSounds = sounds.map((sound, i) => {
      if (i === index) {
        sound.play = true;
        return sound;
      } else {
        sound.play = false;
        return sound;
      }
    });

    this.setState({
      sounds: updatedSounds,
      currentIndex: index >= sounds.length - 1 ? 0 : index
    });
  };

  handlePause = index => {
    const updatedSounds = this.state.sounds.map((sound, i) => {
      sound.play = false;
      return sound;
    });
    this.setState({
      sounds: updatedSounds
    });
  };

  renderSounds() {
    return (
      <div className="button-box">
        {this.state.sounds.map((sound, index) => (
          <Playback
            {...sound}
            playing={sound.play ? true : false}
            index={index}
            handlePlay={this.handlePlay}
            key={sound._id}
          />
        ))}
        <Button onClick={() => this.handlePlay(this.state.currentIndex)}>Play</Button>
        <Button onClick={this.handlePause}>Pause</Button>
      </div>
    );
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;

    if (story && comments) {
      return (
        <div className="story-content">
          {" "}
          <StoryShow story={story} />
          {this.renderSounds()}
          {this.renderComments()}
          <div className="comment-like-box">
            <CommentForm onSubmit={this.onCommentSubmit} />
            <div className="like-box">
              <LikeButton story={story} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
