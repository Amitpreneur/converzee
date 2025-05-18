import React, { Component } from "react";
import { SketchPicker } from "react-color";
import Switch1 from "../../../comman/Switch";
import Uploader from "../../../comman/Uploader";
import { parseImgUrl } from "../../../Util";
import "react-color-picker/index.css";
import { Info } from "../../../comman/Info";
import { ColorSelector } from "../../../layout/LayoutSelector";
export default class Style extends Component {
  state = {
    elements: this.props.elements,
    selected: this.props.selected,
    height: this.props.height,
    width: this.props.width,
    isbackGroundImage: this.props.isbackGroundImage,
    backgroundImage: this.props.backgroundImage,
  };

  onUploadDone = (image) => {
    this.setState({ backgroundImage: image.image }, () => {
      const cases = this.props.case || 1;
      this.props.onChange(cases, this.state);
    });
  };

  onClickElement = (i) => {
    const cases = this.props.case || 1;
    this.setState({ selected: i });
    this.props.onChange(cases, this.state);
  };

  componentWillUnmount() {
    const cases = this.props.case || 1;
    this.props.onChange(cases, this.state);
  }

  onColorChange = (color) => {
    const cases = this.props.case || 1;
    const { elements, selected } = this.state;
    elements[selected].color = color.hex;
    this.setState({ elements });
    this.props.onChange(cases, this.state);
  };

  onChangeStyle = (e) => {
    const cases = this.props.case || 1;
    this.setState({ [e.target.name]: parseInt(e.target.value || 0) }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  onBgOptionChange = (isbackGroundImage) => {
    this.setState({ isbackGroundImage }, () => {
      const cases = this.props.case || 1;
      this.props.onChange(cases, this.state);
    });
  };

  onReset = () => {
    this.setState({ backgroundImage: "" }, () => {
      const cases = this.props.case || 1;
      this.props.onChange(cases, this.state);
    });
  };

  render() {
    const { elements, selected, height, width, isbackGroundImage, backgroundImage } = this.state;
    const props = {
      onUploadDone: this.onUploadDone,
    };
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <label>
              Background Image <Info text="Background image for exit entent " />
            </label>
            <Switch1 isChecked={isbackGroundImage} onChange={this.onBgOptionChange} />
          </div>
          {isbackGroundImage ? (
            <div className="col-12">
              <Uploader {...props} onReset={this.onReset} />
            </div>
          ) : null}
          <div className="col-12">
            <div className="row">
              <div className="col-4">
                {elements.map((e, i) => (
                  <ColorSelector {...e} selectedIndex={selected} onClick={this.onClickElement} index={i} key={i} />
                ))}
              </div>
              <div className="col-8">
                <SketchPicker defaultValue="#452135" color={elements[selected].color} onChangeComplete={this.onColorChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 form-element" style={{marginTop:'30px'}}>
            <div className="label-text">
              Height* <Info text="Height of exit intent" />
            </div>
            <input type="number" className="form-control" name="height" value={height} onChange={this.onChangeStyle} />
          </div>
          <div className="col-6 form-element">
            <div className="label-text">
              Width* <Info text="width of exit intent" />
            </div>
            <input type="number" className="form-control" name="width" value={width} onChange={this.onChangeStyle} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
