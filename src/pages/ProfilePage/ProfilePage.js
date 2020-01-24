import React from 'react';
import UserDataDisplay from './../../components/UserDataDisplay/UserDataDisplay.js';
import { getUserData } from './../../services/getUserData.js';

class ProfilePage extends React.Component {

  state = {
    userData: '',
    stories: []
  }

  componentDidMount() {
    getUserData(this.props.match.params.id).then((response) => {
      const stories = response.data.stories.map((story) => {
        return story
      })
      this.setState({ userData: response.data, stories: stories });
    }) 
  };

  render () {
    return (
      <div>
        <h1> Profile Page </h1> 
        <UserDataDisplay userData={this.state.userData} stories={this.state.stories} />
      </div>
    )
  }
};

export default ProfilePage;