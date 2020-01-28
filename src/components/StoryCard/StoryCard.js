import React from "react";
import { Link } from "react-router-dom";

// CSS 
import './StoryCard.css';

// Components
import ProfileImage from './../ProfileImage/ProfileImage.js';

class StoryCard extends React.Component {
  render() {
    return (
      <div className="storyCard">
        <div className="story-image">
          <div className="heart"></div>
          <div className="play-button"></div>
        </div>
        <div className="storyContent">
          <div className="profileImageDiv">
            <ProfileImage />
          </div>
          <div className="storyTitle">
            <Link className="storyTitle" to={"/stories/" + this.props.story._id}>{this.props.story.title}</Link> 
          </div>
        </div>
        <div className="storyDescription">
          <p className="descriptionText">{this.props.story.description}</p>
        </div>
      </div>
    );
  }
}

export default StoryCard;

