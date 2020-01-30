import React from "react";
import { Link } from "react-router-dom";


// Axios get
import {getUserData} from './../../services/getUserData.js';

// CSS 
import './StoryCard.css';

// Components
import ProfileImage from './../ProfileImage/ProfileImage.js';
import StoryTags from './../StoryTags/StoryTags.js';

class StoryCard extends React.Component {
    
  state = {
    avatarURL: ''
  }

  componentDidMount = () => {

    getUserData(this.props.userId).then((response) => {
      const avatarURL = response.data.avatarURL;
      return this.setState({ avatarURL: avatarURL })
      }).catch((err) => {
        console.log(err);
    })
  };

  render() {
    return (
      <div className="story-card">
        <div className="story-image">
          <div className="heart"></div>
          <div className="play-button"></div>
        </div>
        <div className="story-content">
          <div className="profile-imageDiv">
            <ProfileImage avatarURL={this.state.avatarURL} />     
          </div>
          <div className="story-title">
            <Link className="story-title" to={"/stories/" + this.props.story._id}>{this.props.story.title}</Link>
          </div>
        </div>
        <div className="story-description">
          <p className="description-text">{this.props.story.description}</p>
        </div>
        <div className="story-tag">
          <StoryTags  />
        </div>
      </div>
    );
  }
}

export default StoryCard;
