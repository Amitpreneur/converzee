import React, { Component } from "react";
import { GET_CAMPS, SEND_MAIL, GET_EMAILS } from "../../actions/URLs";
import RequestHandler from "../../actions/RequestHandler";
import { Select } from "antd";
import { GenerateCVS } from "../Util";
const { Option } = Select;
export default class Download extends Component {
  state = {
    camps: [],
    emailList: [],
    showSetUpEmails: false,
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

  onDownloadClick = () => {
    const { emailList } = this.state;
    if (emailList.length) {
      window.gs.toast("CVS file Generate", { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.SUCCESS });
      GenerateCVS(emailList, "", true);
    } else {
      window.gs.toast("Campaingn Data Empty", { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
    }
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

  render() {
    const { camps } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button"></div>
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
              <div className="form-group admin-form-group">
                <center>
                  <button className="btn btn-sm btn-success" onClick={this.onDownloadClick}>
                    Download
                  </button>
                </center>
              </div>
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
