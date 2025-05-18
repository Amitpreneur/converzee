import React, { Component } from "react";
import DropDown from "../comman/DropDown";
import Editor from "../comman/Editor";
import { Input } from "antd";
export default class Text extends Component {
  state = {
    url: this.props.url,
    footer: this.props.footer,
    title: this.props.title,
  };
  onUrlChange = (e) => {
    this.setState({ url: e.target.value }, () => {
      this.props.onChange(1, this.state);
    });
  };

  onTitleChange = (e) => {
    this.setState({ title: e.target.value }, () => {
      this.props.onChange(1, this.state);
    });
  };

  onFooterChange = (value) => {
    this.setState({ footer: value }, () => {
      this.props.onChange(1, this.state);
    });
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { url, footer, title } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Url*</div>
          <Input name="url" onChange={this.onUrlChange} value={url} />
        </div>
        <div className="form-element">
          <div className="label-text">Title*</div>
          <Input name="title" onChange={this.onTitleChange} value={title} />
        </div>
        <div className="form-element">
          <div className="label-text">Footer Text</div>
          <Editor value={footer} name="textBody" onChange={this.onFooterChange} />
        </div>
      </div>
    );
  }
}
