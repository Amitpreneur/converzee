import React, { Component } from "react";
import Util from "../../../Util";
export default class Number extends Component {
  state = {
    spent: this.props.spent,
    revenue: this.props.revenue,
    offerpayout: this.props.offerpayout,
    costperclick: this.props.costperclick,
    conversion: this.props.conversion
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { spent, revenue, offerpayout, costperclick, conversion } = nextProps;
      this.setState({ spent, revenue, offerpayout, costperclick, conversion });
    }
  }

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { spent, revenue, offerpayout, costperclick, conversion } = this.state;
    return (
      <div>
        <center>
          <div style={{ padding: "20px" }}>
            <div className="row col-md-12 list-container">
              <div className="col-9">
                <div className="label-text">How much you spent on the campaign so far?*</div>
                <div className="label-text-subLabel">Sum up all the amount you spent on the campaign since you started it.</div>
              </div>
              <div className="col-3">
                <div className="form-element">
                  <input type="number" name="spent" className="form-control" value={spent} onChange={this.onChange} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row col-md-12 list-container">
              <div className="col-9">
                <div className="label-text">How much you got back from the campaign so far(revenue)?*</div>
                <div className="label-text-subLabel">Look at the total you earned on the aff network stats for the campaign offer.</div>
              </div>
              <div className="col-3">
                <div className="form-element">
                  <input type="number" name="revenue" className="form-control" value={revenue} onChange={this.onChange} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row col-md-12 list-container">
              <div className="col-9">
                <div className="label-text">How much you get from a conversion(offer payout)?*</div>
                <div className="label-text-subLabel">Last payout value from your network, per completed conversion.</div>
              </div>
              <div className="col-3">
                <div className="form-element">
                  <input type="number" name="offerpayout" className="form-control" value={offerpayout} onChange={this.onChange} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row col-md-12 list-container">
              <div className="col-9">
                <div className="label-text">Your current CPC(cost per click)*</div>
                <div className="label-text-subLabel">Most recent CPC value on the traffic source.</div>
              </div>
              <div className="col-3">
                <div className="form-element">
                  <input type="number" name="costperclick" className="form-control" value={costperclick} onChange={this.onChange} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row col-md-12 list-container">
              <div className="col-9">
                <div className="label-text">Your current Conversion Rate %(clicks > conversion)*</div>
                <div className="label-text-subLabel">
                  If your tracking doesn't show this(is NOT landing page visitor > offer page conversion rate) you can calculate it by dividing the conversions count by total number of clicks * 100.
                </div>
              </div>
              <div className="col-3">
                <div className="form-element">
                  <input type="number" name="conversion" className="form-control" value={conversion} onChange={this.onChange} />
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
