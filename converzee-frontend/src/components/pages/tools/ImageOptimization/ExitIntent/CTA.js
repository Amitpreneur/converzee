import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import Editor from "../../../comman/Editor";
import UrlInput from "../../../comman/UrlInput";
import { Info } from "../../../comman/Info";
export default class CTA extends Component {
  options = [
    { label: "Redirect", value: "REDIRECT" },
    { label: "Redirect in new tab", value: "redirectInNewTab" },
    { label: "Scroll", value: "scroll" },
  ];
  state = {
    ctaText: this.props.ctaText,
    ctaAction: this.props.ctaAction,
    redirectUrl: this.props.redirectUrl,
  };
  onDropDownChange = (value) => {
    this.setState({ ctaAction: value });
    this.props.onChange({ ctaAction: value });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange({ [e.target.name]: e.target.value });
  };
  onTextChange = (ctaText) => {
    this.setState({ ctaText });
    this.props.onChange({ ctaText: ctaText });
  };

  componentWillUnmount() {
    this.props.onChange({ ctaText: this.state.ctaText, ctaAction: this.state.ctaAction, redirectUrl: this.state.redirectUrl });
  }

  render() {
    const { redirectUrl, ctaAction, ctaText } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            CTA Text*
            <Info text="Enter CTA text" />
          </div>
          <div>
            <Editor value={ctaText} name="textBody" onChange={this.onTextChange} />
          </div>
        </div>
        <div className="form-element">
          <div className="label-text">
            CTA Action*
            <Info text="Select CTA action type" />
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
              Redirect URL* <Info text="Enter URL to trigger on CTA action button" />
            </div>
          )}
          {ctaAction === "scroll" ? (
            <input type="number" name="redirectUrl" className="form-control" value={redirectUrl} onChange={this.onChange} autoComplete="off" />
          ) : (
            <UrlInput name="redirectUrl" value={redirectUrl} onChange={this.onChange} />
          )}
        </div>
      </div>
    );
  }
}
