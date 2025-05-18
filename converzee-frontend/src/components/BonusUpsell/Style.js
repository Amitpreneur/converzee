import React, { Component } from "react";
import { SketchPicker } from "react-color";

import "react-color-picker/index.css";
import { ColorSelector } from "../layout/LayoutSelector";
export default class Style extends Component {
  state = {
    elements: this.props.elements,
    selected: this.props.selected,
  };

  onClickElement = (i) => {
    const { cases } = this.props;
    this.setState({ selected: i });
    this.props.onChange(cases, this.state);
  };

  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state);
  }

  onColorChange = (color) => {
    const { cases } = this.props;
    const { elements, selected } = this.state;
    elements[selected].color = color.hex;
    this.setState({ elements });
    this.props.onChange(cases, this.state);
  };

  renderElements = (ele, i) => {
    const { selected } = this.state;
    const selectedDiv = selected === i ? "element-div-active" : "";
    const selectedText = selected === i ? "element-text-active" : "";
    const { layout } = this.props;
    let dTemp = false;
    if (layout !== 0 && ele.name == "arrowBackground") dTemp = true;
    if (layout !== 2 && ele.name == "timerBox") dTemp = true;
    return (
      <div className={"element-list"} style={dTemp ? { display: "none" } : {}} onClick={() => this.onClickElement(i)}>
        <div className={"element-list-text " + selectedText}>{ele.text}</div>
        <div className={"element-list-div " + selectedDiv} style={{ backgroundColor: ele.color }}></div>
      </div>
    );
  };
  render() {
    const { elements, selected } = this.state;
    return (
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
    );
  }
}
