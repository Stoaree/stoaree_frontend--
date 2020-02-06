import React from 'react';

// CSS 
import "./StoryTags.css";

class StoryTags extends React.Component {

  handleTags() {

    const tags = this.props.tags;
  
    return (tags.map((tag, index) => {
      return (
        <div className="story-tag-div-card" key={`${index}_${this.props.stories}`}>
          <p className="story-tag"> {tag} </p>
        </div>
      )
    }))
  }

  render () {
    return (
      <div className="story-tags-card">
        {this.handleTags()}
      </div>
    )
  }
};

export default StoryTags;