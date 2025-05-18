import React, { Component } from "react";
import { Switch } from "antd";
import "./Switch.css";
export default class Switch1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: null
    };
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked });
  }

  render() {
    return (
      <div className="switch-container">
        <label>
          <Switch defaultChecked={this.state.isChecked} onChange={this._handleChange} />
        </label>
      </div>
    );
  }

  _handleChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.onChange(!this.state.isChecked);
  };
}
