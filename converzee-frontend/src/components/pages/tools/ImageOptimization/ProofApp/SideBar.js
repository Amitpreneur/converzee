import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TEXT_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const DISPLAY = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const STYLE = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const TIG_IMG = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={TEXT_IMG}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={DISPLAY}>
          <SideButton class={"fa fa-sliders"} text="Display"/>
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={STYLE}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
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
