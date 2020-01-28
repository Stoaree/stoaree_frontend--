import React from "react";
import StoryCard from "./../../components/StoryCard/StoryCard.js";

class SearchPage extends React.Component {
  renderStories = () => {
    return this.props.stories.map(story => {
      return (
        <div key={story._id}>
          <StoryCard story={story} />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h1> Search Page! </h1>
        {this.renderStories()}
      </div>
    );
  }
}

export default SearchPage;


