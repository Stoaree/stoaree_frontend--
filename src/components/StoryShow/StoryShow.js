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

  handleStoryTags = () => {
    const tags = this.props.story.tags;

    return tags.map((tag) => {
      return (
        <div key={this.props.story.interviewer._id + tag}>
          <p className="story-page-tag"> {tag} </p>
        </div>
      )
    })
  }

  render() {
    const { story } = this.props;

    return (
      <div className="story-page-container">
        <div className="story-page-image-show-container">
          <img className="story-page-image" src={story.imageURL || "https://picsum.photos/800/600?grayscale"} alt="header" />
        </div>
        <div className="story-page-content-container">
          <div className="story-page-title-profile-image">
            <ProfileImage avatarURL={story.interviewer.avatarURL} />
            <h2 className="story-page-title"> {story.title} </h2>
            <div className="heart-container">
              <div className="like-box">
                <LikeButton story={story} />
              </div>
            </div>
          </div>
          <div className="story-page-tags-container">
            {this.handleStoryTags()}
          </div>
          <div className="story-page-description">
            <h3 className="description-text">Description:</h3>
            <p className="description-text">{story.description}</p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default StoryShow;
