import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import Editor from "../../../comman/Editor";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    url: this.props.url,
    title: this.props.title,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, ()=> {
      this.props.onChange(1, this.state);
    });
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { url, title } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Url*
            <Info text="Enter Url for Offer Iframe " />
          </div>
          <input type="text" name="url" className="form-control" value={url} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            Page Title*
            <Info text="Title of page " />
          </div>
          <input type="text" name="title" className="form-control" value={title} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
