import React from 'react';
import StoryCard from "../../components/StoryCard/StoryCard";
import axiosAPI from "../../api/stoareeAPI"

class Homepage extends React.Component {
  state = {
    latestStories: []
  }

  componentDidMount() {
    axiosAPI.get("/").then(res => {
      this.setState({ latestStories: res.data });
    })
  }

  displayStories = () => {
    const { latestStories } = this.state;
    if (latestStories) {
      return this.state.latestStories.map(story => {
        return <StoryCard key={story._id} story={story} />
      });
    }
  }

  render() {
    return (
      <div>
        <h1> index page </h1>
        {this.displayStories()}
      </div>
    )
  }
};

export default Homepage;