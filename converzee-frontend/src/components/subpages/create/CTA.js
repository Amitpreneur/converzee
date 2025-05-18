import React, { Component } from "react";
import DropDown from "../../comman/DropDown";
import Editor from "../../comman/Editor";
export default class CTA extends Component {
  options = [{ label: "Redirect", value: "REDIRECT" }, { label: "Redirect in new tab", value: "redirectInNewTab" }, { label: "Scroll", value: "SCROLL" }];
  state = {
    ctaText: this.props.ctaText,
    ctaAction: this.props.ctaAction,
    redirectUrl: this.props.redirectUrl
  };
  onDropDownChange = value => {
    const cases = this.props.case;
    this.setState({ ctaAction: value });
    this.props.onChange(cases, this.state);
  };
  onChange = e => {
    const cases = this.props.case;
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(cases, this.state);
  };
  onTextChange = ctaText => {
    const cases = this.props.case;
    this.setState({ ctaText });
    this.props.onChange(cases, this.state);
  };

  componentWillUnmount() {
    const cases = this.props.case;
    this.props.onChange(cases, this.state);
  }

  render() {
    const { redirectUrl, ctaAction, ctaText } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">CTA Text*</div>
              <div>
                <Editor value={ctaText} name="textBody" onChange={this.onTextChange} />
              </div>
            </div>
            <div className="form-element">
              <div className="label-text">CTA Action*</div>
              <DropDown options={this.options} onChange={this.onDropDownChange} value={ctaAction} class="dropdown-style" style={{ width: "" }} />
            </div>
            <div className="form-element">
              <div className="label-text">Redirect URL*</div>
              <input type="text" name="redirectUrl" className="form-control" value={redirectUrl} onChange={this.onChange} />
            </div>
          </div>
        </center>
      </div>
    );
  }
}
