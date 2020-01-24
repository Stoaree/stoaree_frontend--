import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getStories } from './../services/getStory.js';

// CSS
import './../css/main.css';

// Pages
import HomePage from './../pages/HomePage/HomePage.js';
import LoginPage from './../pages/LoginPage/LoginPage.js';
import SignupPage from './../pages/SignupPage/SignupPage.js';
import QuestionsPage from './../pages/QuestionsPage/QuestionsPage.js';
import AdminPage from '../pages/AdminPage/AdminPage';
import InterviewPage from '../pages/InterviewPage/InterviewPage';
import SearchPage from './../pages/SearchPage/SearchPage.js'

// Components
import NavBar from './../components/Navbar/NavBar.js';

class AppRouter extends React.Component {

  // Handles state for search
  state = {
    stories: null,
    filteredStories: null
  };

  // Handles search results
  componentDidMount() {
    getStories().then((response) => {
      const stories = response.map((story) => {
        story.title = story.title.toLowerCase()
        return story
      })
      this.setState({ stories: stories, filteredStories: stories })
    })
  };

  // Handles when the user searches
  handleSearch = (e) => {
    // setState
    // quick fix
    this.setState({
      filteredStories: this.state.stories.filter((story) => story.title.includes(e.target.value))
    })
  }

  render() {
    const { stories } = this.state
    return stories ? (
      <Router>
        <div>
          <NavBar stories={this.state.filteredStories} handleSearch={this.handleSearch} />
          <Switch>
            <Route path="/search" render={() => {
              return <SearchPage stories={this.state.filteredStories} />
            }} />
            <Route path="/interview" component={InterviewPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/question" component={QuestionsPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} exact={true} />
          </Switch>
        </div>
      </Router>
    ) : null
  }
};

export default AppRouter;