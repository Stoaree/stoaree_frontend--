import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './../css/main.css';

// Pages
import HomePage from './../pages/HomePage.js';
import LoginPage from './../pages/LoginPage.js';
import SignupPage from './../pages/SignupPage.js';
import QuestionsPage from './../pages/QuestionsPage.js';

// Components 
import NavBar from './../components/NavBar.js';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/question" component={QuestionsPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} exact={true} />
        </Switch>
      </div>
    </Router>
  )
};

export default AppRouter;