import React from "react";

// Services


// Component
import ProfileImage from './../ProfileImage/ProfileImage.js'

// CSS 
import './StoryShow.css';

class StoryShow extends React.Component {

  state = {
    avatarURL: ''
  };

  render() {
    return (
      <div className="storyShow">
        <div className="story-image">
          <div className="heart"></div>        </div>
        <div className="storyContent">
          <div className="profileImageDiv">
            <ProfileImage avatarURL={this.state.avatarURL}/>
          <p>Story title:</p>
          </div>
          <div className="storyTitle">
            <p>Image</p>
              {this.props.story.title}
          </div>
        </div>
        <div className="storyDescription">
          <p>Description:</p>
          <p className="descriptionText">{this.props.story.description}</p>
        </div>
          <p>Tags:</p>
          <p className="descriptionText">{this.props.story.tags}</p>
      </div>
    );
  }
}

export default StoryShow;