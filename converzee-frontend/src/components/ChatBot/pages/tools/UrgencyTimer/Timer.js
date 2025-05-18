import React, { Component } from "react";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Timer extends Component {
  state = {
    HH: this.props.TIMER.HH,
    MM: this.props.TIMER.MM,
    SS: this.props.TIMER.SS,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(2, this.state);
    });
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected && !Number.isInteger(nextProps.TIMER.SS)) {
      Util.isRedirected = false;
      const { HH = 0, MM = 0, SS = 0 } = nextProps.TIMER;
      this.setState({ HH, MM, SS });
    }
  }

  componentWillUnmount() {
    this.props.onChange(2, this.state);
  }

  render() {
    const { HH, MM, SS } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Timer*</div>
          <div className="row">
            <div className="col-4">
              HH*
              <Info text="enter Hour" />
            </div>
            <div className="col-4">
              MM* <Info text="Enter Minutes" />
            </div>
            <div className="col-4">
              SS* <Info text="Enter Second" />
            </div>
          </div>
          <div className="row">
              <div className="col-4">
                <input type="number" min="0" max="24" className="form-control" value={HH} name="HH" onChange={this.onChange} />
              </div>
              <div className="col-4">
                <input type="number" min="0" max="59" className="form-control" value={MM} name="MM" onChange={this.onChange} />
              </div>
              <div className="col-4">
                <input type="number" min="0" max="59" className="form-control" value={SS} name="SS" onChange={this.onChange} />
              </div>
          </div>
        </div>
      </div>
    );
  }
}
