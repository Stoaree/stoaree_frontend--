import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getStories } from "./../services/getStory.js";

// CSS
import "./../css/main.css";

// Pages
import HomePage from "./../pages/HomePage/HomePage.js";
import LoginPage from "./../pages/LoginPage/LoginPage.js";
import SignupPage from "./../pages/SignupPage/SignupPage.js";
import QuestionsPage from "./../pages/QuestionsPage/QuestionsPage.js";
import SearchPage from "./../pages/SearchPage/SearchPage.js";
import StoryPage from "../pages/StoryPage/StoryPage.js";
import ProfilePage from "../pages/ProfilePage/ProfilePage.js";

// Components
import NavBar from "./../components/Navbar/NavBar.js";

class AppRouter extends React.Component {
  // Handles state for search
  state = {
    stories: null,
    filteredStories: null
  };

  // Handles search results
  componentDidMount() {
    getStories().then(response => {
      const stories = response.map(story => {
        story.title = story.title.toLowerCase();
        return story;
      });
      this.setState({ stories: stories, filteredStories: stories });
    });
  }

  // Handles when the user searches
  handleSearch = e => {
    // setState

    this.setState({
      filteredStories: this.state.stories.filter(story =>
        story.title.includes(e.target.value)
      )
    });
  };

  render() {
    const { stories } = this.state;
    return stories ? (
      <Router>
        <div>
          <NavBar
            stories={this.state.filteredStories}
            handleSearch={this.handleSearch}
          />
          <Switch>
            <Route
              path="/search"
              render={() => {
                return <SearchPage stories={this.state.filteredStories} />;
              }}
            />
            <Route
              path="/stories/:id"
              render={props => {
                return <StoryPage stories={stories} match={props.match} />;
              }}
            />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/question" component={QuestionsPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} exact={true} />
          </Switch>
        </div>
      </Router>
    ) : null;
  }
}

export default AppRouter;
