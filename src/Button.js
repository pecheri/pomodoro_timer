import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <div className="play-buttons">
        <button onClick={this.props.playBtn} id="start_stop">
          START/STOP
        </button>
        <button onClick={this.props.reset} id="reset">
          RESET
        </button>
      </div>
    );
  }
}