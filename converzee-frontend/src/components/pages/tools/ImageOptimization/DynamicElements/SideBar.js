import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const StyleImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";

    return (
      <div>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-text-width"} text="Icons" />
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={StyleImg}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </div>
    );
  }
}
