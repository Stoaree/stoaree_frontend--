import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Comment.css";

class Comment extends React.Component {
  render() {
    return (
      <div>
        <div className="storyDescription">
            <p>comment:</p>
            <p>{this.props.user.displayName}</p>
            <p>{this.props.text}</p>
          <p className="descriptionText"> </p>
        </div>
      </div>
    );
  }
}

export default Comment;

