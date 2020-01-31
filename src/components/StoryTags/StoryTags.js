import React from 'react';

class StoryTags extends React.Component {

  handleTags() {

    const tags = this.props.tags;
  
    return (tags.map((tag, index) => {
      return (
        <div key={`${index}_${this.props.stories}`}>
          <p> {tag} </p>
        </div>
      )
    }))
  }

  render () {
    return (
      <div>
        {this.handleTags()}
      </div>
    )
  }
};

export default StoryTags;