import React from "react";
import StoryCard from "./../../components/StoryCard/StoryCard.js";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    searchQuery: state.searchReducer.searchQuery
  }
}

class SearchPage extends React.Component {
  state = {
    stories: []
  }

  componentDidMount() {
    axiosAPI.get(`search/${this.props.searchQuery}`).then(res => {
      this.setState({ stories: res.data });
    })
  }

  renderStories = () => {
    const { stories } = this.state;

    if (stories) {
      return stories.map((story) => {
        return (
          <div key={story._id}>
            <StoryCard story={story} userId={story.interviewer._id} />
          </div>
        );
      });
    }
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

export default connect(mapStateToProps)(SearchPage);
