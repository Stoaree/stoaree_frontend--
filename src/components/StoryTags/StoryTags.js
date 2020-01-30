import React from 'react';

class StoryTags extends React.Component {

  handleTags() {
    const tags = this.props.tags;
    const stories = this.props.stories._id;

    return (tags.map((tag) => {
      return (
        <div key={tag + stories}>
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