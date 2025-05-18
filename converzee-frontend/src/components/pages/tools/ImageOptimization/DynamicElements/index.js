import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import { DynemicElementModal, DynemicElementModalResponse } from "../../../utils/Modal";
import Util from "../../../Util";
import Style from "./Style";
import { Drawer, Modal } from "antd";
import SuccessPopup from "../../../comman/SuccessPopUp";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const dyelement = {
  activeTab: 1,
  STYLE: {
    elements: [
      { name: "background", text: "Background Color", color: "" },
      { name: "textColor", text: "Text Color", color: "" },
    ],
    selected: 0,
    position: "BR",
    fontSize: "15",
  },
  items: [
    { index: 1, icon: "fa fa-whatsapp", text: "Whatsapp", link: "" },
    { index: 2, icon: "fa fa-facebook-square", text: "Facebook", link: "" },
    { index: 3, icon: "fa fa-linkedin-square", text: "Linkedin", link: "" },
    { index: 4, icon: "fa fa-reddit-square", text: "Reddit", link: "" },
    { index: 5, icon: "fa fa-skype", text: "Skype", link: "" },
    { index: 6, icon: "fa fa-vimeo-square", text: "Vimeo", link: "" },
    { index: 7, icon: "fa fa-twitter-square", text: "Twitter", link: "" },
    { index: 8, icon: "fa fa-telegram", text: "Telegram", link: "" },
    { index: 9, icon: "fa fa-instagram", text: "Instagram", link: "" },
    { index: 10, icon: "fa fa-behance-square", text: "Behance", link: "" },
    { index: 11, icon: "fa fa-dribbble", text: "Dribbble", link: "" },
    { index: 12, icon: "fa fa-pinterest-square", text: "Pinterest", link: "" } 
  ],
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class DynamicElement extends Component {
  state = dyelement;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = DynemicElementModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 13;
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
      default:
        break;
    }
  };

  updateItems = (data) => {
    this.setState({ ...data });
  };

  renderMain = () => {
    const { activeTab, items, STYLE, CODE } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text items={items} onChange={this.updateItems} />;
        break;
      case 2:
        component = <Style {...STYLE} case={1} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Code {...CODE} case={2} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text items={items} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(dyelement, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: DynemicElementModal(toolData) }, (res, err) => {
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

  renderRight = () => {
    return (this.state.activeTab === 1 ? null : <ReponsiveImage isAs={true} url={"asset/dynamic.png"} />);
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
              <div className={(this.state.activeTab === 1 ? "col-md-12" : "col-md-6")}>{this.renderMain()}</div>
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
