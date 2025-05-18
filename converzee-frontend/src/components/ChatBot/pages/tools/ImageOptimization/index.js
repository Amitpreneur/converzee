import React, { Component } from "react";
import Uploader from "../../../comman/Uploader";
import Util, { parseImgUrl } from "../../../Util";
export default class ImageOptimization extends Component {
  state = { image: this.props.image };
  componentWillUnmount() {
    // this.props.onChange(2, this.state.image);
  }
  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ image: nextProps.image });
    }
  }
  onUploadDone = (imageICON) => {
    this.setState({ image: imageICON.image });
    // this.props.onChange(2, imageICON.image);
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone,
      multiple: true,
    };
    const { image } = this.state;
    return (
      <div className="container">
        {/* {openPopUp ? <ScriptPopup {...scriptPorps} /> : null}
        {preview ? (
          <Preview
            {...this.state}
            closePopup={() => {
              this.setState({ preview: !preview });
            }}
          />
        ) : null} */}
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button"></div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "35px" }}>
          <div className="col">
            <center>
              <div className="create-center-main">
                <div style={{ width: "80%", padding: "20px" }}>
                  <div className="uploadMain">
                    <Uploader {...props} />
                  </div>
                </div>
              </div>
            </center>
          </div>
          <div className="col col-lg-2">{/* <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} /> */}</div>
        </div>
      </div>
    );
  }
}
