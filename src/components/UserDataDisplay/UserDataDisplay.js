import React from 'react';
import StoryCard from './../StoryCard/StoryCard.js';

// CSS 
import "./UserDataDisplay.css"
import '../StoryCard/StoryCard.css';


class UserDataDisplay extends React.Component {

  state = {
    avatarURL: ''
  }

  avatarURL = this.props.avatarURL;

  handleStories = (props) => {
    const stories = this.props.stories;
    return stories.map((story) => {
      return (
        <div key={story._id}>
          <StoryCard story={story} userId={story.interviewer} />
        </div>
      )
    })
  };

  render() {
    return (
      <div>
        <div className="user-data-container">
          <ul className="user-data-text-container">
            <div className="user-data">
              <p> Full Name: </p>
              <ol>{this.props.userData.firstName} {this.props.userData.lastName}</ol>
            </div>
            <div className="user-data">
              <p> Display Name: </p>
              <ol>{this.props.userData.displayName}</ol>
            </div>
            <div className="user-data">
              <p> Location: </p>
              <ol>{this.props.userData.location}</ol>
            </div>
          </ul>

          <hr />

          <h3> Stories: </h3>
          <div className="story-container">
            {this.handleStories()} 
          </div>  
        </div>
      </div>
    )
  }
};

export default UserDataDisplay;