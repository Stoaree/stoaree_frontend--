import React from "react";

// CSS
import "./StoryShow.css";

// Component
import ProfileImage from "./../ProfileImage/ProfileImage.js";

class StoryShow extends React.Component {
  state = {
    avatarURL: ""
  };

  render() {
    const { story } = this.props;

    return (
      <div className="story-show-card">
       <div className = "banner"></div>

        <div
          className="story-image-show-container"
          style={{ backgroundImage: `url(${story.imageURL})`, height: "30vh" }}
        >
          {console.log(story.imageURL)}
        </div>
        <div className="story-content">
          <div className="profile-box">
            <ProfileImage />
            <div className="story-show-title">
              {story.title}
            </div>
          </div>
          <div className="story-description">
            <p className="description-text">Description:</p>
            <p className="description-text">{story.description}</p>
          </div>
          <div className="tag-description">
            <p>Tags:</p>
            <p className="descriptionText">{story.tags}</p>
            <div className="heart"></div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default StoryShow;
