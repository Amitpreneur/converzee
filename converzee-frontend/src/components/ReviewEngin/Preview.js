import React, { Component } from "react";
import Portal from "../comman/Portal";
import TimeCounter from "../comman/TimeCounter";
import "./Preview.css";
export class Preview extends Component {
  setPosition() {
    const element = document.getElementsByClassName("mck_optForm_container_HELLOBAR")[0];
    if (element && this.props.toolData.position !== "bottom") {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-top:" + element.offsetHeight + "px;";
    } else if (element) {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-bottom:" + element.offsetHeight + "px;";
    }
  }

  componentDidMount() {
    const { toolData } = this.props;
    const { layout } = toolData;
    if (layout === 0 || layout === 1) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    const body = document.getElementsByTagName("body")[0];
    body.style = "";
  }

  componentDidUpdate(newProps) {
    const { toolData } = this.props;
    const { position } = toolData;
    if (position !== newProps.toolData.position) {
      this.setPosition();
    }
  }
  getcolor(element, key) {
    let color = "";
    element.forEach((value) => {
      if (value.id === key) {
        color = value.value;
      }
    });
    return color;
  }
  render() {
    const { toolData, onClose } = this.props;
    const { layout } = toolData;
    const bgColor = this.getcolor(toolData.style, "backgound");
    const ctaBackGround = this.getcolor(toolData.style, "ctabackgound");
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div style={getStyle(layout)}>
          {layout === 0 ? <HelloBar {...toolData} bgColor={bgColor} ctaBackGround={ctaBackGround} /> : null}
          {layout === 1 ? <HelloBarTimer {...toolData} bgColor={bgColor} ctaBackGround={ctaBackGround} /> : null}
          {layout === 2 ? <ExitIntent onClose={onClose} bgColor={bgColor} ctaBackGround={ctaBackGround} {...toolData} /> : null}
        </div>
      </Portal>
    );
  }
}

const HelloBar = function (props) {
  const { text, bgColor, ctaBackGround, cta, isNameInput } = props;
  return (
    <div>
      <div className="mck_row mck_optForm_container_HELLOBAR" style={{ backgroundColor: bgColor }}>
        <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-12">
          <div className="mck_optForm_HELLOBAR" dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
        {!isNameInput ? (
          <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-8">
            <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
          </div>
        ) : (
          <React.Fragment>
            <div className="mck_col-md-2 mck_col-lg-2 mck_col-sm-8">
              <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
            </div>
            <div className="mck_col-md-2 mck_col-lg-2 mck_col-sm-8">
              <input placeholder="Name" className="mck--optForm-input_HELLOBAR" />
            </div>
          </React.Fragment>
        )}
        <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-2">
          <div className="mck_optForm_cta_HELLOBAR">
            <a className="mck_BuyNowBtn_HELLOBAR" style={{ backgroundColor: ctaBackGround }} dangerouslySetInnerHTML={{ __html: cta }}></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelloBarTimer = function (props) {
  const { text, bgColor, ctaBackGround, cta, endDateTime, isNameInput } = props;
  return (
    <div>
      <div className="mck_row mck_optForm_container_HELLOBAR" style={{ backgroundColor: bgColor }}>
        <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-12">
          <div className="mck_optForm_HELLOBAR">
            <TimeCounter timerType={"normal"} date={endDateTime} />
          </div>
        </div>
        {!isNameInput ? (
          <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-8">
            <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
          </div>
        ) : (
          <React.Fragment>
            <div className="mck_col-md-2 mck_col-lg-2 mck_col-sm-8">
              <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
            </div>
            <div className="mck_col-md-2 mck_col-lg-2 mck_col-sm-8">
              <input placeholder="Name" className="mck--optForm-input_HELLOBAR" />
            </div>
          </React.Fragment>
        )}
        <div className="mck_col-md-4 mck_col-lg-4 mck_col-sm-2">
          <div className="mck_optForm_cta_HELLOBAR">
            <a className="mck_BuyNowBtn_HELLOBAR" style={{ backgroundColor: ctaBackGround }} dangerouslySetInnerHTML={{ __html: cta }}></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExitIntent = function (props) {
  const { isBGIMG, bgImg, bgColor, noThanks, cta, subTitle, text, ctaBackgound, onClose, isNameInput } = props;
  var background = isBGIMG
    ? { backgroundImage: "url('" + bgImg + "')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
    : { backgroundColor: bgImg };
  return (
    <div className="OPTIN_EXIT_INTENT" style={background}>
      <div id="OPTIN_EXIT_INTENT">
        <div className="OPTIN_EXIT_WRAPPER">
          <div id="OPTIN_EXIT_INTENT_close" onClick={onClose}></div>
          <div className="OPTIN_EXIT_CONTENT" style={{ backgroundColor: bgColor }}>
            <h2 dangerouslySetInnerHTML={{ __html: text }}></h2> <p style={{ marginBottom: "20px !important" }} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
            <form className="signup-form" id="signup-form">
              {!isNameInput ? (
                <p>
                  <input type="text" name="email" value="" autofocus />
                </p>
              ) : (
                <React.Fragment>
                  <p>
                    <input type="text" name="email" value="" autofocus />
                  </p>
                  <p>
                    <input type="text" name="name" value="" autofocus />
                  </p>
                </React.Fragment>
              )}

              <p className="button" style={{ marginTop: "20px" }}>
                <button type="button" dangerouslySetInnerHTML={{ __html: cta }} style={{ backgroundColor: ctaBackgound }}></button>
              </p>
            </form>
            <p className="footnote" dangerouslySetInnerHTML={{ __html: noThanks }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

function getStyle(layout, isTop) {
  if (layout === 2) return { position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "#fff" };
  if (!isTop) return { position: "fixed", top: "0px", left: "0px", width: "100%" };
  return { position: "fixed", bottom: "0px", left: "0px", width: "100%" };
}
