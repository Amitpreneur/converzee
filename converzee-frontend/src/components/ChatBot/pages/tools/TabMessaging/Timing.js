import React, { Component } from "react";
import Switch1 from "../../../comman/Switch";
import { Info } from "../../../comman/Info";
import { getPath } from "../../../../actions/URLs";
export default class Timing extends Component {
  state = {
    timeFirstMsg: this.props.timeFirstMsg,
    timeBetweenTwoMsg: this.props.timeBetweenTwoMsg,
    Sound: this.props.SOUND,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange({ [e.target.name]: e.target.value });
  };

  onSoundChange = (Sound) => {
    this.setState({ Sound }, () => {
      this.props.onChange({ SOUND: Sound });
    });
  };

  componentWillUnmount() {
    const { timeFirstMsg, timeBetweenTwoMsg } = this.state;
    this.props.onChange({ timeFirstMsg, timeBetweenTwoMsg });
  }

  render() {
    const { timeFirstMsg, timeBetweenTwoMsg, Sound } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Time for the First Message* <Info text="Enter start time in second" />
          </div>
          <input type="number" name="timeFirstMsg" className="form-control" value={timeFirstMsg} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Time between two messages*
            <Info text="enter time between second sound" />
          </div>
          <input type="number" name="timeBetweenTwoMsg" className="form-control" value={timeBetweenTwoMsg} onChange={this.onChange} />
        </div>
        <div className="form-element" onClick={() => this.onSoundChange(!Sound)}>
          <div className="label-text">
            Sound*
            <Info text="Click Icon to enable or disable sound" />
          </div>
          {Sound ? <i className="fa fa-volume-up sound-icon"></i> : <img className="sound-icon" src={getPath("/asset/mute.svg")} />}
        </div>
      </div>
    );
  }
}
