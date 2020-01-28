import React from "react";
import { Link } from "react-router-dom";

// CSS 
import './StoryShow.css';

class StoryShow extends React.Component {
  render() {
    return (
      <div className="storyShow">
        <div className="story-image">
          <div className="heart"></div>        </div>
        <div className="storyContent">
          <div className="profileImageDiv">
            <img className="profileImage" alt="profileImage" />
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