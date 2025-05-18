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
    labelFont: this.props.labelFont,
    timerBold: this.props.timerBold,
    labelBold: this.props.labelBold,
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

  renderElements = (ele, i) => {
    const { selected } = this.state;
    const selectedDiv = selected === i ? "element-div-active" : "";
    const selectedText = selected === i ? "element-text-active" : "";
    return (
      <div className={"element-list"} onClick={() => this.onClickElement(i)}>
        <div className={"element-list-text " + selectedText}>{ele.text}</div>
        <div className={"element-list-div " + selectedDiv} style={{ backgroundColor: ele.color }}></div>
      </div>
    );
  };
  onChange = (e) => {
    const cases = this.props.case || 1;
    this.setState({ [e.target.name]: parseInt(e.target.value) }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  render() {
    const { elements, selected, timerFont, labelFont, timerBold, labelBold } = this.state;
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
            <Info text="Select font size for Timer" />
          </div>
          <input type="number" name="timerFont" max="100" className="form-control" value={timerFont} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Label text Font*
            <Info text="Select font size for Timer label" />
          </div>
          <input type="number" name="labelFont" max="100" className="form-control" value={labelFont} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Timer Text Boldness*
            <Info text="Select font weight for Timer" />
          </div>
          <input type="number" min="200" max="900" step="100" name="timerBold" className="form-control" value={timerBold} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Label Text Boldness*
            <Info text="Select font weight for Timer label" />
          </div>
          <input type="number" min="200" max="900" step="100" name="labelBold" className="form-control" value={labelBold} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
