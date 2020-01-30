import React from 'react';

class StoryTags extends React.Component {

  state = {
    tags: []
  }

  handleTags() {
    const tags = this.props.tags

    return (tags.map((tag) => {
      return (
        <div>
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