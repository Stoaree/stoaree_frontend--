import React from "react";
import { connect } from "react-redux"

// Components
import StoryShow from "../../components/StoryShow/StoryShow";
import Comment from "../../components/Comment/Comment";
import CommentForm from "./../../components/CommentForm/CommentForm.js";
import Playback from "../../components/Playback/Playback";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/LinkButton/LinkButton";

// CSS
import "./StoryPage.css";

import axiosAPI from "../../api/stoareeAPI";

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
}

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
      <div className="button-box-container">
        {this.state.sounds.map((sound, index) => (
          <Playback
            {...sound}
            playing={sound.play ? true : false}
            index={index}
            handlePlay={this.handlePlay}
            key={sound._id}
          />
        ))}
        <div className="story-page-buttons-container">
          <Button onClick={() => this.handlePlay(this.state.currentIndex)}>Play Story</Button>
          <Button onClick={this.handlePause}>Pause</Button>
        </div>
      </div>
    );
  }

  renderForms = () => {
    if (this.props.currentUser) {
      return (
        <div className="comment-like-box">
          <CommentForm onSubmit={this.onCommentSubmit} />
        </div>
      )
    }
  }

  deleteStory = () => {
    const confirm = window.confirm("Are you sure you want to delete this story?");
    if (confirm) {
      axiosAPI.delete(`/stories/${this.state.story._id}`).then(res => {
        if (res.status === 200) {
          window.location.assign("/");
        }
      })
    }
  }

  renderEditButton = () => {
    const { story } = this.state;
    const { currentUser } = this.props;
    if (currentUser && currentUser._id === story.interviewer._id) {
      return (
        <div className="story-page-buttons-container">
          <LinkButton to={`/stories/edit/${story._id}`}>Edit Story</LinkButton>
          <Button onClick={this.deleteStory}>Delete Story</Button>
        </div>
      )
    }
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;

    if (story && comments) {
      return (
        <div className="story-content">
          {" "}
          <StoryShow story={story} />
          {this.renderEditButton()}
          {this.renderSounds()}
          {this.renderComments()}
          {this.renderForms()}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps)(StoryPage);
