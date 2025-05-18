import React, { Component } from "react";
import { SideButton } from "../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const LAYOUT_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const TEXT_IMG = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const CTA_IMG = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const STYLE_IMG = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const TIG_IMG = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const TIME_IMG = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(2)} className={TEXT_IMG}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={STYLE_IMG}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        <div onClick={() => this.props.onChangeActive(5)} className={TIG_IMG}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
