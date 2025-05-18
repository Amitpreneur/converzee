import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import Editor from "../../../comman/Editor";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class CreateText extends Component {
  options = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];
  state = {
    campaignName: this.props.campaignName || "",
    helloBarPos: this.props.helloBarPos || "",
    textBody: this.props.textBody || "",
    cpCode: this.props.cpCode || "",
    codeText: this.props.codeText || "",
  };
  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { helloBarPos, textBody } = nextProps;
      this.setState({ helloBarPos, textBody });
    }
  }
  onDropDownChange = (value) => {
    const { cases } = this.props;
    this.setState({ helloBarPos: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onChange = (e) => {
    const { cases } = this.props;
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onTextChange = (textBody) => {
    const { cases } = this.props;
    this.setState({ textBody }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state);
  }

  render() {
    const { campaignName, helloBarPos, textBody, cpCode, codeText } = this.state;
    const { layout } = this.props;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Hellobar Text* <Info text="Enter text to show on hello bar." />
          </div>
          <div>
            <Editor value={textBody} name="textBody" onChange={this.onTextChange} />
          </div>
        </div>
        <div className="form-element">
          <div className="label-text">
            Hellobar Position* <Info text="Select position on screen like top or bottom." />
          </div>
          <DropDown options={this.options} onChange={this.onDropDownChange} value={helloBarPos} className="dropdown-style" style={{ width: "" }} />
        </div>
        {layout === 0 ? (
          <React.Fragment>
            <div className="form-element">
              <div className="label-text">
                Coupon Code* <Info text="Enter Coupon code text to be applied." />
              </div>
              <input type="text" name="cpCode" className="form-control" value={cpCode} onChange={this.onChange} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
