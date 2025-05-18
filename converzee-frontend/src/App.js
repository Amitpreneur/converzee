import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect  } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/pages/Dashboard";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Create from "./components/pages/Create";
import CreateElement from "./components/pages/CreateElement";
import Campaigns from "./components/pages/Campaigns";
import Util from "./components/Util";
import { Storage } from "./utils/Storage";
import ToolUtil, { getToolsPermission } from "./utils/ToolUtil";
import SessionLogin from './components/layout/SessionLogin';
import { Request } from "./components/auth/authHandler";

import _ from "lodash";
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
  IMAGE_OPTIOMAZTION,
  BACKBUTTONREDIRECTION,
  HELLOBARTIMER,
  HELLOBAR,
  DYNEMICELEMENT,
  OFFERIFRAME,
  DOMAIN,
  PIXEL,
  ADMIN,
  SUPER_ADMIN,
  SUPPORT_USER,
  OTO2,
  OTO3,
  EMAIL_SEND,
  THIRD_PARTY,
  USER_SETTINGS,
  OPTIN_FORM,
  AGENCY,
  BONUS,
  CLUB,
  BONUS_CREATE,
  REVIEW_ENGIN,
  INPUT_FORM,
  TRAINING,
  EMAIL_TIMER,
  VIP_BONUS_VIEW,
  VIP_BONUS,
  SPECIAL_OPTIN_FORM,
  AUTO_RESPONDER,
  MAIL_RESPONDER,
  AUTO_PLAY_VIDEO,
  PROOF_APP
} from "./utils/Routes";
import TabMessaging from "./components/pages/tools/TabMessaging";
import UrgencyTimer from "./components/pages/tools/UrgencyTimer";
import ImagePopup from "./components/pages/tools/ImagePopup";
import VideoPopup from "./components/pages/tools/VideoPopup";
import CentralTimer from "./components/pages/tools/CentralTimer";
import GeoRedirection from "./components/pages/tools/GeoRedirection";
import BreakEvenCalculator from "./components/pages/tools/BreakEvenCalculator";
import ExitIntent from "./components/pages/tools/ExitIntent";
import MobileVibrator from "./components/pages/tools/MobileVibrator";
import DynamicElement from "./components/pages/tools/DynamicElements";
import OfferIframe from "./components/pages/tools/Offeriframe";
import BackButtonRedirection from "./components/pages/tools/BackButtonredirection";
import HelloBarTimer from "./components/pages/tools/HelloBarTimer";
import HelloBar from "./components/pages/tools/HelloBar";
import Domain from "./components/pages/Domain";
import Pixel from "./components/pages/Pixel";
import ImageOptimization from "./components/pages/tools/ImageOptimization";
import UserSettings from "./components/pages/UserSettings";
import Admin from "./components/admin";
import SuperAdmin from "./components/superAdmin/SuperAdmin";
import SupportUser from "./components/supportUser/SupportUser";
import ThirdParty from "./components/ThirdParty/";
import OptinForm from "./components/OptinForm";
import OTO3Create from "./components/pages/OTO3/OTO3Create";
import OTO2Create from "./components/pages/OTO2/OTO2Create";
import AutoplayVideo from "./components/pages/tools/AutoplayVideo";
import ProofApp from "./components/pages/tools/ProofApp";
import { RPath } from "./actions/URLs";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Helper from "./Helper";
import Agency from "./components/pages/Agency";
import { isMobile } from "./components/utils/ScreenUtil";
import BonusPage from "./components/BonusUpsell";
import Club from "./components/Club";
import BonusCreate from "./components/pages/Bonus/BonusCreate";
import ReviewEngin from "./components/ReviewEngin";
// import { Training } from "./components/Training";
import EmailTimer from "./components/pages/Bonus/EmailTimer";
import VipBonus from "./components/pages/VipBonus/VipBonus";
import SpecialOptin from "./components/SpecialBonusOptin";
import AutoResponderConfig from "./components/comman/AutoResponderConfig";
class App extends Component {
  state = {
    isAuthenticated: false,
    title: "Dashboard",
    loading: false,
    tools: new Set(),
    access: 20,
    visible: false,
    isUpgrade1: false,
    isUpgrade2: false,
    isVipBonus: false,
    mainHeight: window.innerHeight,
    fullSideBar: true,
    getAccessDone: false,
    checkSession: false,
    createdAt: "",
    isSubuser: false
  };
  isSuccess = false;
  keys = 0;
  consumeLicence = 0;
  totalLicence = 0;
  componentWillMount() {
    window.gs = {};
    const loader = document.getElementById("loaderItem");
    loader.style = "display:none";
    const body = document.getElementsByTagName("body")[0];
    body.style = "";
    window.rPath = RPath();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    /// this.forceUpdate();
  };

