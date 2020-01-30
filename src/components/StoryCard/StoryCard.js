import React from "react";
import { Link } from "react-router-dom";

// CSS
import './StoryCard.css';

// Components
import ProfileImage from './../ProfileImage/ProfileImage.js';

class StoryCard extends React.Component {
  render() {
    const { story } = this.props;

    return (
      <div className="storyCard">
        <div className="story-image">
          <div className="heart"></div>
          <div className="play-button"></div>
        </div>
        <div className="storyContent">
          <div className="profileImageDiv">
            <ProfileImage avatarURL={story.interviewer.avatarURL} />
          </div>
          <div className="storyTitle">
            <Link className="storyTitle" to={"/stories/" + story._id}>{story.title}</Link>
          </div>
        </div>
        <div className="storyDescription">
          <p className="descriptionText">{story.description}</p>
        </div>
      </div>
    );
  }
}

export default StoryCard;
