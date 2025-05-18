import React, { Component } from "react";
import Editor from "../comman/Editor";
import DropDown from "../comman/DropDown";
import UrlInput from "../comman/UrlInput";
import { Info } from "../comman/Info";
export default class CTA extends Component {
  options =  [
    { label: "Redirect", value: "redirect" },
    { label: "Redirect in new tab", value: "redirectInNewTab" }
  ];

  state = {
    cta: this.props.cta,
    ctaAction: this.props.ctaAction,
    ctaRedirectUrl: this.props.ctaRedirectUrl,
    layout: this.props.layout,
    options: this.options
  };

  componentDidMount() {
    if(this.state.layout !== (5 || 6 || 7)) {
      this.options.push({ label: "Scroll", value: "scroll" }); 
      this.setState({ options: this.options });
    }
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({ cta: value }, () => {
      this.props.onChange({ cta: this.state.cta });
    });
  };

  onCtaAction = (value) => {
    this.setState({ ctaAction: value }, () => {
      this.props.onChange({ ctaAction: this.state.ctaAction });
    });
  };

  onActionChange = (e) => {
    this.setState({ ctaRedirectUrl: e.target.value }, () => {
      this.props.onChange({ ctaRedirectUrl: this.state.ctaRedirectUrl });
    });
  };

  render() {
    const { cta, ctaAction, ctaRedirectUrl, options } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">CTA*</div>
          <input type="text" className="form-control" name="cta" value={cta} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            CTA Action* <Info text="Select CTA action type" />
          </div>
          <DropDown options={options} onChange={this.onCtaAction} value={ctaAction} class="dropdown-style" style={{ width: "" }} />
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
          <input type="text" name="redirectUrl" className="form-control" value={ctaRedirectUrl} onChange={this.onActionChange} />
        </div>
      </div>
    );
  }
}
