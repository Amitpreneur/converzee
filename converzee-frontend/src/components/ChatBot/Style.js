import React, { Component } from "react";
import { SketchPicker } from "react-color";

import "react-color-picker/index.css";
import { Info } from "../comman/Info";
import DropDown from "../comman/DropDown";
export default class Style extends Component {
  options = [
    { label: "Top-left", value: "TL" },
    { label: "Top-Right", value: "TR" },
    { label: "Bottom-left", value: "BL" },
    { label: "Bottom-Right", value: "BR" },
  ];
  state = {
    elements: this.props.elements,
    selected: this.props.selected,
    position: this.props.position,
    // fontSize: this.props.fontSize
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
    this.setState({ elements }, () => {
      this.props.onChange(cases, this.state);
    });
  };

  onFontChange = (e) => {
    const cases = this.props.case || 1;
    this.setState({ [e.target.name]: e.target.value }, () => {
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
  onChangeStyle = (e) => {
    const cases = this.props.case || 1;
    this.setState({ [e.target.name]: parseInt(e.target.value || 0) }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  onDropDownChange = (value) => {
    const cases = this.props.case || 1;
    this.setState({ position: value }, () => {
      this.props.onChange(cases, this.state);
    });
  };
  render() {
    const { elements, selected, position, fontSize } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="row">
              <div className="col-md-6">
                <SketchPicker defaultValue="#452135" color={elements[selected].color} onChangeComplete={this.onColorChange} />
              </div>
              <div className="col-md-6">{elements.map(this.renderElements)}</div>

              {/* <div className="col-12">
                <div className="form-element">
                  <div className="label-text">Font Size*</div>
                  <input type="number" className="form-control" name="fontSize" onChange={this.onFontChange} value={fontSize} />
                </div>
              </div> */}
            </div>
          </div>
        </center>
      </div>
    );
  }
}
