import React, { Component } from "react";
import DropDown from "../comman/DropDown";
import Datetime from "react-datetime";
import moment from "moment";
import Util from "../Util";
import { Info } from "../comman/Info";

export default class Timer extends Component {
  _timerType = [
    { label: "Date and Time Based", value: "DATE_AND_TIME_BASED" },
    { label: "Cookie Based", value: "COOKIE_BASED" },
    { label: "Ever green", value: "EVERGREEN" },
  ];
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
    postExpiryAction: this.props.postExpiryAction,
    redirectUrl: this.props.redirectUrl,
    days: this.props.days,
    hours: this.props.hours,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  };

  onDropDownChange = (value, name) => {
    if (name == "TIMETYPE") {
      this.setState({ timerType: value }, () => {
        this.props.onChange({ timerType: this.state.timerType });
      });
    } else if (name == "TIMEZONE") {
      this.setState({ timeZone: value }, () => {
        this.props.onChange({ timeZone: this.state.timeZone });
      });
    } else {
      this.setState({ postExpiryAction: value }, () => {
        this.props.onChange({ postExpiryAction: this.state.postExpiryAction });
      });
    }
  };

  onTimerChange = (value) => {
    value.set({ second: 0 });
    const newValu = value.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ endDateTime: newValu }, () => {
      this.props.onChange({ endDateTime: this.state.endDateTime });
    });
  };

  onTimeDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.props.onChange({ [name]: value });
    });
  };

  render() {
    const { timerType, endDateTime, timeZone, postExpiryAction, redirectUrl, days = 0, hours = 0, minutes = 0, seconds = 0 } = this.state;
    let inputProps = {
      placeholder: "Select Date & Time",
      autoComplete: "off",
      readOnly: true
    };

    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Timer Type* <Info text="Select timer type for different action" />
          </div>
          <DropDown options={this._timerType} onChange={(value) => this.onDropDownChange(value, "TIMETYPE")} value={timerType} class="dropdown-style" style={{ width: "" }} />
        </div>
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              End Date and Time* <Info text="Select your end date & time of timer" />
            </div>
            <Datetime inputProps={inputProps} defaultValue={moment(endDateTime)} onChange={this.onTimerChange} />
          </div>
        ) : null}
        {timerType !== "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              Timer* <Info text="Enter your time in hour, minute and second whenever you want to stop your timer" />
            </div>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-3">DD*</div>
              <div className="col-3">HH*</div>
              <div className="col-3">MM*</div>
              <div className="col-3">SS*</div>
            </div>
            <div className="row">
              <div className="col-md-12" style={{ display: "flex" }}>
                <div className="col-3">
                  <input type="number" min={0} max={30} className="form-control" value={days} name="days" onChange={this.onTimeDataChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={24} className="form-control" value={hours} name="hours" onChange={this.onTimeDataChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={60} className="form-control" value={minutes} name="minutes" onChange={this.onTimeDataChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={60} className="form-control" value={seconds} name="seconds" onChange={this.onTimeDataChange} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              Time Zone* <Info text="Select timezone to set the timer in particular timezone." />
            </div>
            <DropDown options={this._timeZone} onChange={(value) => this.onDropDownChange(value, "TIMEZONE")} value={timeZone} class="dropdown-style" style={{ width: "" }} />
          </div>
        ) : null}
        {timerType!== 'EVERGREEN' ? <div className="form-element">
          <div className="label-text">
            When Time Expires* <Info text="Select the action when time is up." />
          </div>
          {/* <input type="text" name="whenTimeExp" className="form-control" value={whenTimeExp} onChange={this.onChange} /> */}
          <DropDown options={this._whenTimeExp} onChange={(value) => this.onDropDownChange(value, "ACTION")} value={postExpiryAction} class="dropdown-style" style={{ width: "" }} />
        </div> : null}
        {postExpiryAction === "redirect" ? (
          <div className="form-element">
            <div className="label-text">
              Url* <Info text="Enter the url for redirect the page after the time is up." />
            </div>
            <input type="text" name="redirectUrl" className="form-control" value={redirectUrl} onChange={this.onTimeDataChange} />
          </div>
        ) : null}
      </div>
    );
  }
}
