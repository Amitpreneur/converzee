import React, { Component } from "react";
export default class Timer extends Component {
  state = {
    campaignName: this.props.campaignName,
    redirectUrl: this.props.redirectUrl
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">Timer*</div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
