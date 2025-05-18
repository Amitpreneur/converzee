import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil, { generateIframeContant, getDefaultItems } from "../../utils/ToolUtil";
import Util, { generateFile, parseImgUrl } from "../Util";
import Text from "./Text";
import CTA from "./CTA";
import { ToolLayout, ButtonsGroup } from "../layout/ToolLayout";
import { getPath, GET_PIXEL, SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import { OTO2 } from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { Modal } from "antd";
import { LayoutSelector } from "../layout/LayoutSelector";
import { OptinFormModalResponse, OptinFormModal } from "../utils/Modal";
import { Preview } from "./Preview";
import { ReponsiveImage } from "../comman/PreviewAble";
import Code from "./Code";

export default class SpecialBonusOptin extends Component {
  state = {
    toolName: "",
    toolId: "",
    preview: false,
    _id: null,
    activeTab: 2,
    toolData: {
      text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
      cta: '<font color="#efefef"><span style="font-size: 18px;">Buy Now</span></font>',
      layout: 0,
      template: 0,
      style: [
        { name: "Background", id: "backgound", value: "TRANSPARENT" },
        { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
      ],
      timerType: "DATE_AND_TIME_BASED",
      endDateTime: "",
      timeZone: Util.getTimeZoneList()[0].value,
      postExpiryAction: "hide",
      redirectUrl: "",
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 2,
      bgImg: "#fff",
      isBGIMG: false,
      noThanks: "No thanks",
      subTitle: "Subtitle here",
      position: "TOP",
      isNameInput: false,
    },
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: null }] },
  };
  loaded = false;
  layouts = [];
  templates = [];

  componentWillMount() {
    if (window.gs.ie) {
      const ie = getDefaultItems(window.gs.ie);
      let { toolData } = this.state;
      this.state.toolData = { ...toolData, ...ie };
      window.gs.ie = null;
    }
  }

  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        this.loaded = true;
        if (res) {
          Util.isRedirected = true;
          const data = OptinFormModalResponse(res);
          this.setTemplateslayout(this.state.toolData.layout);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "  " + this.getLayoutName(this.state.toolData.layout) + "  " + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 23;
      this.loaded = true;
      const defLayout = window.gs.defaultLayout || 0;
      this.setTemplateslayout(defLayout);
      this.onLayoutChange(defLayout);
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle(ToolUtil.getTool(toolId) + "  " + this.getLayoutName(defLayout) + "  " + "(" + Util.CAMPAIGNS_NAME + ")");
      delete window.gs.defaultLayout;
    }
  }
  getLayoutName = (i) => {
    if (i == 0) return "Hello Bar";
    if (i == 1) return "Hello Bar + Timer";
    if (i == 2) return "Exit Intent";
  };

  onLayoutChange = (index) => {
    const { toolData } = this.state;
    this.setState({ toolData: { ...toolData, layout: index } });
  };

  onTemplateChange = (index) => {
    const { toolData } = this.state;
    this.setState({ toolData: { ...toolData, template: index } });
  };

  setTemplateslayout = (layout) => {
    if (layout == 0) {
      this.templates = [
        "asset/optin-layouts/hello/h1.PNG",
        "asset/optin-layouts/hello/h2.PNG",
        "asset/optin-layouts/hello/h3.PNG",
        "asset/optin-layouts/hello/h4.PNG",
        "asset/optin-layouts/hello/h5.PNG",
      ];
    } else {
      this.templates = ["asset/optin-layouts/exit/1.png", "asset/optin-layouts/exit/2.png", "asset/optin-layouts/exit/3.png", "asset/optin-layouts/exit/4.png", "asset/optin-layouts/exit/5.png"];
    }
  };

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
      case 1:
        component = <LayoutSelector isExit={toolData.layout == 2 ? true : false} onLayoutSelect={this.onTemplateChange} selected={toolData.template} items={this.templates} />;
        break;
      case 2:
        component = <Text text={toolData.text} isNameInput={toolData.isNameInput} noThanks={toolData.noThanks} subTitle={toolData.subTitle} layout={toolData.layout} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <CTA cta={toolData.cta} position={toolData.position} layout={toolData.layout} onChange={this.onUpdate} />;
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
    const { toolData } = this.state;
    if (toolData.layout === 2 && toolData.isBGIMG) {
      return <ReponsiveImage isImg={true} url={toolData.bgImg} />;
    }
    if (toolData.layout === 0) {
      return <ReponsiveImage isAs={true} url={"asset/hb3.png"} />;
    }
    if (toolData.layout === 1) {
      return <ReponsiveImage isAs={true} url={"asset/hbt3.png"} />;
    }
    if (toolData.layout === 2) {
      return <ReponsiveImage isAs={true} url={"asset/exit_pop_up.png"} />;
    }
  };

  back = () => {
    this.props.history.push(OTO2);
  };

  togglePreview = () => {
    const { preview } = this.state;
    this.setState({ preview: !preview });
  };

  render() {
    const { preview } = this.state;
    return (
      <ToolLayout>
        {preview ? <Preview {...this.state} onClose={this.togglePreview} /> : null}
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup backUrl={this.back} preview={this.togglePreview} save={this.onClickSave} />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">
            <SideBar layout={this.state.toolData.layout} activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
          </div>
        </div>
      </ToolLayout>
    );
  }
}
