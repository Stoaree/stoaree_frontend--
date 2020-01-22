import React from 'react';
import { NavLink } from 'react-router-dom';
// Components
import SearchBar from './../SearchBar/SearchBar.js';

// CSS
import './../../css/main.css';


class Navbar extends React.Component {
  render() {
    return  (
      <div className="navbar-div">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="text-div">
          <NavLink to="/" className="text" exact={true}> Home </NavLink>
          <NavLink to="/signup" className="text"> Sign up </NavLink>
          <NavLink to="/login" className="text"> Login </NavLink>
        </div>
      </div>
    )
  }
};

export default Navbar;