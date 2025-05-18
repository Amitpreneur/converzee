import React, { Component } from "react";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Timer extends Component {
  state = {
    firstVib: this.props.firstVib,
    pause: this.props.pause,
    secondVib: this.props.secondVib,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { firstVib, pause, secondVib } = nextProps;
      this.setState({ firstVib, pause, secondVib });
    }
  }

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { firstVib, pause, secondVib } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Duration of 1st vibration *<Info text="Enter the duration timing of 1st vibration." />
          </div>
          <input type="number" name="firstVib" min="0" className="form-control" value={firstVib} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Pause between first and second vibration *<Info text="Enter the duration timing between first and second vibration." />
          </div>
          <input type="number" name="pause" min="0" className="form-control" value={pause} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Duration of 2nd vibration *<Info text="Enter the duration timing of Second vibration duration" />
          </div>
          <input type="number" name="secondVib" min="0" className="form-control" value={secondVib} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
