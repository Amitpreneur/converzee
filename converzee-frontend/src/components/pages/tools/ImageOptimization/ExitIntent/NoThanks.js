import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import { Info } from "../../../comman/Info";
export default class NoThanks extends Component {
  state = {
    noThanksText: this.props.noThanksText,
  };

  onChange = (e) => {
    this.setState({ noThanksText: e });
    this.props.onChange({ noThanksText: e });
  };

  componentWillUnmount() {
    this.props.onChange({ noThanksText: this.state.noThanksText });
  }

  render() {
    const { noThanksText } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Text*
            <Info text="Enter No-thanks Text to display no thanks feature." />
          </div>
          <Editor value={noThanksText} name="noThanksText" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
