import React, { Component } from "react";
import Editor from "../comman/Editor";
import { Switch } from "antd";
export default class Text extends Component {
  state = {
    text: this.props.text,
    noThanks: this.props.noThanks,
    subTitle: this.props.subTitle,
    isNameInput: this.props.isNameInput,
  };
  onChange = (value) => {
    this.setState({ text: value }, () => {
      this.props.onChange({ text: this.state.text });
    });
  };

  onChange1 = (value) => {
    this.setState({ subTitle: value }, () => {
      this.props.onChange({ subTitle: this.state.subTitle });
    });
  };
  onChange2 = (value) => {
    this.setState({ noThanks: value }, () => {
      this.props.onChange({ noThanks: this.state.noThanks });
    });
  };

  onToggle = () => {
    this.setState({ isNameInput: !this.state.isNameInput }, () => {
      this.props.onChange({ isNameInput: this.state.isNameInput });
    });
  };

  render() {
    const { text, subTitle, noThanks, isNameInput } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Text*</div>
          <Editor value={text} name="text" onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">Name Input*</div>
          <Switch className="m-2" onChange={this.onToggle} size="small" defaultChecked={isNameInput} />
        </div>
        {this.props.layout === 2 ? (
          <React.Fragment>
            <div className="form-element">
              <div className="label-text">Sub Title*</div>
              <Editor value={subTitle} name="subTitle" onChange={this.onChange1} />
            </div>
            <div className="form-element">
              <div className="label-text">No Thanks*</div>
              <Editor value={noThanks} name="noThanks" onChange={this.onChange2} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
