import React, { Component } from "react";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    campaignName: this.props.campaignName,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { campaignName } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Campaign Name* <Info text="Enter Campaign name " />
          </div>
          <input type="text" name="campaignName" className="form-control" value={campaignName} onChange={this.onChange} autoComplete="off" />
        </div>
      </div>
    );
  }
}
