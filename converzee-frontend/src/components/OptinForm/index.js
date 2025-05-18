import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil, { generateIframeContant, getDefaultItems } from "../../utils/ToolUtil";
import Util, { generateFile, parseImgUrl } from "../Util";
import Text from "./Text";
import Responders from "./Responders";
import CTA from "./CTA";
import { ToolLayout, ButtonsGroup } from "../layout/ToolLayout";
import { getPath, GET_PIXEL, SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import RequestHandler from "../../actions/RequestHandler";
import { Modal } from "antd";
import Style from "./Style";
import Code from "./Code";
import { OptinFormModalResponse, OptinFormModal } from "../utils/Modal";
import Time from "./Time";
import { Preview } from "./Preview";
import { ReponsiveImage } from "../comman/PreviewAble";
import Video from "../pages/tools/VideoPopup/Video";
import Image from "../pages/tools/VideoPopup/Image";
import Icons from "./Icons";

export default class OptinForm extends Component {
  state = {
    video: { url: "", videoType: "youtube" },
    toolName: "",
    toolId: "",
    preview: false,
    _id: null,
    activeTab: 2,
    toolData: {
      text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
      cta: '<font color="#efefef"><span style="font-size: 18px;">Buy Now</span></font>',
      layout: 0,
      style: [
        { name: "Background", id: "backgound", value: "TRANSPARENT" },
        { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
      ],
      timerType: "DATE_AND_TIME_BASED",
      endDateTime: new Date(),
      timeZone: Util.getTimeZoneList()[0].value,
      postExpiryAction: "hide",
      ctaRedirectUrl: "",
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
      ctaAction: "redirect",
    },
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: null }] },
    AutoResponder: {
      mailServer: "MAILCHIMP",
      uid: "",
      formData: ""
    },
  };
  loaded = false;
  layouts = ["asset/optin-layouts/0.png", "asset/optin-layouts/0.png", "asset/optin-layouts/0.png"];

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
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "  " + this.getLayoutName(this.state.toolData.layout) + "  " + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      let toolId = 19; this.loaded = true;
      const defLayout = window.gs.defaultLayout || 0;
      this.onLayoutChange(defLayout);
      if(defLayout === 3){
        this.setState({ activeTab: 1 });
      }
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
    if (i == 3) return "Autoplay Video";
    if (i == 4) return "Purchase Proof";
  };
  onLayoutChange = (index) => {
    const { toolData } = this.state;
    this.setState({ toolData: { ...toolData, layout: index } });
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

  changeAutoResponder = (data) => {
    this.setState({AutoResponder: { ...this.state.AutoResponder, ...data} });
  }

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
        component = <Video onVideoChange={this.onVideoChange} layout={toolData.layout} items={this.layouts} onChange={this.onUpdate}/>;
        break;
      case 2:
        component = <Text text={toolData.text} isNameInput={toolData.isNameInput} subTitle={toolData.subTitle} layout={toolData.layout} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <CTA cta={toolData.cta} ctaRedirectUrl={toolData.ctaRedirectUrl} ctaAction={toolData.ctaAction} position={toolData.position} layout={toolData.layout} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Style style={toolData.style} bgImg={toolData.bgImg} isBGIMG={toolData.isBGIMG} layout={toolData.layout} onChange={this.onUpdate} />;
        break;
      case 5:
        component = <Code {...CODE} onChange={this.codeChange} />;
        break;
      case 6:
        component = (
          <Time
            timerType={toolData.timerType}
            endDateTime={toolData.endDateTime}
            timeZone={toolData.timeZone}
            postExpiryAction={toolData.postExpiryAction}
            redirectUrl={toolData.redirectUrl}
            days={toolData.days}
            hours={toolData.hours}
            minutes={toolData.minutes}
            seconds={toolData.seconds}
            onChange={this.onUpdate}
          />
        );
        break;
      case 7:
        component = <Responders mailServer={this.state.AutoResponder.mailServer} uid={this.state.AutoResponder.uid} onChange={this.changeAutoResponder} />;
        break;
      case 8:
        component = <Image layout={toolData.layout} items={this.layouts} onChange={this.onUpdate} />;
        break;
      case 9:
        component = <Icons layout={toolData.layout} items={this.layouts} onChange={this.onUpdate} />;
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
    const { toolData, activeTab } = this.state;
    if (toolData.layout === 2 && toolData.isBGIMG) {
      return <ReponsiveImage isImg={true} url={toolData.bgImg} />;
    }
    if (toolData.layout === 0 && activeTab !== 7) {
      return <ReponsiveImage isAs={true} url={"asset/hb3.png"} />;
    }
    if (toolData.layout === 1 && activeTab !== 7) {
      return <ReponsiveImage isAs={true} url={"asset/hbt3.png"} />;
    }
    if (toolData.layout === 2 && activeTab !== 7) {
      return <ReponsiveImage isAs={true} url={"asset/exit_pop_up.png"} />;
    }
  };

  back = () => {
    this.props.history.push("/Dashboard");
  };

  togglePreview = () => {
    const { preview } = this.state;
    this.setState({ preview: !preview });
  };

  render() {
    const { preview, activeTab } = this.state;
    return (
      <ToolLayout>
        {preview ? <Preview {...this.state} onClose={this.togglePreview} /> : null}
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className={ activeTab===7 ? "col-md-12":"col-md-6"}>{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup   
               preview={ () => {
                this.setState({ preview: !preview });
              }}
              backUrl={this.back}
              save={this.onClickSave} />
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
