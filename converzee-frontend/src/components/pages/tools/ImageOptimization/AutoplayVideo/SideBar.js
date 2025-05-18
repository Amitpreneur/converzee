import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const LAYOUT_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const VIDEO_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const THUMB_IMG = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const ICONS_IMG = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const TEXT_IMG = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const INSTALL_SCRIPT = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const TIG_IMG = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={VIDEO_IMG}>
          <SideButton class={"fa fa-video-camera"} text="Video" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(2)} className={THUMB_IMG}>
          <SideButton class={"fa fa-paint-brush"} text="Thumbnail"/>
        </div> */}
        <div onClick={() => this.props.onChangeActive(3)} className={ICONS_IMG}>
          <SideButton class={"fa fa-play-circle-o"} text="Icons"/>
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={TEXT_IMG}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(5)} className={INSTALL_SCRIPT}>
          <SideButton class={"fa fa-envelope"} text="Install Script" />
        </div> */}
        <div onClick={() => this.props.onChangeActive(6)} className={TIG_IMG}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
