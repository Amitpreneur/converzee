import React, { Component } from "react";
import DropDown from "../comman/DropDown";
export default class Text extends Component {
  state = {
    items: this.props.items,
    reviewName: "",
    msg: "",
    position: this.props.position,
  };
  options = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
  ];

  onDropDownChange = (value) => {
    this.setState({ position: value }, () => {
      this.props.onChange({ position: this.state.position });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAdd = () => {
    const { reviewName, msg, items } = this.state;
    if (reviewName != "" && msg != "") {
      const newItems = [...items];
      newItems.push({ name: reviewName, msg: msg });
      this.setState({ items: newItems }, () => {
        this.props.onChange({ items: this.state.items });
      });
    }
  };

  renderMsgList = (item, index) => {
    return (
      <tr className="" key={index}>
        <td>{item.name}</td>
        <td>{item.msg}</td>
        <td>
          <span class="badge badge-primary badge-pill">
            <i onClick={() => this.removeListItem(index)} title="Remove" className="fa fa-minus-circle" aria-hidden="true" />
          </span>
        </td>
      </tr>
    );
  };

  removeListItem = (index) => {
    const { items } = this.state;
    const newItems = [...items];
    newItems.splice(index, 1);
    this.setState({ items: newItems }, () => {
      this.props.onChange({ items: this.state.items });
    });
  };

  render() {
    const { reviewName, msg, items, position } = this.state;
    return (
      <div>
        <div className="form-element">
          <div className="label-text">Position*</div>
          <DropDown options={this.options} onChange={this.onDropDownChange} value={position} class="dropdown-style" style={{ width: "" }} />
        </div>

        <div className="form-element">
          <div className="label-text">Name*</div>
          <input type="text" className="form-control" name="reviewName" value={reviewName} onChange={this.onChange} />
        </div>

        <div className="form-element">
          <div className="label-text">Message*</div>
          <input type="text" className="form-control" name="msg" value={msg} onChange={this.onChange} />
        </div>
        <div className="form-element">
          <button className="btn btn-sm btn-primary" onClick={this.onAdd}>
            Add
          </button>
        </div>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Name</td>
                <td>Message</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>{items.map(this.renderMsgList)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
