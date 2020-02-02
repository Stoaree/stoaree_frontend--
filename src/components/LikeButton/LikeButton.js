import React from "react";
import { connect } from "react-redux";
import { addLike } from "../../services/postLike";

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    const { story, currentUser } = this.props;

    // TODO: How do we fetch the currentUser if we don't know the user ID
    // The redux store does not persist after refreshes so currentUser keeps becoming undefined

    this.state = {
      likes: story.likes,
      bookmarks: currentUser === undefined ? [] : currentUser.bookmarks,
      storyId: story._id
    };

    // This binding is necessary to make `this` work in the callback
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  onLikeClick() {
    const { storyId, bookmarks, likes } = this.state;

    addLike(storyId)
      .then(resp => {
        console.log("Yay the like succeeded");
        // Optimistic state update
        // Its pretty safe to assume that since this API call succeeded that the likes/bookmarks were updated
        // We will get the authoritive state on refresh
        let newCount = this.state.likes + 1;
        this.setState({
          likes: newCount,
          bookmarks: [...bookmarks, storyId]
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.storyId);
    console.log(this.state.bookmarks);
    console.log(this.state.likes);

    const { storyId, bookmarks, likes } = this.state;
    const { currentUser } = this.props;

    if (currentUser == undefined || bookmarks.includes(storyId)) {
      return <div>{likes}</div>;
    } else {
      return <button onClick={this.onLikeClick}>Like</button>;
    }
  }
}

export default connect(mapStateToProps)(LikeButton);
