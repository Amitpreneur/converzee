import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import UrlInput from "../../../comman/UrlInput";
import Util, { getCountryList } from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Code extends Component {
  options = getCountryList();
  state = {
    redirection: this.props.redirection,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ redirection: nextProps.redirection });
    }
  }

  onDropDownChange = (value, index) => {
    const { redirection } = this.state;
    redirection[index].country = value;
    this.setState({ redirection });
  };

  componentWillUnmount() {
    const cases = this.props.case || 1;
    this.props.onChange(cases, this.state.redirection);
  }

  onItemChange = (index, e) => {
    const cases = this.props.case || 1;
    let { redirection } = this.state;
    const value = e.target.value;
    redirection[index].redirectUrl = value;
    this.setState({ redirection });
    this.props.onChange(cases, this.state.redirection);
  };

  onAddClick = (typ) => {
    const cases = this.props.case || 1;
    const { redirection } = this.state;
    redirection.push({ country: "", redirectUrl: "" });
    this.setState({ redirection });
    this.props.onChange(cases, this.state.redirection);
  };

  onRemoveClick = (typ, index) => {
    const cases = this.props.case || 1;
    const redirection = this.state.redirection || [""];
    redirection.splice(index, 1);
    this.setState({ redirection });
    this.props.onChange(cases, this.state.redirection);
  };

  renderItems = (item, index) => {
    const redirection = this.state.redirection;
    const props = {
      value: item.country,
      value1: item.redirectUrl,
      onChange: this.onItemChange,
      index,
      size: redirection.length,
      onAddClick: this.onAddClick,
      onRemoveClick: this.onRemoveClick,
    };
    return (
      <div className="col-12 geo_url_box row" key={index}>
        <div className="col-4">
          <DropDown options={this.options} value={item.country} index={index} onChange={(e) => this.onDropDownChange(e, index)} className="dropdown-style" style={{ width: "" }} disable={false} />
        </div>
        <div className="col-8">
          <TextInput {...props} />
        </div>
      </div>
    );
  };

  render() {
    const redirection = this.state.redirection || [""];
    return (
      <div>
        <div className="label-text">
          URL Settings*
          <Info text="Enter Redirection URL" />
        </div>
        <div className="container">
          <div className="row">
            {redirection.map(this.renderItems)}
            <div className="w-100"></div>
          </div>
        </div>
      </div>
    );
  }
}

const TextInput = (props) => {
  return (
    <div className="code-input-block ">
      <UrlInput value={props.value1} onChange={(e) => props.onChange(props.index, e)} />
      <div className="code-plusIcon">
        {props.size - 1 === props.index ? (
          <i onClick={() => props.onAddClick(props.typ)} className="fa fa-plus-circle" aria-hidden="true" />
        ) : (
          <i onClick={() => props.onRemoveClick(props.typ, props.index)} className="fa fa-minus-circle" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};
