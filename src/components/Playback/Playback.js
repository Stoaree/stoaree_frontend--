import React from "react";
import ReactHowler from "react-howler";

class Playback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
    // this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleLoop = this.handleLoop.bind(this);

  }

  // handlePlay(files) {
  //   this.setState({
  //     playing: true,
  //     onend: function() {
  //       this.props.audioFileURL.shift();
  //       if (this.props.audioFileURL > 0) {
  //         // handlePlay(this.props.audioFileURL);
  //       }
  //   }
  //   });
  // }

  handlePause() {
    this.setState({
      playing: false
    });
  }

  handleLoop() {
    this.setState({
      playing: true,
      loop: true,
    });
  }

  render() {
    return (
      <div>
        <ReactHowler
          src={[
            this.props.audioFileURL
          ]}
          // playing={this.props.playing}
          playing={this.props.playing}
          onEnd={() => this.props.nextSound(this.props.index)}
        />
        <button onClick={() => this.props.handlePlay(this.props.index)}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
      </div>
    );
  }
}

export default Playback;
