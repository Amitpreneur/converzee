import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath, getBGPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Timer from "./Timer";
import Style from "./Style";
import Preview from "./Preview";
import Util from "../../../Util";
import _ from "lodash";
import { UrgencyTimerModal, UrgencyTimerModalResponse } from "../../../utils/Modal";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { Modal } from "antd";
const urgency = {
  activeTab: 2,
  showTimer: true,
  TEXT: { campaignName: "", redirectUrl: "" },
  TIMER: { HH: 0, MM: 0, SS: 0 },
  STYLE: {
    elements: [
      { name: "timerText", text: "Timer Color", color: "" },
      { name: "centralTimerLabel", text: "Label Color", color: "" },
    ],
    selected: 0,
    labelFont: 30,
    timerFont: 30,
    labelBold: 200,
    timerBold: 200,
  },
  toolData: { HH: "H", MM: "M", SS: "S" },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
  preview: false,
};
export default class UrgencyTimer extends Component {
  state = urgency;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      Util.isRedirected = true;
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          const data = UrgencyTimerModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 2;
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
        this.setState({ TIMER: data });
        break;
      case 3:
        this.setState({ STYLE: data });
        break;
      case 4:
        this.setState({ CODE: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, TIMER, STYLE, CODE, toolData } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text {...TEXT} toolData={toolData} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Timer TIMER={TIMER} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Style {...STYLE} case={3} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Code {...CODE} case={4} onChange={this.onUpdate} />;
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
      if (!Util.isArrayEqual(urgency, this.state)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: UrgencyTimerModal(toolData) }, (res, err) => {
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
    const { showTimer } = this.state;
    return showTimer ? (
      <center>
        <Preview {...this.state} />
      </center>
    ) : (
      ""
    );
  };

  refreshTimer = () => {
    this.setState({ showTimer: false }, () => {
      this.setState({ showTimer: true });
    });
  };

  back = () => {
    this.props.history.push("/Create");
  };

  render() {
    const { preview } = this.state;

    return (
      <ToolLayout>
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row" style={{ minHeight: "495px" }}>
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2" style={{ backgroundSize: "contain", padding: "5%", backgroundRepeat: "no-repeat", backgroundImage: getBGPath("/asset/centralTimerBg.png") }}>
                {this.renderRight()}
              </div>
              <ButtonsGroup refresh={this.refreshTimer} backUrl={this.back} save={this.onClickSave} />
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
