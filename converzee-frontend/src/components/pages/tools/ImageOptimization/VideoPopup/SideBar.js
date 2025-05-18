import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const TextImg = activeTab === 1 ? "active-side-button" : "";
    const VideoImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    // const StyleImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const ThumbImg = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";

    return (
      <div>
        {/* <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Text</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(1)} className={VideoImg}>
          <SideButton class={"fa fa-video-camera"} text="Video" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(2)} className={ StyleImg}>
          <i class="fa fa-paint-brush" aria-hidden="true"></i>
          <div>Style</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(4)} className={ThumbImg}>
          <SideButton class={"fa fa-paint-brush"} text="Thumbnail" />
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </div>
    );
  }
}
