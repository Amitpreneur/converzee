import React, { Component } from "react";
import Util from "../../Util";
import { getToolsPermission } from "../../../utils/ToolUtil";
import _ from "lodash";
import "../../comman/Popup.css";
import { VIP_BONUS_VIEW, SPECIAL_OPTIN_FORM } from "../../../utils/Routes";
import RequestHandler from "../../../actions/RequestHandler";
import { CHECK_CAMPAIGNS_NAME } from "../../../actions/URLs";
import { CampaignNameInput } from "../../comman/Popup";
import { CreateItem } from "../../layout/ToolLayout";
export default class VipBonus extends Component {
  createItems = [
    {
      diaplayName: "Template Club (HELLO BAR)",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item2",
      desc: "Welcome your customers to your site with stylized and dynamic hellobar",
      color: "#aa71a9",
      height: "237px",
      routeName: 2,
      URL: VIP_BONUS_VIEW,
      params: 0,
    },
    {
      diaplayName: "Template Club (HELLO BAR + TIMER)",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item3",
      desc: "You can create FOMO from hellobar too",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      URL: VIP_BONUS_VIEW,
      params: 1,
    },
    {
      diaplayName: "Template Club (EXIT INTENT)",
      classnm: "",
      classnm2: "react-item4",
      img: "asset/bonus.png",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "#ed6368",
      height: "237px",
      routeName: 2,
      URL: VIP_BONUS_VIEW,
      params: 2,
    },
    {
      diaplayName: "Optin Form (Hello Bar)",
      classnm: "",
      classnm2: "react-item4",
      img: "asset/bonus.png",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "#ed6368",
      height: "237px",
      routeName: 2,
      URL: SPECIAL_OPTIN_FORM,
      params: 0,
    },
    {
      diaplayName: "Optin Form (Exit intent)",
      classnm: "",
      classnm2: "react-item4",
      img: "asset/bonus.png",
      desc: "A pop which appears as soon as the customers tries to move out the window",
      color: "#ed6368",
      height: "237px",
      routeName: 2,
      URL: SPECIAL_OPTIN_FORM,
      params: 2,
    },
  ];

  state = {
    openPopup: false,
    CAMPAIGNS_NAME: "",
    allowedTool: [],
    access: 0,
  };

  componentDidMount() {
    window.gs.navTitle("Vip Bonus");
  }

  URL = "";
  openTool = (url, byPass, params, ie) => {
    this.URL = url;
    window.gs.toolId = 22;
    if (params) window.gs.defaultLayout = params;
    if (byPass) {
      Util.CAMPAIGNS_NAME = "_";
      this.props.history.push(this.URL);
    } else {
      this.setState({ openPopup: true });
    }
  };

  componentWillMount() {
    this.accessedTools();
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
          window.gs.toast(res.data.message, { position: "bottom-right", autoClose: false, type: window.gs.toast.TYPE.ERROR });
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
            <div className="row mt3 mb-3">{this.createItems.map(this.renderCreateElements)}</div>
          </div>
        </div>
      </div>
    );
  }
}
