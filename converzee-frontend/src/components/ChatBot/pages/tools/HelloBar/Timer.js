import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import Datetime from "react-datetime";
import moment from "moment";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";

export default class Timer extends Component {
  _timerType = [
    { label: "Date and Time Based", value: "DATE_AND_TIME_BASED" },
    { label: "Cookie Based", value: "COOKIE_BASED" },
    { label: "Ever green", value: "EVERGREEN" },
  ];
  // _endDateTime = [{ label: "A", value: "A" }, { label: "B", value: "B" }, { label: "C", value: "C" }, { label: "D", value: "D" }];
  _timeZone = Util.getTimeZoneList();
  _whenTimeExp = [
    { label: "Hide the timer", value: "hide" },
    { label: "Redirect the page", value: "redirect" },
    { label: "Show static central time as 00:00", value: "static" },
  ];

  state = {
    timerType: this.props.timerType,
    endDateTime: this.props.endDateTime,
    timeZone: this.props.timeZone,
    whenTimeExp: this.props.whenTimeExp,
  };
  onDropDownChange1 = (value) => {
    const { cases } = this.props;
    this.setState({ timerType: value });
    this.props.onChange(cases, this.state);
  };
  onDropDownChange2 = (value) => {
    const { cases } = this.props;
    const newValu = value.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ endDateTime: newValu });
    this.props.onChange(cases, this.state);
  };
  onDropDownChange3 = (value) => {
    const { cases } = this.props;
    this.setState({ timeZone: value });
    this.props.onChange(cases, this.state);
  };
  onDropDownChange4 = (value) => {
    const { cases } = this.props;
    this.setState({ whenTimeExp: value });
    this.props.onChange(cases, this.state);
  };
  onChange = (e) => {
    const { cases } = this.props;
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(cases, this.state);
  };
  onTextChange = (ctaText) => {
    const { cases } = this.props;
    this.setState({ ctaText });
    this.props.onChange(cases, this.state);
  };

  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state);
  }

  render() {
    const { timerType, endDateTime, timeZone, whenTimeExp } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">
                Timer Type*
                <Info text="Select timer type to complete action" />
              </div>
              <DropDown options={this._timerType} onChange={this.onDropDownChange1} value={timerType} class="dropdown-style" style={{ width: "" }} />
            </div>
            <div className="form-element">
              <div className="label-text">
                End Date and Time* <Info text="date and time when timer expair" />
              </div>
              <Datetime defaultValue={moment(endDateTime)} onChange={this.onDropDownChange2} />
              {/* <DropDown options={this._endDateTime} onChange={this.onDropDownChange2} value={endDateTime} class="dropdown-style" style={{ width: "" }} /> */}
            </div>
            <div className="form-element">
              <div className="label-text">
                Time Zone* <Info text="Select time zone " />
              </div>
              <DropDown options={this._timeZone} onChange={this.onDropDownChange3} value={timeZone} class="dropdown-style" style={{ width: "" }} />
            </div>
            {timerType!== 'EVERGREEN' ?<div className="form-element">
              <div className="label-text">
                When Time Expires* <Info text="Action when timer expair" />
              </div>
              {/* <input type="text" name="whenTimeExp" className="form-control" value={whenTimeExp} onChange={this.onChange} /> */}
              <DropDown options={this._whenTimeExp} onChange={this.onDropDownChange4} value={whenTimeExp} class="dropdown-style" style={{ width: "" }} />
            </div>: null}
          </div>
        </center>
      </div>
    );
  }
}
