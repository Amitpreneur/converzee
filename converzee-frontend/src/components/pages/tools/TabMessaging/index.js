import React, { Component } from "react";
import "../../Create.css";
import Favicon from "./Favicon";
import Timing from "./Timing";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Util from "../../../Util";
import "./Tab.css";
import { TabMessagingModal, TabMessagingModalResponse } from "../../../utils/Modal";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { Modal } from "antd";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const tabMessgae = {
  name: "",
  activeTab: 1,
  isImage: false,
  emoji: "🔥",
  FAVICON: "",
  messages: [],
  timeFirstMsg: 0,
  timeBetweenTwoMsg: 2,
  SOUND: false,
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
  randomMsg: ""
};
export default class TabMessaging extends Component {
  state = {
    name: "",
    activeTab: 1,
    isImage: false,
    emoji: "🔥",
    FAVICON: "",
    messages: [],
    timeFirstMsg: 0,
    timeBetweenTwoMsg: 2,
    SOUND: false,
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
    randomMsg: ""
  };
  randomText = [
    "Hey \ud83d\udc4b, Don't Miss Out", 
    "Don’t forget…", 
    "Buy Now",
    "Notification 👋",
    "We have something 😻",
    "Hey there Come back 🤝",
    "Hellooooooooo😊",
    "CoooooooL!😀",
    "Reward Points About To Expire 💸",
    "It’s Hotttttttt 🔥",
    "SALE is on 😍",
    "Woohoo! You did it!🤑",
    "Become the #1 Shopper 🛍",
    "It’s Been A While And We Miss You 🥰",
    "Something New For You 😇",
    "Here’s something for you 🎁",
    "Did You Know 🤔🧐",
  ];

  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = TabMessagingModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 1;
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
        this.setState({ messages: data });
        break;
      case 2:
        this.setState({ FAVICON: data });
        break;
      case 3:
        this.setState({ TIMING: data });
        break;
      case 4:
        this.setState({ SOUND: data });
        break;
      case 5:
        this.setState({ CODE: data });
        break;
      default:
        break;
    }
  };
  updateChange = (value) => {
    this.setState(value);
  };
  renderMain = () => {
    const { activeTab, messages, isImage, emoji, FAVICON, timeFirstMsg, timeBetweenTwoMsg, TIMING, SOUND, CODE } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text messages={messages} randomText={this.randomText} onChange={this.updateChange} />;
        break;
      case 2:
        component = <Favicon isImage={isImage} emoji={emoji} FAVICON={FAVICON} onChange={this.updateChange} />;
        break;
      case 3:
        component = <Timing timeFirstMsg={timeFirstMsg} SOUND={SOUND} timeBetweenTwoMsg={timeBetweenTwoMsg} onChange={this.updateChange} />;
        break;
      case 5:
        component = <Code {...CODE} case={5} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text messages={messages} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(tabMessgae, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: TabMessagingModal(toolData) }, (res, err) => {
          if (res) {
            if (res.data.success) {
              Modal.success({
                content: "Campaign Save SuccessFully",
              });
              this.setState({
                randomMsg: "",
                messages: [],
              });
              setTimeout(() => {
                this.props.history.push("/Campaigns");
              }, 2000);
            } else {
              window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
            }
          }
        });
      }
    } else {
      Modal.warning({
        content: "Should Contain atleast one trigger point",
      });
    }
  };

  renderRight = () => {
    const { activeTab } = this.state;
    return ( activeTab !== 1 ? <ReponsiveImage isAs={true} url={"asset/tab.png"} /> : <div className="sample_msg">
      <h3>Sample Messages</h3>
      <ul className="list-group list-group-flush">{this.randomText.map(this.renderRandomMsgList)}</ul>
      </div>);
  };

  renderRandomMsgList = (item, index) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center" key={item + index}>
        {item}
        <span className="badge badge-success badge-pill msg_add_btn">
          <i onClick={() => { 
            this.setState({ randomMsg: item });
            setTimeout(() => {
              this.addmessage()
            }, 100);
          }} title="Remove" className="fa fa-plus-circle" aria-hidden="true" />
        </span>
      </li>
    );
  };

  addmessage = () => {
    const { randomMsg, messages } = this.state;
    if (randomMsg !== null && randomMsg !== "" && !messages.includes(randomMsg)) {
      messages.push(randomMsg);
      this.updateChange({ messages: messages });
    } else {
      window.gs.toast("Message Should be unique", { position: "top-right", type: window.gs.toast.TYPE.ERROR });
    }
  };

  onDrawerClose = () => {
    if (this.state.visible) this.setState({ visible: false });
    else this.setState({ visible: true });
  };

  back = () => {
    this.setState({ 
      randomMsg: "",
      messages: [],
    });
    this.props.history.push("/Create");
  };

  render() {
    return (
      <ToolLayout>
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6">{this.renderRight()}</div>
              <ButtonsGroup backUrl={this.back} save={this.onClickSave} />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">
            <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
          </div>
        </div>
      </ToolLayout>
    );
  }
}
