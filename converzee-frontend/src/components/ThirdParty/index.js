import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil, { generateIframeContant } from "../../utils/ToolUtil";
import Util, { generateFile } from "../Util";
import Text from "./Text";
import { ToolLayout, ButtonsGroup } from "../layout/ToolLayout";
import { getPath, GET_PIXEL, CHECKOTO2 } from "../../actions/URLs";
import { OTO2 } from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { Modal } from "antd";
export default class ThirdParty extends Component {
  state = {
    activeTab: 1,
    TEXT: { url: "", title: "" },
  };
  componentDidMount() {
    window.gs.navTitle(ToolUtil.getTool(18) + "(" + Util.CAMPAIGNS_NAME + ")");
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
      default:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const { TEXT } = this.state;
    const { url, title } = TEXT;
    if (url && title) {
      RequestHandler.PostRequest(CHECKOTO2, {}, (res, err) => {
        if (res) {
          const pixel = res.data.pixel;
          if (res.data.isValid) {
            if (pixel) {
              generateFile("index.html", generateIframeContant(url, title, pixel));
              Modal.success({
                content: "File has been Donwloaded",
              });
              setTimeout(() => {
                this.props.history.push("/OTO2");
              }, 2000);
            }
          } else {
            window.gs.toast("Limit Execeed", { position: "bottom-right", autoClose: false, type: window.gs.toast.TYPE.ERROR });
          }
        }
      });
    } else {
      window.gs.toast("URL & TITLE not to be empty", { position: "bottom-right", autoClose: false, type: window.gs.toast.TYPE.ERROR });
    }
  };

  renderRight = () => {
    return <img src={getPath("asset/Iframegraphic.png")} class="img-fluid" alt="Responsive image"></img>;
  };

  back = () => {
    this.props.history.push(OTO2);
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
