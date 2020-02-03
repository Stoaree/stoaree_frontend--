import React from "react";
import { Link } from "react-router-dom";

// CSS
import './StoryCard.css';

// Components
import ProfileImage from './../ProfileImage/ProfileImage.js';
import StoryTags from './../StoryTags/StoryTags.js';

class StoryCard extends React.Component {

  handlingImageURL() {

    const {story} = this.props;

    if (story.imageURL) {
      return (
        <Link to={"/stories/" + story._id}> 
          <img src={story.imageURL} className="image-header-card" alt="Header"/>
        </Link>
      )
    } else if (!story.imageURL) {
      return (
        <Link to={"/stories/" + story._id}> 
          <img src={story.imageURL} className="image-header-card" alt="HELLO THERE" /> 
        </Link>
      )
    } 
  }

  render() {
    const { story } = this.props;
    
    return (
      <div className="story-card">
        <div className="story-image-container">
          {this.handlingImageURL()}
        </div>
        <div className="heart"> </div>
        <div className="play-button-card"> </div>
        <div className="story-content-card">
          <div className="profile-image-div-card">
            <ProfileImage avatarURL={story.interviewer.avatarURL} className="profile-image-card"/>
          </div>
          <div className="story-title-div-card">
            <Link className="story-title-card" to={"/stories/" + story._id}>{story.title}</Link>
          </div>
          <div className="story-description-card">
            <p className="description-text-card">{story.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryCard;