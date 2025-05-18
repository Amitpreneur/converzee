import React, { Component } from "react";
import Util from "../../../Util";
import UrlInput from "../../../comman/UrlInput";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    // campaignName: this.props.campaignName,
    redirectUrl: this.props.redirectUrl,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ redirectUrl: nextProps.redirectUrl });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(()=> {
      this.props.onChange(1, this.state);
    }, 100);
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { redirectUrl } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Redirect URL*
            <Info text="URL when user click on backbutton" />
          </div>
          <UrlInput name="redirectUrl" value={redirectUrl} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
