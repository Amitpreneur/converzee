import React, { Component } from "react";
import { SideButton } from "../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const LAYOUT_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const VIDEO_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const TEXT_IMG = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const CTA_IMG = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const STYLE_IMG = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const TIG_IMG = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const TIME_IMG = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";
    const RESPONDER_IMG = activeTab === 7 ? "sideButton activeSideButton" : "sideButton";
    const THUMB_IMG = activeTab === 8 ? "sideButton activeSideButton" : "sideButton";
    const ICONS_IMG = activeTab === 9 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        {this.props.layout === 3 ? (
        <div onClick={() => this.props.onChangeActive(1)} className={VIDEO_IMG}>
          <SideButton class={"fa fa-video-camera"} text="Video" />
        </div>):null
        }
        {this.props.layout === 3 ? (
        <div onClick={() => this.props.onChangeActive(8)} className={THUMB_IMG}>
          <SideButton class={"fa fa-paint-brush"} text="Thumbnail"/>
        </div>):null
        }
        {this.props.layout === 3 ? (
        <div onClick={() => this.props.onChangeActive(9)} className={ICONS_IMG}>
          <SideButton class={"fa fa-play-circle-o"} text="Icons"/>
        </div>):null
        }
        <div onClick={() => this.props.onChangeActive(2)} className={TEXT_IMG}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        {this.props.layout === 1 ? (
          <div onClick={() => this.props.onChangeActive(6)} className={TIME_IMG}>
            <SideButton class={"fa fa-clock-o"} text="Timer" />
          </div>
        ) : null}
        {this.props.layout != 3 ? (
        <div onClick={() => this.props.onChangeActive(3)} className={CTA_IMG}>
          <SideButton class={"fa fa-outdent"} text="CTA" />
        </div>
        ) : null}
        <div onClick={() => this.props.onChangeActive(4)} className={STYLE_IMG}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        {this.props.layout != 3 ? (
        <div onClick={() => this.props.onChangeActive(7)} className={RESPONDER_IMG}>
          <SideButton class={"fa fa-envelope"} text="Auto responders" />
        </div>
        ) : null}
        <div onClick={() => this.props.onChangeActive(5)} className={TIG_IMG}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
