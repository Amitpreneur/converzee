import React, { Component } from "react";
import { SketchPicker } from "react-color";

import "react-color-picker/index.css";
import Switch1 from "../../../comman/Switch";
export default class Style extends Component {
  state = {
    elements: this.props.elements,
    switchElement: this.props.switchElement,
    selected: this.props.selected
  };

  onClickElement = i => {
    const cases = this.props.case || 1;
    this.setState({ selected: i });
    this.props.onChange(cases, this.state);
  };

  componentWillUnmount() {
    const cases = this.props.case || 1;
    this.props.onChange(cases, this.state);
  }

  onColorChange = color => {
    const cases = this.props.case || 1;
    const { elements, selected } = this.state;
    elements[selected].color = color.hex;
    this.setState({ elements }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onChange = value => {
    const cases = this.props.case || 1;
    this.setState({ switchElement: value }, () => {
      this.props.onChange(cases, this.state);
    });
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
  render() {
    const { elements, selected, switchElement } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="row">
              <div className="col-md-12" style={{ paddingBottom: "5px" }}>
                <div className="form-element">
                  <div className="label-text">Autoplay*</div>
                  <Switch1 onChange={this.onChange} isChecked={switchElement} />
                </div>
              </div>
              {/* <div className="col-md-6">
                <SketchPicker defaultValue="#452135" color={elements[selected].color} onChangeComplete={this.onColorChange} />
              </div> */}
              {/* <div className="col-md-6">{elements.map(this.renderElements)}</div> */}
            </div>
          </div>
        </center>
      </div>
    );
  }
}
