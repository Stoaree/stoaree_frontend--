import React from "react";
import { Link } from "react-router-dom";

// CSS 
import './StoryCard.css';

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
            <img className="profileImage" alt="profileImage" />
          </div>
          <div className="storyTitle">
            <h4 className="storyTitle">{this.props.story.title}</h4>
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

{
  /* <Link to={"/stories/" + props.stories._id}>{this.props.story.title}</Link> */
}
