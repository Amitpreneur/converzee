import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil, { generateIframeContant, getDefaultItems } from "../../../../utils/ToolUtil";
import Util, { generateFile, parseImgUrl } from "../../../Util";
import Text from "./Text";
import Script from "./Script";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { getPath, GET_PIXEL, SAVE_TOOL, GET_ONE_TOOL, BASE_URL } from "../../../../actions/URLs";
import RequestHandler from "../../../../actions/RequestHandler";
import { Modal } from "antd";
import { LayoutSelector } from "../../../layout/LayoutSelector";
import Code from "./Code";
import { proofAppModalResponse, proofAppModal } from "../../../utils/Modal";
import Preview from "./Preview";
import { ReponsiveImage } from "../../../comman/PreviewAble";
import Style from "./Style";
import Display from "./Display";

export default class OptinForm extends Component {
  state = {
    toolName: "",
    toolId: "",
    preview: false,
    _id: null,
    activeTab: 1,
    toolData: {
      text: "bought the product",
      subText: "From",
      duration: 2,
      position: "bottomLeft",
      timeFirstUser: 0,
      timeBetweenTwoUser: 2,
    },
    STYLE: {
      elements: [
        { name: "titleColor", text: "Title", color: "#ed8a25" },
        { name: "subtitleColor", text: "Subtitle", color: "#292929" },
        { name: "logoColor", text: "Logo Color", color: "#292929" },
      ],
      selected: 0,
      displayFrequency:""
    },
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: null }] }
  };
  loaded = false;

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
          const data = proofAppModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "  " + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      let toolId = 25; this.loaded = true;
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
          this.setState({ toolData : { ...this.state.toolData, ...data} });
          break;
      case 3:
          this.setState({ toolData : { ...this.state.toolData, ...data} });
          break;
      case 5:
          this.setState({ STYLE : data });
          break;
      default:
          break;
    }
  };

  codeUpdate = (data) => {
    this.setState({ CODE: data });
  }

  renderMain = () => {
    const { activeTab, toolData, CODE, STYLE } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
        case 1:
            component = <Text text={toolData.text} subText={toolData.subText} timeFirstUser={toolData.timeFirstUser} timeBetweenTwoUser={toolData.timeBetweenTwoUser} cases={1} onChange={this.onUpdate} />;
            break;
        case 3:
            component = <Display toolData={toolData} cases={3} onChange={this.onUpdate} />;
            break;
        case 4:
            component = <Style {...STYLE} cases={5} onChange={this.onUpdate} />;
            break;
        default:
            component = <Code {...CODE} onChange={this.codeUpdate} />
            break;
    }
    return component;
  };

  onClickSave = () => {
    if (this.state.CODE.include[0].url !== "") {
      RequestHandler.PostRequest(SAVE_TOOL, { toolData: proofAppModal(this.state) }, (res, err) => {
        if (res) {
          const data1 = res.data;
          if (data1.success) {
            if (data1.script) {
              window.gs.setScript(data1.script);
            } else {
              Modal.success({
                content: data1.message,
              });
            }
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

  back = () => {
    this.props.history.push("/Create");
    window.gs.navTitle("Create")
  };

  togglePreview = () => {
    const { preview } = this.state;
    this.setState({ preview: !preview });
  };

  // renderRight = () => {
  //   const { activeTab, image, video } = this.state;
  //   if (activeTab === 1 && video.url) return <ReponsiveImage isVideo={true} url={video.url} />;
  //   if (activeTab === 2 && image) return <ReponsiveImage isImg={true} url={`https://d257yxqteot439.cloudfront.net/static/contains/${image}`} />;
  //   return (activeTab === 5 ? null : <ReponsiveImage isAs={true} url={"asset/video_pop_up.png"} />);
  // };

  render() {
    const { preview, toolData, activeTab  } = this.state;
    return (
      <ToolLayout>
        {preview ? <Preview {...this.state} onClose={this.togglePreview} /> : null}
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className={activeTab === 5 ? "col-md-12" : "col-md-6"}>{this.renderMain()}</div>
              <div className="col-md-6 mt-2"></div>
              <ButtonsGroup   
               preview={() => {
                this.setState({ preview: !preview });
              }}
              backUrl={this.back}
              save={this.onClickSave} 
            />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">
            <SideBar layout={toolData.layout} activeTab={activeTab} onChangeActive={this.onChangeActive} />
          </div>
        </div>
      </ToolLayout>
    );
  }
}
