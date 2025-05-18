import React, { Component } from "react";
import "./Sidebar.css";
import {
  TABMESSAGING,
  URGENCY,
  HELLOBAR,
  HELLOBARTIMER,
  IMAGEPOPUP,
  VIDEOPOPUP,
  CENTRALTIMER,
  GEOREDIRECTION,
  BREAKEVENCALCULATOR,
  EXITINTENT,
  MOBILEVIBRATOR,
  EMAIL_INTRIGATION,
  IMAGE_OPTIOMAZTION,
  DYNEMICELEMENT,
  OFFERIFRAME,
  BACKBUTTONREDIRECTION,
  ADMIN,
  SUPER_ADMIN,
  OTO2,
  OTO3,
  USER_SETTINGS,
  AGENCY,
  BONUS,
  BONUS_CREATE,
  TRAINING,
  VIP_BONUS,
  SUPPORT_USER
} from "../../utils/Routes";
import ToolUtil from "../../utils/ToolUtil";
import { getPath } from "../../actions/URLs";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { isMobile } from "../utils/ScreenUtil";

class Sidebar extends Component {
  state = { activePage: 0, showMenu: false, active: "" };
  dashBoard = [""];
  create = [
    "/Create",
    TABMESSAGING,
    URGENCY,
    HELLOBAR,
    HELLOBARTIMER,
    IMAGEPOPUP,
    VIDEOPOPUP,
    CENTRALTIMER,
    GEOREDIRECTION,
    BREAKEVENCALCULATOR,
    EXITINTENT,
    MOBILEVIBRATOR,
    EMAIL_INTRIGATION,
    IMAGE_OPTIOMAZTION,
    DYNEMICELEMENT,
    OFFERIFRAME,
    BACKBUTTONREDIRECTION,
  ];

  state = { access: 0, isUpgrade1: false, isUpgrade2: false, active: "", isVipBonus: false, createdAt: "", isSubuser: false };
  items = [];

