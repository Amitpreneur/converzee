import React, { Component } from "react";
import Util from "../../../Util";
import Icon from "./Icon";
import { Info } from "../../../comman/Info";
import UrlInput from "../../../comman/UrlInput";
export default class Text extends Component {
  state = {
    items: this.props.items,
    iconActive: false,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ items: nextProps.items });
    }
  }

  componentWillUnmount() {
    this.props.onChange({ items: this.state.items });
  }

  onAddClick = () => {
    const { items } = this.state;
    items.push({ icon: "", text: "", link: "" });
    this.setState({ items });
  };

  removeClick = (index) => {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
    this.props.onChange({ items });
  };

  onChange = (value, index, field) => {
    let { items } = this.state;
    items[index][field] = value;
    this.setState({ items });
    this.props.onChange({ items });
  };

  selectIcon = (index) => {
    this.setState({ iconActive: index + 1 });
  };

  onSelection = (icon) => {
    let { items, iconActive } = this.state;
    items[iconActive - 1]["icon"] = icon;
    this.setState({ items, iconActive: 0 });
  };


  onTextChange = (value, index, field) => {
    let { items } = this.state;
    items[index][field] = value;
    this.setState({ items });
    this.props.onChange({ items });
  };

  renderList = (item, index) => {
    return (
        <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
          <div className="cz_dynamic_element_box">
            <div className="form-element">
              <div className="label-text">{item.text} 
                <span className="sidebar-img">
                  <i className={item.icon}></i>
                </span>
              </div>
              <UrlInput type="text" isTab={false} className="form-control" onChange={(e) => this.onTextChange(e.target.value, index, "link")} value={item.link} />
            </div>
          </div>
        </div>
    );
  };

  render() {
    const { items, iconActive } = this.state;
    return (
      <div>
        {/* {iconActive ? <Icon onClose={() => this.setState({ iconActive: 0 })} onSelectionDone={this.onSelection} /> : null}
        <div className="row">
          <div className="col-12">
            <div className="dynamic_elements_add">
              <h3>Add New elements</h3>
              <button onClick={() => this.onAddClick()} className="btn float-right btn-sm btn-success">
                ADD
              </button>
            </div>
          </div>
        </div> */}
        <div className="row">{items.map(this.renderList)}</div>
      </div>
    );
  }
}
