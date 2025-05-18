import React, { Component } from "react";

import RequestHandler from "../../../../../actions/RequestHandler";
import { BackButtonRedirectionModalResponse, BackButtonRedirectionModal } from "../../../../utils/Modal";
import Util, { setupEmailTemplate } from "../../../../Util";
import ToolUtil from "../../../../../utils/ToolUtil";
import SuccessPopup from "../../../../comman/SuccessPopUp";
import { SAVE_TOOL, GET_ONE_TOOL, EMAIL_TEMPLATE } from "../../../../../actions/URLs";
import "./EmailBuilder.css";
import { Email } from "./Email";
import { Storage } from "../../../../../utils/Storage";
import $ from "jquery";
const emailBuilder = {
  showEditor: true,
};
export default class EmailBuilder extends Component {
  state = emailBuilder;
  editor = true;
  toolId = null;

  componentWillMount() {
    this.setuplocal();
  }

  setuplocal = () => {
    const item = Storage.getOneItem("save-right-sidebar");
    if (!item) {
      setTimeout(() => {
        this.setState({ showEditor: !this.state.showEditor }, () => {
          this.setState({ showEditor: !this.state.showEditor });
        });
      }, 10000);
    }
  };

  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      this.toolId = id;
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = res.data;
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle("Email Builder (" + data.campName + ")");
            });
          }
        }
      });
    } else {
      this.toolId = 0;
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle("Email Builder  (" + Util.CAMPAIGNS_NAME + ")");
    }
  }

  onClickSave = () => {
    if (window.emailData == "" || window.emailData == null) {
      window.gs.toast("Click on Preview Before Save", { position: "bottom-right", autoClose: false, type: window.gs.toast.TYPE.ERROR });
      return;
    }
    const data = encodeURIComponent(window.emailData);
    RequestHandler.PostRequest(EMAIL_TEMPLATE + this.toolId, { data: { data, campName: Util.CAMPAIGNS_NAME } }, (res, err) => {
      if (res) {
        if (res.data) {
          this.setState({ openPopUp: true, popUpScript: "" });
        }
      } else {
        console.log(err);
      }
    });
  };

  closePopup = () => {
    this.setState({ openPopUp: false, success: false });
    this.props.history.push("/");
  };

  onDrawerClose = () => {
    if (this.state.visible) this.setState({ visible: false });
    else this.setState({ visible: true });
  };

  setEditor = (editor) => {
    this.editor = editor;
  };

  onFrameLoad = () => {
    console.log("Frame Loaded");
  };

  options = {
    tools: {
      image: {
        enabled: false,
      },
    },
  };

  render() {
    const { openPopUp, popUpScript, showEditor } = this.state;
    const scriptPorps = {
      popUpScript: popUpScript,
      closePopup: this.closePopup,
    };
    return (
      <div className="container">
        {openPopUp ? <SuccessPopup {...scriptPorps} /> : null}
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button">
              <button onClick={this.onClickSave} className="btn btn-primary btn-md create-top-button">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "35px" }}>
          <div className="col">
            <center>
              <div className="create-center-main" style={{ marginTop: "0%", width: "100%" }}>
                {/* <Email /> */}
                {showEditor ? <iframe id="emailIframe" cross onLoad={this.onFrameLoad} style={{ height: "800px", width: "inherit" }} src="/email.html#right-sidebar"></iframe> : null}
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
