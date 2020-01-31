import React from "react";
import { NavLink } from "react-router-dom";

// Components
import SearchBar from "./../SearchBar/SearchBar.js";

// Services
import axiosAPI from "../../api/stoareeAPI.js";

// CSS
import "./../../css/main.css";

class Navbar extends React.Component {

  state = {
    token: null,
    dataIsLoaded: false
  }

  componentDidMount() {

    return axiosAPI.get().then((response) => {

      const token = response.config.headers.Authorization;
      return this.setState({ token: token, dataIsLoaded: true})
    })
  };

  // handleSignOut = () => {
  //   const removeCookies = browser.cookies.remove()

  // }

  // Use the authentication token to check if they're logged in. Must delete auth token when user signs out though.

  render() {
    const {token} = this.state;
    const {dataIsLoaded} = this.state;

    if (dataIsLoaded && token) {
      return (
        <div className="navbar-div">
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="text-div">
            <NavLink to="/" className="text" exact={true}> Home </NavLink>
            <NavLink to="/" className="text">Sign out</NavLink>
            <NavLink to="/record" className="text">Record</NavLink>
          </div>
        </div>
      );
    } else if (dataIsLoaded && !token) {
      return (
        <div className="navbar-div">
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="text-div">
            <NavLink to="/" className="text" exact={true}> Home </NavLink>
            <NavLink to="/signup" className="text"> Sign up </NavLink>
            <NavLink to="/login" className="text">Login</NavLink>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p> Loading... </p>
        </div>
      );
    }
  }
}

export default Navbar;
