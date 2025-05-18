import React, { Component } from "react";
import DropDown from "../../comman/DropDown";
import Editor from "../../comman/Editor";
export default class CreateText extends Component {
  options = [
    { label: "Top", value: "TOP" },
    { label: "Bottom", value: "BOTTOM" },
  ];
  state = {
    campaignName: this.props.campaignName,
    helloBarPos: this.props.helloBarPos,
    textBody: this.props.textBody,
  };
  componentWillReceiveProps(nextProps) {
    const { campaignName, helloBarPos, textBody } = this.state;
    if (campaignName !== nextProps.campaignName || helloBarPos !== nextProps.helloBarPos || textBody !== nextProps.textBody) {
      this.setState({ campaignName: nextProps.campaignName, helloBarPos: nextProps.helloBarPos, textBody: nextProps.textBody });
    }
  }
  onDropDownChange = (value) => {
    this.setState({ helloBarPos: value });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(1, this.state);
  };
  onTextChange = (textBody) => {
    this.setState({ textBody });
    this.props.onChange(1, this.state);
  };

  componentWillUnmount() {
    this.props.onChange(1, this.state);
  }

  render() {
    const { campaignName, helloBarPos, textBody } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">Campaign Name*</div>
              <input type="text" name="campaignName" className="form-control" value={campaignName} onChange={this.onChange} />
            </div>
            <div className="form-element">
              <div className="label-text">Hellobar Text*</div>
              <div style={{ height: "130px" }}>
                <Editor value={textBody} name="textBody" onChange={this.onTextChange} />
              </div>
            </div>
            <div className="form-element">
              <div className="label-text">Hellobar Position*</div>
              <DropDown options={this.options} onChange={this.onDropDownChange} value={helloBarPos} class="dropdown-style" style={{ width: "" }} />
            </div>
          </div>
        </center>
      </div>
    );
  }
}
