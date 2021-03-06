import React from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import axiosAPI from "../../api/stoareeAPI";
import "./HomePage.css";

class Homepage extends React.Component {
  state = {
    latestStories: []
  };

  componentDidMount() {
    axiosAPI.get("/").then(res => {
      this.setState({ latestStories: res.data });
    });
  }

  displayStories = () => {
    const { latestStories } = this.state;
    if (latestStories) {
      return this.state.latestStories.map(story => {
        return <StoryCard key={story._id} story={story} />;
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="about-stoaree-text-container">
            <h1 className="stoaree-text"> Stoaree </h1>
            <p className="stoaree-text"> 
              Stoaree is an online platform allowing users to share and create
              compelling interviews with individuals whether that be family,
              friends or interesting people you happen to meet. The questions are
              based off Mark Howard, the founder of “Howie Games” amassing a total
              20 million listens on his postcast and commenting on the Australian
              team.
            </p>
            <h1 className="stoaree-text">About Us</h1>
            <p className="stoaree-text">
              Stoaree is an online platform allowing users to share and create
              compelling interviews with individuals whether that be family,
              friends or interesting people you happen to meet. The questions are
              based off Mark Howard, the founder of “Howie Games” amassing a total
              of 20 million listens on his podcast and commentating the Australian
              Team.
            </p>
          </div>
        </div>
        <div className="card-div-container">
          <div className="cardDiv">{this.displayStories()}</div>
        </div>
        
      </div>
    );
  }
}

export default Homepage;
