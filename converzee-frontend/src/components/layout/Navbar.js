import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popover, Button, Modal } from "antd";
import { DOMAIN, PIXEL, DONWLOADS, MAIL_RESPONDER } from "../../utils/Routes";
import "./Navbar.css";
import Profile from "./Profile";
import _ from "lodash";
import ToolUtil from "../../utils/ToolUtil";
import { CopyScript, AutoResponderConfig } from "../comman/Popup";
import RequestHandler from "../../actions/RequestHandler";
import { AUTO_RESPONDER } from "../../actions/URLs";
class Navbar extends Component {
  state = {
    showsettingDropdown: false,
    startedPopup: false,
    title: "Dashboard",
    isShowProfile: false,
    showMobileNav: false,
    bonusPixel: false,
    autoRepo: false,
  };
  autoResponder = null;
  itemScript = "";
  componentDidMount() {
    window.gs.navTitle = this.changeTitle;
  }
  changeTitle = (title = "Dashboard") => {
    this.setState({ title });
  };
  onSettingDropdownClick = () => {
    const { showsettingDropdown } = this.state;
    this.setState({ showsettingDropdown: !showsettingDropdown });
  };
  onStartedDropdownClick = () => {
    const { startedPopup } = this.state;
    this.setState({ startedPopup: !startedPopup });
  }

  onAutoReponder = () => {
    const { autoRepo } = this.state;
    if (ToolUtil.autoResponder) {
      this.autoResponder = ToolUtil.autoResponder;
    } else {
      this.autoResponder = { region: "", uid: "", apiKey: "" };
    }
    this.setState({ autoRepo: !autoRepo });
  };

  toggleProfile = () => {
    const { isShowProfile } = this.state;
    this.setState({ isShowProfile: !isShowProfile });
  };

  getPageStyle() {
    const urlTab = window.location.pathname;
    var isExit = 0;
    return isExit;
  }

  info() {
    return Modal.info({
      title: "Bookmarkify for Copy Scroll",
      content: (
        <div className="btn btn-sm btn-success">
          <a href='javascript:(function(){window.addEventListener("click",function e(t){var o=t.target,n=0;do{isNaN(o.offsetTop)||(n+=o.offsetTop)}while(o=o.offsetParent);var a=n;if(window.clipboardData&&window.clipboardData.setData){ return clipboardData.setData("Text",a) };if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var d=document.createElement("textarea");d.textContent=a,d.style.position="fixed",document.body.appendChild(d),d.select();try{ if(window.gs) { window.gs.toast("Your pixel copied!", { position: "top-center", type: window.gs.toast.TYPE.INFO }); } else { alert("Your pixel copied!"); } return document.execCommand("copy");}catch(e){return console.warn("Copy to clipboard failed.",e),!1}finally{ document.body.removeChild(d); window.removeEventListener("click",e)}}  })})();'>
            Converzee Bookmarklet
          </a>
        </div>
      ),
      onOk() {},
    });
  }
  // document.body.innerHTML += `<img src="https://app.converzee.com/favicon.png" style="position: fixed; left: 10px; bottom: 10px; z-index: 1000">`;
  openCloseBonusPixel = () => {
    const scriptURI = ToolUtil.host + "/static/lib/bonusscript.js";
    this.itemScript = `<script type="text/javascript" src="${scriptURI}"></script>`;
    this.setState({ bonusPixel: !this.state.bonusPixel });
  };

