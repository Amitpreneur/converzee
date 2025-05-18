import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { ColorSelector } from "../layout/LayoutSelector";
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

  render() {
    const { style, selectedIndex } = this.state;
    return (
      <div className="row">
        <div className="col-4">
          {style.map((e, i) => (
            <ColorSelector showName={true} {...e} selectedIndex={selectedIndex} onClick={this.onColorBoxClick} index={i} key={i} />
          ))}
        </div>
        <div className="col-8">
          <SketchPicker defaultValue="#452135" presetColors={["TRANSPARENT"]} color={style[selectedIndex].value} onChangeComplete={this.onColorChange} />
        </div>
      </div>
    );
  }
}
