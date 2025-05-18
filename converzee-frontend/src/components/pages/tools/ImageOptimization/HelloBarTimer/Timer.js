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
    redirectUrl: this.props.redirectUrl,
    DD: this.props.DD,
    HH: this.props.HH,
    MM: this.props.MM,
    SS: this.props.SS,
  };
  onDropDownChange1 = (value) => {
    const { cases } = this.props;
    this.setState({ timerType: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange2 = (value) => {
    const { cases } = this.props;
    value.set({ second: 0 });
    const newValu = value.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ endDateTime: newValu }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange3 = (value) => {
    const { cases } = this.props;
    this.setState({ timeZone: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange4 = (value) => {
    const { cases } = this.props;
    this.setState({ whenTimeExp: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onChange = (e) => {
    const { cases } = this.props;
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onTextChange = (ctaText) => {
    const { cases } = this.props;
    this.setState({ ctaText }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  onTimerChange = (e) => {
    const value = e.target.value ? e.target.value : 0;
    this.setState({ [e.target.name]: value }, () => {
      const cases = this.props.cases || 3;
      this.props.onChange(cases, this.state);
    });
  };

  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state);
  }

  render() {
    const { timerType, endDateTime, timeZone, whenTimeExp, redirectUrl, DD = 0, HH = 0, MM = 0, SS = 0 } = this.state;
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
          <DropDown options={this._timerType} onChange={this.onDropDownChange1} value={timerType} class="dropdown-style" style={{ width: "" }} />
        </div>
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              End Date and Time* <Info text="Select your end date & time of timer" />
            </div>
            <Datetime inputProps={inputProps} defaultValue={moment(endDateTime)} onChange={this.onDropDownChange2} />
          </div>
        ) : null}
        {timerType !== "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              Timer* <Info text="Enter your time in hour, minute and second whenever you want to stop your timer" />
            </div>
            {/* <div className="col-12" style={{ display: "flex" }}>
              <div className="col-3">DD*</div>
              <div className="col-3">HH*</div>
              <div className="col-3">MM*</div>
              <div className="col-3">SS*</div>
            </div> */}
            <div className="row">
              <div className="col-3">
                <span>DD*</span>
                <input type="number" min={0} max={30} className="form-control" autoComplete="off" value={DD} name="DD" onChange={this.onTimerChange} />
              </div>
              <div className="col-3">
                <span>HH*</span>
                <input type="number" min={0} max={24} className="form-control" autoComplete="off" value={HH} name="HH" onChange={this.onTimerChange} />
              </div>
              <div className="col-3">
                <span>MM*</span>
                <input type="number" min={0} max={60} className="form-control" autoComplete="off" value={MM} name="MM" onChange={this.onTimerChange} />
              </div>
              <div className="col-3">
                <span>SS*</span>
                <input type="number" min={0} max={60} className="form-control" autoComplete="off" value={SS} name="SS" onChange={this.onTimerChange} />
              </div>
            </div>
          </div>
        ) : null}
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">
              Time Zone* <Info text="Select timezone to set the timer in particular timezone." />
            </div>
            <DropDown options={this._timeZone} onChange={this.onDropDownChange3} value={timeZone} class="dropdown-style" style={{ width: "" }} />
          </div>
        ) : null}
        {timerType!== 'EVERGREEN' ?<div className="form-element">
          <div className="label-text">
            When Time Expires* <Info text="Select the action when time is up." />
          </div>
          {/* <input type="text" name="whenTimeExp" className="form-control" value={whenTimeExp} onChange={this.onChange} /> */}
          <DropDown options={this._whenTimeExp} onChange={this.onDropDownChange4} value={whenTimeExp} class="dropdown-style" style={{ width: "" }} />
        </div>:null}
        {whenTimeExp === "redirect" ? (
          <div className="form-element">
            <div className="label-text">
              Url* <Info text="Enter the url for redirect the page after the time is up." />
            </div>
            <input type="text" autoComplete="off" name="redirectUrl" className="form-control" value={redirectUrl} onChange={this.onTimerChange}/>
          </div>
        ) : null}
      </div>
    );
  }
}
