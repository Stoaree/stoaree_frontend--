import React from 'react';
import UserDataDisplay from './../../components/UserDataDisplay/UserDataDisplay.js';
import { getUserData } from './../../services/getUserData.js';

// Components
import ProfileImage from './../../components/ProfileImage/ProfileImage.js';
import ImageUpload from './../../services/imageUpload.js';

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
  
  render () {
    return (

      <div>
        <h1> {this.state.userData.displayName} </h1>
        <div> 
          <ProfileImage avatarURL={this.state.avatarURL}/>
          <ImageUpload  userId={this.state.userData._id} />
        </div>

        <UserDataDisplay userData={this.state.userData} stories={this.state.stories} avatarURL={this.state.avatarURL} />    
      </div>
    )
  }
};

export default ProfilePage;