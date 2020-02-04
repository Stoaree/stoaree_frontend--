import React from "react";
import { connect } from "react-redux";
import { addLike } from "../../services/postLike";
import { setCurrentUser } from "../../redux/userReducer";
import Button from "../Button/Button";

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

const mapDispatchToProps = {
  setCurrentUser
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    const { story } = this.props;

    this.state = { likes: story.likes };

    // This binding is necessary to make `this` work in the callback
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  onLikeClick() {
    const { likes } = this.state;
    const { story } = this.props;

    addLike(story._id)
      .then(resp => {
        // Optimistic state update
        // Its pretty safe to assume that since this API call succeeded that the likes/bookmarks were updated
        // We will get the authoritive state on refresh
        let newCount = likes + 1;
        this.setState({
          likes: newCount
        });
        this.props.setCurrentUser(resp);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { likes } = this.state;
    const { story, currentUser } = this.props;

    if (currentUser && !currentUser.bookmarks.includes(story._id)) {
      return <Button onClick={this.onLikeClick}>Like</Button>;
    }
    else {
      return <div>{likes || "0"} Likes</div>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
