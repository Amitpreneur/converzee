import React, { Component } from "react";
import { getcolor } from "../../../Util";
import "./Preview.css";
export default class Preview extends Component {
  state = {
    millsecond: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
    //endtime: new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000)
  };
  intervalHandler = null;
  initializeClock = (endtime) => {
    if (this.intervalHandler) clearInterval(this.intervalHandler);
    this.updateClock(endtime);
    this.intervalHandler = setInterval(this.updateClock, 1000);
  };

  getTimeData = () => {
    const timer = new Date();
    timer.setHours(timer.getHours() + parseInt(this.props.TIMER.HH || 0));
    timer.setMinutes(timer.getMinutes() + parseInt(this.props.TIMER.MM || 0));
    timer.setSeconds(timer.getSeconds() + parseInt(this.props.TIMER.SS || 0));
    // timer.setMinutes(timer.getMinutes() + parseInt(50 || 0));
    // timer.setSeconds(timer.getSeconds() + parseInt(50 || 0));
    return timer;
  };

  componentDidMount() {
    this.setState({ endtime: this.getTimeData() });
    this.initializeClock(this.getTimeData());
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
    const backgroundColor = this.getColor("highlightBackground");
    return { color: color, fontWeight: parseInt(this.props.STYLE.labelBold), backgroundColor: "#ffffff00", fontSize: parseInt(this.props.STYLE.labelFont) };
  };

  getTimerStyle = () => {
    const color = this.getColor("timerText");
    const backgroundColor = this.getColor("highlight");
    return { color: color, fontWeight: parseInt(this.props.STYLE.timerBold), backgroundColor: "#ffffff00", fontSize: parseInt(this.props.STYLE.timerFont) };
  };

  render() {
    // const { isStop, millsecond } = this.state;
    // const style = this.getStyle();
    const labelStyle = this.getLabelStyle();
    const timerStyle = this.getTimerStyle();
    const { hours, minutes, seconds } = this.state;
    const { HH, MM, SS } = this.props.toolData;
    return (
      <center>
        {/* <div className="previewPortal"><Countdown date={Date.now() + millsecond} /></div> */}
        <div className="previewPortal" style={{ backgroundColor: "#ffffff00" }}>
          <div className="urgencyMain">
            <div style={timerStyle} className="urgency_timer">
              {hours}
              <div style={labelStyle}>H</div>
            </div>

            <div style={timerStyle} className="urgency_timer">
              {minutes}
              <div style={labelStyle}>M</div>
            </div>
            <div style={timerStyle} className="urgency_timer">
              {seconds}
              <div style={labelStyle}>S</div>
            </div>
          </div>
          {/* <div className="objdivTimer">
              <span class="days" style={timerStyle}>
                {days}
              </span>
              <div style={labelStyle} class="smalltext">
                {DD}
              </div>
            </div> */}
          {/* <div className="objdivTimer">
              <span class="hours" style={timerStyle}>
                {hours}
              </span>
              <div style={labelStyle} class="smalltext">
                {HH}
              </div>
            </div>
            <div className="objdivTimer">
              <span class="minutes" style={timerStyle}>
                {minutes}
              </span>
              <div style={labelStyle} class="smalltext">
                {MM}
              </div>
            </div>
            <div className="objdivTimer">
              <span class="seconds" style={timerStyle}>
                {seconds}
              </span>
              <div style={labelStyle} class="smalltext">
                {SS}
              </div>
            </div> */}
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
