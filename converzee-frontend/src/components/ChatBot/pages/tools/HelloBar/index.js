import React, { Component } from "react";
import "./index.css";
import CreateSideBar from "./CreateSideBar";
import CreateText from "./CreateText";
import Code from "./Code";
import Style from "./Style";
import Layout from "./Layout";
import Timer from "./Timer";
import CTA from "./CTA";
import RequestHandler from "../../../../actions/RequestHandler";
import { SAVE_TOOL, GET_ONE_TOOL, getPath } from "../../../../actions/URLs";
import ToolUtil from "../../../../utils/ToolUtil";
import Util from "../../../Util";
import Preview from "./Preview";
import { HELLOBARModal, HELLOBARModalResponse } from "../../../utils/Modal";
import { Modal } from "antd";
import { ButtonsGroup, ToolLayout } from "../../../layout/ToolLayout";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const helloBarr = {
  toolName: "",
  activeTab: 4,
  create: { campaignName: Util.CAMPAIGNS_NAME, helloBarPos: "top", textBody: "Copy coupon code to get <br>$5 instant discount", cpCode: "CODE", codeText: "" },
  cta: { ctaText: "GET ACCESS NOW!", ctaAction: "redirect", redirectUrl: "" },
  timer: { timerType: "", endDateTime: new Date(), timeZone: Util.getTimeZoneList()[0].value, whenTimeExp: "" },
  layout: 0,
  STYLE: {
    elements: [
      { name: "highlight", text: "Hello bar", color: "#420068" },
      { name: "highlightCTA", text: "CTA Background", color: "#ffcc00" },
    ],
    selected: 0,
  },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
  file: { file: [] },
  toolId: 0,
  status: true,
  openPopUp: false,
  popUpScript: "",
  preview: false,
  _id: null,
  // templateType: null
};
export default class HelloBar extends Component {
  static CAMPAIGNS_NAME = "";
  toolId = 0;
  state = helloBarr;
  templates = ["asset/hbt4.PNG", "asset/hbt2.PNG", "asset/hbt1.PNG"];
  loaded = false;
  editedData ;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        this.loaded = true;
        if (res) {
          Util.isRedirected = true;
          const data = HELLOBARModalResponse(res);
          if (data) {
            this.editedData = data;
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 3;
      this.loaded = true;
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle(ToolUtil.getTool(toolId) + "(" + Util.CAMPAIGNS_NAME + ")");
    }
  }
  onChangeActive = (tabIndex) => {
    const { activeTab, layout } = this.state;
    // if (tabIndex === 2 && layout === 1) return;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  onUpdate = (index, data) => {
    switch (index) {
      case 1:
        this.setState({ create: data });
        break;
      case 2:
        this.setState({ cta: data });
        break;
      case 3:
        this.setState({ timer: data });
        break;
      case 4:
        this.changeHelloBarSetting(data);
        // this.setState({ layout: data });
        break;
      case 5:
        this.setState({ STYLE: data });
        break;
      case 6:
        this.setState({ CODE: data });
        break;
      case 7:
        this.setState({ file: data });
        break;
      default:
        break;
    }
  };

  changeHelloBarSetting = (data) => {
    if(this.state._id) {
      if(data === this.editedData.layout) {
        this.setState({
          ...this.editedData,
          layout: data
        })
      } else {
        this.changeLayoutProperties(data);
      }
    } else {
      this.changeLayoutProperties(data);
    }    
  }
  
  changeLayoutProperties = (data) => {
    if(data === 2 ) {
      helloBarr.create.textBody = "This is a Demo Hellobar Text <br> Grab it Now!";
      helloBarr.cta.ctaText = "GET ACCESS NOW!";
      helloBarr.STYLE.elements[0].color = "#6635dc";
      helloBarr.STYLE.elements[1].color = "#ffffff";
      this.setState({
        ...this.state,
        STYLE : helloBarr.STYLE,
        create : {
          ...this.state.create,
          textBody : helloBarr.create.textBody
        },
        layout: data
      });
    } else if(data === 1) {
      helloBarr.create.textBody = "This is a Demo Hellobar Text ";
      helloBarr.cta.ctaText = "BUY NOW!";
      helloBarr.STYLE.elements[0].color = "#dc3545";
      helloBarr.STYLE.elements[1].color = "#012f0f";
      this.setState({
        ...this.state,
        STYLE : helloBarr.STYLE,
        create : {
          ...this.state.create,
          textBody : helloBarr.create.textBody
        },
        layout: data
      });
    } else {
      helloBarr.create.textBody = "Copy coupon code to get <br>$5 instant discount";
      helloBarr.cta.ctaText = "GET ACCESS NOW!";
      helloBarr.STYLE.elements[0].color = "#420068";
      helloBarr.STYLE.elements[1].color = "#ffcc00";
      this.setState({
        ...this.state,
        STYLE : helloBarr.STYLE,
        create : {
          ...this.state.create,
          textBody : helloBarr.create.textBody
        },
        layout: data
      });
    }
  }

  renderMain = () => {
    const { activeTab, create, cta, timer, layout, STYLE, CODE, file } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
      case 1:
        component = <CreateText layout={layout} {...create} cases={1} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <CTA {...cta} cases={2} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Timer {...timer} cases={3} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Layout layout={layout} cases={4} onChange={this.onUpdate} />;
        break;
      case 5:
        component = <Style {...STYLE} cases={5} onChange={this.onUpdate} />;
        break;
      case 6:
        component = <Code {...CODE} cases={6} onChange={this.onUpdate} />;
        break;
      default:
        component = <CreateText {...create} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(helloBarr, this.state, 3)) {
        RequestHandler.PostRequest(SAVE_TOOL, { toolData: HELLOBARModal(toolData) }, (res, err) => {
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
    const { layout } = this.state;
    if (layout === 0) return <ReponsiveImage isAs={true} url={"asset/hb1.png"} />;
    if (layout === 1) return <ReponsiveImage isAs={true} url={"asset/hb2.png"} />;
    return <ReponsiveImage isAs={true} url={"asset/hb3.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  render() {
    const itemId = this.props.location.state;
    const { preview } = this.state;

    return (
      <ToolLayout>
        <div className="row">
          {preview ? <Preview {...this.state} /> : null}
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
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
            <CreateSideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} {...itemId} />
          </div>
        </div>
      </ToolLayout>
    );
  }
}
