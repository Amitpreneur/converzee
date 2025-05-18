import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { ColorSelector } from "../layout/LayoutSelector";
import Uploader from "../comman/Uploader";
import { Switch } from "antd";
export default class Style extends Component {
  state = {
    style: this.props.style,
    bgImg: this.props.bgImg,
    isBGIMG: this.props.isBGIMG,
    selectedIndex: 0,
    count: 0,
  };

  onColorChange = (value) => {
    const { style, selectedIndex, count } = this.state;
    if (selectedIndex === 3) {
      this.setState({ bgImg: value.hex }, () => {
        this.props.onChange({ bgImg: this.state.bgImg });
      });
    } else {
      style[selectedIndex].value = value.hex;
      this.setState({ count: count + 1 }, () => {
        this.props.onChange({ style: this.state.style });
      });
    }
  };

  onColorBoxClick = (index) => {
    this.setState({ selectedIndex: index });
  };

  componentWillUnmount() {
    this.props.onChange({ style: this.state.style });
  }

  onUploadDone = (image) => {
    this.setState({ bgImg: image.image }, () => {
      this.props.onChange({ bgImg: this.state.bgImg });
    });
  };

  onToggle = () => {
    this.setState({ isBGIMG: !this.state.isBGIMG, selectedIndex: 0 }, () => {
      this.props.onChange({ isBGIMG: this.state.isBGIMG });
    });
  };

  onReset = () => {
    this.setState({ bgImg: "" }, () => {
      this.props.onChange({ bgImg: this.state.bgImg });
    });
  };

  render() {
    const { style, selectedIndex, isBGIMG, bgImg } = this.state;
    const props = {
      onUploadDone: this.onUploadDone,
    };
    return (
      <div className="row">
        {this.props.layout === 2 ? (
          <div className="col-12">
            Use Background Color Or Image <Switch className="m-2" onChange={this.onToggle} size="small" defaultChecked={isBGIMG} />
          </div>
        ) : null}
        <div className="col-4">
          {style.map((e, i) => (
            <ColorSelector showName={true} {...e} selectedIndex={selectedIndex} onClick={this.onColorBoxClick} index={i} key={i} />
          ))}
          {/* {!isBGIMG && this.props.layout === 2 ? (
            <ColorSelector showName={true} name={"Mat Background"} id={"bgImg"} value={bgImg} selectedIndex={selectedIndex} onClick={this.onColorBoxClick} index={3} key={3} />
          ) : null} */}
        </div>
        <div className="col-8">
          <SketchPicker defaultValue="#452135" color={selectedIndex === 3 && this.props.layout === 2 && !isBGIMG ? bgImg : style[selectedIndex].value} onChangeComplete={this.onColorChange} />
        </div>
        {isBGIMG ? (
          <div className="col-12 ">
            <Uploader {...props} onReset={this.onReset} />
          </div>
        ) : null}
      </div>
    );
  }
}
