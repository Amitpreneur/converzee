import React, { Component } from "react";
import Util from "../../../Util";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    // const TextImg = activeTab === 1 ? "active-side-button" : "";
    const TimerImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={TimerImg}>
          <SideButton class={"fa fa-file-image-o"} text="Image" />
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
