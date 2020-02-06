import React from 'react';
import UserDataDisplay from './../../components/UserDataDisplay/UserDataDisplay.js';
import { getUserData } from './../../services/getUserData.js';
import { NavLink } from "react-router-dom";

// Components
import ProfileImage from './../../components/ProfileImage/ProfileImage.js';

// CSS
import "./ProfilePage.css";

class ProfilePage extends React.Component {

  state = {
    userData: '',
    stories: [],
    avatarURL: ''
  }

  componentDidMount() {

    getUserData(this.props.match.params.id).then((response) => {
      const stories = response.data.stories.map((story) => {
        return story
      })
      this.setState({ userData: response.data, stories: stories, avatarURL: response.data.avatarURL });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (

      <div className="profile-page-container">
        <div className="profile-page-image-name-edit-container">
          <ProfileImage avatarURL={this.state.avatarURL} className="profile-page-image"/>
          <h1> {this.state.userData.displayName} </h1>
          <NavLink to="/profile/update"> <i className="fas fa-user-edit user-edit-icon"></i> </NavLink>
        </div>
        <UserDataDisplay userData={this.state.userData} stories={this.state.stories} avatarURL={this.state.avatarURL} />
      </div>
    )
  }
};

export default ProfilePage;