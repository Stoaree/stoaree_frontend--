import React from 'react';
import StoryCard from './../StoryCard/StoryCard.js';
import '../StoryCard/StoryCard.css';

class UserDataDisplay extends React.Component {

  handleStories = (props) => {
    const stories = this.props.stories;

    return stories.map((story) => {
      return (
        <div key={story._id}>
          <StoryCard story={story}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>{this.props.userData.firstName} {this.props.userData.lastName}</li>
            <li>{this.props.userData.displayName}</li>
            <li>{this.props.userData.location}</li>
            {console.log(this.props.userData)}

            <h3> Stories </h3>
            {this.handleStories()}
            
          </ul>
        </div>
      </div>
    )
  }
};

export default UserDataDisplay;