import React from 'react';

// CSS
import './ProfileImage.css'

class ProfileImage extends React.Component {
  render() {
    return (
      <div>
        <div >
          <img alt="profileImage" className="profile-image" />
        </div>
      </div>
    )
  }
};

export default ProfileImage;