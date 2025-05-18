import React, { Component } from "react";
export default class Result extends Component {
  state = {
    campaignName: this.props.campaignName,
    timerText: this.props.timerText
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  calculation = () => {};

  render() {
    return (
      <div>
        <center>
          <div style={{ padding: "20px" }}>
            Currently a conversion costs you $2.00, with a profit per conversion of $1.50 (ROI: 75% ) Earnings per click (EPC): $0.35(0.15) Your conversions are profitable. The campaign has great
            potential, keep optimizing and scale it. To maintain conversion profitability you have to keep CPC below 0.35 or increase the conversion rate over 6%
            <hr />
            In order to break-even your total revenue needs to match the total investment on this campaign(including what you've spent so far). You need 40 more clicks(worth $8) at 0.20 CPC with a
            conversion rate of 10 % to bring a revenue of $14 and equal the total investment of $28
          </div>
        </center>
      </div>
    );
  }
}
