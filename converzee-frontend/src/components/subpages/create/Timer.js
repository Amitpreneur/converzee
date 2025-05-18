import React, { Component } from "react";
import DropDown from "../../comman/DropDown";
import Datetime from "react-datetime";
import Util, { dateParser } from "../../Util";
import moment from "moment";

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
    DD: this.props.DD,
    HH: this.props.HH,
    MM: this.props.MM,
    SS: this.props.SS,
    url: this.props.url,
  };
  onDropDownChange1 = (value) => {
    const cases = this.props.case || 3;
    this.setState({ timerType: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange2 = (value) => {
    const cases = this.props.case || 3;
    value.set({ second: 0 });
    const newValu = value.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ endDateTime: newValu }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange3 = (value) => {
    const cases = this.props.case || 3;
    this.setState({ timeZone: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange4 = (value) => {
    const cases = this.props.case || 3;
    this.setState({ whenTimeExp: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onChange = (e) => {
    const cases = this.props.case || 3;
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onTextChange = (ctaText) => {
    const cases = this.props.case || 3;
    this.setState({ ctaText }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  componentWillUnmount() {
    const cases = this.props.case || 3;
    this.props.onChange(cases, this.state);
  }

  onTimerChange = (e) => {
    const value = e.target.value ? e.target.value : 0;
    this.setState({ [e.target.name]: value }, () => {
      const cases = this.props.case || 3;
      this.props.onChange(cases, this.state);
    });
  };

  render() {
    const { timerType, endDateTime, timeZone, whenTimeExp, DD = 0, HH = 0, MM = 0, SS = 0, url } = this.state;
    let inputProps = {
      placeholder: "Select Date & Time",
      autoComplete: "off",
      readOnly: true
    };

    return (
      <div>
        <div className="form-element">
          <div className="label-text">Timer Type*</div>
          <DropDown options={this._timerType} onChange={this.onDropDownChange1} value={timerType} class="dropdown-style" style={{ width: "" }} />
        </div>
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">End Date and Time*</div>
            <Datetime inputProps={inputProps} defaultValue={moment(endDateTime)} onChange={this.onDropDownChange2}/>
          </div>
        ) : null}
        {timerType !== "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">Timer*</div>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-3">DD*</div>
              <div className="col-3">HH*</div>
              <div className="col-3">MM*</div>
              <div className="col-3">SS*</div>
            </div>
            <div className="row">
              <div className="col-md-12" style={{ display: "flex" }}>
                <div className="col-3">
                  <input type="number" min={0} max={30} className="form-control" value={DD} name="DD" onChange={this.onTimerChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={24} className="form-control" value={HH} name="HH" onChange={this.onTimerChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={60} className="form-control" value={MM} name="MM" onChange={this.onTimerChange} />
                </div>
                <div className="col-3">
                  <input type="number" min={0} max={60} className="form-control" value={SS} name="SS" onChange={this.onTimerChange} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {timerType === "DATE_AND_TIME_BASED" ? (
          <div className="form-element">
            <div className="label-text">Time Zone*</div>
            <DropDown options={this._timeZone} onChange={this.onDropDownChange3} value={timeZone} class="dropdown-style" style={{ width: "" }} />
          </div>
        ) : null}
        {timerType!== 'EVERGREEN'?<div className="form-element">
          <div className="label-text">When Time Expires*</div>
          <DropDown options={this._whenTimeExp} onChange={this.onDropDownChange4} value={whenTimeExp} class="dropdown-style" style={{ width: "" }} />
        </div>: null}
        {whenTimeExp === "redirect" ? (
          <div className="form-element">
            <div className="label-text">Url*</div>
            <input type="text" name="url" className="form-control" autoComplete="off" value={url} onChange={this.onTimerChange} />
          </div>
        ) : null}
      </div>
    );
  }
}
