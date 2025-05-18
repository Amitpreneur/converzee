import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const TimerImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const StyleImg = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={TimerImg}>
          <SideButton class={"fa fa-clock-o"} text="Timer" />
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={StyleImg}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        <div onClick={() => this.props.onChangeActive(5)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
