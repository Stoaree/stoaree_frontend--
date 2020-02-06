import React from 'react';
import StoryCard from './../StoryCard/StoryCard.js';
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
        <div>
          <ul>
            <p> Full Name: </p>
            <li>{this.props.userData.firstName} {this.props.userData.lastName}</li>
            <p> Display Name: </p>
            <li>{this.props.userData.displayName}</li>
            <p> Location: </p>
            <li>{this.props.userData.location}</li>

            <h3> Stories: </h3>
            {this.handleStories()}
          </ul>
        </div>
      </div>
    )
  }
};

export default UserDataDisplay;