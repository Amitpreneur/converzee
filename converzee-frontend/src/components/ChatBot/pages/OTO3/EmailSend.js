import React, { Component } from "react";
import "./EmailSend.css";
import _ from "lodash";
import { Select, Modal, Result, Icon, Input } from "antd";

import { GET_CAMPS, GET_EMAILS, SEND_MAIL } from "../../../actions/URLs";
import RequestHandler from "../../../actions/RequestHandler";
import { useState } from "react";
import { Info } from "../../comman/Info";
const { Option } = Select;
const DOMAIN_LIST = ["GMAIL", "YAHOO", "HOTMAIL"];
export default class EmailSend extends Component {
  state = {
    camps: [],
    emailList: [],
    showSetUpEmails: false,
    visible: true,
  };

  emails = [];
  emailId = null;
  componentDidMount() {
    window.gs.navTitle("Send Mail");
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    this.emailId = id;
    RequestHandler.PostRequest(GET_CAMPS, {}, (res, err) => {
      if (res) {
        const camps = res.data.camp;
        if (camps) {
          this.setState({ camps });
        }
      }
    });
  }

  onClickSend = () => {
    this.setState({ showSetUpEmails: true });
  };

  SendMail = (email, password, domain, subject) => {
    const emailTemplateId = this.emailId;
    const emails = this.emails;
    RequestHandler.PostRequest(SEND_MAIL, { data: { id: emailTemplateId, email, password, domain, subject, emails } }, (res, err) => {
      if (res) {
        console.log(res);
      }
    });
  };

  handleChange = (id) => {
    RequestHandler.PostRequest(GET_EMAILS, { data: { id } }, (res, err) => {
      if (res) {
        const emailList = res.data.data.data.details;
        console.log(emailList);
        if (emailList) {
          this.setState({ emailList });
        }
      }
    });
  };

  handleChange2 = (emails) => {
    this.emails = emails;
  };

  renderCamps = (camp) => {
    return (
      <Option key={camp._id} value={camp._id} label={camp.title + " (" + camp.toolName + ")"}>
        {camp.title + " (" + camp.toolName + ")"}
      </Option>
    );
  };

  renderEmails = (email, i) => {
    return (
      <Option key={i} value={email.Email} label={email.Email}>
        {email.Email}
      </Option>
    );
  };

  closePopup = () => {
    this.setState({ showSetUpEmails: false });
  };

  clickSelectAll = () => {
    const { emailList } = this.state;
    const emails = [];
    emailList.forEach((e) => {
      emails.push(e.Email);
    });
  };

  handleCancel = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { camps, emailList, showSetUpEmails } = this.state;
    return (
      <div className="container">
        {showSetUpEmails ? <GetEmailConfigDetails sendMail={this.SendMail} closePopup={this.closePopup} /> : null}
        <Modal title="Info" visible={this.state.visible} onOk={this.handleCancel} onCancel={this.handleCancel}>
          <div>Google</div>
          <p>Follow theses steps to use mail sender:</p>
          <p>
            1. Enable less secure apps - <br></br>
            <a target="_blank" href="https://www.google.com/settings/security/lesssecureapps">
              https://www.google.com/settings/security/lesssecureapps
            </a>
          </p>
          <p>
            Disable Captcha temporarily so you can connect the new device/server -<br></br>
            <a target="_blank" href="https://accounts.google.com/b/0/displayunlockcaptcha">
              https://accounts.google.com/b/0/displayunlockcaptcha
            </a>
          </p>
          <div>Yahoo</div>
          <div>Hotmail</div>
        </Modal>
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button">
              <button onClick={this.onClickSend} className="btn btn-primary btn-md create-top-button">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="create-center-main" style={{ paddingTop: "20px", marginTop: "2%", height: "270px", marginLeft: "8%" }}>
              <div className="form-group admin-form-group">
                <center>
                  <label>Campaign &nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <Select style={{ width: "40%" }} placeholder="Select Campaign" defaultValue={""} onChange={this.handleChange} optionLabelProp="label">
                    {camps.map(this.renderCamps)}
                  </Select>
                </center>
              </div>
              {emailList.length ? (
                <div className="form-group admin-form-group">
                  <center>
                    <label>
                      Emails &nbsp;&nbsp;&nbsp;<span onClick={this.clickSelectAll}>All</span>
                    </label>
                    <Select mode={"multiple"} style={{ width: "40%" }} placeholder="Select Email" onChange={this.handleChange2} optionLabelProp="label">
                      {emailList.map(this.renderEmails)}
                    </Select>
                  </center>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <center>
              <div style={{ width: "80%", textAlign: "left", paddingTop: "10px" }}>
                <div style={{ paddingLeft: "33px" }}></div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

const GetEmailConfigDetails = function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("GMAIL");
  const [subject, setSubject] = useState("");
  return (
    <div className="popup">
      <div className="popup_inner" style={{ height: "380px", bottom: "unset" }}>
        <div className="popUpMainContainer">
          <div className="popUpTitlebar">
            <div onClick={() => props.closePopup()} className="popupCloseButton">
              <i className="fa fa-close" />
            </div>
          </div>
          <div className="main-campaing">
            <div className="form-element">
              <label>Emails &nbsp;&nbsp;&nbsp;&nbsp;</label>
              <Select style={{ width: "40%" }} placeholder="Select Domain" defaultValue={domain} onChange={setDomain} optionLabelProp="label">
                <Option key={1} value={"GMAIL"} label={"GMAIL"}>
                  GMAIL
                </Option>
                <Option key={1} value={"YAHOO"} label={"YAHOO"}>
                  YAHOO
                </Option>
                <Option key={1} value={"HOTMAIL"} label={"HOTMAIL"}>
                  HOTMAIL
                </Option>
              </Select>
            </div>
            <div className="form-element">
              <div className="label-text">
                Email* <Info text="Email Address from which you want to send mail" />
              </div>
              <input type="text" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-element">
              <div className="label-text">
                Password* <Info text="Password" />
              </div>
              <input type="password" placeholder="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-element">
              <div className="label-text">
                Subject* <Info text="Subject of Mail" />
              </div>
              <input type="text" placeholder="Subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>
          <div className="popUpbottomBar">
            <div>
              <button className="btn btn-xs btn-danger" onClick={() => props.sendMail(email, password, domain, subject)}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
