import React, { Component } from "react";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab } = this.props;
    const TextImg = activeTab === 1 ? "active-side-button" : "";
    const StyleImg = activeTab === 2 ? "active-side-button" : "";
    const CodeImg = activeTab === 3 ? "active-side-button" : "";
    const MoreField = activeTab === 4 ? "active-side-button" : "";

    return (
      <div>
        <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Text</div>
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={"create-side-button " + StyleImg}>
          <i class="fa fa-text-width" aria-hidden="true"></i>
          <div>Style</div>
        </div>
        <div onClick={() => this.props.onChangeActive(4)} className={"create-side-button " + MoreField}>
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <div>More Field</div>
        </div>
        <div onClick={() => this.props.onChangeActive(3)} className={"create-side-button " + CodeImg}>
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <div>Trigger</div>
        </div>
      </div>
    );
  }
}
