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
    campaignName: this.props.campaignName,
    helloBarPos: this.props.helloBarPos,
    textBody: this.props.textBody,
    cpCode: this.props.cpCode,
    codeText: this.props.codeText,
  };
  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      const { helloBarPos, textBody, cpCode, codeText } = nextProps;
      this.setState({ helloBarPos, textBody, cpCode, codeText });
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
            Hellobar Text*
            <Info text="Hello bar text to display" />
          </div>
          <div >
            <Editor value={textBody} name="textBody" onChange={this.onTextChange} />
          </div>
        </div>
        <div className="form-element">
          <div className="label-text">
            Hellobar Position*
            <Info text="Hello Bar position" />
          </div>
          <DropDown options={this.options} onChange={this.onDropDownChange} value={helloBarPos} class="dropdown-style" style={{ width: "" }} />
        </div>
        {layout === 0 ? (
          <div className="form-element">
            <div className="label-text">
              Coupon Code*
              <Info text="Coupon Code to copy" />
            </div>
            <input type="text" name="cpCode" className="form-control" value={cpCode} onChange={this.onChange} />
          </div>
        ) : null}
      </div>
    );
  }
}
