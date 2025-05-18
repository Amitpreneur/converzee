import React from "react";
import { getBGPath, getPath } from "../../actions/URLs";
import { VideoPopup } from "../comman/Popup";
import ToolUtil from "../../utils/ToolUtil";

export class Training extends React.PureComponent {
  state = {
    isActive: false,
  };
  title = "";
  url = "";

  pdf = [
    { name: "MobileVibrator", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/" },
    { name: "Offer iFrame", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/" },

    { name: "Tab Messaging", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Tab_Messaging.pdf" },
    // { name: "Urgency Timer", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/" },
    { name: "Geo Redirection", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Geo_Redirection.pdf" },
    // { name: "Hello Bar", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/" },
    { name: "hellobar + timer", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/hellobar_timer.pdf" },
    { name: "Back Button Redirection", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Back_Button_Redirection.pdf" },
    { name: "Central Timer", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Central_Timer.pdf" },
    { name: "Configuration Settings", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Configuration_Settings.pdf" },
    { name: "Dynamic Elements", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Dynamic_Elements.pdf" },
    { name: "Configuration Settings", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Configuration_Settings.pdf" },

    { name: "Exit Intent", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Exit_Intent.pdf" },
    { name: "Video PopUp", url: "https://d2xdmgqpa5567i.cloudfront.net/static/pdfs/Video_PopUp.pdf" },
  ];

  videos = [
    { name: "Integrating pixel in Shopify", url: "444888139" },
    { name: "Image Pop-up", url: "443859943" },
    { name: "MobileVibrator", url: "443860104" },
    { name: "Offer iFrame", url: "443860004" },
    { name: "Tab Messaging", url: "443860049" },
    { name: "Urgency Timer", url: "443860072" },
    { name: "Geo Redirection", url: "443859874" },
    { name: "Hello Bar", url: "443859899" },
    // { name: "hellobar + timer", url: "hellobar_timer.pdf" },
    { name: "Back Button Redirection", url: "443859736" },
    { name: "Central Timer", url: "443859787" },
    // { name: "Configuration Settings", url: "Configuration_Settings.pdf" },
    { name: "Dynamic Elements", url: "443859838" },

    // { name: "Configuration Settings", url: "Configuration_Settings.pdf" },
    // { name: "Exit Intent", url: "Exit_Intent.pdf" },
    // { name: "Video PopUp", url: "Video_PopUp.pdf" },
  ];

  componentDidMount() {
    window.gs.navTitle("Training");
  }

  onVideoItemClick = (url, title) => {
    this.title = title;
    this.url = url;
    this.setState({ isActive: true });
  };

  closeItem = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isActive } = this.state;
    const { url, title } = this;
    const isUpgread2 = ToolUtil.isUpgrade2;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <VideoPopup visible={isActive} name={title} url={url} Close={this.closeItem} />
            <div className="row">
              {this.pdf.map((item, i) => (
                <PDF_DOCUMENT key={i} i={i} {...item} />
              ))}
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              {this.videos.map((item, i) => (
                <VideoItem key={i} i={i} {...item} onClick={this.onVideoItemClick} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PDF_DOCUMENT = function (props) {
  return (
    <div className={"col-md-2 col-sm-12"}>
      <a href={props.url} target="_blank" download>
        <img className="img-thumbnail" src={getPath("asset/pdfthum.png")} />
        <div className="white mt-3 mb-2 masonry-title">{props.name}</div>
      </a>
    </div>
  );
};

const VideoItem = function (props) {
  return (
    <div className={"col-md-2 col-sm-12"}>
      <div onClick={() => props.onClick(props.url, props.name)}>
        <img className="img-thumbnail" src={getPath("asset/videothumb.png")} />
        <div className="white mt-3 mb-2 masonry-title">{props.name}</div>
      </div>
    </div>
  );
};
