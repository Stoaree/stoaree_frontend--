import React from 'react';

// CSS
import './ProfileImage.css'

class ProfileImage extends React.Component {
  
  render() {
    return (
      <div>
        <div>
          {console.log(this.props.userData.avatarURL)}

          <img src={this.props.userData.avatarURL} alt="profileImage" className="profile-image" />
        </div>
      </div>
    )
  }
};

export default ProfileImage;