import React from "react";

// Component
import ProfileImage from "./../ProfileImage/ProfileImage.js";

// CSS
import "./Comment.css";

class Comment extends React.Component {
  render() {
    return (
      <div>
        <div className="comment-container">
            <ProfileImage avatarURL={this.props.user.avatarURL} />
            <div className="comment-content-container">
              <h4>{this.props.user.displayName}</h4>
              <p>{this.props.text}</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Comment;

