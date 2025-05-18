import React, { Component } from "react";
import Util from "../../Util";
import { getToolsPermission } from "../../../utils/ToolUtil";
import _ from "lodash";
import "../../comman/Popup.css";
import { THIRD_PARTY, OPTIN_FORM, CLUB } from "../../../utils/Routes";
import RequestHandler from "../../../actions/RequestHandler";
import { CHECK_CAMPAIGNS_NAME } from "../../../actions/URLs";
import { CampaignNameInput } from "../../comman/Popup";
import { CreateItem } from "../../layout/ToolLayout";
import { Request } from "../../auth/authHandler";

export default class OTO3Create extends Component {
  createItems = [
    {
      diaplayName: "Template Club (HELLO BAR)",
      classnm: "",
      img: "asset/toolIcon/hellobar.png",
      classnm2: "react-item2",
      desc: "Welcome your customers to your site with stylized and dynamic hellobar",
      color: "#aa71a9",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 0,
    },
    {
      diaplayName: "Template Club (HELLO BAR + TIMER)",
      classnm: "",
      img: "asset/toolIcon/hellobartimer.png",
      classnm2: "react-item3",
      desc: "You can create FOMO from hellobar too",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 1,
    },
    {
      diaplayName: "Template Club (EXIT INTENT)",
      classnm: "",
      img: "asset/toolIcon/exitintent.png",
      classnm2: "react-item4",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "#ed6368",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 2,
    },
    {
      diaplayName: "Template Club (CENTRAL TIMER)",
      classnm: "",
      img: "asset/toolIcon/centraltime.png",
      classnm2: "react-item3",
      desc: "A timer that will be integrated into the web page to create an urgency for your customers",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 3,
    },
    {
      diaplayName: "Template Club (DYNAMIC ELEMENTS)",
      classnm: "",
      img: "asset/toolIcon/dynamicelements.png",
      classnm2: "react-item9",
      desc: "Use dynamic elements and customize them from User Interface of the app",
      color: "#aa57a9",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 4,
    },
    {
      diaplayName: "Template Club (HELLO BAR WITH OPTIN FORMS)",
      classnm: "",
      img: "asset/toolIcon/hellobarwithoptin.png",
      classnm2: "react-item15",
      desc: "Generate leads from your site with stylized and dynamic hellobar",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 5,
    },
    {
      diaplayName: "Template Club (HELLO BAR + TIMER WITH OPTIN FORMS)",
      classnm: "",
      img: "asset/toolIcon/hellobartimerwithoptin.png",
      classnm2: "react-item15",
      desc: "You can generate leads by creating FOMO from hellobar",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 6,
    },
    {
      diaplayName: "Template Club (EXIT INTENT WITH OPTIN FORMS)",
      classnm: "",
      img: "asset/toolIcon/exitintentwithoptin.png",
      classnm2: "react-item3",
      desc: "Generate leads from a popup which appears as soon as the customers tries to move out the window",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: CLUB,
      params: 7,
    },
    {
      diaplayName: "Masterclass Videos",
      classnm: "",
      img: "asset/training.png",
      classnm2: "react-item6",
      desc: "",
      color: "#f7ae98",
      height: "237px",
      routeName: 2,
      params: 1,
      isOpenAble: "https://spiety.com/masterclass/",
    },
  ];

  state = {
    openPopup: false,
    CAMPAIGNS_NAME: "",
    allowedTool: [],
    access: 0,
  };

  componentDidMount() {
    window.gs.navTitle("Club");
  }

  URL = "";
  openTool = (url, byPass, params, ie, isOpenAble) => {
    if (isOpenAble) {
      window.open(isOpenAble, "_blank");
      return;
    }
    this.URL = url;
    if (params) window.gs.defaultLayout = params;
    if (byPass) {
      Util.CAMPAIGNS_NAME = "_";
      this.props.history.push(this.URL);
    } else {
      this.setState({ openPopup: true });
    }
  };

  componentWillMount() {
    if(Request.getAuth()) {
      this.accessedTools();
      window.gs.navTitle("Club");
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
    return <CreateItem key={index} openTool {...items} />;
  };
  onChangeCampaign = (e) => {
    this.setState({ CAMPAIGNS_NAME: e.target.value });
    Util.CAMPAIGNS_NAME = e.target.value;
  };

  closePopUp = () => {
    window.gs.defaultLayout = 0
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
      <div className="container">
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
