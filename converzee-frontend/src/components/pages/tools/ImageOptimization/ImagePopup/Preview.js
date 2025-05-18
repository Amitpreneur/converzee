import React, { Component } from "react";
import "./Preview.css";
import { parseImgUrl } from "../../../Util";
import { BASE_URL } from "../../../../actions/URLs";
import Portal from "../../../comman/Portal";
export default class Preview extends Component {
  getStyle = () => {
    const { elements } = this.props.STYLE;
    const style = {};
    Object.assign(style, { background: this.getcolor(elements, "highlightBackground") });
    return style;
  };
  getcolor(element, key) {
    let color = "#fff";
    element.forEach((value) => {
      if (value.name === key) {
        color = value.color;
      }
    });
    return color;
  }
  render() {
    const image = this.props.image || "";
    const style = {}; //this.getStyle();
    return (
      <Portal defaultOpen={true} closeOnOutsideClick={true}>
        <div className="image-popup">
          <div className="image-preview align-self-center" style={{ height: "100%" }}>
            <div className="popUpTitlebar" style={{ height: "unset" }}>
              <div
                onClick={() => {
                  this.props.closePopup();
                }}
                className="popupCloseButton"
              >
                <i className="fa fa-close" />
              </div>
            </div>
            {/* <center> */}
            <div className="image-main-preview container-item align-self-center" style={{ backgroundColor: "unset" }}>
              <img className="img-class" src={parseImgUrl(image)} />
            </div>
            {/* </center> */}
          </div>
        </div>
      </Portal>
    );
  }
}
