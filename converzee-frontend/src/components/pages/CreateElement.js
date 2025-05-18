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
  INPUT_FORM,
  OPTIN_FORM,
  AUTO_PLAY_VIDEO,
  PROOF_APP
} from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { CHECK_CAMPAIGNS_NAME, getPath } from "../../actions/URLs";
import { CampaignNameInput, LockTool } from "../comman/Popup";
import { CreateItem } from "../layout/ToolLayout";
import { Request } from "../auth/authHandler";
export default class CreateElement extends Component {
  createItems = [
    {
      diaplayName: "Tab Messaging",
      classnm: "",
      classnm2: "react-item1",
      desc: "Notify your customers by sending them continuous reminder after they switch the tab",
      color: "#F5ECCF",
      height: "237px",
      routeName: 1,
      URL: TABMESSAGING,
    },
    { 
      diaplayName: "HELLO BAR + Timer", 
      classnm: "", 
      classnm2: "react-item2", 
      desc: "You can create FOMO from hellobar too", 
      color: "#fccc6f", 
      height: "141px", 
      routeName: 17, 
      URL: HELLOBARTIMER 
    },
    {
      diaplayName: "Central Timer",
      classnm: "",
      classnm2: "react-item3",
      desc: "A timer that will be integrated into the web page to create an urgency for your customers.",
      color: "#b26a4f",
      height: "237px",
      routeName: 6,
      URL: CENTRALTIMER,
    },
    {
      diaplayName: "Mobile Vibrator",
      byPass: true,
      classnm: "",
      classnm2: "react-item4",
      desc: "Notify your customers as soon as your complete page loads and bring back all your lost traffic.",
      color: "#f7ae98",
      height: "202px",
      routeName: 10,
      URL: MOBILEVIBRATOR,
    },
    {
      diaplayName: "Back Button redirection",
      classnm: "hackMargin lightColor",
      classnm2: "react-item5",
      desc: "Redirect your customers wherever you want when they click on the back button",
      color: "#f5eccf",
      height: "237px",
      routeName: 15,
      URL: BACKBUTTONREDIRECTION,
    },
    {
      diaplayName: "Urgency Timer",
      classnm: "",
      classnm2: "react-item6",
      desc: "Use this campaign to generate FOMO amongst your customer",
      color: "#f7bbb4",
      height: "165px",
      routeName: 2,
      URL: URGENCY,
    },
    {
      diaplayName: "Image Popup",
      classnm: "",
      classnm2: "react-item7",
      desc: "Use Image popup to grab the attention of your users and engage them with images.",
      color: "#4292bf",
      height: "204px",
      routeName: 4,
      URL: IMAGEPOPUP,
    },
    {
      diaplayName: "Geo Redirection",
      classnm: "hackMargin2 ",
      classnm2: "react-item8",
      desc: "Target and filter your customers depending upon their geolocation",
      color: "#ed6368",
      height: "141px",
      routeName: 7,
      URL: GEOREDIRECTION,
    },
    {
      diaplayName: "Dynamic Elements",
      classnm: "hackMargin4 ",
      classnm2: "react-item9",
      desc: "Use dynamic elements and customize them from User Interface of the app",
      color: "#aa57a9",
      height: "208px",
      routeName: 13,
      URL: DYNEMICELEMENT,
    },
    { 
      diaplayName: "Video Popup", 
      classnm: "", 
      classnm2: "react-item10", 
      desc: "Can be used to import videos to your site easily.", 
      color: "#75d8dd", 
      height: "167px", 
      routeName: 5, 
      URL: VIDEOPOPUP 
    },
    {
      diaplayName: "HELLO BAR",
      classnm: "hackMargin3 ",
      classnm2: "react-item11",
      desc: "Welcome your customers to your site with stylized and dynamic hellobar",
      color: "#ef7868",
      height: "209px",
      routeName: 3,
      URL: HELLOBAR,
    },
    {
      diaplayName: "Offer iframe",
      classnm: "hackMargin5 ",
      classnm2: "react-item12",
      desc: "Don’t let your ad hide your content. Show ad and content at one and the same time using Offer iFrame tool",
      color: "#fcd1b3",
      height: "162px",
      routeName: 14,
      URL: OFFERIFRAME,
    },
    {
      diaplayName: "Exit Intent",
      classnm: "",
      classnm2: "react-item13",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "rectangle-6",
      height: "192px",
      routeName: 9,
      URL: EXITINTENT,
    },
    {
      diaplayName: "Optin forms (HELLO BAR)",
      classnm: "hackMargin6",
      classnm2: "react-item14",
      img: "asset/toolIcon/hellobarwithoptin.png",
      desc: "Generate leads from your site with stylized and dynamic hellobar",
      color: "#aa71a9",
      height: "237px",
      routeName: 2,
      URL: OPTIN_FORM,
      params: 0,
      ie: 1,
    },
    {
      diaplayName: "Optin forms (HELLO BAR + TIMER)",
      classnm: "hackMargin5 ",
      classnm2: "react-item15",
      img: "asset/toolIcon/hellobartimerwithoptin.png",
      desc: "You can generate leads by creating FOMO from hellobar",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: OPTIN_FORM,
      params: 1,
      ie: 1,
    },
    {
      diaplayName: "Optin forms (Exit- Intent)",
      classnm: "",
      classnm2: "react-item3",
      img: "asset/toolIcon/exitintentwithoptin.png",
      desc: "Generate leads from a popup which appears as soon as the customers tries to move out the window",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: OPTIN_FORM,
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
      params: 2,
      ie: 2,
    }
  ];
  // { diaplayName: "Break-Even Calculator", routeName: 8, URL: BREAKEVENCALCULATOR },
  // { diaplayName: "Email Integration", routeName: 11, URL: EMAIL_INTRIGATION },
  // { diaplayName: "Image Optimization", routeName: 12, URL: IMAGE_OPTIOMAZTION },

