import React from "react";

// CSS
import './StoryShow.css';

// Component 
import ProfileImage from './../ProfileImage/ProfileImage.js';

class StoryShow extends React.Component {

  state = {
    avatarURL: ''
  };

  render() {
    const { story } = this.props;

    return (
      <div className="story-show">
        <div className="story-image">
          <div className="heart"></div>        </div>
        <div className="story-content">
          <div className="profile-image-div">
            <ProfileImage />
            <p>Story title:</p>
          </div>
          <div className="story-image">
            <img src={story.imageURL} alt="Story" className="story-header-image" />
          </div>
          <div className="story-title">
            {console.log(story)};
            {story.title}
          </div>
        </div>
        <div className="story-description">
          <p>Description:</p>
          <p className="description-text">{story.description}</p>
        </div>
        <p>Tags:</p>
        <p className="descriptionText">{story.tags}</p>
      </div>
    );
  }
}

export default StoryShow;