import React, { Component } from "react";
import "../../Create.css";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Timer from "./Timer";
import { MobileVibratorModal, MobileVibratorModalResponse } from "../../../utils/Modal";
import Util from "../../../Util";
import { Drawer } from "antd";
import { ButtonsGroup, ToolLayout } from "../../../layout/ToolLayout";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const mobVib = {
  activeTab: 1,
  TEXT: { campaignName: "", headline: "", subheadline: [""] },
  timing: { firstVib: 0, pause: 0, secondVib: 0 },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class MobileVibrator extends Component {
  state = mobVib;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = MobileVibratorModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 10;
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
        this.setState({ timing: data });
        break;
      case 2:
        this.setState({ code: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, timing, CODE } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Timer {...timing} onChange={this.onUpdate} />;
        break;
      default:
        // component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const { timing } = this.state;
    const { firstVib, pause, secondVib } = timing;
    const script = genCodeMobileVibartor(firstVib * 1000, pause * 1000, secondVib * 1000);
    window.gs.setScript(script);
    setTimeout(() => {
      this.props.history.push("/Campaigns");
    }, 3000);
  };

  renderRight = () => {
    return <ReponsiveImage isAs={true} url={"asset/mobilevab.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  render() {
    return (
      <ToolLayout>
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
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

function genCodeMobileVibartor(f, s, t) {
  return `<script>document.addEventListener("click",function(){navigator.vibrate([${f},${s},${t}]),document.removeEventListener("click",function(){})});</script>`;
}
