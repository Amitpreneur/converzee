import React, { Component } from "react";
import Editor from "../comman/Editor";
import { Switch } from "antd";
export default class Text extends Component {
  state = {
    text: this.props.text,
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

  onToggle = () => {
    this.setState({ isNameInput: !this.state.isNameInput }, () => {
      this.props.onChange({ isNameInput: this.state.isNameInput });
    });
  };

  render() {
    const { text, subTitle, isNameInput } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Text*</div>
          <Editor value={text} name="text" onChange={this.onChange} />
        </div>
        {(this.props.layout != 3 && this.props.layout != 4 )? (
        <div className="form-element">
          <div className="label-text">Name Input*</div>
          <Switch className="m-2" onChange={this.onToggle} size="small" defaultChecked={isNameInput} />
        </div>):null
        }
        {this.props.layout === 2 ? (
          <React.Fragment>
            <div className="form-element">
              <div className="label-text">Sub Title*</div>
              <Editor value={subTitle} name="subTitle" onChange={this.onChange1} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
