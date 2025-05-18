import React, { Component } from "react";
import "./Preview.css";
import { parseImgUrl, youtubeUrlParse, viemoUrlParse } from "../../../Util";
import Portal from "../../../comman/Portal";
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
  render() {
    const video = this.props.video.url || "";
    const style = {}; //this.getStyle();
    const autoPlayvideo = this.props.STYLE.switchElement || false;
    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        <div className="image-popup" style={style}>
          <div className="image-preview">
            <div className="popUpTitlebar"></div>
            <center>
              <div className="image-main-preview">
                <div style={{ height: "700px", width: "70%" }}>
                  <div
                    onClick={() => {
                      this.props.closePopup();
                    }}
                    className="popupCloseButton"
                    style={{ position: "relative" }}
                  >
                    <i className="fa fa-close" style={{ paddingLeft: "102%" }} />
                  </div>
                  {this.isUrlVideo(video) ? (
                    <iframe
                      width="100%"
                      height="100%"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      src={"https://www.youtube.com/embed/" + youtubeUrlParse(video) + (autoPlayvideo ? "?autoplay=1" : "")}
                      frameborder="0"
                      allowfullscreen
                      auto
                    ></iframe>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      frameborder="0"
                      allowfullscreen
                      src={"https://player.vimeo.com/video/" + viemoUrlParse(video) + (autoPlayvideo ? "?autoplay=1" : "")}
                      frameborder="0"
                      allowfullscreen
                      auto
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
