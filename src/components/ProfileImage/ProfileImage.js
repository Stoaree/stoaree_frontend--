import React from 'react';

// Default Image
import defaultImage from './../../assets/default_profile_image.png';

// CSS
import './ProfileImage.css'

class ProfileImage extends React.Component {

  imageDisplay = (state) => {
    
    if (this.props.avatarURL === undefined) {
      return (
        <div>
          <img src={defaultImage} alt="DefaultImage" />
        </div>
      )
    } else {
      return (
        <div>
          <img src={this.props.avatarURL} alt="profileImage" /> 
        </div>
      )
    }
  }
  
  render() {
    return (
      <div>
        <div>
          {this.imageDisplay()}
        </div>
      </div>
    )
  }
};

export default ProfileImage;