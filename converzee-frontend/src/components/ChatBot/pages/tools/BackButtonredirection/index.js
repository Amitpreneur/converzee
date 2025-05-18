import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Util from "../../../Util";
import { BackButtonRedirectionModal, BackButtonRedirectionModalResponse } from "../../../utils/Modal";
import { Modal } from "antd";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const backbutton = {
  activeTab: 1,
  TEXT: { redirectUrl: "" },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class BackButtonRedirection extends Component {
  state = backbutton;
  loaded = false;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = BackButtonRedirectionModalResponse(res);
          this.loaded = true;
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 15;
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
        this.setState({ CODE: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, CODE } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
      case 1:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Code case={2} {...CODE} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  renderRight = () => {
    return <ReponsiveImage isAs={true} url={"asset/back_button_redirect.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  onClickSave = () => { 
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(backbutton, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: BackButtonRedirectionModal(toolData) }, (res, err) => {
          if (res) {
            if (res.data) {
              Modal.success({
                content: "Campaign Save SuccessFully",
              });
              setTimeout(() => {
                this.props.history.push("/Campaigns");
              }, 1000);
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
