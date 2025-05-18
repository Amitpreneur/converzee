import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
// import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil, { generateIframeContant } from "../../../../utils/ToolUtil";
import Util, { generateFile } from "../../../Util";
import { OfferIframeModal } from "../../../utils/Modal";
import Text from "./Text";
import SuccessPopup from "../../../comman/SuccessPopUp";
import { Drawer, Modal } from "antd";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
export default class OfferIframe extends Component {
  state = {
    activeTab: 1,
    TEXT: { url: "", title: "" },
  };
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = res.data.campaigns;
          Object.assign(data, { _id: id, toolName: ToolUtil.getTool(data.toolId), toolId: data.toolId, name: data.data });
          this.setState({ ...data });
          window.gs.navTitle(ToolUtil.getTool(data.toolId));
        }
      });
    } else {
      const toolId = 14;
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
        this.setState({ cta: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 2:
        // component = <Timing {...template} onChange={this.onUpdate} />;
        break;
      case 3:
        // component = <Code {...CODE} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const { TEXT } = this.state;
    generateFile("index.html", generateIframeContant(TEXT.url, TEXT.title));
    Modal.success({
      content: "File has been Donwloaded",
    });
    setTimeout(() => {
      this.props.history.push("/Create");
    }, 2000);
  };

  renderRight = () => {
    return <img src={getPath("/asset/Iframegraphic.png")} className="img-fluid" alt="Responsive image"></img>;
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
              <ButtonsGroup backUrl={this.back} download={this.onClickSave} />
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
