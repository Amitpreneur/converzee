import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath, getBGPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Style from "./Style";
import Timer from "../../../subpages/create/Timer";
import Layout from "../../../subpages/create/Layout";
import Util from "../../../Util";
import Preview from "./Preview";
import { CentralTimerModalResponse, CentralTimerModal } from "../../../utils/Modal";
import { Drawer, Modal } from "antd";
import { ButtonsGroup, ToolLayout } from "../../../layout/ToolLayout";

const centraltime = {
  activeTab: 1,
  TEXT: { campaignName: "", timerText: "", timerLabel: { DD: "Days", HH: "Hours", MM: "Mintues", SS: "Second" } },
  timer: { timerType: "DATE_AND_TIME_BASED", endDateTime: new Date(), timeZone: Util.getTimeZoneList()[0].value, whenTimeExp: "hide", url: "", DD: 0, HH: 0, MM: 0, SS: 0 },
  layout: 1,
  STYLE: {
    elements: [
      { name: "centralTimer", text: "Central Timer", color: "#000" },
      // { name: "centralTimerTitle", text: "Central Timer Title", color: "" },
      { name: "centralTimerLabel", text: "Central Timer Label", color: "#000" },
    ],
    selected: 0,
    timerFont: 30,
    timerLabelFont: 20,
  },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class CentralTimer extends Component {
  state = centraltime;
  loaded = false;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          this.loaded = true;
          Util.isRedirected = true;
          const data = CentralTimerModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 6;
      this.loaded = true;
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
        this.setState({ TEXT: data });
        break;
      case 2:
        this.setState({ timer: data });
        break;
      case 3:
        this.setState({ layout: data });
        break;
      case 4:
        this.setState({ STYLE: data });
        break;
      case 5:
        this.setState({ CODE: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, timer, layout, STYLE, CODE } = this.state;
    if (!this.loaded) return null;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Timer case={2} {...timer} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Layout layout={layout} case={3} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Style {...STYLE} case={4} onChange={this.onUpdate} />;
        break;
      case 5:
        component = <Code {...CODE} case={5} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;

    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(centraltime, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: CentralTimerModal(toolData) }, (res, err) => {
          if (res) {
            if (res.data.script) {
              window.gs.setScript(res.data.script);
              setTimeout(() => {
                this.props.history.push("/Campaigns");
              }, 3000);
            } else {
              window.gs.toast(res.data.message, { position: "bottom-right", type: window.gs.toast.TYPE.FAILED });
            }
          } else {
            console.log(err);
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
    return <Preview {...this.state} />;
    // return <img src={getPath("/asset/Iframegraphic.png")} class="img-fluid" alt="Responsive image"></img>;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  render() {
    const { preview } = this.state;

    return (
      <ToolLayout>
        <div className="row">
          {/* {preview ? <Preview {...this.state} /> : null} */}
          <div className="col-10 toolItem">
            <div className="row" style={{ minHeight: "495px" }}>
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 ct_preview" style={{ backgroundSize: "contain", padding: "5%", backgroundRepeat: "no-repeat", backgroundImage: getBGPath("/asset/centralTimerBg.png") }}>
                {this.renderRight()}
              </div>
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
