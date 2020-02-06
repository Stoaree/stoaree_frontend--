import React from "react";
import StoryCard from "./../../components/StoryCard/StoryCard.js";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    searchQuery: state.searchReducer.searchQuery
  };
}

class SearchPage extends React.Component {
  state = {
    allStories: [],
    filteredStories: [],
    previousQuery: ""
  };

  filterStories = () => {
    const { searchQuery } = this.props;
    const { allStories, previousQuery } = this.state;

    if (searchQuery !== previousQuery) {
      const filteredStories = allStories.filter(story => {
        const regex = new RegExp(searchQuery, "i");
        const testTags = story.tags.some(tag => regex.test(tag));
        return (
          regex.test(story.title) || regex.test(story.description) || testTags
        );
      });

      this.setState({ filteredStories, previousQuery: searchQuery });
    }
  };

  componentDidMount() {
    axiosAPI.get("/stories").then(res => {
      this.setState({ allStories: res.data });
    });
  }

  componentDidUpdate() {
    this.filterStories();
  }

  renderStories = () => {
    const { filteredStories } = this.state;

    if (filteredStories) {
      return filteredStories.map(story => {
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
        <div className="cardDiv">{this.renderStories()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchPage);
