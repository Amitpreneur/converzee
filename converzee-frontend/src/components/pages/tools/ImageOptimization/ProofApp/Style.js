import React, { Component } from "react";
import { SketchPicker } from "react-color";
import "react-color-picker/index.css";
import { ColorSelector } from "../../../layout/LayoutSelector";
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
