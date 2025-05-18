import React, { Component } from "react";
import "./Preview.css";
import { parseImgUrl, youtubeUrlParse, vimeoUrlParse } from "../../../Util";
import Portal from "../../../comman/Portal";
import { getPath } from "../../../../actions/URLs";
export default class Preview extends Component {
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
  isUrlVideo = (url) => {
    if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1 || url.indexOf("viemo") !== -1) {
      return true;
    }
    return false;
  };
  getVideoURL(url) {
    return parseImgUrl(url);
  }

  hideOverlayData = () => {
    let autoplayOverlay = document.querySelector(".cz_autoplay_overlay");
    autoplayOverlay.style.display = "none";
    let getIframeData = document.querySelector(".iframe_autoplay");
    let src = getIframeData.src
    if(src.includes("?")) {
        getIframeData.src = src.split("?")[0];
    } else {
        getIframeData.src += "?autoplay=1";
    }
  }

  render() {
    const video = this.props.video.url || "";
    const style = {}; //this.getStyle();
    const text = this.props.toolData.text;
    const icons = this.props.icons;
    return (
        <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
            <div className="image-popup" style={style}>
            <div className="image-preview">
                <div className="popUpTitlebar"></div>
                <center>
                <div className="image-main-preview autoplay_video_preview">
                      <div
                          onClick={() => {
                          this.props.onClose();
                          }}
                          className="popupCloseButton"
                          style={{ position: "relative" }}
                      >
                          <i className="fa fa-close" style={{ paddingLeft: "102%" }} />
                      </div>
                    <div className="cz_autoplay_vidoe_box">
                      <div className="cz_autoplay_overlay" onClick={this.hideOverlayData}>
                        <img src={getPath(icons)}/>
                        <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
                      </div>
                      {this.isUrlVideo(video) ? (
                          <iframe
                          className="iframe_autoplay"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          auto
                          src={"https://www.youtube.com/embed/" + youtubeUrlParse(video)}
                          ></iframe>
                      ) : (
                          <iframe
                          className="iframe_autoplay"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowfullscreen
                          auto
                          src={"https://player.vimeo.com/video/" + vimeoUrlParse(video)}
                          ></iframe>
                      )}
                    </div>

                    {/* <img src={BASE_URL + parseImgUrl(video)} /> */}
                </div>
                </center>
            </div>
            </div>
        </Portal>
    );
  }
}
