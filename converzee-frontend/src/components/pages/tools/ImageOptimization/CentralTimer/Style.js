import React, { Component } from "react";
import { SketchPicker } from "react-color";

import "react-color-picker/index.css";
import { Info } from "../../../comman/Info";
import { ColorSelector } from "../../../layout/LayoutSelector";
export default class Style extends Component {
  state = {
    elements: this.props.elements,
    selected: this.props.selected,
    timerFont: this.props.timerFont,
    timerLabelFont: this.props.timerLabelFont,
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

  onChange = (e) => {
    let value = e.target.value;
    if (value > e.target.max) value = e.target.max;
    const cases = this.props.case || 1;
    this.setState({ [e.target.name]: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  render() {
    const { elements, selected, timerFont, timerLabelFont } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-12 order-sm-2">
            {elements.map((e, i) => (
              <ColorSelector {...e} selectedIndex={selected} onClick={this.onClickElement} index={i} key={i} />
            ))}
          </div>
          <div className="col-md-8 col-sm-12">
            <SketchPicker defaultValue="#452135" color={elements[selected].color} onChangeComplete={this.onColorChange} />
          </div>
        </div>
        <div className="form-element">
          <div className="label-text">
            Timer Font*
            <Info text="Select font size for Timer." />
          </div>
          <input type="number" max={50} name="timerFont" min={14} className="form-control" value={timerFont} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Timer Label Font*
            <Info text="Select font size for Timer label and timer's font size keep minimum 14px." />
          </div>
          <input type="number" max={20} name="timerLabelFont" className="form-control" value={timerLabelFont} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
