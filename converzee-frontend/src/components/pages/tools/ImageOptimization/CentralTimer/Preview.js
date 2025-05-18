import React, { Component } from "react";
import { getcolor } from "../../../Util";
import "./Preview.css";
import FlipClock from "../../../comman/FlipClock";
export default class Preview extends Component {
  state = {
    millsecond: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
    endtime: new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000),
  };
  intervalHandler = null;
  initializeClock = (endtime) => {
    if (this.intervalHandler) clearInterval(this.intervalHandler);
    this.updateClock(endtime);
    this.intervalHandler = setInterval(this.updateClock, 1000);
  };

  componentDidMount() {
    //this.setState({ endtime: new Date(Date.parse(this.props.timer.endDateTime)) });

    this.setTimer();
  }

  setTimer(nextProps = null) {
    const { DD, HH, MM, SS } = nextProps ? nextProps.timer : this.props.timer;
    const newtimerType = nextProps ? nextProps.timer.timerType : this.props.timer.timerType;
    if (newtimerType !== "DATE_AND_TIME_BASED") {
      let time = new Date();
      time.setDate(time.getDate() + parseInt(DD));
      time.setHours(time.getHours() + parseInt(HH));
      time.setMinutes(time.getMinutes() + parseInt(MM));
      time.setSeconds(time.getSeconds() + parseInt(SS));
      this.setState({ endtime: time }, () => {
        this.initializeClock(this.state.endtime);
      });
    } else {
      const time = nextProps ? nextProps.timer.endDateTime : this.props.timer.endDateTime;
      this.setState({ endtime: new Date(Date.parse(time)) }, () => {
        this.initializeClock(this.state.endtime);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setTimer(nextProps);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  updateClock = () => {
    var t = getTimeRemaining(this.state.endtime);
    this.setState({ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds });
    if (t.total <= 0) {
      clearInterval(this.intervalHandler);
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  getColor = (key) => {
    return getcolor(this.props.STYLE.elements, key);
  };

  getLabelStyle = () => {
    const color = this.getColor("centralTimerLabel");
    const backgroundColor = ""; //this.getColor("highlightBackground");
    if (this.props.layout == 2) return { color: color, backgroundColor: backgroundColor, fontSize: parseInt(this.props.STYLE.timerLabelFont) };
    else if (this.props.layout == 1) return { color: color, fontSize: parseInt(this.props.STYLE.timerLabelFont) };
    else return { color: this.getColor("centralTimerLabel"), backgroundColor: this.getColor("highlight") };
  };

  getTimerStyle = () => {
    const color = this.getColor("centralTimer");
    const backgroundColor = this.getColor("highlight");
    if (this.props.layout == 2 || this.props.layout == 3) return { color: color, backgroundColor: backgroundColor, fontSize: parseInt(this.props.STYLE.timerFont) };
    else return { color: color, fontSize: parseInt(this.props.STYLE.timerFont) };
  };

  getLabelStyleTemp() {
    const color = this.getColor("centralTimer");
    const backgroundColor = this.getColor("highlight");
    if (this.props.layout == 2) return { color: color, backgroundColor: backgroundColor, fontSize: parseInt(this.props.STYLE.timerFont) };
    else return { color: color, fontSize: parseInt(this.props.STYLE.timerFont) };
  }

  getTemplate = () => {
    const layout = this.props.layout;
    const labelStyle = this.getLabelStyle();
    const timerStyle = this.getTimerStyle();
    let { days, hours, minutes, seconds } = this.state;
    days = ("0" + days).slice(-2);
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    const { DD = "Days", HH = "Hours", MM = "Mintues", SS = "Second" } = this.props.TEXT; //.timerLabel;
    if (layout == 2) {
      return (
        <div id="clockdiv" style={this.getLabelStyleTemp()}>
          <div className="objdivTimer">
            <span className="days" style={timerStyle}>
              {days}
            </span>
            <div style={labelStyle} className="smalltext">
              {DD}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="hours" style={timerStyle}>
              {hours}
            </span>
            <div style={labelStyle} className="smalltext">
              {HH}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="minutes" style={timerStyle}>
              {minutes}
            </span>
            <div style={labelStyle} className="smalltext">
              {MM}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="seconds" style={timerStyle}>
              {seconds}
            </span>
            <div style={labelStyle} className="smalltext">
              {SS}
            </div>
          </div>
        </div>
      );
    } else if (layout == 1) {
      return (
        <div id="clockdiv" style={this.getLabelStyleTemp()}>
          <div className="objdivTimer">
            <span className="days" style={timerStyle}>
              {days}
            </span>
            <div style={labelStyle} className="smalltext">
              {DD}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="hours" style={timerStyle}>
              {hours}
            </span>
            <div style={labelStyle} className="smalltext">
              {HH}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="minutes" style={timerStyle}>
              {minutes}
            </span>
            <div style={labelStyle} className="smalltext">
              {MM}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="seconds" style={timerStyle}>
              {seconds}
            </span>
            <div style={labelStyle} className="smalltext">
              {SS}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="clockdiv" style={this.getLabelStyleTemp()}>
          <div className="objdivTimer">
            <span className="days" style={timerStyle}>
              {days}
            </span>
            <div style={labelStyle} className="smalltext">
              {DD}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="hours" style={timerStyle}>
              {hours}
            </span>
            <div style={labelStyle} className="smalltext">
              {HH}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="minutes" style={timerStyle}>
              {minutes}
            </span>
            <div style={labelStyle} className="smalltext">
              {MM}
            </div>
          </div>
          <div className="objdivTimer">
            <span className="seconds" style={timerStyle}>
              {seconds}
            </span>
            <div style={labelStyle} className="smalltext">
              {SS}
            </div>
          </div>
        </div>
      );
    }
    //else if (layout == 2) {
    // } else if (layout == 3) {
    // } else if (layout == 4) {
    //   return (
    //     <div id="clockdiv" style={timerStyle}>
    //       <div className="objdivTimer">
    //         <span className="days" style={timerStyle}>
    //           {days}
    //         </span>
    //         <div style={labelStyle} className="smalltext">
    //           {DD}
    //         </div>
    //       </div>
    //       <div className="objdivTimer">
    //         <span className="hours" style={timerStyle}>
    //           {hours}
    //         </span>
    //         <div style={labelStyle} className="smalltext">
    //           {HH}
    //         </div>
    //       </div>
    //       <div className="objdivTimer">
    //         <span className="minutes" style={timerStyle}>
    //           {minutes}
    //         </span>
    //         <div style={labelStyle} className="smalltext">
    //           {MM}
    //         </div>
    //       </div>
    //       <div className="objdivTimer">
    //         <span className="seconds" style={timerStyle}>
    //           {seconds}
    //         </span>
    //         <div style={labelStyle} className="smalltext">
    //           {SS}
    //         </div>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return <FlipClock timer={20000} />;
    // }
  };

  render() {
    // const { isStop, millsecond } = this.state;
    // const style = this.getStyle();
    const layout = this.props.layout;
    let { days, hours, minutes, seconds } = this.state;
    return (
      <center>
        {/* <div className="previewPortal"><Countdown date={Date.now() + millsecond} /></div> */}
        <div className="previewPortal" style={{ backgroundColor: "#fcfcfc00", left: layout == 5 ? "15%" : "" }}>
         {/* { (days == 0 && hours == 0 && minutes == 0 && seconds == 0) ? null : */}
          <center>
            <div dangerouslySetInnerHTML={{ __html: this.props.TEXT.timerText }}></div>
          </center>
          {/* } */}
          {this.getTemplate()}
        </div>
      </center>
    );
  }
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
