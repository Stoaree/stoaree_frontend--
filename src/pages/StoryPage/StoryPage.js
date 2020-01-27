import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoryShow from "./../../components/StoryShow/StoryShow";

class StoryPage extends React.Component {
  state = {
    story: null
  };

  async componentDidMount() {
    const foundStory = this.props.stories.find(story => {
      return story._id === this.props.match.params.id;
    });
    this.setState({
      story: foundStory
    });
  }

  render() {
    const { story } = this.state;
    console.log(story);
    if (story) {
      return <StoryShow story={story} />;
    } else {
      return null;
    }

    // const { story } = this.state;
    // console.log(story)
    //   return story ? (
    //     <dl>
    //       {" "}
    //       <h1>Story:</h1> <dt>Title:{story.title}</dt>
    //       <dt>Description:{story.description}</dt>
    //       <dt>Tags:{story.tags}</dt>
    //       <dt>
    //         <Link to={"/"}>Home</Link>
    //       </dt>
    //     </dl>
    //   ) : null;
    // }
    // return null;
  }
}

export default StoryPage;
