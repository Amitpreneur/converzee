import React, { PureComponent, useState } from "react";
import { Input, Avatar, Modal } from "antd";
import DropDown from "./DropDown";
import RequestHandler from "../../actions/RequestHandler";
import ToolUtil, { getToolsPermission } from "../../utils/ToolUtil";
import { CampaignNameInput, LockTool } from "../comman/Popup";
import { 
  AUTO_RESPONDER,
  GET_AUTO_RESPONDER,
  BASE_URL,
  AUTHORIZATION,
  AWEBERAUTHORIZATION,
  CONSTANTCONTACTAUTH,
  AUTORESPONDER_AUTHORIZE,
  ADD_CUSTOME_AR,
  EDIT_CUSTOME_AR,
  DELETE_CUSTOME_AR,
  DISCONNECT_AR
} from "../../actions/URLs";
import axios from "axios";
import { Storage } from "../../utils/Storage";

export default class AutoResponderConfig extends PureComponent {
  state = {
    mailServer: "MAILCHIMP",
    showdata:false,
    displayData:[],
    mailData: {},
    responderPopup:false,
    formId:0,
    connectedAR: {},
    auto_data : [
      {
        id : 1,
        name : 'Mailchimp',
        serverName : 'MAILCHIMP',
        icon : '/asset/auto/mailchimp.png',
        stateName : "mailChimp",
        active: false
      },
      {
        id : 2,
        name : 'Active Campaign',
        serverName : 'ACTIVE_CAMPAIGN',
        icon : '/asset/auto/activecampaign.png',
        stateName : "activeCampaign",
        active: false
      },
      {
        id : 3,
        name : 'Aweber',
        serverName : 'AWEBER',
        icon : '/asset/auto/aweber.png',
        stateName : "aweber",
        active: false
      },
      {
        id : 4,
        name : 'Constant Contact',
        serverName : 'CONSTANT_CONTACT',
        icon : 'asset/auto/constant_contact.png',
        stateName : "constantContact",
        active: false
      },
      {
        id : 5,
        name : 'Convert Kit',
        serverName : 'CONVERT_KIT',
        icon : 'asset/auto/convertkit.png',
        stateName : "convertKit",
        active: false
      },
      {
        id : 6,
        name : 'Infusion Soft',
        serverName : 'INFUSION_SOFT',
        icon : 'asset/auto/infusionsoft.png',
        stateName : "infusionSoft",
        active: false
      },
      
      {
        id : 7,
        name : 'Sendiio',
        serverName : 'SENDIIO',
        icon : 'asset/auto/sendiio.png',
        stateName : "sendiio",
        active: false
      },
      {
        id : 8,
        name : 'Mailvio',
        serverName : 'MAILVIO',
        icon : 'asset/auto/mailvio.png',
        stateName : "mailVio",
        active: false
      },
      {
        id : 9,
        name : 'Getresponse',
        serverName : 'GETRESPONSE',
        icon : 'asset/auto/getresponse.png',
        stateName : "getResponse",
        active: false
      },
      {
        id : 10,
        name : 'Sendlane',
        serverName : 'SENDLANE',
        icon : 'asset/auto/sendlane.png',
        stateName : "sendlane",
        active: false
      },
      {
        id : 11,
        name : 'Custom',
        serverName : 'CUSTOM',
        icon : 'asset/auto/custom_html.png',
        stateName : "custom",
        active: false
      }
    ],
    mailChimp : {
      apikey: ""
    },
    activeCampaign : {
      url: "",
      apikey: ""
    },
    aweber : {
      clientId: "",
      clientSecret: ""
    },
    constantContact : {
      clientId: "",
      clientSecret: ""
    },
    convertKit : {
      apikey: "",
      apiSecret: ""
    },
    infusionSoft : {
      clientId: "",
      clientSecret: ""
    },
    sendiio : {
      apiToken: "",
      apiSecret: ""
    },
    mailVio : {
      apikey: ""
    },
    getResponse : {
      apikey: ""
    },
    sendlane : {
      apikey: "",
      apiUrl: "",
      hashkey: ""
    },
  };

  handleResponderPopup(id, serverName){
    this.setState({
      responderPopup:true,
      formId:id,
      mailServer:serverName
    })
  }
  componentDidMount() {
    window.gs.navTitle("Setup Auto-Responder");
    setTimeout( () => {
      if (ToolUtil.autoResponder) {
        this.setState({ mailServer: ToolUtil.autoResponder.mailServer, mailData: ToolUtil.autoResponder });
        this.getDefaultResponderData();
      }
    }, 500);
  }

