import React, { Component } from "react";
import { Drawer, Select, Input, DatePicker } from "antd";
import ToolUtil from "../../utils/ToolUtil";
import "./Filter.css";
const { Option } = Select;

export class Filter extends Component {
  state = {
    status: "",
    campign: "",
    startData: "",
    endData: "",
    sorting: 0,
  };

  status = [
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" },
  ];

  campign = [
    { value: "Tab Messaging", label: "Tab Messaging" },
    { value: "Urgency Timer", label: "Urgency Timer" },
    { value: "Video Popup", label: "Video Popup" },
    { value: "Central Timer", label: "Central Timer" },
    { value: "Geo Redirection", label: "Geo Redirection" },
    { value: "HELLO BAR", label: "HELLO BAR" },
    { value: "Image Popup", label: "Image Popup" },
    { value: "Exit Intent", label: "Exit Intent" },
    { value: "Mobile Vibrator", label: "Mobile Vibrator" },
    { value: "Dynamic Elements", label: "Dynamic Elements" },
    { value: "Offer iframe", label: "Offer iframe" },
    { value: "Back Button redirection", label: "Back Button redirection" },
    { value: "HELLO BAR + Timer", label: "HELLO BAR + Timer" },
    { value: "Auto Play Video", label: "Auto Play" },
    { value: "Proof App", label: "Proof App" },
  ];

  componentDidMount() {
    if (ToolUtil.isUpgrade1) {
      this.campign.push({value: "Optin forms", label: "Optin Forms"})
    }
    if (ToolUtil.isUpgrade2) {
      this.campign.push({value: "Template Club", label: "Template Club"})
    }
  }

  onStatusChange = (value) => {
    this.setState({ status: value });
  };

  onCampChange = (value) => {
    this.setState({ campign: value });
  };

  onDateChange = (value, typ) => {
    if (typ === 0) this.setState({ startData: value });
    if (typ === 1) this.setState({ endData: value });
  };

  onSortByChnage = () => {
    this.setState({ sorting: this.state.sorting === 0 ? 1 : 0 });
  };

  onChangeFilter = () => {
    var con = {};
    const filters = [];
    const { status, campign, startData, endData, sorting } = this.state;
    if (startData && endData) {
      con["start_date"] = startData;
      con["end_date"] = endData;
    }
    if (status) {
      status == "Active" ? filters.push({ status: true }) : filters.push({ status: false });
    }
    if (campign) {
      filters.push({ toolName: campign });
    }
    con["sorting"] = sorting;
    con["filters"] = filters;
    this.props.onChangeFilter(con);
    this.props.onClose();
  };

  ClearFilter = () => {
    this.setState({ status: "", campign: "", startData: "", endData: "", sorting: 0 }, () => {
      this.props.onChangeFilter({});
      this.props.onClose();
    });
  };

  renderitem = (op, index) => {
    return (
      <Option key={index} value={op.value} label={op.label}>
        {op.label}
      </Option>
    );
  };
  render() {
    const { visible, onClose } = this.props;
    const { status, campign, sorting } = this.state;
    return (
      <Drawer placement="right" closable={true} onClose={onClose} visible={visible}>
        <div className="row">
          <div className="col filter-close profile_heading">
            <span className="ml-3">Filter</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="filter-title">Status</div>
            <div className="filter-dropdown">
              <Select style={{ width: "100%" }} placeholder="Select Product" defaultValue={status} onChange={this.onStatusChange} optionLabelProp="label">
                {this.status.map(this.renderitem)}
              </Select>
            </div>
          </div>
          <div className="col-12 filter-item">
            <div className="filter-title">Campaign Type</div>
            <div className="filter-dropdown">
              <Select style={{ width: "100%" }} placeholder="Select Product" defaultValue={campign} onChange={this.onCampChange} optionLabelProp="label">
                {this.campign.map(this.renderitem)}
              </Select>
            </div>
          </div>
          <div className="col-12 filter-item">
            <div className="filter-title">Date Created</div>
            <div className="filter-dropdown">
              <DatePicker placeholder="From" onChange={(val) => this.onDateChange(val, 0)} />
            </div>
            <div className="filter-dropdown">
              <DatePicker placeholder="To" onChange={(val) => this.onDateChange(val, 1)} />
            </div>
          </div>
          <div className="col-12 filter-item">Sort</div>
          <div className="col-12">
            <div className="filter-title filter-sort-item">
              <span>Date</span>
              <button className={"sort-btn pull-right"} onClick={this.onSortByChnage}>
                {sorting ? <i className="fa fa-sort-amount-desc"></i> : <i className="fa fa-sort-amount-asc"></i>}
              </button>
            </div>
          </div>
          <div className="col-12 filter-item">
            <div className="row">
              <div className="col-12">
                <div className="btn-group pull-right">
                  <button className="btn btn-light btn-sm filter-title" onClick={this.ClearFilter}>
                    Clear
                  </button>
                  <button className="btn btn-info btn-sm filter-title" onClick={this.onChangeFilter}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}
