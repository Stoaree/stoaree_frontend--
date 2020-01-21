import React from 'react';

// Components
import SearchBar from './SearchBar.js';

// CSS
import './../css/main.css';


class Navbar extends React.Component {
  render() {
    return  (
      <div className="navbar-div">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="text-div">
          <h3 className="text"> Home </h3>
          <h3 className="text"> Sign up </h3>
          <h3 className="text"> Login </h3>
        </div>
      </div>
    )
  }
};

export default Navbar;