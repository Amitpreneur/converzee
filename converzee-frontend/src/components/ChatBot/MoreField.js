import React, { Component } from "react";
import Util from "../Util";
import Icon from "../pages/tools/DynamicElements/Icon";
import { Info } from "../comman/Info";
export default class MoreField extends Component {
  state = {
    support: this.props.support,
    contact: this.props.contact,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ support: nextProps.support, contact: nextProps.contact });
    }
  }

  componentWillUnmount() {
    this.props.onChange(4, { support: this.state.support, contact: this.state.contact });
  }

  onChangeSupportChange = (e) => {
    this.setState({ support: e.target.value });
    this.props.onChange(4, { support: e.target.value, contact: this.state.contact });
  };

  onChangeContactChange = (e) => {
    this.setState({ contact: e.target.value });
    this.props.onChange(4, { contact: e.target.value, support: this.state.support });
  };

  render() {
    const { support, contact } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">
                Contact <Info text="Contact Info" />
              </div>
              <textarea type="text" name="chattitle" className="form-control" value={contact} onChange={this.onChangeContactChange} />
            </div>
            <div className="form-element">
              <div className="label-text">
                Support <Info text="Support Info" />
              </div>
              <textarea type="text" name="chattitle" className="form-control" value={support} onChange={this.onChangeSupportChange} />
            </div>
          </div>
        </center>
      </div>
    );
  }
}
