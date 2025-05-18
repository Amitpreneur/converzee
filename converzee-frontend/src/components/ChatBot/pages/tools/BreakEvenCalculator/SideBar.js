import React, { Component } from "react";
import Util from "../../../Util";
export default class SideBar extends Component {
  state = {
    showItems: []
  };

  render() {
    const { activeTab } = this.props;
    const NumberImg = activeTab === 1 ? "active-side-button" : "";
    const ResultImg = activeTab === 2 ? "active-side-button" : "";

    return (
      <div>
        <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + NumberImg}>
          <i class="fa fa-calculator" aria-hidden="true"></i>
          <div>Number</div>
        </div>
        <div onClick={() => this.props.onChangeActive(2)} className={"create-side-button " + ResultImg}>
          <i class="fa fa-align-center" aria-hidden="true"></i>
          <div>Result</div>
        </div>
      </div>
    );
  }
}
