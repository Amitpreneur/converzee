import React, { Component } from "react";
export default class Text extends Component {
  options = [
    { name: "Purchase", value: "User"},
    { name: "Subscriber", value: "AppData"}
  ]

  state = {
    text: this.props.text,
    subText: this.props.subText,
    timeFirstUser: this.props.timeFirstUser,
    timeBetweenTwoUser: this.props.timeBetweenTwoUser
  };

  onChange = (e) => {
    const { cases } = this.props;
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  render() {
    const { text, subText, timeFirstUser, timeBetweenTwoUser } = this.state;
    return (
      <div>
        {/* <div className="form-element">
          <div className="label-text">Choose Display Data Type*</div>
          <select className="form-control" placeholder="Select Type" name="displayData" defaultValue={displayData} onChange={this.onChange}>
            {
              this.options.map((opt, i) => {
                return <option key={i} value={opt.value}>{opt.name}</option>
              })
            }
          </select>
        </div> */}
        <div className="form-element">
          <div className="label-text">Text*</div>
          <input className="form-control" type="text" name="text" value={text} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">Sub Text*</div>
          <input className="form-control" type="text" name="subText" value={subText} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">Time for the First Message*</div>
          <input className="form-control" type="number" min={0} name="timeFirstUser" value={timeFirstUser} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">Time between two Messages*</div>
          <input className="form-control" type="number" min={0} name="timeBetweenTwoUser" value={timeBetweenTwoUser} onChange={this.onChange} />
        </div>
        {/* <div className="form-element">
          <div className="label-text">Count data from last X hours*</div>
          <input className="form-control" type="number" name="hours" min="1" max="24" value={hours} onChange={this.onChange} />
        </div> */}
      </div>
    );
  }
}
