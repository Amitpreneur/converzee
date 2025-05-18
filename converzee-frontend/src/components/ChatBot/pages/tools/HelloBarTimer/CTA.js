import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import Editor from "../../../comman/Editor";
import { Info } from "../../../comman/Info";
export default class CTA extends Component {
  options = [
    { label: "Redirect", value: "redirect" },
    { label: "Redirect in new tab", value: "redirectInNewTab" },
    { label: "Scroll", value: "scroll" },
  ];
  state = {
    ctaText: this.props.ctaText,
    ctaAction: this.props.ctaAction,
    redirectUrl: this.props.redirectUrl,
  };
  onDropDownChange = (value) => {
    const { cases } = this.props;
    this.setState({ ctaAction: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onChange = (e) => {
    const { cases } = this.props;
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onTextChange = (ctaText) => {
    const { cases } = this.props;
    this.setState({ ctaText }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state);
  }

  render() {
    const { redirectUrl, ctaAction, ctaText, cpCode } = this.state;

    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            CTA Text* <Info text="Action button text" />
          </div>
          <div>
            <Editor value={ctaText} name="textBody" onChange={this.onTextChange} />
          </div>
        </div>
        <div className="form-element">
          <div className="label-text">
            CTA Action* <Info text="Action on click action button" />
          </div>
          <DropDown options={this.options} onChange={this.onDropDownChange} value={ctaAction} class="dropdown-style" style={{ width: "" }} />
        </div>
        <div className="form-element">
          {ctaAction === "scroll" ? (
            <div className="label-text">
              Scroll To* <Info text="Follow Select Scroll Position by bookmark" />
            </div>
          ) : (
            <div className="label-text">
              Redirect URL* <Info text="URL to trigger on action" />
            </div>
          )}
          <input type="text" autoComplete="off" name="redirectUrl" className="form-control" value={redirectUrl} onChange={this.onChange}/>
        </div>
      </div>
    );
  }
}
