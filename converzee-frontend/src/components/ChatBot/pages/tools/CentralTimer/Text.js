import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    DD: "Days",
    HH: "Hours",
    MM: "Mintues",
    SS: "Second",
    timerText: this.props.timerText,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { DD, HH, MM, SS, timerText } = nextProps;
      this.setState({ DD, HH, MM, SS, timerText });
    }
  }

  onChange = (value) => {
    this.setState({ timerText: value }, () => {
      const { DD, HH, MM, SS, timerText } = this.state;
      const obj = { DD, HH, MM, SS };
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
    const { timerText, DD, HH, MM, SS } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Timer Text*
            <Info text="Timer text to display as view " />
          </div>
          <Editor value={timerText} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
