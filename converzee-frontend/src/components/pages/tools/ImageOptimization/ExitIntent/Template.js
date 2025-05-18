import React, { Component } from "react";
import Uploader from "../../../comman/Uploader";
import { BASE_URL } from "../../../../actions/URLs";
import { parseImgUrl } from "../../../Util";
export default class Template extends Component {
  state = { image: this.props.image };
  componentWillUnmount() {
    this.props.onChange(7, this.state);
  }
  onUploadDone = (image) => {
    this.setState({ image: image });
    this.props.onChange(7, this.state);
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone,
    };
    const { image } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            {image ? (
              <div style={{ padding: "10px" }}>
                <div>
                  <img className="preview-image" src={parseImgUrl(image)} />
                </div>
              </div>
            ) : null}
            <div className="uploadMain">
              <Uploader {...props} />
            </div>
          </div>
        </center>
      </div>
    );
  }
}
