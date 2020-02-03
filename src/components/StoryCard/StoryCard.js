import React from "react";
import { Link } from "react-router-dom";

// CSS
import './StoryCard.css';

// Components
import ProfileImage from './../ProfileImage/ProfileImage.js';
import StoryTags from './../StoryTags/StoryTags.js';

class StoryCard extends React.Component {
  render() {
    const { story } = this.props;

    return (
      <div className="story-card">
        <div className="story-image-container">
          <img src={story.imageURL} className="image-header-card" alt="Header" />
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
          <div className="story-tags-card">
            <StoryTags tags={this.props.story.tags} stories={this.props.story} />
          </div>
        </div>
      </div>
    );
  }
}

export default StoryCard;