  getDefaultResponderData = () => {
    RequestHandler.PostRequest(GET_AUTO_RESPONDER, {} ,async (res, err) => {
      if(res) {
        let auto_data = this.state.auto_data, autoresponderData = res.data.autoResponder, newFormData = res.data.displayData;
        let displayData = this.state.displayData;
        if(autoresponderData.length> 0) {
          for(let i=0; i<auto_data.length; i++) {
            for(let j=0; j<autoresponderData.length; j++) {
              if(auto_data[i].serverName === autoresponderData[j].mailServer) {
                this.setState({
                  ...this.state, 
                  [auto_data[i].stateName] : autoresponderData[j]
                });
                if(Object.keys(autoresponderData[j]).length>1) {
                  auto_data[i].active = true;
                }
              }
            }
          }
        } else {
          let ar = [];
          auto_data.map( ad => {
            ad.active = false;
            ar.push(ad);
          });
          this.setState({auto_data: ar});
        }
        if(newFormData.length>0) {
          auto_data[auto_data.length-1].active = true;
          for(let nf of newFormData) {
            let formData = `<div class="cz_responder_form" data-label="${nf._id}">
              <div class="form-elements">
                <label>Form Name*</label>
                <input class="cz_custom_input" type="text" placeholder="Enter name" name="formName" value="${nf.name}"/>
              </div>
              <div class="form-elements">
                <label>Enter your custom HTML form below and click on submit.</label>
                <textarea class="customhtml_code form-control" name="formData">${JSON.parse(nf.formData)}</textarea>
              </div>
              <div class="cz_responder_btns">
                <span class="cz_btn cz_light_btn remove_form">Remove</span>
                <button class="cz_btn cz_orange_btn submit_form" type="button">Submit</button>
              </div>
            </div>`;

            displayData.push(formData);
          }
        }
        this.setState(auto_data, () => {console.log(this.state.auto_data)});
        this.setState(displayData, () => {})
      }
    });
  }

  onMailServerChange = (value) => {
    this.setState({ mailServer: value });
  };

  onSave = (data) => {
    const { mailServer } = this.state;
    if(mailServer === "CONSTANT_CONTACT" ){
      this.authorizeConstantContact(data, mailServer);
    } else if(mailServer === "AWEBER" ) {
      this.authorizeAweber(data, mailServer);
    } else if(mailServer === "INFUSION_SOFT" ) {
      this.authorizeInfusionSoft(data, mailServer);
    }else {
      this.setState({ mailData: { mailServer, ...data } }, () => {
        this.onInstall();
      });
    }
  };

