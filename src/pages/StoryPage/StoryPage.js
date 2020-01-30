import React from "react";

// Components
import StoryShow from "../../components/StoryShow/StoryShow";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm"
import Playback from "../../components/Playback/Playback";

import axiosAPI from "../../api/stoareeAPI";

class StoryPage extends React.Component {
  state = {
    story: null,
    comments: null,
    sounds: null
  };

  componentDidMount() {
    const foundStory = this.props.stories.find(story => {
      return story._id === this.props.match.params.id;
    });

    this.setState({
      story: foundStory,
      comments: foundStory.comments,
      sounds: foundStory.questions
    });
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
    return this.state.comments.map(comment => <Comment {...comment} />);
  }

  renderSounds() {
    return this.state.sounds.map(sound => <Playback {...sound} />);
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    // const { sounds } = this.state;

    if ((story, comments)) {
      return (
        <div>
          {" "}
          <StoryShow story={story} />
          {this.renderSounds()}

          {this.renderComments()}
          <CommentForm onSubmit={this.onCommentSubmit} />

        </div>
      );
    } else {
      return null;
    }
  }
}

export default StoryPage;
