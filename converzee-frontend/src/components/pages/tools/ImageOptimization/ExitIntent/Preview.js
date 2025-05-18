import React, { Component } from "react";
import "./Preview.css";
import { parseImgUrl, youtubeUrlParse, getcolor, vimeoUrlParse } from "../../../Util";
import Portal from "../../../comman/Portal";
export default class Preview extends Component {
  getStyle = () => {
    const { elements } = this.props.STYLE;
    const style = {};
    Object.assign(style, { background: this.getcolor(elements, "background") });
    return style;
  };
  getColor = (key) => {
    return getcolor(this.props.STYLE.elements, key);
  };

  isUrlVideo = (url) => {
    try {
      if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1 || url.indexOf("viemo") !== -1) {
        return true;
      }
      return false;
    } catch (e) {
      window.gs.toast("Error in Video URL , Please input a valid Url", { position: "bottom-right", type: window.gs.toast.TYPE.FAILED });
    }
  };
  getVideoURL(url) {
    return parseImgUrl(url);
  }
  getPopUpstyle = () => {
    return { height: "100%", width: "100%" };
    // const { height, width } = this.props.STYLE;
    // return { width: width + "px" };
    // return { width: width + "px", height: height + "px" };
  }; 
  renderImgVideo = () => {
    const { mediaType, url, isInput } = this.props;
    const { height, width } = this.props.STYLE;
    if (isInput) {
      return (
        <React.Fragment>
          <input type="text" name="leadengagr_exit_intent_input" style={{ width: "30%" }} placeholder="Name" className="Input-text form-item" id="leadengagr_exit_intent_input" />
          <br></br>
          <input type="text" name="leadengagr_exit_intent_input" style={{ width: "30%" }} placeholder="Email" className="Input-text form-item" id="leadengagr_exit_intent_input" />
        </React.Fragment>
      );
    }
    if (mediaType === "IMAGE" && !this.isUrlVideo(url)) {
      if(url) {
        return <img src={parseImgUrl(url)} style={{ height: "auto", width: width + "%" }} />;
      }
      return <img src={parseImgUrl("box.png")} style={{ height: "auto", width: width + "%" }} />;
      //return <div className="popup-background" style={{ backgroundImage: "url( " + parseImgUrl(url) + ")", height: this.props.STYLE.height - 10 + "px", width: "100%" }}></div>;
    } else {
      if (this.isUrlVideo(url)) {
        return (
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            src={"https://www.youtube.com/embed/" + youtubeUrlParse(url) + "?autoplay=1"}
            frameborder="0"
            allowfullscreen
            auto
            style={{ height: height, width: width + "px" }}
          ></iframe>
        );
      } else {
        return (
          <iframe
            style={{ height: height, width: width + "px" }}
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen
            src={"https://player.vimeo.com/video/" + vimeoUrlParse(url) + "?autoplay=1"}
            frameborder="0"
            allowfullscreen
            auto
          ></iframe>
        );
      }
    }
  };
  getBackGroundStyle = () => {
    if (this.props.STYLE.isbackGroundImage) {
      return { backgroundImage: "url(" + parseImgUrl(this.props.STYLE.backgroundImage) + ")", backgroundSize: "cover" };
    }
    return { backgroundColor: this.getColor("popupBackgoundColor") };
  };
  renderContant = () => {
    const { headline, subheadline, ctaText, noThanksText } = this.props;

    return (
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: headline }}></h2>
        <p dangerouslySetInnerHTML={{ __html: subheadline }}></p>
        <div className="popup-button">
          <a
            className="popup-cta-button btn btn-sm btn-success"
            style={{ backgroundColor: this.getColor("ctaBackgound") }}
            dangerouslySetInnerHTML={{ __html: ctaText }}
            style={{ backgroundColor: this.getColor("ctaBackgound") }}
          />
        </div>
      </div>
    );
  };
  render() {
    const layout = 1;
    const style = this.getBackGroundStyle();
    const popUpStyle = this.getPopUpstyle();
    const isInput = this.props.isInput;
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div className="image-popup cz_exit_intent_pop">
          <div className="image-preview exit_intent_popup content-center" style={Object.assign(popUpStyle, style)}>
            <div className="popUpTitlebar" style={{marginTop:"30px"}}>
              <div
                onClick={() => {
                  this.props.closePopup();
                }}
                className="popupCloseButton"
              >
                <img style={{ width: "30px" ,marginTop:"-30px"}} src={window.rPath + "asset/close.png"} />
              </div>
            </div>
            <div>
              <center>
                <h2 dangerouslySetInnerHTML={{ __html: this.props.headline }} ></h2>
                <p dangerouslySetInnerHTML={{ __html: this.props.subheadline }}></p>
                <div style={{margin:"30px 0"}}>{this.renderImgVideo()}</div>
                {isInput ? (
                  <button className="btn btn-sm btn-success" style={{ backgroundColor: this.getColor("ctaBackgound"), border: "none" }}>
                    Subscribe Now
                  </button>
                ) : (
                  <button className="btn btn-sm" dangerouslySetInnerHTML={{ __html: this.props.ctaText }} style={{ backgroundColor: this.getColor("ctaBackgound") }} />
                )}

                <div className="nothanks"><p dangerouslySetInnerHTML={{ __html: this.props.noThanksText }} ></p></div> 
              </center>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}
