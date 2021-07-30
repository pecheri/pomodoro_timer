import React from 'react';

export default class Counter extends React.Component {
  render() {
    return (
      <div className="counter-container">
        <h5 id={this.props.titleId}>{this.props.title}</h5>
        <div className="counter">
          <button onClick={this.props.onClick} value="-" id={this.props.minId}>
            -
          </button>
          <p id={this.props.lengthId}>{this.props.length}</p>
          <button onClick={this.props.onClick} value="+" id={this.props.addId}>
            +
          </button>
        </div>
      </div>
    );
  }
}