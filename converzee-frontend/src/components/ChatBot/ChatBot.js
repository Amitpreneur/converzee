import React, { Component } from "react";
import "./Create.css";
import SideBar from "./SideBar";
import Style from "./Style";
import { Drawer } from "antd";
import BotText from "./BotText";
import { ChatBotModalResponse, ChatBotModal } from "../utils/Modal";
import RequestHandler from "../../actions/RequestHandler";
import { SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import ToolUtil from "../../utils/ToolUtil";
import Util from "../Util";
import SuccessPopup from "../comman/SuccessPopUp";
import Code from "../subpages/create/Code";
import MoreField from "./MoreField";

const chatbot = {
  activeTab: 1,
  STYLE: {
    elements: [
      { name: "titleBg", text: "Title Background", color: "#fff" },
      { name: "titleColor", text: "Title Color", color: "#000" },
      { name: "backgroundColor", text: "Background Color", color: "#fff" },
      { name: "fontColor", text: "Font Color", color: "#000" },
    ],
    selected: 0,
  },
  chattitle: "",
  chats: [{ key: "", ans: "" }],
  initChat: [{ field: "", key: "" }],
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class ChatBot extends Component {
  state = chatbot;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = ChatBotModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 18;
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle(ToolUtil.getTool(toolId) + "(" + Util.CAMPAIGNS_NAME + ")");
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
        this.setState({ STYLE: data });
        break;
      case 2:
        this.setState({ CODE: data });
        break;
      case 3:
        this.setState({ chats: data.chats, initChat: data.initChat, chattitle: data.chattitle });
        break;
      case 4:
        this.setState({ contact: data.contact, support: data.support });
        break;
      default:
        break;
    }
  };

  onChange = (value) => {
    this.setState(value);
  };

  renderMain = () => {
    const { activeTab, chats, chattitle, contact, initChat, support, STYLE, CODE } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <BotText chats={chats} initChat={initChat} chattitle={chattitle} case={3} onChange={this.onChange} />;
        break;
      case 2:
        component = <Style {...STYLE} case={1} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Code {...CODE} case={2} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <MoreField case={4} contact={contact} onChange={this.onUpdate} support={support} />;
        break;
      default:
        component = <BotText chats={chats} initChat={initChat} chattitle={chattitle} case={3} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (!Util.isArrayEqual(chatbot, this.state, 3)) {
      RequestHandler.PostRequest(SAVE_TOOL, { toolData: ChatBotModal(toolData) }, (res, err) => {
        if (res) {
          if (res.data) {
            this.setState({ openPopUp: true, popUpScript: res.data.script });
          }
        } else {
          console.log(err);
        }
      });
    }
  };

  closePopup = () => {
    this.setState({ openPopUp: false, success: false });
    this.props.history.push("/");
  };

  onDrawerClose = () => {
    if (this.state.visible) this.setState({ visible: false });
    else this.setState({ visible: true });
  };

  render() {
    const { openPopUp, popUpScript } = this.state;
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
              {/* <button className="btn btn-primary btn-md create-top-button">Preview</button> */}
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
          <div className="col-lg-2 d-none d-md-block d-lg-block">
            <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
          </div>
          <div className="d-none d-block d-sm-none d-sm-block d-md-none arrowToShowMenu">
            <button onClick={this.onDrawerClose}>
              <i className="fa fa-arrow-left"></i>
            </button>
            <Drawer title="Tools" placement="right" closable={true} onClose={this.onDrawerClose} visible={this.state.visible} getContainer={false} style={{ position: "absolute", height: "unset" }}>
              <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}
