import React, { Component } from "react";
import Util from "../../../Util";
import Switch1 from "../../../comman/Switch";
export default class Video extends Component {
  state = { url: this.props.url, videoType: this.props.videoType };
  componentWillUnmount() {
    this.props.onChange(2, this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ url: nextProps.url, videoType: nextProps.videoType });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChange(2, this.state);
    });
  };

  onCheckBoxClick = (value) => {
    this.setState({ videoType: value }, () => {
      this.props.onChange(2, this.state);
    });
  };
  render() {
    const { url, videoType } = this.state;
    const switchElement = this.props.switchElement;

    console.log("url",url);
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-12 cz_radio_parent">
              <div className="cz_custom_radio" onClick={() => this.onCheckBoxClick("youtube")}>
                <label>
                  <input class="form-check-input" type="radio" name="videoUrlType" value="youtube" checked={videoType === "youtube"} />
                  <span class="form-check-label">Youtube</span>
                </label>
              </div>
              <div className="cz_custom_radio" onClick={() => this.onCheckBoxClick("viemo")}>
                <label>
                  <input class="form-check-input " type="radio" name="videoUrlType" value="viemo" checked={videoType === "viemo"} />
                  <span class="form-check-label">Viemo</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginBottom:'30px'}}> 
          <div className="form-element">
            <div className="label-text">URL*</div>
            <input type="text" name="url" className="form-control" value={url} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <div className="form-element">
            <div className="label-text">Autoplay*</div>
            <Switch1 onChange={this.props.onVideoChange} isChecked={switchElement} />
          </div>
        </div>
      </div>
    );
  }
}
