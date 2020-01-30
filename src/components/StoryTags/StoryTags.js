import React from 'react';

// Components


// Services
import {getStories} from './../../services/getStory.js';

class StoryTags extends React.Component {

  state = {
    tags: ''
  }

  componentDidMount() {
    getStories().then((response) => {

      const stories = response.map((story) => {
        
        const storyTags = story.tags;
        return this.setState({tags:storyTags})
    
        // storyTags.map((tag) => {
        //   const storyTags = tag
        //   return this.setState({tags: storyTags})
        // })
      })
    })
  }
  
  render () {
    return (
      <div>
        {console.log(this.state.tags)}
      </div>
    )
  }
}

export default StoryTags;