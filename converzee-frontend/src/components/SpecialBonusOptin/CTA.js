import React, { Component } from "react";
import Editor from "../comman/Editor";
import DropDown from "../comman/DropDown";
export default class CTA extends Component {
  state = {
    cta: this.props.cta,
    position: this.props.position,
  };

  onChange = (value) => {
    this.setState({ cta: value }, () => {
      this.props.onChange({ cta: this.state.cta });
    });
  };

  onPositionChange = (value) => {
    this.setState({ position: value }, () => {
      this.props.onChange({ position: this.state.position });
    });
  };

  render() {
    const { cta, position } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">CTA*</div>
          <Editor value={cta} name="text" onChange={this.onChange} />
        </div>
        {this.props.layout !== 2 ? (
          <div className="form-element">
            <div className="label-text">Position*</div>
            <DropDown
              options={[
                { label: "TOP", value: "TOP" },
                { label: "BOTTOM", value: "BOTTOM" },
              ]}
              onChange={this.onPositionChange}
              value={position}
              class="dropdown-style"
              style={{ width: "" }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
