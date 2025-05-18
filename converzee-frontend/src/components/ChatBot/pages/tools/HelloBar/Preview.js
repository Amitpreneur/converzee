import React, { Component } from "react";
import "./Preview.css";
import "./style.css";
import Portal from "../../../comman/Portal";
export default class Preview extends Component {
  componentDidMount() {
    this.setPosition();
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

  componentDidUpdate(newProps) {
    const { helloBarPos } = this.props.create;
    if (helloBarPos !== newProps.create.helloBarPos) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    const body = document.getElementsByTagName("body")[0];
    body.style = "";
  }
  renderCTA = (text) => {
    return (
      <div style={{ overflowWrap: "break-word" }}>
        <button className="btn btn-primary btn-preview" dangerouslySetInnerHTML={{ __html: text }}></button>
      </div>
    );
  };
  renderText = (text, style = {}) => {
    const { elements } = this.props.STYLE;
    Object.assign(style, { backgroundColor: this.getcolor(elements, "highlight"), overflowWrap: "break-word" });
    return (
      <div className="horDiv">
        <div style={style} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    );
  };
  getPos = () => {
    const { helloBarPos } = this.props.create;
    if (helloBarPos === "bottom") {
      return { bottom: "0px" };
    }
    return { top: "0px" };
  };

  getcolor(element, key) {
    let color = "";
    element.forEach((value) => {
      if (value.name === key) {
        color = value.color;
      }
    });
    return color;
  }
  getText(text) {
    return (
      <div className="leadengagr--smart-bar-padding">
        <div className="leadengagr-element-message" style={{ color: "rgb(255, 255, 255)", opacity: 1, transform: " translateY(0%)" }} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    );
  }
  getCTA(text, bgColor) {
    return (
      <div className="leadengagr--smart-bar-padding">
        <a href="https:/app.getleadengagr.com/sign-up" target="_blank" className="leadengagr-button-url">
          <button type="button" className="leadengagr-element__btn-custom leadengagr-element__send-button fix-positon" style={{ backgroundColor: bgColor }}>
            <span className="leadengagr-element__send-btn-text" style={{ color: "rgb(0, 0, 0)" }} dangerouslySetInnerHTML={{ __html: text }}></span>
          </button>
        </a>
      </div>
    );
  }

  getTempalte = (templateType, layout, text, bgColor, ctaText, colorBg) => {
    templateType = layout;
    layout = 0;
    switch (templateType) {
      case 0:
        return (
          <div className="hellobar1" style={{ backgroundColor: colorBg }}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="hellobar1-text1" dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">
                    <center>
                      <p>{this.props.create.codeText}</p>
                      <div className="hellobar1-code-box">
                        <div className="hellobar1-code">
                          <p>{this.props.create.cpCode}</p>
                        </div>
                        <div className="hellobar1-copy-button">
                          <p>Copy Code</p>
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 align-self-center">
                  <div className="text-center">
                    <div className="hellobar1-button" style={{ backgroundColor: bgColor, color: colorBg }} dangerouslySetInnerHTML={{ __html: ctaText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="hellobar3" style={{ backgroundColor: colorBg }}>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 align-self-center">
                  <div className="text-center">
                    <div className="hellobar3-text1" style={{ color: "#fff" }}>
                      <span dangerouslySetInnerHTML={{ __html: text }}></span>
                      <span style={{fontWeight: 600}} dangerouslySetInnerHTML={{ __html: `<u>${ctaText}</u>` }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="hellobar4" style={{ backgroundColor: colorBg, color: "#fff" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-1 col-md-12 col-sm-12 align-self-center"></div>
                <div className="col-lg-5 col-md-6 col-sm-6 align-self-center">
                  <div className="hellobar4-text1" dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 align-self-center">
                  <div className="text-center">
                    <div className="hellobar4-button" style={{ backgroundColor: bgColor, color: colorBg }} dangerouslySetInnerHTML={{ __html: ctaText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const style = { background: "#3a3abd" };
    const elements = this.props.STYLE.elements;
    Object.assign(style, this.getPos());
    const layout = this.props.layout;
    const text = this.props.create.textBody;
    const buttonText = this.props.cta.ctaText;
    const color = this.getcolor(elements, "highlightCTA");
    const backgroundColor = this.getcolor(elements, "highlight");
    const templateType = this.props.templateType;
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div className="sk-fixed-height sk-top" style={style}>
          {/* {layout === 1 ? (
              <React.Fragment>
                {this.getText(text)}
                {this.getCTA(buttonText, color)}
              </React.Fragment>
            ) : null} */}
          {this.getTempalte(templateType, layout, text, color, buttonText, backgroundColor)}
        </div>
      </Portal>
    );
  }
}
