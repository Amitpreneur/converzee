import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Style from "./Style";
import Media from "./Media";
import CTA from "./CTA";
import NoThanks from "./NoThanks";
import Util from "../../../Util";
import Preview from "./Preview";
import { ExitIntentModal, ExitIntentModalResponse } from "../../../utils/Modal";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { Modal } from "antd";
import { ReponsiveImage } from "../../../comman/PreviewAble";
const exitInt = {
  activeTab: 1,
  headline: "Lorem ipsum sit amet!",
  subheadline: "Eiusmod tempor nibh veniam incididunt",
  isInput: false,
  mediaType: "IMAGE",
  url: "",
  ctaText: "GET STARTED NOW",
  ctaAction: "#",
  redirectUrl: "",
  noThanksText: "No Thanks",
  STYLE: {
    elements: [
      { name: "popupBackgoundColor", text: "Popup Background Color", color: "" },
      { name: "ctaBackgound", text: "CTA Background", color: "" },
    ],
    height: 50,
    width: 50,
    selected: 0,
    isbackGroundImage: false,
    backgroundImage: "",
  },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class ExitIntent extends Component {
  state = exitInt;
  loaded = false;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          this.loaded = true;
          Util.isRedirected = true;
          const data = ExitIntentModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      this.loaded = true;
      const toolId = 9;
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
        this.setState({ template: data });
        break;
      case 3:
        this.setState({ media: data });
        break;
      case 4:
        this.setState({ cta: data });
        break;
      case 5:
        this.setState({ noThanks: data });
        break;
      case 6:
        this.setState({ STYLE: data });
        break;
      case 7:
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
    const { activeTab, headline, subheadline, noThanksText, template, mediaType, url, ctaAction, ctaText, redirectUrl, noThanks, STYLE, CODE, isInput } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
      case 1:
        component = <Text headline={headline} subheadline={subheadline} onChange={this.updateChange} />;
        break;
      // case 2:
      //   component = <Layout layout={template} case={2} onChange={this.onUpdate} />;
      //   break;
      case 3:
        component = <Media isInput={isInput} mediaType={mediaType} url={url} onChange={this.updateChange} />;
        break;
      case 4:
        component = <CTA ctaAction={ctaAction} ctaText={ctaText} redirectUrl={redirectUrl} onChange={this.updateChange} />;
        break;
      case 5:
        component = <NoThanks noThanksText={noThanksText} onChange={this.updateChange} />;
        break;
      case 6:
        component = <Style {...STYLE} case={6} onChange={this.onUpdate} />;
        break;
      case 7:
        component = <Code {...CODE} case={7} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text headline={headline} subheadline={subheadline} onChange={this.updateChange} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(exitInt, this.state, 3)) {
        if(!toolData.url) {
          toolData.url = "box.png";
        } 
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: ExitIntentModal(toolData) }, (res, err) => {
          if (res) {
            if (res.data.success) {
              Modal.success({
                content: "Campaign Save SuccessFully",
              });
              setTimeout(() => {
                this.props.history.push("/Campaigns");
              }, 1000);
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
    const { activeTab, url, mediaType, STYLE } = this.state;
    if (activeTab === 3 && url) {
      if (mediaType === "IMAGE") return <ReponsiveImage isImg={true} url={url} />;
      return <ReponsiveImage isVideo={true} url={url} />;
    }
    if (activeTab === 6 && STYLE.isbackGroundImage) {
      return <ReponsiveImage isImg={true} url={STYLE.backgroundImage} />;
    }
    return <ReponsiveImage isAs={true} url={"asset/exit_pop_up.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  closePopup = () => {
    this.setState({ preview: false });
  };

  render() {
    const { preview, url } = this.state;
    // const preview = true;
    return (
      <ToolLayout>
        <div className="row">
          {preview ? <Preview {...this.state} closePopup={this.closePopup} /> : null}
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup
                preview={ () => {
                  this.setState({ preview: !preview });
                }}
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
