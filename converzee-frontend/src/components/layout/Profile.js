import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { Drawer, Avatar } from "antd";
import { SayUpdate, AddAccount } from "../comman/Popup";
import RequestHandler from "../../actions/RequestHandler";
import { SAVE_DEVELOPER } from "../../actions/URLs";
import { USER_SETTINGS } from "../../utils/Routes";
import ToolUtil from "../../utils/ToolUtil";
import { Storage } from "../../utils/Storage";
export default class Profile extends Component {
  state = {
    IMG: "MS",
    name: "Manish Suthar",
    MODAL: null,
  };
  // componentDidMount() {
  //   console.log(ToolUtil.linksList)
  // }

  getText(text = "") {
    let newText = "";
    if(text !== "" && text) {
      const arr = text.split(" ");
      arr.forEach((e) => {
        newText = newText + e.substr(0, 1);
      });
    }
    return newText;
  }

  onAddAccountClick = () => {
    if (ToolUtil.isUpgrade1 && ToolUtil.toolsAccess.access > 30) {
      this.setState({ MODAL: "ADD" });
      return;
    } else {
      window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
    }
  };

  closeAll = () => {
    this.setState({ MODAL: null });
  };

  onSubmit = (email, name) => {
    this.closeAll();
    RequestHandler.PostRequest(SAVE_DEVELOPER, { userData: { userName: name, email } }, (res, err) => {
      if (res) {
        const { data } = res;
        this.closeAll();
        if (data.success) {
          if (window.gs.accountUpdate) window.gs.accountUpdate();
          window.gs.success(true, data.message);
        } else {
          window.gs.success(false, data.message);
        }
      }
    });
  };

  onLogout = () => {
    // window.gs.logout();
    Storage.removeAll();
    window.location.pathname = "/";
  }

  render() {
    const { IMG, name, MODAL } = this.state;
    const { visible, onClose } = this.props;
    return (
      <Drawer placement="right" closable={true} onClose={onClose} visible={visible}>
        {MODAL === "ADD" ? <AddAccount visible={MODAL === "ADD" ? true : false} submit={this.onSubmit} Close={this.closeAll} /> : null}
        <div className="row">
          <div className="col filter-close profile_heading">
            <span className="ml-4">Your Account</span>
          </div>
        </div>
        <div className="profile-details">
          <div className="row">
            <div className="col-12">
              <div className="profile-avater">
                <center>
                  <Avatar size={64} style={{ backgroundColor: "#ed8a25", verticalAlign: "middle" }}>
                    {this.getText(window.userName)}
                  </Avatar>
                </center>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="profile-userName">{window.userName}</div>
              <div className="profile-email">{window.email}</div>
            </div>
            <div className="col-12 mt-3">
              <div className="profile-title">Plan</div>
              <div className="profile-subText purchased_plan">
                {window.isUpgrade1 ? 
                  <span> Pro <a href="javascript:;" className="cz_btn">Purchased</a></span>
                : null}
                {window.isUpgrade2 ? 
                  <span> Club <a href="javascript:;" className="cz_btn">Purchased</a></span>
                : null}
                {/* {window.access >= 80 ? 
                  <span> Agency <a href="javascript:;" className="cz_btn">Purchased</a></span>
                : null} */}
              </div>
            </div>
            <div className={"col-12".concat(window.isUpgrade1 && window.isUpgrade2 && window.isUpgrade3 && !window.access < 80 ? " mck_hide" : "")}>
              {/* <div className="profile-title">Upgrade with</div> */}
              <div className="profile-subText upgrade_plan">
                {!window.isUpgrade1 ? 
                  <span>Pro<a href={ToolUtil.linksList ? ToolUtil.linksList.oto2 : ""} className="cz_btn " target="_blank">Upgrade</a></span>
                : null}
                {!window.isUpgrade2 ? 
                  <span>Club<a href={ToolUtil.linksList ? ToolUtil.linksList.oto3 : ""} className="cz_btn " target="_blank">Upgrade</a></span>
                : null}
                {/* {!window.isUpgrade3 ? 
                  <span>Mobile App<a href={ToolUtil.linksList ? ToolUtil.linksList.oto4 : ""} className="cz_btn " target="_blank">Upgrade</a></span>
                : null}
                {window.access < 80 ? 
                  <span>Agency<a href={ToolUtil.linksList ? ToolUtil.linksList.oto1 : ""} className="cz_btn " target="_blank">Upgrade</a></span>
                : null} */}
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="profile-title">My Accounts</div>
              <div className="profile-subText">You are on {window.access === 30 ? (window.isSubuser ? "Sub User" : "Developer" ) : "Owner"} </div>
            </div>
            <div className="col-12 mt-3">
              <div className="profile-role">
                {/* <span className={window.access !== 30 ? "":"active-role"}>SB</span> */}
                <span className="active-role">{window.access === 30 ? (window.isSubuser ? "Sub User" : "Developer" ) : "Owner"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-buttons">
          <div className="col-12 mt-4">
            {window.access > 30 && window.isUpgrade1 && window.isDeveloperAccess ? 
              <button className="btn btn-sm addAccountBtn" onClick={this.onAddAccountClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path id="Icon_metro-user-plus" data-name="Icon metro-user-plus" d="M7.821,11.991a4.821,4.821,0,0,1,3.145-4.514,4,4,0,0,0,.355-1.611c0-2.175,0-3.937-2.625-3.937S6.071,3.691,6.071,5.866a3.908,3.908,0,0,0,1.75,3.252v.722c-2.968.243-5.25,1.7-5.25,3.464H8a4.8,4.8,0,0,1-.182-1.312Zm4.813-3.938a3.938,3.938,0,1,0,3.938,3.938A3.938,3.938,0,0,0,12.633,8.053Zm2.188,4.375h-1.75v1.75H12.2v-1.75h-1.75v-.875H12.2V9.8h.875v1.75h1.75Z" transform="translate(-2.571 -1.928)" fill="#fff"/></svg>Add New Account
              </button>
              : null}
          </div>
          <div className="col-12">
            <div className="bottom_btn_box">
              <span className="bottom_btns">
                <Link to={USER_SETTINGS} className="btn btn-light btn-sm" onClick={onClose}>
                  Settings
                </Link>
              </span>
              <span className="bottom_btns">
                <button className="btn btn-light btn-sm logout-button pull-right" onClick={this.onLogout}>
                  Logout
                </button>
              </span>
            </div>
          </div>
        </div>
              
      </Drawer>
    );
  }
}
