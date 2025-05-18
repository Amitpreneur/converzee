import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const TextImg = activeTab === 1 ? "active-side-button" : "";
    const TimerImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    // const TemplateImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const StyleImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";

    return (
      <div>
        {/* <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Text</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(2)} className={TimerImg}>
          <SideButton class={"fa fa-clock-o"} text="Timer" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(3)} className={ TemplateImg}>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          <div>Template</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(3)} className={StyleImg}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </div>
    );
  }
}
