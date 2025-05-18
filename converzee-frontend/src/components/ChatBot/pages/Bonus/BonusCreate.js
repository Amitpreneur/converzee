import React, { Component } from "react";
import Util from "../../Util";
import { getToolsPermission } from "../../../utils/ToolUtil";
import _ from "lodash";
import "../../comman/Popup.css";
import { BONUS, REVIEW_ENGIN, EMAIL_TIMER, AUTO_PLAY_VIDEO } from "../../../utils/Routes";
import RequestHandler from "../../../actions/RequestHandler";
import { CHECK_CAMPAIGNS_NAME } from "../../../actions/URLs";
import { CampaignNameInput } from "../../comman/Popup";
import { CreateItem } from "../../layout/ToolLayout";
export default class BonusCreate extends Component {
  createItems = [
    /* {
      diaplayName: "Bonus Page Generate",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item1",
      desc: "",
      color: "#6799e8",
      height: "237px",
      routeName: 1,
      URL: BONUS,
      byPass: true,
    }, */
    {
      diaplayName: "Review Engine",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item2",
      desc: "",
      color: "#aa71a9",
      height: "237px",
      routeName: 2,
      URL: REVIEW_ENGIN,
    },
    {
      diaplayName: "Email Timer",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item3",
      desc: "",
      color: "#6799e8",
      height: "237px",
      routeName: 2,
      URL: EMAIL_TIMER,
      byPass: true,
    },
    /* {
      diaplayName: "Mail Builder",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item4",
      desc: "",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      params: 1,
      isOpenAble: "https://spiety.com/emailBuilder/",
    }, */
    {
      diaplayName: "Page Builder",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item5",
      desc: "",
      color: "#b26a4f",
      height: "237px",
      routeName: 2,
      params: 1,
      isOpenAble: "https://spiety.com/emailBuilder/",
    },
    {
      diaplayName: "Special Bonus",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item6",
      desc: "",
      color: "#f7ae98",
      height: "237px",
      routeName: 2,
      params: 1,
      isOpenAble: "https://docs.google.com/document/d/1VskBKyrJQt1PSqzhJ4AJG73j1AyejeoSSB2L5HKTY-U/edit?usp=sharing",
    },
    {
      diaplayName: "Autoplay Video",
      classnm: "",
      img: "asset/bonus.png",
      classnm2: "react-item4",
      desc: "",
      color: "#6799e8",
      height: "237px",
      routeName: 24,
      params: 1,
      URL: AUTO_PLAY_VIDEO
    },
  ];

  state = {
    openPopup: false,
    CAMPAIGNS_NAME: "",
    allowedTool: [],
    access: 0,
  };

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
    this.accessedTools();
  }

  componentDidMount() {
    window.gs.navTitle("Bonus");
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
