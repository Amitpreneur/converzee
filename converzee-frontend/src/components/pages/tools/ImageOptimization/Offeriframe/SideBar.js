import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton text="Text" class={"fa fa-text-width"} />
        </div>
      </React.Fragment>
    );
  }
}
