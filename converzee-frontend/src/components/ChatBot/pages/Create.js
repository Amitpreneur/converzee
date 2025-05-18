import React, { Component } from "react";
import "./Create.css";
import CreateSideBar from "../subpages/create/CreateSideBar";
import CreateText from "../subpages/create/CreateText";
import Code from "../subpages/create/Code";
import Style from "../subpages/create/Style";
import Layout from "../subpages/create/Layout";
import Timer from "../subpages/create/Timer";
import CTA from "../subpages/create/CTA";
import RequestHandler from "../../actions/RequestHandler";
import { SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import FileUploader from "../subpages/create/FileUploader";
import ToolUtil from "../../utils/ToolUtil";
import Util from "../Util";
export default class Create extends Component {
  static CAMPAIGNS_NAME = "";
  toolId = 0;
  state = {
    toolName: "",
    activeTab: 1,
    create: { campaignName: Util.CAMPAIGNS_NAME, helloBarPos: "", textBody: "" },
    cta: { ctaText: "", ctaAction: "", redirectUrl: "" },
    timer: { timerType: "", endDateTime: new Date(), timeZone: Util.getTimeZoneList()[0].value, whenTimeExp: "" },
    layout: { layout: 1 },
    style: {
      elements: [
        { name: "centralTimer", text: "Central Timer", color: "" },
        { name: "centralTimerTitle", text: "Central Timer Title", color: "" },
        { name: "centralTimerLabel", text: "Central Timer Label", color: "" },
        { name: "highlight", text: "Highlight", color: "" },
        { name: "highlightBackground", text: "Highlight Background", color: "" },
      ],
      selected: 0,
    },
    code: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
    file: { file: [] },
    toolId: 0,
    status: true,
    openPopUp: false,
    popUpScript: "",
    _id: null,
  };
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          const data = res.data.campaigns;
          Object.assign(data, { _id: id, toolName: ToolUtil.getTool(data.toolId), toolId: data.toolId, name: data.data });
          this.setState({ ...data });
          window.gs.navTitle(ToolUtil.getTool(data.toolId));
        }
      });
    } else {
      if (Util.CAMPAIGNS_NAME == "") {
        this.props.history.push("/");
      } else {
        const toolId = this.props.match ? (this.props.match.params ? parseInt(this.props.match.params.routeName) : 1) : 1;
        this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
        Util.RedirectWhenCampaignEmpty(this.props); 
        window.gs.navTitle(ToolUtil.getTool(toolId));
      }
    }
  }
  onChangeActive = (tabIndex) => {
    const { activeTab } = this.state;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  onUpdate = (index, data) => {
    switch (index) {
      case 1:
        this.setState({ create: data, toolName: data.campaignName });
        break;
      case 2:
        this.setState({ cta: data });
        break;
      case 3:
        this.setState({ timer: data });
        break;
      case 4:
        this.setState({ layout: data });
        break;
      case 5:
        this.setState({ style: data });
        break;
      case 6:
        this.setState({ code: data });
        break;
      case 7:
        this.setState({ file: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, create, cta, timer, layout, style, code, file } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <CreateText {...create} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <CTA {...cta} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Timer {...timer} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Layout {...layout} onChange={this.onUpdate} />;
        break;
      case 5:
        component = <Style {...style} onChange={this.onUpdate} />;
        break;
      case 6:
        component = <Code {...code} onChange={this.onUpdate} />;
        break;
      case 7:
        component = <FileUploader {...file} onChange={this.onUpdate} />;
        break;
      default:
        component = <CreateText {...create} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    RequestHandler.PostRequest(SAVE_TOOL, { toolData: toolData }, (res, err) => {
      if (res) {
        if (res.data.script) {
          this.setState({ openPopUp: true, popUpScript: res.data.script });
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

  render() {
    const itemId = this.props.location.state;
    const { openPopUp, popUpScript } = this.state;
    const scriptPorps = {
      popUpScript: popUpScript,
      closePopup: this.closePopup,
    };
    return (
      <div className="container">
        {openPopUp ? <ScriptPopup {...scriptPorps} /> : null}
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button">
              <button className="btn btn-primary btn-md create-top-button">Preview</button>
              <button onClick={this.onClickSave} className="btn btn-primary btn-md create-top-button">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "35px" }}>
          <div className="col">
            <center>
              <div className="create-center-main">{this.renderMain()}</div>
            </center>
          </div>
          <div className="col col-lg-2">
            <CreateSideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} {...itemId} />
          </div>
        </div>
      </div>
    );
  }
}

function copyScript() {
  var copyText = document.getElementById("scriptToCopy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

const ScriptPopup = (props) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="popUpMainContainer">
          <div className="popUpTitlebar">
            <div onClick={() => props.closePopup()} className="popupCloseButton">
              <i className="fa fa-close" />
            </div>
          </div>
          <div className="main-campaing">
            <label>Script</label>
            <div class="input-group mb-3">
              <input type="text" className="form-control" id="scriptToCopy" value={props.popUpScript} name="campaignsName" required />
              <div class="input-group-append">
                <span class="input-group-text" onClick={copyScript} style={{ cursor: "pointer" }}>
                  <i className="fa fa-copy" />
                </span>
              </div>
            </div>
            {/* <input type="text" className="form-control" value={props.popUpScript} name="campaignsName" required /> */}
          </div>
          <div className="popUpbottomBar">
            <div>
              <button className="btn btn-xs btn-danger" onClick={() => props.closePopup()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
