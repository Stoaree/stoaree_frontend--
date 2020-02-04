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
    filteredStories: [],
    previousQuery: ""
  }

  getStories = () => {
    const { searchQuery } = this.props;
    const { previousQuery } = this.state;

    if (searchQuery !== previousQuery) {
      axiosAPI.get(`search/${searchQuery}`).then(res => {
        if (JSON.stringify(this.state.stories) !== JSON.stringify(res.data)) {
          this.setState({ filteredStories: res.data, previousQuery: searchQuery });
        }
      });
    }
  }

  componentDidMount() {
    this.getStories();
  }

  componentDidUpdate() {
    this.getStories();
  }

  renderStories = () => {
    const { filteredStories } = this.state;

    if (filteredStories) {
      return filteredStories.map((story) => {
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
