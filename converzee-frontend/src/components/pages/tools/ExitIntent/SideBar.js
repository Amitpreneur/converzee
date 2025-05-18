import React, { Component } from "react";
import { SideButton } from "../../../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const MediaImg = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const CTAImg = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const NoThanksImg = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const StyleImg = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 7 ? "sideButton activeSideButton" : "sideButton";

    return (
      <div>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(2)} className={TemplateImg}>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          <div>Template</div>
        </div> */}
        <div onClick={() => this.props.onChangeActive(3)} className={MediaImg}>
          <SideButton class={"fa fa-picture-o"} text="Media" />
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={CTAImg}>
          <SideButton class={"fa fa-crosshairs"} text="CTA" />
        </div>
        {/* <div onClick={() => this.props.onChangeActive(5)} className={NoThanksImg}>
          <SideButton class={"fa fa-thumbs-down"} text="No Thanks" />
        </div> */}
        <div onClick={() => this.props.onChangeActive(6)} className={StyleImg}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>
        <div onClick={() => this.props.onChangeActive(7)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </div>
    );
  }
}
