import React, { Component } from "react";
import Editor from "../comman/Editor";
import { Switch } from "antd";
import RequestHandler from "../../actions/RequestHandler";
import {Link} from "react-router-dom";

import {
  GET_AUTO_RESPONDER,
  GET_LIST_FROM_AUTORESPONDER,
  SAVE_LIST_ID
} from "../../actions/URLs";

export default class Responders extends Component {
  state = {
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
    lists: [],
    uid: "",
    mailServer: "",
    isLists: false,
    customList: [],
    ctAr: false,
  };

  componentDidMount() {
    RequestHandler.PostRequest(GET_AUTO_RESPONDER, {} ,(res, err) => {
      if(res.data.success) {
        let auto_data = this.state.auto_data, autoresponderData = res.data.autoResponder, newFormData = res.data.displayData, arList = []; 
        if(autoresponderData.length > 0 ) {
          for(let i=0; i<auto_data.length; i++) {
            for(let j=0; j<autoresponderData.length; j++) {
              this.setState({
                mailServer: autoresponderData[0].mailServer
              })
              if(auto_data[i].serverName === autoresponderData[j].mailServer) {
                auto_data[i].active = true;
              }
            }
          }
          this.getListFromAutoResponder(autoresponderData[0].mailServer, '');
        } 
        if(newFormData.length>0) {
          auto_data[auto_data.length-1].active = true;
          for(let k=0; k<newFormData.length; k++) {
            arList.push({
              id: newFormData[k]._id, 
              name: newFormData[k].name,
              formData: newFormData[k].formData
            });
          }
        }
        this.setState({
          auto_data : auto_data,
          isLists: newFormData.length > 0 || autoresponderData.length > 0 ? true : false,
          customList: arList
        })
        
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
    });
  }

  getListFromAutoResponder(mailServer, e) {
    if(mailServer === "CUSTOM") {
      this.setState({ctAr : true} , () => {});
    } else {
      let data = {
        action : "getList", 
        responder : mailServer
      }
  
      RequestHandler.PostRequest(GET_LIST_FROM_AUTORESPONDER, data, (res,err) => {
        if (res) {
          let respData = res.data;
          if(respData.lists) {
            let auto_data = this.state.auto_data;
            auto_data.forEach( el => {
              if(el.serverName === mailServer) {
                this.setState({
                  lists: respData.lists,
                  mailServer: mailServer,
                  ctAr : false
                });
              }
            })
          } else {
            window.gs.success(false, res.data.message);
          }
        } else {
          window.gs.success(false, "Something Went Wrong");
        }
      });
    }
    this.props.onChange({mailServer : mailServer}, e)
  }  
  
  onSave = () => {
    const mailData = {
      uid: this.state.uid,
      mailServer: this.state.mailServer
    }

    RequestHandler.PostRequest(SAVE_LIST_ID, { userData: { ...mailData } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          window.gs.success(true, "Autoresponder Save Successfully");
        } else {
          window.gs.success(false, res.data.message);
        }
      } else {
        window.gs.success(false, "Something Went Wrong");
      }
    });
  }

  render() {
    const { auto_data, lists, isLists, customList, ctAr } = this.state;
    return ( isLists ? 
        <div className="cz_radio_parent row">
          <div className="col-6">
            {auto_data.map((item, index) =>{
            return ( item.active ? 
                  <div className="cz_custom_radio" key={index}>
                    <label key={index} onChange={(e) => this.getListFromAutoResponder(item.serverName, e)}>
                        {/* <input type="checkbox" name="responder"/> */}
                        <input type="radio" className="form-check-input" name="responder" defaultChecked={this.props.mailServer === item.serverName ? true : false}/>
                        <span className="form-check-label" key={index}>
                            {item.name}
                        </span>
                    </label>
                </div> : null
            )
          })}
          </div>
          <div className="col-6">
            <form className="cz_responders_column">
              <div className="form-elements">
                <label>Select Unique Id</label>
                <select className="cz_custom_input" onChange={(e)=> {
                  this.setState({uid: e.target.value});
                  this.props.onChange({uid: e.target.value}, e); 
                  customList.filter((cc) => {
                    if(cc.id == e.target.value) {
                      this.props.onChange({formData: cc.formData}, e);
                    }
                  })
                }}>
                  <option>Select List</option>
                  { !ctAr ? lists.map((list, i) => {
                    return(<option key={i+1} value={list.id}>{list.name}</option>)
                  }) : customList.map((cl, i) => {
                    return(<option key={i+1} value={cl.id}>{cl.name}</option>)
                  })}
                </select>
              </div>
              {/* <div className="cz_responder_btns">
                <button className="cz_btn cz_orange_btn" type="button" onClick={() => {
                    this.onSave()}
                  }
                >Submit</button>
              </div> */}
            </form> 
          </div>
        </div>
        : <div className="cz_empty_box">
          <h2>No AutoResponder available right now</h2>
          <p>You have not added any AutoResponder so far. Click on the button below to add the AutoResponder.</p>
          <Link className="cz_btn cz_orange_btn" to="/AUTO_RESPONDER">Add AutoResponder</Link>
        </div>
    );
  }
}
