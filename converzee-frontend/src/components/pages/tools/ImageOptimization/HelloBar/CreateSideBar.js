import React, { Component } from "react";
import Util from "../../../Util";
import { SideButton } from "../../../layout/ToolLayout";
export default class CreateSideBar extends Component {
  state = {
    showItems: [],
  };
  componentDidMount() {
    const item = this.props.item ? this.props.item : 1;
    const itemsToShow = Util.getCreateItems(item);
    this.setState({ showItems: itemsToShow || [] });
  }
  render() {
    const { activeTab, layout } = this.props;
    const TextImg = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const CTAImg = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const LayoutImg = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const StyleImg = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const CodeImg = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";
    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(4)} className={LayoutImg}>
          <SideButton class={"fa fa-pencil-square-o"} text="Layout" />
        </div>
        <div onClick={() => this.props.onChangeActive(1)} className={TextImg}>
          <SideButton class={"fa fa-text-width"} text="Text" />
        </div>
        {this.props.template !== 1 && layout !== 1 ? (
          <div onClick={() => this.props.onChangeActive(2)} className={CTAImg}>
            <SideButton class={"fa fa-crosshairs"} text="CTA" />
          </div>
        ) : null}
        <div onClick={() => this.props.onChangeActive(5)} className={StyleImg}>
          <SideButton class={"fa fa-paint-brush"} text="Style" />
        </div>

        <div onClick={() => this.props.onChangeActive(6)} className={CodeImg}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
