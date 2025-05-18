import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    headline: this.props.headline,
    subheadline: this.props.subheadline,
    randomMsg: "",
  };

  onChange = (e) => {
    this.setState({ subheadline: e }, () => {
      this.props.onChange({ subheadline: this.state.subheadline });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ headline: nextProps.headline, subheadline: nextProps.subheadline });
    }
  }

  onConantChange = (val) => {
    this.setState({ headline: val }, () => {
      this.props.onChange({ headline: this.state.headline });
    });
  };

  componentWillUnmount() {
    this.props.onChange({ headline: this.state.headline, subheadline: this.state.subheadline });
  }

  addmessage = () => {
    const { randomMsg, subheadline } = this.state;
    subheadline.push(randomMsg);
    this.setState({ subheadline }, () => {
      const newObj = { subheadline: this.state.subheadline };
      this.props.onChange(newObj);
    });
  };

  removeListItem = (index) => {
    const { subheadline } = this.state;
    subheadline.splice(index, 1);
    this.setState({ subheadline }, () => {
      const newObj = { subheadline: this.state.subheadline };
      this.props.onChange(newObj);
    });
  };

  renderMsgList = (item, index) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center" key={item + index}>
        {item}
        <span className="badge badge-primary badge-pill">
          <i onClick={() => this.removeListItem(index)} className="fa fa-minus-circle" aria-hidden="true" />
        </span>
      </li>
    );
  };

  render() {
    const { headline, subheadline } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">
            Content* <Info text="Add Content for exit intent " />
          </div>
          <Editor value={headline} name="textBody" onChange={this.onConantChange} />
        </div>
        <div className="form-element">
          <div className="label-text">
            SubHeading* <Info text="Sub heading to display under text." />
          </div>
          <Editor value={subheadline} name="subheadline" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
