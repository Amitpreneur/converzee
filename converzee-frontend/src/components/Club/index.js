import React, { Component } from "react";
import SideBar from "./SideBar";
import ToolUtil, { getTemplates, clubTemplate } from "../../utils/ToolUtil";
import Util from "../Util";
import Text from "./Text";
import CTA from "./CTA";
import Responders from "../OptinForm/Responders";
import { ToolLayout, ButtonsGroup } from "../layout/ToolLayout";
import { SAVE_TOOL, GET_ONE_TOOL } from "../../actions/URLs";
import { OTO3, VIP_BONUS } from "../../utils/Routes";
import RequestHandler from "../../actions/RequestHandler";
import { Modal } from "antd";
import Style from "./Style";
import Code from "./Code";
import { TemplateClubModalResponse, TemplateClubModal } from "../utils/Modal";
import Time from "./Time";
import { Preview } from "./Preview";
import { ReponsiveImage } from "../comman/PreviewAble";
import { LayoutSelector } from "../layout/LayoutSelector";

export default class Club extends Component {
  state = {
    toolName: "",
    toolId: "",
    preview: false,
    _id: null,
    activeTab: 1,
    toolData: {
      template: 0,
      text: "Lorem ipsum nibh amet!",
      cta: "Buy Now",
      layout: 0,
      timerType: "DATE_AND_TIME_BASED",
      endDateTime:  new Date(),
      timeZone: Util.getTimeZoneList()[0].value,
      postExpiryAction: "hide",
      ctaRedirectUrl: "",
      redirectUrl: "",
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 2,
      ctaAction: "redirect",
      // redirectUrl: "http://google.com",
      noThanks: "No Thanks!",
      subTitle: "Eiusmod tempor veniam incididunt labore.",
      position: "BOTTOM",
      logo: "box.png",
      scale: "1.1"
    },
    CODE: { include: [{ type: "contains", url: "" }], exclude: [{ type: "contains", url: null }] },
    items: [
      { index: 1, icon: "fa fa-whatsapp", text: "Whatsapp", link: "" },
      { index: 2, icon: "fa fa-facebook-square", text: "Facebook", link: "" },
      { index: 3, icon: "fa fa-linkedin-square", text: "Linkedin", link: "" },
      { index: 4, icon: "fa fa-reddit-square", text: "Reddit", link: "" },
      { index: 5, icon: "fa fa-skype", text: "Skype", link: "" },
      { index: 6, icon: "fa fa-vimeo-square", text: "Vimeo", link: "" },
      { index: 7, icon: "fa fa-twitter-square", text: "Twitter", link: "" },
      { index: 8, icon: "fa fa-telegram", text: "Telegram", link: "" },
      { index: 9, icon: "fa fa-instagram", text: "Instagram", link: "" },
      { index: 10, icon: "fa fa-behance-square", text: "Behance", link: "" },
      { index: 11, icon: "fa fa-dribbble", text: "Dribbble", link: "" },
      { index: 12, icon: "fa fa-pinterest-square", text: "Pinterest", link: "" }
    ],
    AutoResponder: {
      mailServer: "MAILCHIMP",
      uid: "",
      formData: ""
    }
  };
  loaded = false;
  layouts = [];
  templates = null;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        this.loaded = true;
        if (res) {
          Util.isRedirected = true;
          const data = TemplateClubModalResponse(res);
          if (data) {
            this.getLayouts(data.toolData.layout);
            this.layouts = clubTemplate(data.toolData.layout, data.toolId);
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "  " + this.getLayoutName(this.state.toolData.layout) + "  " + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = window.gs.toolId ? window.gs.toolId : 20;
      this.loaded = true;
      const defLayout = window.gs.defaultLayout || 0;
      this.onLayoutChange(defLayout);
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME, toolData: { ...this.state.toolData, layout: defLayout} });
      Util.RedirectWhenCampaignEmpty(this.props);
      this.getLayouts(defLayout);
      this.layouts = clubTemplate(defLayout, toolId);
      window.gs.navTitle(ToolUtil.getTool(toolId) + "  " + this.getLayoutName(defLayout) + "  " + "(" + Util.CAMPAIGNS_NAME + ")");
      setTimeout(() => {
        const { toolData } = this.state;
        if(toolData.layout === 2 || toolData.layout === 6 || toolData.layout === 5 || toolData.layout === 7) {
          this.templateSelect(0);
        }
      },300);
      delete window.gs.defaultLayout;
      delete window.gs.toolId;
    }
  }

  getLayouts = (typ) => {
    getTemplates(typ, (templates) => {
      this.templates = templates;
      this.forceUpdate();
    });
  };

  getLayoutName = (i) => {
    if (i == 0) return "Hello Bar";
    if (i == 1) return "Hello Bar + Timer";
    if (i == 2) return "Exit Intent";
    if (i == 3) return "Central Timer";
    if (i == 4) return "Dynamic Elements";
    if (i == 5) return "Hello Bar With Optin Forms";
    if (i == 6) return "Hello Bar + Timer With Optin Forms";
    if (i == 7) return "Exit Intent With Optin Forms";
  };

  templateSelect = (index) => {
    const { toolData, _id } = this.state;
    const layout = toolData.layout;
    let data ;
    if(!_id){
      if(layout === 2) {
        data = ExitIntentContent(index);
      } else if(layout === 0 || layout === 1) {
        data = HelloBarContent(index);
      } else if(layout === 5|| layout === 6 || layout === 7) {
        data = (layout === 7 ? optinExitIntentContent(index) : optinFormContent(index));
      }
    }
    this.setState({ toolData: { ...toolData, ...data, template: index } });
  };

  onLayoutChange = (index) => {
    const { toolData } = this.state;
    this.setState({ toolData: { ...toolData, layout: index } });
  };

  onChangeActive = (tabIndex) => {
    const { activeTab } = this.state;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };

  changeAutoResponder = (data) => {
    this.setState({AutoResponder: { ...this.state.AutoResponder, ...data} });
  }

  codeChange = (data) => {
    this.setState({ CODE: data });
  };

  onUpdate = (data) => {
    const { toolData } = this.state;
    this.setState({ toolData : {...toolData, ...data}});
  };

  updateItems = (data) => {
    this.setState({ ...data });
  };

  renderMain = () => {
    const { activeTab, toolData, CODE, items } = this.state;
    let component = null;
    if (!this.loaded) return null;
    switch (activeTab) {
      case 1:
        component = <LayoutSelector isExit={toolData.layout == 2 || toolData.layout == 3 || toolData.layout == 4 || toolData.layout == 7 ? true : false} layout={toolData.layout} onLayoutSelect={this.templateSelect} selected={toolData.template} items={this.layouts}/>;
        break;
      case 2:
        component = <Text items={items} text={toolData.text} noThanks={toolData.noThanks} subTitle={toolData.subTitle} layout={toolData.layout} selected={toolData.template} onChange={toolData.layout===4 ? this.updateItems : this.onUpdate} />;
        break;
      case 3:
        component = <CTA cta={toolData.cta} ctaRedirectUrl={toolData.ctaRedirectUrl} ctaAction={toolData.ctaAction} position={toolData.position} layout={toolData.layout} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Style logo={toolData.logo} onChange={this.onUpdate} layout={toolData.layout} scale={toolData.layout==3 ? toolData.scale : ""}/>;
        break;
      case 5:
        component = <Code {...CODE} onChange={this.codeChange} />;
        break;
      case 6:
        component = (
          <Time
            timerType={toolData.timerType}
            endDateTime={toolData.endDateTime}
            timeZone={toolData.timeZone}
            postExpiryAction={toolData.postExpiryAction}
            redirectUrl={toolData.redirectUrl}
            days={toolData.days}
            hours={toolData.hours}
            minutes={toolData.minutes}
            seconds={toolData.seconds}
            onChange={this.onUpdate}
          />
        );
        break;
      case 7:
        component = <Responders mailServer={this.state.AutoResponder.mailServer} onChange={this.changeAutoResponder} />;
        break;
      default:
        component = <Text onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const data = this.state;
    if (this.state === 22) data.toolData.template = this.state.toolData.template + 10;
    if(data.toolData.days === "") data.toolData.days = 0;
    if(data.toolData.hours === "") data.toolData.hours = 0;
    if (this.state.CODE.include[0].url !== "") {
      RequestHandler.PostRequest(SAVE_TOOL, { toolData: TemplateClubModal(data) }, (res, err) => {
        if (res) {
          const data1 = res.data;
          if (data1.success) {
            if (data1.script) {
              window.gs.setScript(data1.script);
            } else {
              Modal.success({
                content: data1.message,
              });
            }
            setTimeout(() => {
              this.props.history.push("/Campaigns");
            }, 1000);
          }
        }
      });
    } else {
      Modal.warning({
        content: "Should Contain atleast one trigger point",
      });
    }
  };

  renderRight = () => {
    const { toolData, activeTab } = this.state;
    if (activeTab == 4 && toolData.logo != "") {
      return <ReponsiveImage isImg={true} url={toolData.logo} />;
    }
    /* if (toolData.layout === 0) {
      return (activeTab !== 1 ? <ReponsiveImage isAs={true} url={"asset/hb3.png"} /> : null);
    }
    if (toolData.layout === 1) {
      return (activeTab !== 1 ? <ReponsiveImage isAs={true} url={"asset/hbt3.png"} /> : null);
    } */
    // if (toolData.layout === 2 || toolData.layout === 3 || toolData.layout === 7) {
    //   return (activeTab !== 1 && activeTab !== 7 ? <ReponsiveImage isAs={true} url={"asset/exit_pop_up.png"} /> : null );
    // }
    // if (toolData.layout === 4) {
    //   return (activeTab !== 1 && activeTab !== 2 ? <ReponsiveImage isAs={true} url={"asset/exit_pop_up.png"} /> : null );
    // }
  };

  back = () => {
    if (this.state.toolId == 20) this.props.history.push(OTO3);
    else this.props.history.push(VIP_BONUS);
  };

  togglePreview = (e, type) => {
    const { preview } = this.state;
    if(type == "close") {
      if(e.target.className === "mxk_exit_close") {
        this.setState({ preview: !preview });
      } else {
        if (document.querySelector('.mckclub_exitIntent_wrapper') && !document.querySelector('.mckclub_exitIntent_wrapper').contains(e.target) && document.querySelector(".mxk_exit_close") ) {
          this.setState({ preview: !preview });
        }
      } 
    } else {
      this.setState({ preview: !preview });
    }
  };

  render() { 
    const { preview, toolData, activeTab } = this.state;
    return (
      <ToolLayout>
        {preview ? <Preview {...this.state} templates={this.templates} onClose={(e) => this.togglePreview(e, "close")} /> : null}
        <div className="row">
          <div className={"col-10 toolItem ".concat(toolData.layout === 3 ? "cz_ct_timer_row" : null)}>
            <div className="row">
              <div className={(activeTab === 1 || activeTab === 7 ||(toolData.layout===4 && activeTab === 2) ? "col-md-12" : "col-md-6")}>{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              <ButtonsGroup backUrl={this.back} preview={(e) => this.togglePreview(e, "open")} save={this.onClickSave} />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">
            <SideBar layout={toolData.layout} activeTab={activeTab} selected={toolData.template} onChangeActive={this.onChangeActive}/>
          </div>
        </div>
      </ToolLayout>
    );
  }
}

const ExitIntentContent = (index) => {
  let data = {
    text: "Lorem ipsum nibh amet!", 
    subTitle: "Eiusmod tempor nibh veniam incididunt",
    cta: "Get Started!"
  }
  if( index === 7 || index === 8 ){
    data["text"] = "Merry Christmas <br> Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore";
  } else if( index === 9 || index === 11 || index === 22 ){
    data["text"] = "Valentine's Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore";
  } else if( (index === 10 || index === 21) ){
    data["text"] = "Spring Sale!!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua";
  } else if( index === 12 ){
    data["text"] = "Lorem ipsum dolor!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
    data["cta"] = "Get Started Now!"
  } else if( index === 13 ||  index === 15 ){
    data["text"] = "St.Patrick's Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 14 ){
    data["text"] = "Smile Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 16 ){
    data["text"] = "Black Friday <br> Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 17 ){
    data["text"] = "Autumn Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 18 || index === 19 ){
    data["text"] = "Cyber Monday Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 20 ){
    data["text"] = "New Year Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } 

  return data;
}

const HelloBarContent = (index) => {
  let data = {
    text: "Lorem ipsum nibh amet!", 
    subTitle: "Eiusmod tempor nibh veniam incididunt",
    cta: "Get Started!"
  }
  if( index === 10 || index === 11 || index === 12 || index === 22 || index === 23 ){
    data["text"] = "Lorem ipsum dolor!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua";
    data["cta"] = `Get Started ${index === 10 ? "Now!" : "!"}`;
  } else if( index === 13 ){
    data["text"] = "Spring Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore";
  } else if( index === 14 || index === 15 || index === 26 || index === 33){
    data["text"] = `Valentine's Day ${index === 26 ? "Offer!" : "Sale!"}`;
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore";
  } else if( index === 16 || index === 27 ){
    data["text"] = `Easter Sale${index === 27 ? "!" : ""}` ;
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore.";
  } else if( index === 17 ||  index === 18 ){
    data["text"] = "St.Patrick's Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore.";
  } else if( index === 19 ){
    data["text"] = "Autumn Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore.";
  } else if( index === 20 || index === 21 ){
    data["text"] = "Cyber Monday Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore.";
  } else if( index === 24 || index === 25 ){
    data["text"] = index === 25 ? "Spring Season Sale!" : "Black Friday Sale!!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod";
  } else if( index === 28 || index ===29 ){
    data["text"] = `New Year Sale${index ===28 ? "!":""}`;
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod";
  } else if( index === 30 || index === 31 || index === 32 ){
    data["text"] = index === 32 ? `Smile Day Sale!`:`Merry Christmas Sale!`;
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod";
  }
  return data;
}

const optinFormContent = (index) => {
  let data = {
    text: "Lorem ipsum nibh amet!", 
    subTitle: "Lorem ipsum dolor sit amet, consectetur",
    cta: "Get Started!"
  }

  if( index === 0 || index === 1 || index === 2 || index === 12 || index === 13 ){
    data["text"] = "Lorem ipsum dolor!";
    data["cta"] = `Get Started ${index === 0 ? "Now!" : "!"}`;
  } else if( index === 3 ){
    data["text"] = "Spring Sale!";
  } else if( index === 4 || index === 5 || index === 16 || index === 23){
    data["text"] = `Valentine's Day ${index === 16 ? "Offer!" : "Sale!"}`;
    data["subTitle"] = index === 16 ? `Lorem ipsum dolor sit amet, consectetur<br>adipiscing elit, sed diam nonummy nibh euismod.`: "Lorem ipsum dolor sit amet, consectetur";
  } else if( index === 6 || index === 17 ){
    data["text"] = `Easter Sale${index === 17 ? "!" : ""}` ;
  } else if( index === 7 ||  index === 8 ){
    data["text"] = "St.Patrick's Day Sale!";
  } else if( index === 9 ){
    data["text"] = "Autumn Sale!";
  } else if( index === 10 || index === 11 ){
    data["text"] = "Cyber Monday Sale!";
  } else if( index === 14 || index === 15 ){
    data["text"] = index === 15 ? "Spring Season Sale!" : "Black Friday Sale!!";
  } else if( index === 18 || index === 19 ){
    data["text"] = `New Year Sale${index === 18 ? "!":""}`;
    data["subTitle"] = index === 19 ? `Lorem ipsum dolor sit amet, consectetur<br>adipiscing elit, sed diam nonummy nibh euismod.`: "Lorem ipsum dolor sit amet, consectetur";
  } else if( index === 20 || index === 21 || index === 22 ){
    data["text"] = index === 22 ? `Smile Day Sale!`:`Merry Christmas Sale!`;
  }
  return data;
}

const optinExitIntentContent = (index) => {
  let data = {
    text: "Lorem ipsum nibh amet!", 
    subTitle: "Eiusmod tempor nibh veniam incididunt",
    cta: "Get Started!"
  }
  if( index === 0 || index === 1 ){
    data["text"] = "Merry Christmas <br> Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore";
  } else if( index === 2 || index === 4 || index === 15 || index === 22 ){
    data["text"] = `Valentine's Day ${index === 22 ? "Offer!" : "Sale!"}`;
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore";
  } else if( (index === 3 || index === 14 || index === 17 || index === 19 ) ){
    data["text"] = `Spring ${index === 17 || index === 19 ? "Season Sale!" : "Sale!!"}`;
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua";
  } else if( index === 5 || index === 16 || index === 18 ){
    data["text"] = "Lorem ipsum dolor!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
    data["cta"] = "Get Started Now!"
  } else if( index === 6 ||  index === 8 ){
    data["text"] = "St.Patrick's Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 7 ){
    data["text"] = "Smile Day Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 9 ){
    data["text"] = "Black Friday <br> Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 10 ){
    data["text"] = "Autumn Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if( index === 11 || index === 12 ){
    data["text"] = "Cyber Monday Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur";
  } else if( index === 13 || index === 23 ){
    data["text"] = "New Year Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  } else if ( index === 20 || index === 21 ){
    data["text"] = "Easter Sale!";
    data["subTitle"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore  et dolore magna";
  }

  return data;
}
