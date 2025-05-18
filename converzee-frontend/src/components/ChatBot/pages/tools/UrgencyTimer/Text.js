import React, { Component } from "react";
// import Editor from "../../../comman/Editor";
import Util from "../../../Util";
export default class Text extends Component {
  state = {
    HH: this.props.toolData.HH,
    MM: this.props.toolData.MM,
    SS: this.props.toolData.SS,
    timerText: this.props.timerText,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { HH, MM, SS, timerText } = nextProps;
      this.setState({ HH, MM, SS, timerText });
    }
  }

  onChange = (value) => {
    this.setState({ timerText: value }, () => {
      const { DD, HH, MM, SS, timerText } = this.state;
      const obj = {};
      Object.assign(obj, { timerLabel: { DD, HH, MM, SS }, timerText });
      this.props.onChange(1, obj);
    });
  };

  onLabelChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { DD, HH, MM, SS, timerText } = this.state;
      const obj = {};
      Object.assign(obj, { timerLabel: { DD, HH, MM, SS }, timerText });
      this.props.onChange(1, obj);
    });
  };

  componentWillUnmount() {
    const { DD, HH, MM, SS, timerText } = this.state;
    const obj = {};
    Object.assign(obj, { timerLabel: { DD, HH, MM, SS }, timerText });
    this.props.onChange(1, obj);
  }

  render() {
    const { timerText, HH, MM, SS } = this.state;
    return (
      <div>
        <div className="row">
          <div className="label-text">Timer Label Text*</div>
          <div className="col-md-12" style={{ display: "flex" }}>
            <div className="col-3">
              <input type="text" placeholder="Hours" min={0} max="60" className="form-control" value={HH} name="HH" onChange={this.onLabelChange} />
            </div>
            <div className="col-3">
              <input type="text" placeholder="Minutes" min={0} max="60" className="form-control" value={MM} name="MM" onChange={this.onLabelChange} />
            </div>
            <div className="col-3">
              <input type="text" placeholder="Seconds" min={0} max="60" className="form-control" value={SS} name="SS" onChange={this.onLabelChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
