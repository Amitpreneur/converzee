import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import { Switch } from "antd";
export default class Text extends Component {
  state = {
    text: this.props.text
  };

  onChange = (value) => {
    this.setState({ text: value }, () => {
      this.props.onChange(1, this.state.text);
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Text*</div>
          <Editor value={text} name="text" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
