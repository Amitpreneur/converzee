import React, { Component } from "react";
import Util from "../../../Util";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";

    return (
      <div>
        {/* <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Text</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-file-image-o"} text="Location" />
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </div>
    );
  }
}
