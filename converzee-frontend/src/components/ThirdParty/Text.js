import React, { Component } from "react";
import { Info } from "../comman/Info";
export default class Text extends Component {
  state = {
    url: this.props.url,
    title: this.props.title,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
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
        <div style={{ width: "80%", padding: "20px" }}>
          <div className="form-element">
            <div className="label-text">Url*</div>
            <input type="text" name="url" placeholder="Enter Url" className="form-control" value={url} onChange={this.onChange} />
          </div>
          <div className="form-element">
            <div className="label-text">Page Title*</div>
            <input type="text" name="title" placeholder="Enter Page Title" className="form-control" value={title} onChange={this.onChange} />
          </div>
        </div>
      </div>
    );
  }
}
