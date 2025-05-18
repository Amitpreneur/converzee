import React, { Component } from "react";
import "./Preview.css";
import "./style.css";
import TimeCounter from "../../../comman/TimeCounter";
import Portal from "../../../comman/Portal";
export default class Preview extends Component {
  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    const element = document.getElementsByClassName("main-Preview")[0];
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
    if (helloBarPos == "bottom") {
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
  renderTimer = () => {
    const timerType = this.props.layout === 3 ? "BOX" : "normal";
    const { elements } = this.props.STYLE;
    const color = this.getcolor(elements, "timerBox");
    const timerTextColor = this.getcolor(this.props.STYLE.elements, "timerTextColor");
    return <TimeCounter textcolor={timerTextColor} color={color} timerType={timerType} date={this.props.timer.endDateTime} />;
  };

  getTempalte = (templateType, layout, text, bgColor, buttonText, color) => {
    templateType = layout;
    const arrowColor = this.getcolor(this.props.STYLE.elements, "arrowBackground");
    const timercolor = this.getcolor(this.props.STYLE.elements, "timerBox");
    const timerTextColor = this.getcolor(this.props.STYLE.elements, "timerTextColor");
    switch (templateType) {
      case 0:
        return (
          <div className="hellobartimer1" style={{ backgroundColor: bgColor }}>
            <div className="container">
              <div className="row">
                <style dangerouslySetInnerHTML={{ __html: ".hellobartimer1-arrow:before{border-left: 20px solid " + arrowColor + ";}" }}></style>
                <div className="col-md-3 col-sm-6 order-md-0 order-sm-12 align-self-center">
                  <div className="text-center">
                    <p className="hellobartimer1-text1">{this.props.create.codeText}</p>
                    <div className="hellobartimer1-code-box">
                      <div className="hellobartimer1-code">
                        <p id="scriptToCopy">{this.props.create.cpCode}</p>
                      </div>
                      <div className="hellobartimer1-copy-button">
                        <p>Copy Code</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 align-self-center">
                  <div className="hellobartimer1-arrow" style={{ backgroundColor: arrowColor, borderLeftColor: arrowColor, color: timerTextColor, marginTop: "unset" }} dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-md-3 col-sm-6 align-self-center">{this.renderTimer()}</div>
                <div className="col-md-3 col-sm-6 order-md-0 order-sm-1 align-self-center">
                  <div className="text-center">
                    <div className="hellobartimer1-button cst_hello_bar_btn" style={{ backgroundColor: color, color: bgColor, marginTop: "unset", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: buttonText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="hellobartimer2" style={{ backgroundColor: bgColor }}>
            <div className="container">
              <div className="row">
                <style dangerouslySetInnerHTML={{ __html: ".hellobartimer2-arrow:before{border-left: 40px solid " + arrowColor + ";} .text-center:{color: #ffffff;}" }}></style>
                <div className="col-md-4 col-sm-12 align-self-center">
                  <div>
                    <div style={{ margin: "auto", color: "#fff" }} dangerouslySetInnerHTML={{ __html: text }}></div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">{this.renderTimer()}</div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">
                    <div className="hellobartimer2-button cst_hello_bar_btn" style={{ backgroundColor: color, color: "#fff", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: buttonText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="hellobartimer3" style={{ backgroundColor: bgColor }}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-12 align-self-center">
                  <div className="hellobartimer3-text1" style={{ color: "#fff" }} dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center hellobartimer3-bg" style={{ backgroundColor: timercolor }}>
                    {this.renderTimer()}
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">
                    <div className="hellobartimer3-button cst_hello_bar_btn" style={{ backgroundColor: color, color: "#fff", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: buttonText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="hellobartimer4" style={{ backgroundColor: bgColor }}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-12 align-self-center">
                  <div className="hellobartimer4-text1" dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center hellobartimer4-bg">{this.renderTimer()}</div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">
                    <div className="hellobartimer4-button cst_hello_bar_btn" style={{ backgroundColor: color }} dangerouslySetInnerHTML={{ __html: buttonText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="hellobartimer4" style={{ backgroundColor: bgColor }}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-12 align-self-center">
                  <div className="hellobartimer4-text1" dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center hellobartimer4-bg">{this.renderTimer()}</div>
                </div>
                <div className="col-md-4 col-sm-6 align-self-center">
                  <div className="text-center">
                    <div className="hellobartimer4-button cst_hello_bar_btn" style={{ backgroundColor: color }} dangerouslySetInnerHTML={{ __html: buttonText }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  render() {
    const style = { background: "#3a3abd" };
    const elements = this.props.STYLE.elements;
    Object.assign(style, this.getPos());
    // Object.assign(style, { backgroundColor: this.getcolor(elements, "highlightBackground") });
    const layout = this.props.layout;
    const text = this.props.create.textBody;
    const buttonText = this.props.cta.ctaText;
    const templateType = this.props.templateType;
    const color = this.getcolor(elements, "highlight");
    const backgroundColor = this.getcolor(elements, "highlightBackground");
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div className="main-Preview pull-right" style={style}>
          {this.getTempalte(templateType, layout, text, color, buttonText, backgroundColor)}
        </div>
      </Portal>
    );
  }
}
