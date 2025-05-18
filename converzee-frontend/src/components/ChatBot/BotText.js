import React, { Component } from "react";
import Util from "../Util";
import Icon from "../pages/tools/DynamicElements/Icon";
import { Info } from "../comman/Info";
export default class BotText extends Component {
  state = {
    chats: this.props.chats,
    chattitle: this.props.chattitle,
    initChat: this.props.initChat,
  };

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ chats: nextProps.chats, chattitle: nextProps.chattitle });
    }
  }

  componentWillUnmount() {
    this.props.onChange({ chats: this.state.chats, chattitle: this.state.chattitle });
  }

  onAddClick = () => {
    const { chats } = this.state;
    chats.push({ key: "", ans: "" });
    this.setState({ chats });
  };

  onAddClick2 = () => {
    const { initChat } = this.state;
    initChat.push({ field: "", key: "" });
    this.setState({ initChat });
  };

  removeClick = (index) => {
    const { chats } = this.state;
    chats.splice(index, 1);
    this.setState({ chats });
    this.props.onChange({ chats: chats, chattitle: this.state.chattitle });
  };

  removeClick2 = (index) => {
    const { initChat } = this.state;
    initChat.splice(index, 1);
    this.setState({ initChat });
    this.props.onChange({ initChat: initChat, chats: this.state.chats, chattitle: this.state.chattitle });
  };

  onChange = (value, index, field) => {
    let { chats } = this.state;
    chats[index][field] = value;
    this.setState({ chats });
    this.props.onChange({ chats: chats, title: this.state.title });
  };

  onChange2 = (value, index, field) => {
    let { initChat } = this.state;
    initChat[index][field] = value;
    this.setState({ initChat });
    this.props.onChange({ chats: this.state.chats, initChat: initChat, title: this.state.title });
  };

  selectIcon = (index) => {
    this.setState({ iconActive: index + 1 });
  };

  onSelection = (icon) => {
    let { items, iconActive } = this.state;
    items[iconActive - 1]["icon"] = icon;
    this.setState({ items, iconActive: 0 });
  };

  renderList = (item, index) => {
    return (
      <div className="row" style={{ border: "1px solid #eeeeee", paddingBottom: "2px" }}>
        <div className="col-12" style={{ paddingBottom: "0px" }}>
          <div className="float-right">
            <button onClick={() => this.removeClick(index)} className="btn btn-sm btn-warning">
              Remove
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="form-element" onClick={() => this.selectIcon(index)}>
            <div className="label-text">
              Question/Keys*
              <Info text="Question/Keys " />
            </div>
            <input type="text" onChange={(e) => this.onChange(e.target.value, index, "key")} className="form-control" value={item.key} />
          </div>
        </div>
        <div className="col-12">
          <div className="form-element">
            <div className="label-text">
              Ans / Suggestion*
              <Info text="Suggestion " />
            </div>
            <input type="text" className="form-control" onChange={(e) => this.onChange(e.target.value, index, "ans")} value={item.ans} />
          </div>
        </div>
      </div>
    );
  };

  onOptionChange = (value, index, field) => {
    let { initChat } = this.state;
    initChat[index][field] = value;
    this.setState({ initChat });
    this.props.onChange({ initChat: initChat, chats: this.state.chats, title: this.state.title });
  };

  renderList2 = (item, index) => {
    return (
      <div className="row" style={{ border: "1px solid #eeeeee", paddingBottom: "2px" }}>
        <div className="col-12" style={{ paddingBottom: "0px" }}>
          <div className="float-right">
            <button onClick={() => this.removeClick(index)} className="btn btn-sm btn-warning">
              Remove
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="form-element" onClick={() => this.selectIcon(index)}>
            <div className="label-text">
              Question/Keys*
              <Info text="Question/Keys " />
            </div>
            <input type="text" onChange={(e) => this.onChange2(e.target.value, index, "key")} className="form-control" value={item.key} />
          </div>
        </div>
        <div className="col-12">
          <div className="form-element">
            <div className="label-text">
              Ans / Suggestion*
              <Info text="Suggestion " />
            </div>
            <select onChange={(e) => this.onOptionChange(e.target.value, index, "field")} value={item.field} className="form-control">
              <option>Select one Options</option>
              <option selected={item.field == "Email"} value="Email">
                Email
              </option>
              <option selected={item.field == "Name"} value="Name">
                Name
              </option>
              <option selected={item.field == "Number"} value="Number">
                Phone Number
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  onTitleChange = (e) => {
    const chattitle = e.target.value;
    this.setState({ chattitle });
    this.props.onChange({ chats: this.state.chats, chattitle: chattitle });
  };

  render() {
    const { chats, chattitle, initChat } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div className="form-element">
              <div className="label-text">
                Title <Info text="Coupen code text to be displied" />
              </div>
              <input type="text" name="chattitle" className="form-control" value={chattitle} onChange={this.onTitleChange} />
            </div>
            <div className="row">
              <button onClick={() => this.onAddClick2()} className="btn float-right btn-sm btn-success">
                ADD
              </button>
            </div>
            <div className="label-text">
              Initial Chat <Info text="Initial Text" />
            </div>
            {initChat.map(this.renderList2)}
            <div className="row">
              <button onClick={() => this.onAddClick()} className="btn float-right btn-sm btn-success">
                ADD
              </button>
            </div>
            <div className="label-text">
              Title <Info text="Suggest Texts" />
            </div>
            {chats.map(this.renderList)}
          </div>
        </center>
      </div>
    );
  }
}