  onInstall = () => {
    const { mailData } = this.state;
    RequestHandler.PostRequest(AUTO_RESPONDER, { userData: { ...mailData } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          ToolUtil.autoResponder = mailData;
          window.gs.success(true, res.data.message);
          this.setState({responderPopup:false});
          this.getDefaultResponderData();
        } else {
          window.gs.success(false, res.data.message);
        }
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
    });
  };

  authorizeInfusionSoft = (data, mailServer) => {
    const { infusionSoft } = this.state;

    let popupwin;
    this.setState({ mailData: { mailServer, ...data } }, () => {
      this.onInstall();
    });
    setTimeout( () => {
      let params = new URLSearchParams({
        "scope": "full",
        "response_type": "code",
        "client_id": infusionSoft.clientId,
        "client_secret": infusionSoft.clientSecret,
        "redirect_uri": BASE_URL+AUTHORIZATION
      })
      let query = params.toString();
      let Url = `https://signin.infusionsoft.com/app/oauth/authorize?${query}`;
      popupwin = window.open(Url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
      
      setTimeout( () => {
        this.setState({ mailData: { mailServer, ...data } }, () => {
          this.onInstall();
        });
      }, 10000);
    }, 1000);
  }

  authorizeConstantContact = (data, mailServer) => {
    let params = new URLSearchParams({
      client_id : data.clientId,
      redirect_uri: BASE_URL+CONSTANTCONTACTAUTH,
      response_type: "code",
      scope: "contact_data+campaign_data+account_read+account_update"
    })

    let query = params.toString();

    let url = `https://api.cc.email/v3/idfed?${query}`;

    this.authorizeAutoResponder(data, mailServer, url);
  }
  
  authorizeAutoResponder = (data, mailServer, url) => {
    let postData = data;
    let popupwin;
 
    postData["mailServer"] = mailServer;

    RequestHandler.PostRequest(AUTORESPONDER_AUTHORIZE, postData, (res,err) => {
      if (res.data.status) {
        popupwin = window.open(url, '_blank', 'location=yes,height=570,width=720,scrollbars=yes,status=yes');
        setTimeout( () => {
          this.setState({ mailData: { mailServer, ...data } }, () => {
            this.onInstall();
          });
        }, 10000)
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
    });
  }

  authorizeAweber = (data,mailServer) => {
    const { aweber } = this.state;
    let popupwin;
 
    let postData = {
      "clientId" : aweber.clientId,
      "clientSecret" : aweber.clientSecret, 
      "mailServer" : mailServer
    }

    RequestHandler.PostRequest(AWEBERAUTHORIZATION, postData, (res,err) => {
      if (res.data.status) {
        popupwin = window.open(res.data.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        let _this = this;
        var popupTick = setInterval(function() {
          if (popupwin.closed) {
              clearInterval(popupTick);
              console.log('window closed!');
              setTimeout(() => {
                _this.setState({ formId: 0, responderPopup:false });
                _this.getDefaultResponderData();
              }, 200);
          }
        }, 500);
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
    })
  }

  appendData = (e) => {
    let formData = `<div class="cz_responder_form">
      <div class="form-elements">
        <label>Form Name*</label>
        <input class="cz_custom_input" type="text" placeholder="Enter name" name="formName" />
      </div>
      <div class="form-elements">
        <label>Enter your custom HTML form below and click on submit.</label>
        <textarea class="customhtml_code form-control" name="formData"></textarea>
      </div>
      <div class="cz_responder_btns">
        <span class="cz_btn cz_light_btn remove_form">Remove</span>
        <button class="cz_btn cz_orange_btn submit_form" type="button">Submit</button>
      </div>
    </div>`;

    this.state.displayData.push(formData);
    this.setState(this.state.displayData, () => {});
  }

  onFormSubmit = (target) => {
    let parentElem = target.parentNode.parentNode;
    let id = parentElem.getAttribute("data-label");
    let element = parentElem.children;
    let formName = element[0].getElementsByTagName("input")[0].value;
    let formData = element[1].getElementsByTagName("textarea")[0].value;
    let URL = ADD_CUSTOME_AR;
    let postData = {
      "name" : formName,
      "formData" : JSON.stringify(formData)
    }

    if(id) {
      URL = EDIT_CUSTOME_AR;
      postData["id"] = id;
    }
    RequestHandler.PostRequest(URL, postData, (res, err) => {
      if (res.data.success) {
        this.setState({responderPopup:false, displayData: []}, () => {});
        setTimeout(() => {
          this.getDefaultResponderData();
          window.gs.success(true, res.data.message);
        },100);
      } else {
        window.gs.success(false, res.data.message);
      }
    })
  }

  detectFunction = (e) => {
    if(e.target.classList.contains("remove_form")) {
      this.removeForm(e.target);
    } else if(e.target.classList.contains("submit_form")) {
      this.onFormSubmit(e.target);
    }
  }

  removeForm = (target) => {
    let parentElem = target.parentNode.parentNode;
    let id = parentElem.getAttribute("data-label");
    Modal.confirm({
      title: "Confirm",
      content: "Are you Sure you want to delete this form ?",
      okText: "Remove",
      onOk: () => {
        if(id) {
          RequestHandler.PostRequest(DELETE_CUSTOME_AR, { userData: { id } }, (res, err) => {
            if (res) {
              const { data } = res;
              if (data.success) {
                window.gs.success(true, data.message);
                this.setState({responderPopup:false, displayData: []}, () => {});
                setTimeout(() => {
                  this.getDefaultResponderData();
                },100);
              }
            }
          });
        } else {
          parentElem.remove();
        }
      },
      cancelText: "Cancel",
    });
  }

  disconnectAr = (userData) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you Sure you want to disconnect ?",
      okText: "Disconnect",
      onOk: () => {
        RequestHandler.PostRequest(DISCONNECT_AR, { userData }, (res, err) => {
          if (res) {
            const { data } = res;
            if (data.success) {
              window.gs.success(true, data.message);
              this.setState({responderPopup:false}, () => {});
              let ar = [];
              this.state.auto_data.map( ad => {
                if(ad.serverName === userData.mailServer) {
                  ad.active = false;
                }
                ar.push(ad);
              });
              this.setState({auto_data: ar});
              setTimeout(() => {
                this.getDefaultResponderData();
              }, 300);
            }
          }
        });
      },
      cancelText: "Cancel",
    });
  }

  render() {
    const { mailChimp, activeCampaign, aweber, constantContact, convertKit, infusionSoft, sendiio, mailVio, getResponse, sendlane, displayData } = this.state;
    return (
      <div className="cz_auto_responder_wrapper">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="cz_responder_box">
              {this.state.auto_data.map((item, index) =>{
                return (
                  <div className={"cz_responders".concat(item.active ? " active" : "")} key={index} onClick={()=>{
                    this.handleResponderPopup(item.id, item.serverName);
                  }}>
                    <i className="fa fa-check-circle"></i>
                    <img src={item.icon} alt={item.name} /> 
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* autoresponder popup  */}
        <div className={this.state.responderPopup === true ? 'cz_autoresponder_popup active' : 'cz_autoresponder_popup'}>
            <div className="cz_popup_close" onClick={()=>this.setState({responderPopup:false})}></div>
            <div className="cz_popup_box">
              {this.state.formId === 1 ? 
                <form>
                  <h2>Mailchimp</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>Api Key*</label>
                      <input 
                        className="cz_custom_input" 
                        type="text" 
                        placeholder="Enter api Key" 
                        value={mailChimp.apikey} 
                        onChange={(e)=>  this.setState({mailChimp : {...mailChimp, apikey :e.target.value}})}
                      />
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !mailChimp.isValidate ?
                      <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "MAILCHIMP"}); 
                        this.onSave(mailChimp)}}
                      >Submit</button> :
                      <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "MAILCHIMP"}); 
                        this.disconnectAr(mailChimp)}}
                      >Disconnect</button>
                      }
                    </div>
                  </div>
                </form> 
              : null}

              {this.state.formId === 2 ? 
                <form>
                  <h2>Active Campaign</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Access URL*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api Access url" value={activeCampaign.url} 
                        onChange={(e)=> this.setState({activeCampaign : {...activeCampaign, url :e.target.value}})}/>
                    </div>
                    <div className="form-elements">
                      <label>API Access Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api Access Key" value={activeCampaign.apikey} 
                        onChange={(e)=> this.setState({activeCampaign : {...activeCampaign, apikey :e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !activeCampaign.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                        this.onSave(activeCampaign)
                        }}>Submit</button> :
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(activeCampaign)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form> 
              : null}

              {this.state.formId === 3 ? 
                <form>
                  <h2>Aweber</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>Client ID*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter Client id" value={aweber.clientId} 
                        onChange={(e)=> this.setState({aweber : {...aweber, clientId :e.target.value}})}/>
                    </div>
                    <div className="form-elements">
                      <label>Client Secret*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter Client Secret" value={aweber.clientSecret} 
                        onChange={(e)=> this.setState({aweber : {...aweber, clientSecret :e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                    { !aweber.isValidate ?
                      <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "AWEBER"});
                        this.onSave(aweber)
                      }}>Submit</button>:
                      <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "MAILCHIMP"}); 
                        this.disconnectAr(aweber)}}
                      >Disconnect</button>
                    }
                    </div>
                    {/* <a href="https://auth.aweber.com/1.0/oauth/authorize_app/b2d4f695">Click Here</a> to get the code. */}
                  </div>
                </form> 
              : null}
              {this.state.formId === 4 ? 
                <form>
                  <h2>Constant Contact</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>clientId*</label>
                      <input 
                        className="cz_custom_input" 
                        type="text" 
                        placeholder="Enter clientId" 
                        autoComplete="Off"
                        value={constantContact.clientId} 
                        onChange={(e) => this.setState({constantContact : {...constantContact, clientId :e.target.value}})}
                      />
                    </div>
                    <div className="form-elements">
                      <label>Client Secret*</label>
                      <input 
                        className="cz_custom_input" 
                        type="text" 
                        placeholder="Enter Client Secret" 
                        autoComplete="Off"
                        defaultValue={constantContact.username} 
                        onChange={(e)=> this.setState({constantContact : {...constantContact, clientSecret :e.target.value}})}
                      />
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !constantContact.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                        // this.setState({ mailServer : "MAILCHIMP"}); 
                        this.onSave(constantContact)}}>Submit</button> :
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(constantContact)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 5 ? 
                <form>
                  <h2>Convert Kit</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api key" value={convertKit.apikey} 
                        onChange={(e)=> this.setState({convertKit : {...convertKit, apikey :e.target.value}})}/>
                    </div>
                    <div className="form-elements">
                      <label>API Secret*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api secret" value={convertKit.apiSecret} 
                        onChange={(e)=> this.setState({convertKit : {...convertKit, apiSecret :e.target.value}})}/>
                    </div>
                    
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !convertKit.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(convertKit)
                        }}>Submit</button> :
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(convertKit)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form> 
              : null}
              {this.state.formId === 6 ? 
                <form>
                  <h2>Infusionsoft</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>Client Id*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter Client Id" value={infusionSoft.clientId} 
                        onChange={(e)=> this.setState({infusionSoft : { ...infusionSoft, clientId: e.target.value}})}/>
                    </div>

                    <div className="form-elements">
                      <label>Client Secret*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter Client Secret" value={infusionSoft.clientSecret} 
                        onChange={(e) => this.setState({infusionSoft : { ...infusionSoft, clientSecret: e.target.value}})}/>
                    </div>
                    
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !infusionSoft.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(infusionSoft)
                        }}>Submit</button> :
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(infusionSoft)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 7 ? 
                <form>
                  <h2>Sendiio</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Token*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api token" value={sendiio.apiToken} 
                        onChange={(e)=> this.setState({sendiio : {...sendiio, apiToken :e.target.value}})}/>
                    </div>
                    <div className="form-elements">
                      <label>API Secret*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api secret" value={sendiio.apiSecret} 
                        onChange={(e)=> this.setState({sendiio : {...sendiio, apiSecret :e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !sendiio.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(sendiio)
                        }}>Submit</button>:
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(sendiio)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 8 ? 
                <form>
                  <h2>Mailvio</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api key" value={mailVio.apikey} 
                        onChange={(e)=> this.setState({mailVio : {...mailVio, apikey :e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !mailVio.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(mailVio)
                        }}>Submit</button>:
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(mailVio)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 9 ? 
                <form>
                  <h2>GetResponse</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api key" value={getResponse.apikey} 
                        onChange={(e)=> this.setState({getResponse : {...getResponse, apikey :e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !getResponse.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(getResponse)
                        }}>Submit</button>:
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(getResponse)}}
                        >Disconnect</button>
                      }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 10 ? 
                <form>
                  <h2>Sendlane</h2>
                  <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>API Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter api key" value={sendlane.apikey} 
                        onChange={(e)=> this.setState({sendlane: {...sendlane, apikey:e.target.value}})}/>
                    </div>

                    <div className="form-elements">
                      <label>API URL*</label>
                      <input className="cz_custom_input" type="text" placeholder="yourapi.sendlane.com" value={sendlane.apiUrl} 
                        onChange={(e)=> this.setState({sendlane: {...sendlane, apiUrl:e.target.value}})}/>
                    </div>

                    <div className="form-elements">
                      <label>Hash Key*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter hash key" value={sendlane.hashkey} 
                        onChange={(e)=> this.setState({sendlane: {...sendlane, hashkey:e.target.value}})}/>
                    </div>
                    <div className="cz_responder_btns">
                      <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                      { !sendlane.isValidate ?
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "ACTIVE_CAMPAIGN"});
                          this.onSave(sendlane)
                        }}>Submit</button>:
                        <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                          // this.setState({ mailServer : "MAILCHIMP"}); 
                          this.disconnectAr(sendlane)}}
                        >Disconnect</button>
                    }
                    </div>
                  </div>
                </form>  
              : null}
              {this.state.formId === 11 ? 
                <>
                <form className="cz_custom_responder_form">
                  <h2 className="custom_responder_heading">Custom Auto Responder </h2>
                  {/* <div className="cz_responder_form">
                    <div className="form-elements">
                      <label>Form Name*</label>
                      <input className="cz_custom_input" type="text" placeholder="Enter name" name="formName" />
                    </div>
                    <div className="form-elements">
                      <label>Enter your custom HTML form below and click on submit.</label>
                      <textarea className="customhtml_code form-control" name="formData"></textarea>
                    </div>
                    <div className="cz_responder_btns">
                      <button className="cz_btn cz_orange_btn" type="button" onClick={(e) => this.onFormSubmit(e.target)}>Submit</button>
                    </div>
                  </div> */}
                  {displayData.map( (elem, i) => {
                    return (
                      <div onClick={this.detectFunction} dangerouslySetInnerHTML={{ __html: elem }} key={i}></div>
                    )
                  })}
                </form>  
                <div className="cz_responder_btns">
                  <span className="cz_btn cz_light_btn" onClick={()=>this.setState({responderPopup:false})}>Cancel</span>
                  <button className="cz_btn cz_orange_btn" type="button" onClick={()=> this.appendData()}>Add Form</button>
                </div>
                </>
              : null}
            </div>
        </div>
        {/* autoresponder popup  */}
      </div>

    );
  }
}
