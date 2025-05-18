import React, { Component } from "react";
import Util from "../../../Util";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const FaviconImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const TimeImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={FaviconImg}>
          <SideButton class={"fa fa-fire"} text="Favicon" />
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={TimeImg}>
          <SideButton class={"fa fa-clock-o"} text="Timing" />
        </div>
        <div onClick={() => this.props.onChangeActive(5)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