  state = {
    openPopup: false,
    CAMPAIGNS_NAME: "",
    allowedTool: [],
    access: 0,
  };

  URL = "";
  openTool = (url, byPass, params, ie) => {
    this.URL = url;
    if (params) window.gs.defaultLayout = params;
    if (ie) window.gs.ie = (url === "/PROOF_APP" ? null : ie);
    if (byPass) {
      Util.CAMPAIGNS_NAME = "_";
      this.props.history.push(this.URL);
    } else {
      this.setState({ openPopup: true });
    }
  };
  
  componentDidMount() {
    window.gs.navTitle("Create");
    this.updateSideBar();
  }

  componentDidUpdate() {
    this.updateSideBar();
  }

  updateSideBar = () => {
    let sidebar = document.querySelectorAll(".sidebar_content");
    sidebar.forEach(sd => {
      if(sd.getAttribute("title") === "Create") {
        if(!sd.classList.contains("nav-active")) {
          sd.classList.add("nav-active");
        }
      } else {
        sd.classList.remove("nav-active");
      }
    });
  }

  componentWillMount() {
    if(Request.getAuth()) {
      this.accessedTools();
    } else {
      document.querySelector(".session_login_wrapper").classList.remove("cz_hide");
    }
  }

  accessedTools = () => {
    getToolsPermission((permission, err) => {
      if (permission) {
        this.setState({ allowedTool: permission.tools, access: permission.access });
      }
    });
  };

  renderCreateElements = (item, index) => {
    const items = { ...item, isLock: true };
    const { allowedTool, access } = this.state;
    if (access > 80) {
      items.isLock = false;
    } else {
      if (allowedTool.length) {
        const isLock = _.findIndex(allowedTool, function (o) {
          return o === item.routeName;
        });
        if (isLock !== -1) items.isLock = false;
      }
    }

    Object.assign(items, { openTool: this.openTool });
    return <CreateItem key={index} index={index} openTool {...items} />;
  };
  onChangeCampaign = (e) => {
    this.setState({ CAMPAIGNS_NAME: e.target.value });
    Util.CAMPAIGNS_NAME = e.target.value;
  };

  closePopUp = () => {
    window.gs.defaultLayout = 0;
    this.setState({ openPopup: false, success: false, CAMPAIGNS_NAME: "" });
  };

  onNextButtonClick = (camp) => {
    this.state.CAMPAIGNS_NAME = camp;
    Util.CAMPAIGNS_NAME = camp;
    RequestHandler.PostRequest(CHECK_CAMPAIGNS_NAME, { toolData: { toolName: this.state.CAMPAIGNS_NAME } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          this.props.history.push(this.URL);
        } else {
          window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
        }
      }
    });
  };

  render() {
    const { openPopup, CAMPAIGNS_NAME } = this.state;
    return (
      <div className="cz_create_page">
        <div className="row">
          <CampaignNameInput visible={openPopup} Close={this.closePopUp} submit={this.onNextButtonClick} />
          <div className="col">
            <div className="row mt3 mb-3 cz_create_pages_wrapper">{this.createItems.map(this.renderCreateElements)}</div>
          </div>
        </div>
      </div>
    );
  }
}
