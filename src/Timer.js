import React from 'react';

export default class Timer extends React.Component {
  render() {
    return (
      <div className="timer">
        <h5 id="timer-label">{this.props.timerType}</h5>
        <p id="time-left">
          {this.props.minute < 10 ? `0${this.props.minute}` : this.props.minute}
          :
          {this.props.second < 10 ? `0${this.props.second}` : this.props.second}
        </p>
      </div>
    );
  }
}