  saveResponder = (region, uid, apiKey) => {
    RequestHandler.PostRequest(AUTO_RESPONDER, { userData: { region, uid, apiKey } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          window.gs.success(true, "Autoresponder Save Successfully");
        } else {
          window.gs.success(false, res.data.message);
        }
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
      this.onAutoReponder();
    });
  };

  render() {
    const { showsettingDropdown, title, isShowProfile, bonusPixel, autoRepo } = this.state;
    const isstyle = this.getPageStyle();
    const access = ToolUtil.toolsAccess ? ToolUtil.toolsAccess.access : 30;
    return (
      <nav name="Navbar" className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button className="btn btn-link rounded-circle mr-3 toggle-bar" onClick={this.props.toggleSideBar}>
          <i className="fa fa-bars"></i>
        </button>
        <CopyScript visible={bonusPixel} Close={this.openCloseBonusPixel} script={this.itemScript} />
        <Profile visible={isShowProfile} onClose={this.toggleProfile} />
        {autoRepo ? <AutoResponderConfig visible={autoRepo} {...this.autoResponder} Close={this.onAutoReponder} save={this.saveResponder} /> : null}
        <div className="toggle-bar">{title}</div>
        <ul className="navbar-nav ml-auto nav-topmenu-list">
          <Popover
            content={
              <div className="started_popup">
                <img className="started_popup_vector" src="/asset/started_popup_vector.png"/>
                <div className="started_popup_head">
                  <h2><img src="/asset/hand.png"/>Hey Converzee</h2>
                  <p>You only need 3 simple steps to get <br/>rolling with Converzee App:</p>
                </div>
                <div className="started_popup_body">
                  <h3><Link to="/Domain">Domain Setup</Link></h3>
                  <p>Add your domain under domain profile</p>
                  <h3><Link to="/Pixel">Add Pixel</Link></h3>
                  <p>Add Converzee Pixel to you webpage</p>
                  <h3><Link to="/Create">Create Campaign</Link></h3>
                  <p>Create a campaign from the choice of your tools</p>
                </div>
              </div>
            }
            title=" "
            trigger="click"
            visible={this.state.startedPopup}
            onVisibleChange={this.onStartedDropdownClick}
            className="asdf"
          >
            <li onClick={this.onStartedDropdownClick}><button type="button" className="cz_btn cz_orange_btn cz_started_btn"><i className="fa fa-plus" aria-hidden="true"></i><span>Get Started</span></button></li>
          </Popover>


          <li className="nav-item dropdown no-arrow mr-3 profile-icon align-items-center">
            <a href="https://converzee.com/kb/" target="_blank">
              <i className="fa fa-question-circle" />
            </a>
          </li>
          <li className="d-none d-sm-flex nav-item dropdown no-arrow mr-3 align-items-center username">
            <a href="https://converzee.com/kb/" target="_blank">
              Help
            </a>
          </li>

          <Popover
            content={
              <ul style={{ padding: "0px" }} onClick={() => {
                  let activeItem = document.querySelector(".nav-active");
                  if(activeItem) {
                    activeItem.classList.remove("nav-active");
                  }
                  this.onSettingDropdownClick();
              }}>
                {access > 30 ? (
                  <li className="dropdown-item setting-item">
                    <Link to={DOMAIN}> Domain Profile</Link>
                  </li>
                ) : null}
                <li className="dropdown-item setting-item">
                  <Link to={PIXEL}> Pixel</Link>
                </li>
                <li className="dropdown-item setting-item">
                  <a onClick={this.info}>Converzee Bookmarklet</a>
                </li>
                {/* <li className="dropdown-item setting-item">
                  <a onClick={this.openCloseBonusPixel}>Bonus Page Pixel</a>
                </li> */}
                <li className="dropdown-item setting-item">
                  <Link to={MAIL_RESPONDER}> Auto Responder</Link>
                </li>
              </ul>
            }
            title="Integration"
            trigger="click"
            visible={this.state.showsettingDropdown}
            onVisibleChange={this.onSettingDropdownClick}
          >
            <li className="nav-item dropdown no-arrow mr-3 setting-icon align-items-center">
              <i className="fa fa-cog"></i>
            </li>
          </Popover>
          <li onClick={this.onSettingDropdownClick} className="d-none d-sm-flex nav-item dropdown no-arrow mr-3 align-items-center username">
            Integration
          </li>
          <li onClick={this.toggleProfile} className="nav-item dropdown no-arrow mr-3 profile-icon align-items-center">
            <i className="fa fa-user" />
          </li>
          <li onClick={this.toggleProfile} className="d-none d-sm-flex nav-item dropdown no-arrow mr-3 align-items-center username">
            {window.userName}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