  toggleSideBar = () => {
    this.setState({ fullSideBar: !this.state.fullSideBar });
  };

  componentDidMount() {
    ToolUtil.setToolsToItemIdMap();
    // window.gs.setAuth = this.logout;
    this.logout();
    Util.setCreateItems();
  }
  setAuth = (auth) => {
    this.setState({ isAuthenticated: auth }, () => {
      if (this.state.isAuthenticated) {
        this.getToolsAccess();
      }
    });
  };
  logout = (auth = null) => {
    if(window.location.pathname == "/") {
      if(Request.getAuth()) {
        this.setState({ isAuthenticated: true });
        window.location.pathname = "/Dashboard";
      } else {
        this.setState({ isAuthenticated: false, checkSession: false });
      }
    } else {
      if(Request.getAuth()) {
        this.setState({ checkSession: false });
      } else {
        this.setState({ isAuthenticated: true,checkSession: true });
      }
    }
    ToolUtil.toolsToAccess = null;
    ToolUtil.isResponsed = false;
  };

  getToolsAccess = () => {
    try {
      getToolsPermission((permission, err) => {
        if (permission) {
          this.keys = permission.keys;
          this.consumeLicence = permission.consumeLicence;
          this.totalLicence = permission.totallicence;
          this.setState({
            getAccessDone: true,
            tools: new Set(permission.tools),
            access: permission.access,
            isUpgrade1: ToolUtil.isUpgrade1,
            isUpgrade2: ToolUtil.isUpgrade2,
            isVipBonus: ToolUtil.isVipBonus,
            createdAt: ToolUtil.createdAt,
            isSubuser: ToolUtil.isSubuser
          });
        }
        if (_.isEmpty(permission)) {
          setTimeout(() => {
            this.getToolsAccess();
          }, 2000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  isAccess = (tool) => {
    const { tools, access } = this.state;
    if (access > 80) return true;
    return tools.has(tool);
  };

  setTitle = (title) => {
    this.setState({ title });
  };

  getWidthStyle = () => {
    const { fullSideBar } = this.state;
    if (isMobile()) {
      return { width: "100%" };
    }
    return fullSideBar ? { width: "calc(100% - 214px)" } : { width: "calc(100% - 65px)" };
  };

  render() {
    const { isAuthenticated, title, access, isUpgrade1, isUpgrade2, fullSideBar, isVipBonus, createdAt, isSubuser } = this.state;
    const { isAccess, keys, consumeLicence, totalLicence } = this;
    return (
      <div className="wrapper">
        {isAuthenticated ? (
          <Router>
            <React.Fragment>
              <Sidebar access={access} createdAt={createdAt} isFull={fullSideBar} toggleSideBar={this.toggleSideBar} />
              <div className="d-flex flex-column content-wrapper" style={this.getWidthStyle()}>
                <div className="content">
                  <Navbar title={title} toggleSideBar={this.toggleSideBar} />
                  <Switch>
                    <Route exact path="/Dashboard" setTitle={this.setTitle} component={Dashboard} />
                    <Route exact path="/CreatePanel/:routeName" setTitle={this.setTitle} component={Create} />
                    <Route exact path="/UpdatePanel/:id" setTitle={this.setTitle} component={Create} />
                    <Route exact path="/Create" setTitle={this.setTitle} component={CreateElement} />
                    <Route exact path={USER_SETTINGS} setTitle={this.setTitle} component={UserSettings} />
                    {access > 50 ? <Route exact path={AGENCY} setTitle={this.setTitle} component={Agency} /> : null}
                    {/* ToolsRoutes  */}
                    {isAccess(1) ? <Route exact path={TABMESSAGING} setTitle={this.setTitle} component={TabMessaging} /> : null}
                    {isAccess(2) ? <Route exact path={URGENCY} setTitle={this.setTitle} component={UrgencyTimer} /> : null}
                    {isAccess(4) ? <Route exact path={IMAGEPOPUP} setTitle={this.setTitle} component={ImagePopup} /> : null}
                    {isAccess(5) ? <Route exact path={VIDEOPOPUP} setTitle={this.setTitle} component={VideoPopup} /> : null}
                    {isAccess(6) ? <Route exact path={CENTRALTIMER} setTitle={this.setTitle} component={CentralTimer} /> : null}
                    {isAccess(7) ? <Route exact path={GEOREDIRECTION} setTitle={this.setTitle} component={GeoRedirection} /> : null}
                    {isAccess(8) ? <Route exact path={BREAKEVENCALCULATOR} setTitle={this.setTitle} component={BreakEvenCalculator} /> : null}
                    {isAccess(9) ? <Route exact path={EXITINTENT} setTitle={this.setTitle} component={ExitIntent} /> : null}
                    {isAccess(10) ? <Route exact path={MOBILEVIBRATOR} setTitle={this.setTitle} component={MobileVibrator} /> : null}
                    {isAccess(13) ? <Route exact path={DYNEMICELEMENT} setTitle={this.setTitle} component={DynamicElement} /> : null}
                    {isAccess(14) ? <Route exact path={OFFERIFRAME} setTitle={this.setTitle} component={OfferIframe} /> : null}
                    {isAccess(15) ? <Route exact path={BACKBUTTONREDIRECTION} setTitle={this.setTitle} component={BackButtonRedirection} /> : null}
                    {isAccess(17) ? <Route exact path={HELLOBARTIMER} setTitle={this.setTitle} component={HelloBarTimer} /> : null}
                    {isAccess(3) ? <Route exact path={HELLOBAR} setTitle={this.setTitle} component={HelloBar} /> : null}
                    {isAccess(8) ? <Route exact path={INPUT_FORM} setTitle={this.setTitle} component={OptinForm} /> : null}
                    {isAccess(12) ? <Route exact path={IMAGE_OPTIOMAZTION} setTitle={this.setTitle} component={ImageOptimization} /> : null}
                    {isAccess(18) ? <Route exact path={THIRD_PARTY} setTitle={this.setTitle} component={ThirdParty} /> : null}
                    {isAccess(19) ? <Route exact path={OPTIN_FORM} setTitle={this.setTitle} component={OptinForm} /> : null}
                    {isAccess(20) ? <Route exact path={CLUB} setTitle={this.setTitle} component={Club} /> : null}
                    {isAccess(20) ? <Route exact path={CLUB} setTitle={this.setTitle} component={Club} /> : null}
                    {isAccess(24) ? <Route exact path={AUTO_PLAY_VIDEO} setTitle={this.setTitle} component={AutoplayVideo} /> : null}
                    {isAccess(25) ? <Route exact path={PROOF_APP} setTitle={this.setTitle} component={ProofApp} /> : null}
                    {access > 80 || isUpgrade1 ? <Route exact path={OTO2} setTitle={this.setTitle} component={OTO2Create} /> : null}
                    {access > 80 || isUpgrade2 ? <Route exact path={OTO3} setTitle={this.setTitle} component={OTO3Create} /> : null}
                    {isVipBonus ? <Route exact path={VIP_BONUS} setTitle={this.setTitle} component={VipBonus} /> : null}
                    {true ? <Route exact path={BONUS_CREATE} setTitle={this.setTitle} component={BonusCreate} /> : null}
                    {/* {isAccess(19) ? <Route exact path={EMAIL_SEND + "/:id"} setTitle={this.setTitle} component={EmailSend} /> : null} */}
                    {true ? <Route exact path={REVIEW_ENGIN} setTitle={this.setTitle} component={ReviewEngin} /> : null}
                    {true ? <Route exact path={BONUS} setTitle={this.setTitle} component={BonusPage} /> : null}
                    {isVipBonus ? <Route exact path={SPECIAL_OPTIN_FORM} setTitle={this.setTitle} component={SpecialOptin} /> : null}
                    {/* id Routes */}
                    {isAccess(1) ? <Route exact path={TABMESSAGING + "/:id"} setTitle={this.setTitle} component={TabMessaging} /> : null}
                    {isAccess(2) ? <Route exact path={URGENCY + "/:id"} setTitle={this.setTitle} component={UrgencyTimer} /> : null}
                    {isAccess(4) ? <Route exact path={IMAGEPOPUP + "/:id"} setTitle={this.setTitle} component={ImagePopup} /> : null}
                    {isAccess(5) ? <Route exact path={VIDEOPOPUP + "/:id"} setTitle={this.setTitle} component={VideoPopup} /> : null}
                    {isAccess(6) ? <Route exact path={CENTRALTIMER + "/:id"} setTitle={this.setTitle} component={CentralTimer} /> : null}
                    {isAccess(7) ? <Route exact path={GEOREDIRECTION + "/:id"} setTitle={this.setTitle} component={GeoRedirection} /> : null}
                    {isAccess(8) ? <Route exact path={BREAKEVENCALCULATOR + "/:id"} setTitle={this.setTitle} component={BreakEvenCalculator} /> : null}
                    {isAccess(9) ? <Route exact path={EXITINTENT + "/:id"} setTitle={this.setTitle} component={ExitIntent} /> : null}
                    {isAccess(10) ? <Route exact path={MOBILEVIBRATOR + "/:id"} setTitle={this.setTitle} component={MobileVibrator} /> : null}
                    {isAccess(13) ? <Route exact path={DYNEMICELEMENT + "/:id"} setTitle={this.setTitle} component={DynamicElement} /> : null}
                    {isAccess(14) ? <Route exact path={OFFERIFRAME + "/:id"} setTitle={this.setTitle} component={OfferIframe} /> : null}
                    {isAccess(15) ? <Route exact path={BACKBUTTONREDIRECTION + "/:id"} setTitle={this.setTitle} component={BackButtonRedirection} /> : null}
                    {isAccess(17) ? <Route exact path={HELLOBARTIMER + "/:id"} setTitle={this.setTitle} component={HelloBarTimer} /> : null}
                    {isAccess(3) ? <Route exact path={HELLOBAR + "/:id"} setTitle={this.setTitle} component={HelloBar} /> : null}
                    {isAccess(19) ? <Route exact path={OPTIN_FORM + "/:id"} setTitle={this.setTitle} component={OptinForm} /> : null}
                    {isAccess(20) ? <Route exact path={CLUB + "/:id"} setTitle={this.setTitle} component={Club} /> : null}
                    {isAccess(24) ? <Route exact path={AUTO_PLAY_VIDEO + "/:id"} setTitle={this.setTitle} component={AutoplayVideo} /> : null}
                    {isAccess(25) ? <Route exact path={PROOF_APP + "/:id"} setTitle={this.setTitle} component={ProofApp} /> : null}
                    {true ? <Route exact path={REVIEW_ENGIN + "/:id"} setTitle={this.setTitle} component={ReviewEngin} /> : null}
                    {isVipBonus ? <Route exact path={VIP_BONUS_VIEW + "/:id"} setTitle={this.setTitle} component={Club} /> : null}
                    {isVipBonus ? <Route exact path={SPECIAL_OPTIN_FORM + "/:id"} setTitle={this.setTitle} component={SpecialOptin} /> : null}
                    <Route exact path={EMAIL_TIMER} component={EmailTimer} />

                    {/* End of id Routes */}
                    <Route exact path="/Campaigns" setTitle={this.setTitle} component={Campaigns} />
                    {access > 30 ? <Route exact path={DOMAIN} setTitle={this.setTitle} component={Domain} /> : null}
                    <Route exact path={PIXEL} setTitle={this.setTitle} component={Pixel} />
                    {access > 50 ? <Route exact path={ADMIN} setTitle={this.setTitle} component={() => <Admin keys={keys} consumeLicence={consumeLicence} totalLicence={totalLicence}/>} /> : null}
                    {access > 80 || isSubuser ? <Route exact path={SUPER_ADMIN} setTitle={this.setTitle} component={SuperAdmin} /> : null}
                    {access > 80 ? <Route exact path={SUPPORT_USER} setTitle={this.setTitle} component={SupportUser} /> : null}
                    {true ? <Route exact path={MAIL_RESPONDER} setTitle={this.setTitle} component={AutoResponderConfig} /> : null}
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          </Router>
        ) : (
          <Router>
            <div className="container auth_container">
              <Route exact path="/*" component={() => <Landing setAuth={this.setAuth} />} />
            </div>
          </Router>
        )}
        <Helper />
        <SessionLogin checkSession={this.state.checkSession} setAuth={this.setAuth}></SessionLogin>
      </div>
        // <SessionLogin isAuthenticated={isAuthenticated}></SessionLogin>
    );
  }
}
export default App;
