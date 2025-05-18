import React, { Component } from "react";
import "./Preview.css";
import { parseImgUrl, youtubeUrlParse, vimeoUrlParse } from "../../../Util";
import Portal from "../../../comman/Portal";
import { getPath, BASE_URL } from "../../../../actions/URLs";
export default class Preview extends Component {
  state = {
    count: 0
  }
  
  componentDidMount() {
    this.setPosition();
  }

  componentDidUpdate() {
    
  }

  setPosition() {
    const element = document.getElementsByClassName("sk-top")[0];
    if (element && this.props.create.helloBarPos !== "bottom") {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-top:" + element.offsetHeight + "px;";
    } else if (element) {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-bottom:" + element.offsetHeight + "px;";
    }
  }

  getStyle = () => {
    const { elements } = this.props.STYLE;
    const style = {};
    Object.assign(style, { background: this.getcolor(elements, "background") });
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
    const { text, subText, position, hours, displayData } = this.props.toolData;
    const elements = this.props.STYLE.elements;
    const titleColor = this.getcolor(elements, "titleColor");
    const subtitleColor = this.getcolor(elements, "subtitleColor");
    const logoColor = this.getcolor(elements, "logoColor");

    return (
        <div className={"proofapp_preview".concat(" proof_app_"+position)}>
          <div className="proofapp_preview_box">
            <img className="proof_close" src="http://d257yxqteot439.cloudfront.net/static/templateclub/exitbg/1/Close.png" onClick={(e) => this.props.onClose(e, "close")}/>
            <div className="proofapp_preview_logo" style={{backgroundColor: logoColor}}>D</div>
            {/* <img src={getPath("/asset/logo_white_small.svg")} /> */}
            <div className="proofapp_preview_text">
              <h2 style={{color: titleColor}}>{"{name}"}  {text}</h2>
              <p className="proofapp_place" style={{color: subtitleColor}}><span>{subText} {"{country_name}"} </span></p>
            </div>
          </div>
        </div>
    );
  }
}
