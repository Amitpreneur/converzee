import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil from "../../utils/ToolUtil";
import Util from "../Util";
import Text from "./Text";
import { ToolLayout, ButtonsGroup } from "../layout/ToolLayout";
import { SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import { OTO2, BONUS_CREATE } from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { Modal } from "antd";
import Style from "./Style";
import Code from "./Code";
import { OptinFormModalResponse, OptinFormModal } from "../utils/Modal";
import { Preview } from "./Preview";
import { ReponsiveImage } from "../comman/PreviewAble";

export default class ReviewEngin extends Component {
  state = {
    toolName: "",
    toolId: "",
    preview: false,
    _id: null,
    activeTab: 2,
    toolData: {
      style: [{ name: "Background", id: "backgound", value: "#fff3ea" }],
      items: [],
      position: "left",
    },
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: null }] },
  };
  loaded = false;

  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        this.loaded = true;
        if (res) {
          Util.isRedirected = true;
          const data = OptinFormModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 21;
      this.loaded = true;
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle(ToolUtil.getTool(toolId) + " " + "(" + Util.CAMPAIGNS_NAME + ")");
      delete window.gs.defaultLayout;
    }
  }

  onChangeActive = (tabIndex) => {
    const { activeTab } = this.state;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };

  codeChange = (data) => {
    this.setState({ CODE: data });
  };

  onUpdate = (data) => {
    const { toolData } = this.state;
    this.setState({ toolData: { ...toolData, ...data } });
  };

  renderMain = () => {
    const { activeTab, toolData, CODE } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
      case 2:
        component = <Text items={toolData.items} position={toolData.position} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Style style={toolData.style} onChange={this.onUpdate} />;
        break;
      case 5:
        component = <Code {...CODE} onChange={this.codeChange} />;
        break;
      default:
        component = <Text onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    if (this.state.CODE.include[0].url !== "") {
      RequestHandler.PostRequest(SAVE_TOOL, { toolData: OptinFormModal(this.state) }, (res, err) => {
        if (res) {
          const data1 = res.data;
          if (data1.success) {
            Modal.success({
              content: data1.message,
            });
            setTimeout(() => {
              this.props.history.push("/Campaigns");
            }, 1000);
          }
        }
      });
    } else {
      Modal.warning({
        content: "Should Contain atleast one trigger point",
      });
    }
  };

  renderRight = () => {
    // return <ReponsiveImage isAs={true} url={"asset/hb3.png"} />;
  };

  back = () => {
    this.props.history.push(BONUS_CREATE);
  };

  // togglePreview = () => {
  //   const { preview } = this.state;
  //   this.setState({ preview: !preview });
  // };

  render() {
    // const { preview } = this.state;
    return (
      <ToolLayout>
        {/* {preview ? <Preview {...this.state} onClose={this.togglePreview} /> : null} */}
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup backUrl={this.back} preview={this.togglePreview} save={this.onClickSave} />
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