  componentWillMount() {
    this.setPermission(this.props.access, this.props.createdAt);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.access != nextProps.access && this.props.createdAt != nextProps.createdAt) {
      this.setPermission(nextProps.access, nextProps.createdAt);
    }
  }

  getActivePage() {
    const urlTab = window.location.pathname;
    const { active } = this.state;
    if (!urlTab) {
      return "DASHBOARD";
    } else if (this.create.includes(urlTab)) {
      return "CREATE";
    } else if (urlTab == "/Campaigns") {
      return "CAMPAIGNS";
    } else if (urlTab == "/Admin") {
      return "ADMIN";
    } else if (urlTab == SUPER_ADMIN) {
      return "SUPERADMIN";
    } else if (urlTab == OTO2) {
      return "OTO2";
    } else if (urlTab == OTO3) {
      return "OTO3";
    } else if (urlTab == USER_SETTINGS) {
      return "USER_SETTINGS";
    } else if (urlTab == AGENCY) {
      return "AGENCY";
    } else if (urlTab == BONUS_CREATE) {
      return "BONUS";
    } else if (urlTab == TRAINING) {
      return "TRAINING";
    } else if (urlTab == VIP_BONUS) {
      return "VIP_BONUS";
    } else if (urlTab == SUPPORT_USER) {
      return "SUPPORT_USER";
    }
    return "DASHBOARD";
  }

  setPermission = (access, createdAt) => {
    this.setState({ 
      access: access, 
      isUpgrade1: ToolUtil.isUpgrade1, 
      isUpgrade2: ToolUtil.isUpgrade2, 
      isVipBonus: ToolUtil.isVipBonus, 
      createdAt: createdAt, 
      isSubuser: window.isSubuser }, () => {
        this.setItems();
    });
  };

  setItems = () => {
    const { access, isUpgrade1, isUpgrade2, isVipBonus, createdAt, isSubuser } = this.state;
    const items = [];
    items.push({ icon: "dashboard.svg", text: "Dashboard", url: "/Dashboard", a: "DASHBOARD" });
    items.push({ icon: "create.svg", text: "Create", url: "/Create", a: "CREATE" });
    items.push({ icon: "campaign.svg", text: "Campaigns", url: "/Campaigns", a: "CAMPAIGNS" });
    if (access > 80 || isUpgrade1) items.push({ icon: "upgrade.svg", text: "Pro", url: OTO2, a: "OTO2" });
    else items.push({ icon: "upgrade.svg", text: "Pro", url: null, a: "OTO2" });
    if (access > 80 || isUpgrade2) items.push({ icon: "upgrade.svg", text: "Club", url: OTO3, a: "OTO3" });
    else items.push({ icon: "upgrade.svg", text: "Club", url: null, a: "OTO3" });
    if (access > 50) items.push({ icon: "upgrade.svg", text: "Agency", url: AGENCY, a: "AGENCY" });
    /* if (access > 50 && isUpgrade1) items.push({ icon: "admin.svg", text: "Admin", url: "/Admin", a: "ADMIN" }); */
    if (access > 50) items.push({ icon: "admin.svg", text: "Admin", url: null, a: "ADMIN" });
    if (access > 80 || isSubuser) items.push({ icon: "superadmin.svg", text: "Super Admin", url: "/SuperAdmin", a: "SUPERADMIN" });
    if (access > 80) items.push({ icon: "superadmin.svg", text: "Support User", url: "/SupportUser", a: "SUPPORT_USER" });
    items.push({ icon: "upgrade.svg", text: "Settings", url: USER_SETTINGS, a: "USER_SETTINGS" });
    items.push({ icon: "upgrade.svg", text: "Bonus", url: BONUS_CREATE, a: "BONUS" });
    // items.push({ icon: "upgrade.svg", text: "Training", url: TRAINING, a: "TRAINING" });
    if (isVipBonus) items.push({ icon: "upgrade.svg", text: "Vip Bonus", url: VIP_BONUS, a: "VIP_BONUS" });
    // items.push({ icon: "upgrade.svg", text: "Bonus", url: null, a: "BONUS" });
    this.items = items;
    this.forceUpdate();
  };

  onClick = (key, url) => {
    var d = new Date(this.state.createdAt);
    if (key == "Admin" && !(new Date() >= d.setMonth(d.getMonth() + 1)) ) {
      window.gs.sayUpdate("To be fair to our JV partners & affiliates, your Agency access will be unlocked 1 month after your purchase", true, "");
      return;
    } else {
      if(key == "Admin") {
        url = "/"+key;
        window.location.pathname = url;
      }
    }

    if (url) {
      window.gs.navTitle(key);
      this.setState({ active: key });
    } else {
      if (key == "Pro") {
        window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
      } else {
        window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto3 : "");
      }
    }
    if (isMobile()) {
      this.props.toggleSideBar();
    }
  };

  openDrawer = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  onDrawerMenuSelect = (title) => {
    window.gs.navTitle(title);
    this.openDrawer();
  };

  render() {
    const { isFull } = this.props;
    const { items } = this;
    const active = this.getActivePage();
    return (
      <div name="Sidebar">
        {!isMobile() ? (
          <ul className="mckSidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html" style={isFull ? {} : { width: "fit-content" }}>
              <div className="sidebar-brand-icon nav-logo">
                {isFull ? <img src={getPath("/asset/logo_white.svg")} /> : <img className={isFull ? "" : "small-img"} src={getPath("/asset/logo_white_small.svg")} />}
              </div>
            </a>
            {items.map((e, i) => (
              <Item key={i} {...e} onItemClick={this.onClick} isFull={isFull} active={active} />
            ))}
          </ul>
        ) : (
          <Drawer placement={"left"} width={"200px"} className={"Sidebar"} onClose={this.props.toggleSideBar} closable={true} visible={isFull}>
            <ul className="mckSidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
              <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html" style={isFull ? {} : { width: "fit-content" }}>
                <div className="sidebar-brand-icon nav-logo">
                  <img className="small-img" src={getPath("/asset/logo_white_small.svg")} />
                </div>
              </a>
              {items.map((e, i) => (
                <Item key={i} {...e} onItemClick={this.onClick} isFull={true} active={active} />
              ))}
            </ul>
          </Drawer>
        )}
      </div>
    );
  }
}

const Item = function (props) {
  return (
    <li title={props.text} style={props.isFull ? {} : { width: "63px" }} className={props.active === props.a ? "nav-item align-items-center sidebar_content nav-active" : "nav-item align-items-center sidebar_content"}>
      <Link to={props.url ? props.url : "?"} onClick={() => props.onItemClick(props.text, props.url)}>
        <div className="mckSideBarItem">
          <div className="itemicon">
            <img src={getPath(`/asset/sidebarIcon/${props.icon}`)} />
          </div>
          {props.isFull ? <div className="d-flex align-items-center ml-2 title">{props.text}</div> : null}
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
