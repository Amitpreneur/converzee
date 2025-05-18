import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "active-side-button" : "";
    const TimingImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 2 ? "active-side-button" : "";

    return (
      <div>
        {/* <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Text</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(1)} className={TimingImg}>
          <SideButton class={"fa fa-code"} text="Time" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(2)} className={"create-side-button " + CodeImg}>
          <i class="fa fa-code" aria-hidden="true"></i>
          <div>Trigger</div>
        </div> */}
      </div>
    );
  }
}
