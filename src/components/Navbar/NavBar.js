import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/userReducer"

// Components
import SearchBar from "./../SearchBar/SearchBar.js";

// Services
import axiosAPI from "../../api/stoareeAPI.js";

// CSS
import "./../../css/main.css";

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

const mapDispatchToProps = {
  setCurrentUser
}

class Navbar extends React.Component {

  state = {
    dataIsLoaded: false
  }

  componentDidMount() {
    if (typeof (this.props.currentUser) === "undefined") {
      axiosAPI.get("/users/current").then(res => {
        this.setState({ dataIsLoaded: true });
        this.props.setCurrentUser(res.data);
      }).catch(err => {
        this.setState({ dataIsLoaded: true });
        this.props.setCurrentUser(null);
      });
    }
  }

  deleteCookie = () => {
    const now = new Date()
    now.setTime(now.getTime() - 1)
    document.cookie = `stoaree=;expires=${now.toUTCString()};path=/`;
    this.props.setCurrentUser(null);
    return window.location.reload();
  }

  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="navbar-div">
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="user-div">
            <NavLink to={`/profile/${currentUser._id}`} className="text">
              {currentUser.avatarURL && <img src={currentUser.avatarURL} alt="avatar" />}
              {currentUser.displayName}
            </NavLink>
          </div>
          <div className="text-div">
            <NavLink to="/" className="text" exact={true}> Home </NavLink>
            <NavLink to="/stories/new" className="text">Create your story</NavLink>
            <NavLink className="text" to="/"> <div onClick={this.deleteCookie}>Sign out</div></NavLink>
          </div>
        </div>
      );
    } else if (this.state.dataIsLoaded) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
