import React, { Component } from "react";
import { Input, Select } from "antd";

const { Option } = Select;
export default class UrlInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      prefix: "https://",
      parentValue: this.props.value,
    };
  }

  componentWillMount() {
    this.handleDropDown();
    this.setState({ value: this.props.value },()=> {});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value },()=> {});
  }

  handleDropDown = () => {
    const { parentValue } = this.state;
    let value = "";
    if (parentValue.indexOf("https") != -1) {
      value = parentValue.replace("https://", "");
      this.setState({ prefix: "https://", value });
    } else if (parentValue.indexOf("http") != -1) {
      value = parentValue.replace("http://", "");
      this.setState({ prefix: "http://", value });
    } else if (parentValue.indexOf("mailto:") != -1) {
      value = parentValue.replace("mailto:", "");
      this.setState({ prefix: "mailto:", value });
    } else if (parentValue.indexOf("tel:") != -1) {
      value = parentValue.replace("tel:", "");
      this.setState({ prefix: "tel:", value });
    }
  };

  onChange = (e) => {
    const data = e.target.value;
    let value = "";
    if(data.indexOf("https") != -1) {
      value = data;
    } else if(data.indexOf("http") != -1) {
      value = data;
    } else if(data.indexOf("mailto") != -1) {
      value = data;
    } else if(data.indexOf("tel") != -1) {
      value = data;
    } else {
      value = this.state.prefix + data;
    }
    
    // console.log("value", value);
    this.setState({ parentValue: value, value: data }, () => {
      const event = { target: { name: "", value: "" } };
      event["target"]["name"] = this.props.name;
      event["target"]["value"] = this.state.parentValue;
      
      this.props.onChange(event);
    });
  };

  onDropDownChange = (value) => {
    this.setState({ prefix: value }, () => {
      const event = { target: { name: "", value: "" } };
      event["target"]["name"] = this.props.name;
      event["target"]["value"] = this.state.parentValue;
      this.props.onChange(event);
    });
  };

  selectBefore = () => {
    const { isTab } = this.props;
    if (!isTab) {
      return (
        <Select defaultValue={this.state.prefix} onChange={this.onDropDownChange} className="select-before">
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      );
    }
    return (
      <Select defaultValue={this.state.prefix} onChange={this.onDropDownChange} className="select-before">
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
        <Option value="mailto:">mail to</Option>
        <Option value="tel:">Call</Option>
      </Select>
    );
  };

  render() {
    const { prefix, value } = this.state;
    console.log("value render", value);
    return (
      <div className="form-group">
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore={this.selectBefore()} onChange={this.onChange} value={value} autoComplete="off"/>
        </div>
      </div>
    );
  }
}
