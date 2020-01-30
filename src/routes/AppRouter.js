import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import AdminPage from '../pages/AdminPage/AdminPage';
import CreateStoryPage from "../pages/CreateStoryPage/CreateStoryPage";

// Components
import NavBar from "./../components/Navbar/NavBar.js";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route
              path="/stories/:id"
              render={props => {
                return <StoryPage match={props.match} />;
              }}
            />
            <Route path="/search" component={SearchPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/stories/new" component={CreateStoryPage} />
            <Route path="/stories/:id" component={StoryPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/question" component={QuestionsPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} exact={true} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter;
