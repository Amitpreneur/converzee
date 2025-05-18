import React, { Component } from "react";
import "./CreateElement.css";
import Util from "../Util";
import ToolUtil, { getToolsPermission } from "../../utils/ToolUtil";
import _ from "lodash";
import "../comman/Popup.css";
import {
  TABMESSAGING,
  URGENCY,
  IMAGEPOPUP,
  VIDEOPOPUP,
  CENTRALTIMER,
  GEOREDIRECTION,
  BREAKEVENCALCULATOR,
  EXITINTENT,
  MOBILEVIBRATOR,
  EMAIL_INTRIGATION,
  IMAGE_OPTIOMAZTION,
  BACKBUTTONREDIRECTION,
  HELLOBARTIMER,
  HELLOBAR,
  DYNEMICELEMENT,
  OFFERIFRAME,
  CHATBOT,
} from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { CHECK_CAMPAIGNS_NAME, getPath } from "../../actions/URLs";
import { CampaignNameInput, LockTool } from "../comman/Popup";
export default class Agency extends Component {
  createItems = [
    {
      diaplayName: "Tab Messaging",
      classnm: "",
      desc: "Notify your customers by sending them continuous reminder after they switch the tab",
      color: "#F5ECCF",
      height: "237px",
      routeName: 1,
      URL: TABMESSAGING,
    },
    { diaplayName: "HELLO BAR + Timer", classnm: "", desc: "You can create FOMO from hellobar too", color: "#fccc6f", height: "162px", routeName: 17, URL: HELLOBARTIMER },
    {
      diaplayName: "Central Timer",
      classnm: "",
      desc: "A timer that will be integrated into the web page to create an urgency for your customers.",
      color: "#b26a4f",
      height: "237px",
      routeName: 6,
      URL: CENTRALTIMER,
    },
    { diaplayName: "Mobile Vibrator", classnm: "", desc: "A trigger will be generated with the offer you want to show", color: "#f7ae98", height: "141px", routeName: 10, URL: MOBILEVIBRATOR },
    {
      diaplayName: "Back Button redirection",
      classnm: "hackMargin darkColor",
      desc: "Redirect your customers wherever you want when they click on the back button",
      color: "#f5eccf",
      height: "237px",
      routeName: 15,
      URL: BACKBUTTONREDIRECTION,
    },
    { diaplayName: "Urgency Timer", classnm: "", desc: "Use this campaign to generate FOMO amongst your customer", color: "#f7bbb4", height: "141px", routeName: 2, URL: URGENCY },
    {
      diaplayName: "Image Popup",
      classnm: "",
      desc: "Use Image popup to grab the attention of your users and engage them with images.",
      color: "#4292bf",
      height: "237px",
      routeName: 4,
      URL: IMAGEPOPUP,
    },
    { diaplayName: "Geo Redirection", classnm: "", desc: "Target and filter your customers depending upon their geolocation", color: "#ed6368", height: "141px", routeName: 7, URL: GEOREDIRECTION },
    {
      diaplayName: "Dynamic Elements",
      classnm: "",
      desc: "Use dynamic elements and customize them from User Interface of the app",
      color: "#aa57a9",
      height: "237px",
      routeName: 13,
      URL: DYNEMICELEMENT,
    },
    { diaplayName: "Video Popup", classnm: "", desc: "Can be used to import videos to your site easily.", color: "#75d8dd", height: "137px", routeName: 5, URL: VIDEOPOPUP },
    { diaplayName: "HELLO BAR", classnm: "hackMargin", desc: "Welcome your customers to your site with stylized and dynamic hellobar", color: "#ef7868", height: "237px", routeName: 3, URL: HELLOBAR },
    {
      diaplayName: "Offer iframe",
      classnm: "",
      desc: "Don’t let your ad hide your content. Show ad and content at one and the same time using Offer iFrame tool",
      color: "#fcd1b3",
      height: "137px",
      routeName: 14,
      URL: OFFERIFRAME,
    },
    {
      diaplayName: "Exit Intent",
      classnm: "",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "rectangle-6",
      height: "237px",
      routeName: 9,
      URL: EXITINTENT,
    },
  ];

  state = {};
  URL = "";

  renderCreateElements = (item, index) => {
    const items = { ...item, isLock: true };
    Object.assign(items, { openTool: this.openTool });
    return <DIVElement key={index} openTool {...items} />;
  };

  render() {
    return (
      <div className="cz_create_page">
        <div className="row">
          <div className="col">
            <div className="row mt3 mb-3 cz_agency_page_wrapper">{this.createItems.map(this.renderCreateElements)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const DIVElement = (props) => {
  let classnm = props.classnm;
  if (window.innerWidth <= 360) classnm = "";
  return (
    <div className={"col-md-4 col-sm-12 react-item " + classnm}>
      <div className={"rectangle mt-4"} style={{ backgroundColor: props.color, height: props.height }}>
        {true ? <LockTool style={{ height: props.height, minWidth: "230px" }} /> : null}
        <div className="row">
          <div className="col-sm-7"></div>
          <div className="col-sm-5">
            <img className="img-fluid" src={getPath(ToolUtil.getImg(props.routeName))} />
          </div>
        </div>
        <div className="row">
          <div className="bottom-desc">
            <div className="white mt-3 mb-2 masonry-title">{props.diaplayName}</div>
            <div className="white description">{props.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
