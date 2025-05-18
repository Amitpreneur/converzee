import React, { Component } from "react";
import Uploader from "../../../comman/Uploader";
import Util, { parseImgUrl } from "../../../Util";
export default class Image extends Component {
  state = { image: this.props.image, disabled: false };

  componentDidMount() {
    this.setState({ image: this.props.image })
  }
  componentWillMount() {
    if (this.props.image !== "") this.state.disabled = true;
  }

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ image: nextProps.image, disabled: true });
    }
  }
  onUploadDone = (imageICON) => {
    let imageName = imageICON.image;
    this.setState({ image: imageName, disabled: true });
    this.props.onChange(5, imageName);
  };

  onReset = () => {
    this.setState({ image: "" }, () => {
      this.props.onChange(5, this.state.image);
    });
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone,
    };
    const { image, disabled } = this.state;
    return (
      <div>
        <div className="col-12" style={{padding:0}}>
          <Uploader {...props} onReset={this.onReset} />
        </div>

        <div className="form-element">
          <div className="label-text">Image*</div>
          <input
            type="text"
            name="image"
            className="form-control"
            value={image}
            onChange={(e) => {
              this.setState({ image: e.target.value });
              this.props.onChange(5, e.target.value);
            }}
            autoComplete="off" 
          />
        </div>
      </div>
    );
  }
}
