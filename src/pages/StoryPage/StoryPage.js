import React from "react";

// Components
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
      sounds: foundStory.questions,

    });

  
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment {...comment} />);
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
    return this.state.sounds.map((sound, index) => <Playback {...sound} playing={sound.play ? true : false} index={index} handlePlay={this.handlePlay} nextSound={this.nextSound} />);
  }

  render() {
    const { story } = this.state;
    const { comments } = this.state;
    const { sounds } = this.state;

    console.log(sounds)
    

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
