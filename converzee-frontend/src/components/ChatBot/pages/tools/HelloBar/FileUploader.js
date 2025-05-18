import React, { Component } from "react";
import Uploader from "../../comman/Uploader";
import { BASE_URL } from "../../../actions/URLs";
import { parseImgUrl } from "../../Util";
export default class FileUploader extends Component {
  state = { file: this.props.file };
  componentWillUnmount() {
    this.props.onChange(7, this.state);
  }
  onUploadDone = fileName => {
    const { file } = this.state;
    file.push(fileName);
    this.setState(file);
    this.props.onChange(7, this.state);
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone
    };
    const { file } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            {file.length ? (
              <div style={{ padding: "10px" }}>
                {file.map(name => (
                  <div>
                    <img className="preview-image" src={parseImgUrl(name.image)} />
                  </div>
                ))}
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
