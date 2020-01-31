import React from "react";

// CSS
import './StoryShow.css';

class StoryShow extends React.Component {

  state = {
    avatarURL: ''
  };

  render() {
    const { story } = this.props;

    return (
      <div className="storyShow">
        <div className="story-image">
          <div className="heart"></div>        </div>
        <div className="storyContent">
          <div className="profileImageDiv">
            <img className="profileImage" alt="profileImage" src={story.interviewer.avatarURL} />
            <p>Story title:</p>
          </div>
          <div className="storyTitle">
            <p>Image</p>
            {story.title}
          </div>
        </div>
        <div className="storyDescription">
          <p>Description:</p>
          <p className="descriptionText">{story.description}</p>
        </div>
        <p>Tags:</p>
        <p className="descriptionText">{story.tags}</p>
      </div>
    );
  }
}

export default StoryShow;