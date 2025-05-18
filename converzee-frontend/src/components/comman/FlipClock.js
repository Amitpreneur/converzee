import React, { Component } from "react";
import { FlipClock } from "reactflipclock-js";

export default class FlipClick extends Component {
  render() {
    return (
      <div className="App">
        <FlipClock time={this.props.timer} clockFace="DailyCounter" />
      </div>
    );
  }
}
