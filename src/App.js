import React from 'react';
import Counter from './Counter';
import Timer from './Timer';
import Button from './Button';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: 25,
      second: 0,
      breakLength: 5,
      sessionLength: 25,
      startStop: "stop",
      timerType: "Session"
    };

    this.reset = this.reset.bind(this);
    this.breakClickHandler = this.breakClickHandler.bind(this);
    this.sessionClickHandler = this.sessionClickHandler.bind(this);
    this.counterControl = this.counterControl.bind(this);
    this.playClickHandler = this.playClickHandler.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timerTypeSwitch = this.timerTypeSwitch.bind(this);
    this.alarm = this.alarm.bind(this);
  }

  reset() {
    this.setState({
      minute: 25,
      second: 0,
      breakLength: 5,
      sessionLength: 25,
      startStop: "stop",
      timerType: "Session"
    });
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  breakClickHandler(event) {
    const btnValue = event.currentTarget.value;
    this.counterControl(btnValue, "breakLength", this.state.breakLength);
  }

  sessionClickHandler(event) {
    this.counterControl(
      event.currentTarget.value,
      "sessionLength",
      this.state.sessionLength
    );
  }

  counterControl(btnValue, stateTag, stateValue) {
    if (this.state.startStop === "start") {
      return;
    }
    if (btnValue === "-") {
      if (stateValue > 1) {
        if (
          this.state.timerType === "Session" &&
          stateTag === "sessionLength"
        ) {
          this.setState({
            [stateTag]: stateValue - 1,
            minute: stateValue - 1,
            second: 0
          });
        } else if (
          this.state.timerType === "Break" &&
          stateTag === "breakLength"
        ) {
          this.setState({
            [stateTag]: stateValue - 1,
            minute: stateValue - 1,
            second: 0
          });
        } else {
          this.setState({
            [stateTag]: stateValue - 1
          });
        }
      }
    } else if (btnValue === "+") {
      if (stateValue < 60) {
        if (
          this.state.timerType === "Session" &&
          stateTag === "sessionLength"
        ) {
          this.setState({
            [stateTag]: stateValue + 1,
            minute: stateValue + 1,
            second: 0
          });
        } else if (
          this.state.timerType === "Break" &&
          stateTag === "breakLength"
        ) {
          this.setState({
            [stateTag]: stateValue + 1,
            minute: stateValue + 1,
            second: 0
          });
        } else {
          this.setState({
            [stateTag]: stateValue + 1
          });
        }
      }
    }
  }

  playClickHandler() {
    if (this.state.startStop === "stop") {
      this.setState({
        startStop: "start"
      });
    }
    if (this.state.startStop === "start") {
      this.setState({
        startStop: "stop"
      });
    }
    this.countDown();
  }

  countDown() {
    const timerStart = setInterval(() => {
      if (this.state.startStop === "stop") {
        clearInterval(timerStart);
      }
      if (this.state.startStop === "start") {
        if (this.state.second === 0) {
          if (this.state.minute === 0) {
            this.alarm();
            this.timerTypeSwitch();
            console.log(this.state.timerType);
          } else {
            this.setState({
              second: 59,
              minute: this.state.minute - 1
            });
          }
        } else {
          this.setState({
            second: this.state.second - 1
          });
        }
      }
    }, 1000);
  }

  timerTypeSwitch() {
    if (this.state.timerType === "Session") {
      this.setState({
        minute: this.state.breakLength,
        second: 0,
        timerType: "Break"
      });
    } else if (this.state.timerType === "Break") {
      this.setState({
        minute: this.state.sessionLength,
        second: 0,
        timerType: "Session"
      });
    }
  }

  alarm() {
    const sound = document.getElementById("beep");
    sound.play();
  }

  render() {
    return (
      <div className="container">
        <h1>PoMoDoRo TIMER</h1>
        <div className="counters">
          <Counter
            titleId="break-label"
            title="Break Length"
            minId="break-decrement"
            addId="break-increment"
            lengthId="break-length"
            length={this.state.breakLength}
            onClick={this.breakClickHandler}
          />
          <Counter
            titleId="session-label"
            title="Session Length"
            minId="session-decrement"
            addId="session-increment"
            lengthId="session-length"
            length={this.state.sessionLength}
            onClick={this.sessionClickHandler}
          />
        </div>
        <Timer
          minute={this.state.minute}
          second={this.state.second}
          timerType={this.state.timerType}
        />
        <Button reset={this.reset} playBtn={this.playClickHandler} />
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}