import React, { Component } from "react";
import Util from "../../Util";
import { TEXT, CTA, TIMER, LAYOUT, STYLE, CODE, FILE } from "../../Constant";
export default class CreateSideBar extends Component {
  state = {
    showItems: []
  };
  componentDidMount() {
    const item = this.props.item ? this.props.item : 1;
    const itemsToShow = Util.getCreateItems(item);
    this.setState({ showItems: itemsToShow || [] });
  }
  render() {
    const { activeTab } = this.props;
    const { showItems } = this.state;
    // const TextImg = activeTab === 1 ? "text-Active.svg" : "text.svg";
    // const CTAImg = activeTab === 2 ? "CTA-Active.svg" : "CTA.svg";
    // const TimeImg = activeTab === 3 ? "timer-active.svg" : "timer.svg";
    // const LayoutImg = activeTab === 4 ? "Layout-Active.svg" : "Layout.svg";
    // const StyleImg = activeTab === 5 ? "style-Active.svg" : "Style.svg";
    // const CodeImg = activeTab === 6 ? "Code-Active.svg" : "Code.svg";
    const TextImg = activeTab === 1 ? "active-side-button" : "";
    const CTAImg = activeTab === 2 ? "active-side-button" : "";
    const TimeImg = activeTab === 3 ? "active-side-button" : "";
    const LayoutImg = activeTab === 4 ? "active-side-button" : "";
    const StyleImg = activeTab === 5 ? "active-side-button" : "";
    const CodeImg = activeTab === 6 ? "active-side-button" : "";
    const FileImg = activeTab === 7 ? "active-side-button" : "";
    return (
      <div>
        {showItems.includes(TEXT) ? (
          <div onClick={() => this.props.onChangeActive(1)} className={"create-side-button " + TextImg}>
            <i class="fa fa-text-width" aria-hidden="true"></i>
            <div>Text</div>
            {/* <img onClick={() => this.props.onChangeActive(1)} src={"./asset/" + TextImg} /> */}
          </div>
        ) : null}

        {showItems.includes(CTA) ? (
          <div onClick={() => this.props.onChangeActive(2)} className={"create-side-button " + CTAImg}>
            <i class="fa fa-crosshairs" aria-hidden="true"></i>
            <div>CTA</div>
            {/* <img onClick={() => this.props.onChangeActive(2)} src={"./asset/" + CTAImg} /> */}
          </div>
        ) : null}
        {showItems.includes(TIMER) ? (
          <div onClick={() => this.props.onChangeActive(3)} className={"create-side-button " + TimeImg}>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <div>Timer</div>
            {/* <img onClick={() => this.props.onChangeActive(3)} src={"./asset/" + TimeImg} /> */}
          </div>
        ) : null}
        {showItems.includes(LAYOUT) ? (
          <div onClick={() => this.props.onChangeActive(4)} className={"create-side-button " + LayoutImg}>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <div>Layout</div>
            {/* <img onClick={() => this.props.onChangeActive(4)} src={"./asset/" + LayoutImg} /> */}
          </div>
        ) : null}
        {showItems.includes(STYLE) ? (
          <div onClick={() => this.props.onChangeActive(5)} className={"create-side-button " + StyleImg}>
            <i class="fa fa-paint-brush" aria-hidden="true"></i>
            <div>Style</div>
            {/* <img onClick={() => this.props.onChangeActive(5)} src={"./asset/" + StyleImg} /> */}
          </div>
        ) : null}
        {showItems.includes(CODE) ? (
          <div onClick={() => this.props.onChangeActive(6)} className={"create-side-button " + CodeImg}>
            <i class="fa fa-code" aria-hidden="true"></i>
            <div>Trigger</div>
            {/* <img onClick={() => this.props.onChangeActive(6)} src={"./asset/" + CodeImg} /> */}
          </div>
        ) : null}
        {showItems.includes(FILE) ? (
          <div onClick={() => this.props.onChangeActive(7)} className={"create-side-button " + FileImg}>
            <i class="fa fa-code" aria-hidden="true"></i>
            <div>File</div>
            {/* <img onClick={() => this.props.onChangeActive(6)} src={"./asset/" + CodeImg} /> */}
          </div>
        ) : null}
      </div>
    );
  }
}
