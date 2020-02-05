import React from "react";

// CSS
import "./StoryShow.css";

// Component
import ProfileImage from "./../ProfileImage/ProfileImage.js";
import LikeButton from "../../components/LikeButton/LikeButton";

class StoryShow extends React.Component {
  state = {
    avatarURL: ""
  };

  render() {
    const { story } = this.props;

    return (
      <div className="story-page-container">
        <div className="story-page-image-show-container">
          <img className="story-page-image" src={story.imageURL} alt="header" />
        </div>
        <div className="story-page-content-container">
          <div className="story-page-title-profile-image">
            <ProfileImage avatarURL={story.interviewer.avatarURL} />
            <h2 className="story-page-title"> {story.title} </h2>
            <div className="heart">
              <div className="like-box">
                <LikeButton story={story} />
              </div>
            </div>
          </div>
          <div className="story-description">
            <p className="description-text">Description:</p>
            <p className="description-text">{story.description}</p>
          </div>
          <div className="tag-description">
            <p>Tags:</p>
            <p className="descriptionText">{story.tags}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryShow;
