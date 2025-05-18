import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Image from "./Image";
import Style from "../../../subpages/create/Style";
import Preview from "./Preview";
import Util from "../../../Util";
import { ImagePopupModalResponse, ImagePopupModal } from "../../../utils/Modal";
import { Modal } from "antd";
import { ButtonsGroup, ToolLayout } from "../../../layout/ToolLayout";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const imagePop = {
  activeTab: 1,
  TEXT: { campaignName: "" },
  image: "",
  STYLE: {
    elements: [{ name: "highlightBackground", text: "Highlight Background", color: "" }],
    selected: 0,
  },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class ImagePopup extends Component {
  state = imagePop;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = ImagePopupModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 4;
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
        this.setState({ image: data });
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
    const { activeTab, TEXT, image, STYLE, CODE } = this.state;
    let component = null;
    switch (activeTab) {
      case 15:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 1:
        component = <Image image={image} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Style {...STYLE} case={3} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Code {...CODE} case={4} onChange={this.onUpdate} />;
        break;
      default:
        // component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(imagePop, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: ImagePopupModal(toolData) }, (res, err) => {
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
    const { activeTab, image } = this.state;
    if (activeTab === 1 && image) return <ReponsiveImage isImg={true} url={image} />;
    return <ReponsiveImage isAs={true} url={"asset/image_pop_up.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  closePopup = () => {
    this.setState({ preview: false });
  };

  render() {
    const { preview, image } = this.state;
    return (
      <ToolLayout>
        <div className="row loki">
          {preview ? <Preview {...this.state} closePopup={this.closePopup} /> : null}
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup
                preview={ image!="" ? () => {
                  this.setState({ preview: !preview });
                } : null}
                backUrl={this.back}
                save={this.onClickSave}
              />
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
