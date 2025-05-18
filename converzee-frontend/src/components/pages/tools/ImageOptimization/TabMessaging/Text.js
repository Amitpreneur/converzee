import React, { Component } from "react";
import Util from "../../../Util";
import { Info } from "../../../comman/Info";
export default class Text extends Component {
  state = {
    messages: this.props.messages,
    randomMsg: ""
  };
  randomText = this.props.randomText;
  i = 0;

  componentWillReceiveProps(nextProps) {
    if (Util.isRedirected) {
      Util.isRedirected = false;
      this.setState({ messages: nextProps.messages });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addmessage = () => {
    const { randomMsg, messages } = this.state;
    if (randomMsg !== null && randomMsg !== "" && !messages.includes(randomMsg)) {
      messages.push(randomMsg);
      this.setState({ messages }, () => {
        // const newObj = { messages: this.state.messages };
        this.props.onChange({ messages: this.state.messages });
      });
      this.setState({randomMsg : ""})
    } else {
      window.gs.toast("Message Should be unique", { position: "top-right", type: window.gs.toast.TYPE.ERROR });
    }
  };

  componentWillUnmount() {
    this.props.onChange({ messages: this.state.messages });
  }

  renderMsgList = (item, index) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center" key={item + index}>
        {item}
        <span className="badge badge-danger badge-pill msg_add_btn">
          <i onClick={() => this.removeListItem(index)} title="Remove" className="fa fa-minus-circle" aria-hidden="true" />
        </span>
      </li>
    );
  };

  removeListItem = (index) => {
    const { messages } = this.state;
    messages.splice(index, 1);
    this.setState({ messages }, () => {
      const newObj = this.state.messages;
      this.props.onChange({ messages: newObj });
    });
  };

  randomClick = () => {
    if (this.i === this.randomText.length - 1) this.i = 0;
    else this.i++;
    this.setState({ randomMsg: this.randomText[this.i] });
  };

  render() {
    const { randomMsg, messages } = this.state;
    return (
      <div className="sample_msg">
        <div className="col-auto">
          <div className="input-group mb-2 cz_messaging_input">
            <h5>Custom Message*</h5>
            <input type="text" className="form-control" name="randomMsg" value={randomMsg} onChange={this.onChange} />
            <div className="input-group-append">
              <span className="input-group-text" style={{ cursor: "pointer" }} onClick={this.addmessage}>
                Add
              </span>
            </div>
          </div>
          <div className="label-text"><h3>Selected Message*</h3></div>
          {/* <div style={{ textAlign: "end", cursor: "pointer",fontWeight: 600 }}>
            <span onClick={this.randomClick}>Random Message</span>
          </div> */}
        </div>
        <div>
          {messages.length ? 
          <ul className="list-group list-group-flush">{messages.map(this.renderMsgList)}</ul>
          : <p>Message has not been selected.</p>}
        </div>
      </div>
    );
  }
}
