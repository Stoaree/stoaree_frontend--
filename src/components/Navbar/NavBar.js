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
  //   const fullToken = document;
  //   const cookie = fullToken.split("=");
  // };


  deleteCookie = () => {
    const now = new Date()
    now.setTime(now.getTime() - 1)
    document.cookie = `stoaree=;expires=${now.toUTCString()};path=/`;
    return window.location.reload();
}

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
            <NavLink className="text" to="/"> <div onClick={this.deleteCookie}>Sign out</div> </NavLink>
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
