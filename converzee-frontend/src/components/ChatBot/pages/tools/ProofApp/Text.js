import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import { Switch } from "antd";
export default class Text extends Component {
  state = {
    text: this.props.text,
    subText: this.props.subText
  };

  onChange = (value) => {
    console.log(value);
    
    // this.setState({ [e.target.name]: value }, () => {
    //   this.props.onChange(1, this.state[e.target.name]);
    // });
  };

  render() {
    console.log('this.props', this.props);
    
    const { text, subText } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Text*</div>
          <input className="form-control" type="text" name="text" value={text} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <div className="label-text">Sub Text*</div>
          <input className="form-control" type="text" name="subText" value={subText} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
