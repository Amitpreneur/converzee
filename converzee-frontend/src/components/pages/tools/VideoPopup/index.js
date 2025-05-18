import React, { Component } from "react";
import "../../Create.css";
import Code from "../../../subpages/create/Code";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL, getPath } from "../../../../actions/URLs";
import Text from "./Text";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Style from "./Style";
import Video from "./Video";
import Preview from "./Preview";
import Util from "../../../Util";
import { VideoPopUpModalResponse, VideoPopUpModal } from "../../../utils/Modal";
import Image from "./Image";
import { ToolLayout, ButtonsGroup } from "../../../layout/ToolLayout";
import { Modal } from "antd";
import { ReponsiveImage } from "../../../comman/PreviewAble";

const vidoPop = {
  activeTab: 1,
  image: "",
  TEXT: { campaignName: "" },
  video: { url: "", videoType: "youtube" },
  STYLE: {
    elements: [{ name: "background", text: "Video Background", color: "" }],
    switchElement: false,
    selected: 0,
  },
  CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: "" }] },
};
export default class VideoPopup extends Component {
  state = vidoPop;
  loaded = false;
  onVideoChange = (switchElement) => {
    this.setState({ STYLE: { switchElement } });
  };
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          this.loaded = true;
          Util.isRedirected = true;
          const data = VideoPopUpModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 5;
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
        this.setState({ video: data });
        break;
      case 3:
        this.setState({ STYLE: data });
        break;
      case 4:
        this.setState({ CODE: data });
        break;
      case 5:
        this.setState({ image: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, video, STYLE, CODE, image } = this.state;
    if (!this.loaded) return null;
    let component = null;
    switch (activeTab) {
      case 15:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 1:
        component = <Video {...video} onVideoChange={this.onVideoChange} switchElement={STYLE.switchElement} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Style {...STYLE} case={3} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <Code {...CODE} case={4} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Image image={image} case={5} onChange={this.onUpdate} />;
        break;
      default:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (this.state.CODE.include[0].url !== "") {
      if (!Util.isArrayEqual(vidoPop, this.state, 3)) {
        if(toolData.image != "") {
          RequestHandler.PostRequest(SAVE_TOOL, { toolData: VideoPopUpModal(toolData) }, (res, err) => {
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
        } else {
          window.gs.toast("Please select thumb file.", { position: "bottom-right", type: window.gs.toast.TYPE.ERROR });
        }
      }
    } else {
      Modal.warning({
        content: "Should Contain atleast one trigger point",
      });
    }
  };

  renderRight = () => {
    const { activeTab, image, video } = this.state;
    if (activeTab === 1 && video.url) return <ReponsiveImage isVideo={true} url={video.url} />;
    if (activeTab === 4 && image) return <ReponsiveImage isImg={true} url={`${image}`} />;
    return <ReponsiveImage isAs={true} url={"asset/video_pop_up.png"} />;
  };

  back = () => {
    this.props.history.push("/Create");
  };

  closePopup = () => {
    this.setState({ preview: false });
  };

  render() {
    const { preview, video } = this.state;

    return (
      <ToolLayout>
        <div className="row">
          {preview ? <Preview {...this.state} closePopup={this.closePopup} /> : null}
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup
                preview={ video.url!="" ? () => {
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
