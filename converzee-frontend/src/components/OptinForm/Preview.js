import React, { Component } from "react";
import Portal from "../comman/Portal";
import TimeCounter from "../comman/TimeCounter";
import "./Preview.css";
export class Preview extends Component {
  setPosition() {
    const element = document.getElementsByClassName("mck_optForm_container_HELLOBAR")[0];
    if (element && this.props.toolData.position !== "BOTTOM") {
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
    const { layout, position } = toolData;
    const bgColor = this.getcolor(toolData.style, "backgound");
    const ctaBackGround = this.getcolor(toolData.style, "ctabackgound");
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div className="cz_optin_preview" style={getStyle(layout, position)}>
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
        <div className="cz_input_helloBar_box mck_col-md-8 mck_col-lg-8 mck_col-sm-12">
        {!isNameInput ? (
          <div className="hellobar_input">
            <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
          </div>
        ) : (
          <React.Fragment>
            <div className="hellobar_input">
              <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
            </div>
            <div className="hellobar_input">
              <input placeholder="Name" className="mck--optForm-input_HELLOBAR" />
            </div>
          </React.Fragment>
        )}
        <div className="hellobar_cta">
          <div className="mck_optForm_cta_HELLOBAR">
            <a className="mck_BuyNowBtn_HELLOBAR" style={{ backgroundColor: ctaBackGround }} dangerouslySetInnerHTML={{ __html: cta }}></a>
          </div>
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
        <div className="mck_optForm_HELLOBAR" dangerouslySetInnerHTML={{ __html: text }}></div>
        <div className="mck_hellobar_timer">
          <div className="mck_optForm_HELLOBAR">
            <TimeCounter timerType={"normal"} date={endDateTime} />
          </div>
        </div>
        <div className="cz_input_helloBar_box">
          {!isNameInput ? (
            <div className="hellobar_input">
              <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
            </div>
          ) : (
            <React.Fragment>
              <div className="hellobar_input">
                <input placeholder="Email" className="mck--optForm-input_HELLOBAR" />
              </div>
              <div className="hellobar_input">
                <input placeholder="Name" className="mck--optForm-input_HELLOBAR" />
              </div>
            </React.Fragment>
          )}
          <div className="hellobar_cta">
            <div className="mck_optForm_cta_HELLOBAR">
              <a className="mck_BuyNowBtn_HELLOBAR" style={{ backgroundColor: ctaBackGround }} dangerouslySetInnerHTML={{ __html: cta }}></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExitIntent = function (props) {
  const { isBGIMG, bgImg, bgColor, cta, subTitle, text, ctaBackGround, onClose, isNameInput } = props;
  var background = isBGIMG
    ? { backgroundImage: "url('" + bgImg + "')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }
    : { backgroundColor: bgImg };

  return (
    <div class="mckoptin_exitIntent hide_club">
      <div class="mck_exit_club_handler mckoptin_exitIntent_wrapper" style={{ backgroundColor: bgColor }}>
        <div class="MCK_OPTIN_exitbutton">
          <img class="mxk_exit_close" onClick={onClose} src="http://d257yxqteot439.cloudfront.net/static/templateclub/exitbg/1/Close.png" />
        </div>
        <div class="MCK_OPTIN_EXIT_T8">
          <div class="MCK_OPTIN_EXIT_CONTAINER_T9">
            <div class="MCK_OPTIN_EXIT_CONTAINER_ICON_T9">
              <img style={{ height: "auto", width: "100%" }} src="http://d257yxqteot439.cloudfront.net/static/templateclub/exitbg/9/Icon.png" />
            </div>
            <div style={{ width: "100%", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: text }}></div>
          </div>
          <div class="MCK_OPTINEXIT_SUBTEXT_T9" dangerouslySetInnerHTML={{ __html: subTitle }}></div>

          {!isNameInput ? (
            <div class="MCK_OPTIN_EXIT_HEADER_T9">
              <div>
                <p>
                  <input type="text" class="OPTION_FORM_INPUT_5f24fb36f2089c211c630ca1" name="email" placeholder="Email" defaultValue="" autoFocus="" />{" "}
                </p>
              </div>
            </div>
          ) : (
            <div class="MCK_OPTIN_EXIT_HEADER_T9">
              <div>
                <p>
                  <input type="text" class="OPTION_FORM_INPUT_5f24fb36f2089c211c630ca1" name="email" placeholder="Email" defaultValue="" autoFocus="" />{" "}
                </p>
                <p>
                  <input type="text" class="OPTION_FORM_INPUT_5f24fb36f2089c211c630ca1" name="name" defaultValue="" placeholder="Name" autoFocus="" />{" "}
                </p>
              </div>
            </div>
          )}
          
          {/* <div className="MCK_OPTIN_TIMER">
            <div>
              <TimeCounter timerType={"normal"}  />
            </div>
          </div> */}
          <div class="MCK_OPTINEXIT_CTA_T9">
            <center>
              <div style={{ backgroundColor: ctaBackGround }} dangerouslySetInnerHTML={{ __html: cta }}></div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

function getStyle(layout, isTop) {
  if (layout === 2) return { position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "#fff" };
  if (isTop === "TOP") return { position: "fixed", top: "0px", left: "0px", width: "100%" };
  return { position: "fixed", bottom: "0px", left: "0px", width: "100%" };
}
