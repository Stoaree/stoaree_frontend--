import React from 'react';

// Default Image
import defaultImage from './../../assets/default_profile_image.png';

// CSS
import './ProfileImage.css'

class ProfileImage extends React.Component {

  imageDisplay = (state) => {

    if (this.props.avatarURL === undefined) {
      return (
        <img src={defaultImage} alt="DefaultImage" className="profile-image" />
      )
    } else {
      return (
        <img src={this.props.avatarURL} alt="profileImage" className="profile-image" />
      )
    }
  }

  render() {
    return (
      <div className="profile-image-div">
        {this.imageDisplay()}
      </div>
    )
  }
};

export default ProfileImage;