import React, { Component } from "react";
import Uploader from "../comman/Uploader";
import Util from "../Util";
export default class SideImage extends Component {
  state = { image: this.props.image };
  componentWillMount() {
    if (this.props.image !== "") this.state.disabled = true;
  }
  componentWillUnmount() {
    this.props.onChange(3, this.state.image);
  }
  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ image: nextProps.image, disabled: true });
    }
  }
  onUploadDone = (imageICON) => {
    this.setState({ image: imageICON.image, disabled: true });
    this.props.onChange(3, imageICON.image);
  };

  onReset = () => {
    this.setState({ image: "" }, () => {
      this.props.onChange(3, this.state.image);
    });
  };

  render() {
    const props = {
      onUploadDone: this.onUploadDone,
    };
    return (
      <div className="col-12">
        <Uploader {...props} onReset={this.onReset} />
      </div>
    );
  }
}
