import React from "react";
import ReactHowler from "react-howler";

class Playback extends React.Component {

  render() {
    return (
      <div>
        <ReactHowler
          src={[this.props.audioFileURL]}
          playing={this.props.playing}
          onEnd={() => this.props.handlePlay(this.props.index + 1)}
        />
      </div>
    );
  }
}

export default Playback;
