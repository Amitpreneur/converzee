import React from "react";
import "./TimeCounter.css";
export default class TimeCounter extends React.Component {
  constructor() {
    super();
    let someDate = new Date();
    let numberOfDaysToAdd = 6;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    this.state = { time: {}, seconds: 5000000 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    const difference = +(new Date(this.props.date) || new Date().setHours(5)) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        d: 0,
        h: 0,
        m: 0,
        s: 0,
      };
    }

    return timeLeft;
    // let days = Math.floor(secs / (24 * 60 * 60 * 1000));
    // let divisor_for_hours = secs % 24;
    // let hours = Math.floor(divisor_for_hours / 60);

    // let divisor_for_minutes = secs % (60 * 60);
    // let minutes = Math.floor(divisor_for_minutes / 60);

    // let divisor_for_seconds = divisor_for_minutes % 60;
    // let seconds = Math.ceil(divisor_for_seconds);

    // let obj = {
    //   d: days,
    //   h: hours,
    //   m: minutes,
    //   s: seconds
    // };
    // return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { d, h, m, s } = this.state.time;
    const { timerType, color, textcolor } = this.props;
    const textFontcolor = textcolor ? { color: textcolor } : {};
    return (
      <div>
        {/* m: {this.state.time.m} s: {this.state.time.s} */}
        {timerType == "BOX" ? (
          <div className="hellobartimer1-timer" style={textcolor ? { color: textcolor } : {}}>
            <li className="blockTimer" style={{ backgroundColor: color, color: textcolor }}>
              {d}<div>Days</div>
            </li>
            <li className="blockTimer" style={{ backgroundColor: color, color: textcolor }}>
              {h}<div>Hours</div>
            </li>
            <li className="blockTimer" style={{ backgroundColor: color, color: textcolor }}>
              {m}<div>Minutes</div>
            </li>
            <li className="blockTimer" style={{ backgroundColor: color, color: textcolor }}>
              {s} <div>Seconds</div>
            </li>
          </div>
        ) : (
          <div className="hellobartimer1-timer">
            <li style={textFontcolor}>
              {d}
              <br />
              <span>Days</span>
            </li>
            <li style={textFontcolor}>
              {h}
              <br />
              <span>Hours</span>
            </li>
            <li style={textFontcolor}>
              {m}
              <br />
              <span>Minutes</span>
            </li>
            <li style={textFontcolor}>
              {s}
              <br />
              <span>Seconds</span>
            </li>
          </div>
        )}
      </div>
    );
  }
}
