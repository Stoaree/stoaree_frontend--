import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './../css/main.css';

// Pages
import HomePage from './../pages/HomePage/HomePage.js';
import LoginPage from './../pages/LoginPage/LoginPage.js';
import SignupPage from './../pages/SignupPage/SignupPage.js';
import QuestionsPage from './../pages/QuestionsPage/QuestionsPage.js';
import AdminPage from '../pages/AdminPage/AdminPage';
import InterviewPage from '../pages/InterviewPage/InterviewPage';

// Components
import NavBar from './../components/Navbar/NavBar.js';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/interview" component={InterviewPage} />
          <Route path="/admin" component={AdminPage} />
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