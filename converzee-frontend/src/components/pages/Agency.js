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
  PROOF_APP, 
  AUTO_PLAY_VIDEO,
  INPUT_FORM
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
      path: "https://drive.google.com/uc?id=101_LnDzvT780zCZ_iPTBXkdsPpoUO1gZ&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/tab-messaging/",
    },
    { 
      diaplayName: "HELLO BAR + Timer", 
      classnm: "", 
      desc: "You can create FOMO from hellobar too", 
      color: "#fccc6f", 
      height: "162px", 
      routeName: 17, 
      URL: HELLOBARTIMER, 
      path: "https://drive.google.com/uc?id=1qqn7LJYO7HArJdyrc-a1zs9iX4hFqnEh&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/hello-bar+timer/",
    },
    {
      diaplayName: "Central Timer",
      classnm: "",
      desc: "A timer that will be integrated into the web page to create an urgency for your customers.",
      color: "#b26a4f",
      height: "237px",
      routeName: 6,
      URL: CENTRALTIMER,
      path: "https://drive.google.com/uc?id=1CgC7y35X2ddfnTv6RnuVa7OkBvtFQv4-&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/central-timer/",
    },
    { 
      diaplayName: "Mobile Vibrator", 
      classnm: "", 
      desc: "A trigger will be generated with the offer you want to show", 
      color: "#f7ae98", 
      height: "141px", 
      routeName: 10, 
      URL: MOBILEVIBRATOR, 
      path: "https://drive.google.com/uc?id=16szdASoMSxmJ8IUq5ePXwareV5h_PMg8&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/mobile-vibrator/",
    },
    {
      diaplayName: "Back Button redirection",
      classnm: "hackMargin darkColor",
      desc: "Redirect your customers wherever you want when they click on the back button",
      color: "#f5eccf",
      height: "237px",
      routeName: 15,
      URL: BACKBUTTONREDIRECTION,
      path: "https://drive.google.com/uc?id=1t1BSE-B3ba8xhoh4ZeVg56e1nsOLN4RD&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/back-button-redirection/",
    },
    { 
      diaplayName: "Urgency Timer", 
      classnm: "", 
      desc: "Use this campaign to generate FOMO amongst your customer", 
      color: "#f7bbb4", 
      height: "141px", 
      routeName: 2, 
      URL: URGENCY, 
      path: "https://drive.google.com/uc?id=1wPy00gb8eJ1XCb_AxXrd8nxdd67qc24t&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/urgency-timer/",
    },
    {
      diaplayName: "Image Popup",
      classnm: "",
      desc: "Use Image popup to grab the attention of your users and engage them with images.",
      color: "#4292bf",
      height: "237px",
      routeName: 4,
      URL: IMAGEPOPUP,
      path: "https://drive.google.com/uc?id=1hcJocnOU7Ocpq9s3Lsi_nzrGQppK7KUX&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/image-popup/",
    },
    { 
      diaplayName: "Geo Redirection", 
      classnm: "", 
      desc: "Target and filter your customers depending upon their geolocation", 
      color: "#ed6368", 
      height: "141px", 
      routeName: 7, 
      URL: GEOREDIRECTION, 
      path: "https://drive.google.com/uc?id=1h-GwR7zOurqXCMsSV-jryu0DV0uu78Jx&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/geo-targeting/",
    },
    {
      diaplayName: "Dynamic Elements",
      classnm: "",
      desc: "Use dynamic elements and customize them from User Interface of the app",
      color: "#aa57a9",
      height: "237px",
      routeName: 13,
      URL: DYNEMICELEMENT,
      path: "https://drive.google.com/uc?id=1JLqSVl8Rr7ngCCrOo4x2NolfC9imeV7j&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/dynamic-elements/",
    },
    { 
      diaplayName: "Video Popup", 
      classnm: "", 
      desc: "Can be used to import videos to your site easily.", 
      color: "#75d8dd", 
      height: "137px", 
      routeName: 5, 
      URL: VIDEOPOPUP, 
      path: "https://drive.google.com/uc?id=1NrrtuQdjVd48hUWiSajA50V4VxDQegp7&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/video-popup/",
    },
    { 
      diaplayName: "HELLO BAR", 
      classnm: "hackMargin", 
      desc: "Welcome your customers to your site with stylized and dynamic hellobar", 
      color: "#ef7868", 
      height: "237px", 
      routeName: 3, 
      URL: HELLOBAR, 
      path: "https://drive.google.com/uc?id=1luM0jYAdGFsFvjiwiS6Kj7zoJlISAJa_&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/hello-bar/",
    },
    {
      diaplayName: "Offer iframe",
      classnm: "",
      desc: "Don’t let your ad hide your content. Show ad and content at one and the same time using Offer iFrame tool",
      color: "#fcd1b3",
      height: "137px",
      routeName: 14,
      URL: OFFERIFRAME,
      path: "https://drive.google.com/uc?id=1rlPEj8SCmrgqQM-kK2ECSINLWMh8DzsO&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/offer-iframe/",
    },
    {
      diaplayName: "Exit Intent",
      classnm: "",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "rectangle-6",
      height: "237px",
      routeName: 9,
      URL: EXITINTENT,
      path: "https://drive.google.com/uc?id=1hxxnS2DgRa60w3BHyrN3CM_JkDo9-ln2&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/exit-intent/",
    },
    {
      diaplayName: "Optin forms (HELLO BAR)",
      classnm: "",
      classnm2: "react-item2",
      desc: "Welcome your customers to your site with stylized and dynamic hellobar",
      color: "#aa71a9",
      height: "237px",
      routeName: 2,
      URL: INPUT_FORM,
      path: "https://drive.google.com/uc?id=1q0eG_fhCGCvfqZUAHI72okP6yguN3v7E&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/hellobar-optin/",
      params: 0,
      ie: 1,
    },
    {
      diaplayName: "Optin forms (HELLO BAR + TIMER)",
      classnm: "",
      classnm2: "react-item3",
      desc: "You can create FOMO from hellobar too",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: INPUT_FORM,
      path: "https://drive.google.com/uc?id=1BEaN_iQV7iN1kmaa5au4PdG_AKfs-zdH&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/hellobar+timer-optin/",
      params: 1,
      ie: 1,
    },
    {
      diaplayName: "Optin forms (Exit- Intent)",
      classnm: "",
      classnm2: "react-item3",
      desc: "You can create FOMO from hellobar too",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: INPUT_FORM,
      path: "https://drive.google.com/uc?id=1bjxaqgpUVD8dMOi6TJByiXZm9JKeH2Zm&authuser=0&export=download",
      preview: "https://converzee.com/reseller-page/exit-intent+optin/",
      params: 2,
      ie: 2,
    },
    {
      diaplayName: "Autoplay Video",
      classnm: "hackMargin5 ",
      classnm2: "react-item17",
      img: "asset/toolIcon/autoplay.png",
      desc: "Autoplay video will allow to autoplay the muted video and there will be click to play gif and text over the video.",
      color: "#97d6ff",
      height: "237px",
      routeName: 24,
      URL: AUTO_PLAY_VIDEO,
      path: "",
      preview: "",
      params: 2,
      ie: 2,
    },
    {
      diaplayName: "Proof App",
      classnm: "",
      classnm2: "react-item3",
      img: "asset/toolIcon/Proof-App.png",
      desc: "Increase your conversion with the recent sales notification.",
      color: "#97d6ff",
      height: "237px",
      routeName: 25,
      URL: PROOF_APP,
      path: "",
      preview: "",
      params: 2,
      ie: 2,
    }
  ];

  state = {};
  URL = "";
  componentDidMount() {
      this.setState({
        createdAt: ToolUtil.createdAt,
      });
  }

  renderCreateElements = (item, index) => {
    const { createdAt } = this.state;
    
    var d = new Date(createdAt), isLock = false;
    if (Date.now() >= d.setMonth(d.getMonth() + 1) ) {
      isLock = true;
    }

    const items = { ...item, isLock: isLock };
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
        {true ? <LockTool {...props} style={{ height: props.height, minWidth: "230px" }} /> : null}
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
