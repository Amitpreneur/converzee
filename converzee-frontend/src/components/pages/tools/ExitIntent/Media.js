import React, { Component } from "react";
import Uploader from "../../../comman/Uploader";
import { parseImgUrl } from "../../../Util";
import Switch1 from "../../../comman/Switch";
export default class Media extends Component {
  state = { url: this.props.url, mediaType: this.props.mediaType };
  componentWillUnmount() {
    this.props.onChange({ url: this.state.url, mediaType: this.state.mediaType });
  }
  onUploadDone = (image) => {
    this.setState({ url: image.image }, () => {
      this.props.onChange({ url: this.state.url });
    });
  };
  onChange = (e) => {
    this.setState({ url: e.target.value }, () => {
      this.props.onChange({ url: this.state.url });
    });
  };
  isImg = () => {
    return this.props.mediaType === "IMAGE";
  };
  onReset = () => {
    this.setState({ url: "" }, () => {
      this.props.onChange({ url: this.state.url });
    });
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone,
    };
    const { url } = this.state;
    const { mediaType, isInput } = this.props;
    return (
      <div>
        <div className="col-12" style={{padding:0}}>
          {!isInput ? <label>{mediaType === "IMAGE" ? "Image" : "Video"}</label> : null}
          {!isInput ? (
            <Switch1
              isChecked={this.props.mediaType === "IMAGE"}
              onChange={(status) => {
                this.setState({ mediaType: status ? "IMAGE" : "VIDEO" }, () => {
                  this.props.onChange({ mediaType: this.state.mediaType });
                });
              }}
            />
          ) : null}
        </div>
        {!isInput ? (
          <React.Fragment>
            <div className="col-12" style={mediaType === "IMAGE" ? { padding:0 } : { padding:0 , pointerEvents: "none" }}>
              <Uploader {...props} onReset={this.onReset} />
            </div>
            <div className="form-element">
              <div className="label-text">URL*</div>
              <input type="text" name="url" className="form-control" value={url} onChange={this.onChange} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
