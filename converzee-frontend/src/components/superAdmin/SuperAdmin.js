import React, { Component, useState, useEffect } from "react";
import "./SuperAdmin.css";
import { dateParser } from "../Util";
import { getUserList, parseUserData, parseResellerData, parseLinkData } from "../comman/TableWithData";
import { Tabs, Modal, Select, Switch, Popconfirm } from "antd";
import ToolUtil from "../../utils/ToolUtil";
import RequestHandler from "../../actions/RequestHandler";
import { 
  UPDATE_USER, 
  UPDATE_ACCESS, 
  SEARCH_USER, 
  ADD_USER, 
  UPDATE_PASSWORD_ACCESS,
  GET_LINKS,
  ADD_LINKS,
  UPDATE_LINK,
  DELETE_USER_DATA,
  SCRIPT_UPDATE
} from "../../actions/URLs";
const { Option } = Select;

export default class SuperAdmin extends Component {
  state = {
    reseller: [],
    user: [],
    link: [],
    activeTab: 2,
    loading: true,
    id: null,
    emailId: null,
    isEmailLogs: false,
    linkId: null,
    isAdd: false,
    productPop:false,
    isUpgrade1: false,
    isUpgrade2: false,
    tool: [],
    isSubuser: false
  };
  resellers = [];
  users = [];
  links = [];

  OTO1 = [
    { tid: 1, selected: false, text: "Tab Messaging" },
    { tid: 2, selected: false, text: "Urgency Timer" },
    { tid: 5, selected: false, text: "Video Popup" },
    { tid: 6, selected: false, text: "Central Timer" },
    { tid: 7, selected: false, text: "Geo Redirection" },
    { tid: 3, selected: false, text: "HELLO BAR" },
    { tid: 4, selected: false, text: "Image Popup" },
    { tid: 9, selected: false, text: "Exit Intent" },
    { tid: 10, selected: false, text: "Mobile Vibrator" },
    { tid: 13, selected: false, text: "Dynamic Elements" },
    { tid: 14, selected: false, text: "Offer iframe" },
    { tid: 15, selected: false, text: "Back Button redirection" },
    { tid: 17, selected: false, text: "HELLO BAR + Timer" },
    { tid: 19, selected: false, text: "Optin Form" },
    { tid: 24, selected: false, text: "Autoplay Video" },
    { tid: 25, selected: false, text: "Proof App" }
  ];

  componentDidMount() {
    this.setState({isSubuser: window.isSubuser}, ()=> {
      this.onTabSwitch(1);
    })
  }
  productPopClick=()=>{
    this.setState({ productPop: true });
  }
  onPopClose=()=>{
    this.setState({ productPop: false });
  }

  onTabSwitch = (userType) => {
    this.state.activeTab = userType;
    if(userType === 3) {
      RequestHandler.PostRequest(GET_LINKS, {}, (res, err) => {
        let response = res.data;
        if(response) {
          if(response.links) {
            this.links = response.links;
            this.setState({ link: parseLinkData(response.links), loading: false });
          } else {
            this.links = [];
            this.setState({ link: [], loading: false });
          }
        }
      });
    } else {
      getUserList(userType, (data, err) => {
        if (data && userType == 1) {
          this.resellers = data;
          this.setState({ reseller: parseResellerData(data), loading: false });
        }
        if (data && userType == 2) {
          this.users = data;
          this.setState({ user: parseUserData(data), loading: false });
        }
      });
    }
  };

  onSearch = (searchString) => {
    const userType = this.state.activeTab;
    RequestHandler.PostRequest(SEARCH_USER, { userData: { searchString, userType } }, (res, err) => {
      if (res) {
        const data = res.data.data;
        if (userType == "1") this.setState({ reseller: parseResellerData(data) });
        else this.setState({ user: parseUserData(data) });
      }
    });
  };

  onAddClick = () => {
    this.setState({ isAdd: true });
  };

  onCloseAdd = () => {
    this.setState({ 
      isAdd: false,
      tool: [],
      isUpgrade1: false,
      isUpgrade2: false
    });
  };

  addUser = (email, password, firstname, access, tools) => {
    const { isUpgrade1, isUpgrade2, tool } = this.state;
    
    if(isUpgrade1) {
      tool.push(18);
    }
    if(isUpgrade2) {
      tool.push(20);
      tool.push(21);
    }
    
    access = access ? 80 : 50;
    RequestHandler.PostRequest(ADD_USER, { userData: { email, password, firstname, access, tool, isUpgrade1, isUpgrade2 } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          window.gs.success(res.data.success);
          this.setState({ 
            isAdd: false,
            tool: [],
            isUpgrade1: false,
            isUpgrade2: false
          });
          this.onTabSwitch(this.state.activeTab);
        } else {
          window.gs.success(false, res.data.message);
        }
      }
    });
  };
   
  addLinks = (state) => {
    RequestHandler.PostRequest(ADD_LINKS, { state }, (res, err) => {
      if (res) {
        if (res.data.success) {
          window.gs.success(res.data.success);
          this.setState({ isAdd: false });
          this.onTabSwitch(this.state.activeTab);
        } else {
          window.gs.success(false, res.data.message);
        }
      }
    });
  };

  updateLinks = (name, url) => {
    const { linkId } = this.state;
    RequestHandler.PostRequest(UPDATE_LINK, { userData: { linkId, name, url } }, (res, err) => {
      if (res) {
        window.gs.success(res.data.success);
        if (res.data.success) {
          this.onTabSwitch(this.state.activeTab);
          this.setState({ linkId: null });
        }
      }
    });
  };

  onLinkEdit = (linkId) => {
    this.setState({ linkId });
  };

  onLinkClose = () => {
    this.setState({ linkId: null });
  };

  getUserData = (id) => {
    const { activeTab } = this.state;
    let data;
    if (activeTab === 1) {
      data = this.resellers.find((e) => e._id === id);
    } else if(activeTab === 2){
      data = this.users.find((e) => e._id === id);
    }  else {
      data = this.links.find((e) => e._id === id);
    }
    return data;
  };

  onEdit = (id) => {
    this.setState({ id });
  };

  onClose = () => {
    this.setState({ id: null });
  };

  getTools = (isUpgrade1 = false, isUpgrade2 = false) => {
    const tools = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 17, 19, 24, 25]);
    if (isUpgrade1) {
      tools.add(18);
    }
    if (isUpgrade2) {
      tools.add(20);
      tools.add(21);
    }
    return Array.from(tools);
  };

  onSave = (name, isActive, isUpgrade1 = false, isUpgrade2 = false) => {
    const { id } = this.state;
    const tools = this.getTools(isUpgrade1, isUpgrade2);
    RequestHandler.PostRequest(UPDATE_USER, { userData: { id, name, isActive, tools, isUpgrade1, isUpgrade2 } }, (res, err) => {
      if (res) {
        window.gs.success(res.data.success);
        if (res.data.success) {
          this.onTabSwitch(this.state.activeTab);
          this.setState({ id: null });
        }
      }
    });
  };

  makeAdmin = (id) => {
    RequestHandler.PostRequest(UPDATE_ACCESS, { userData: { id } }, (res, err) => {
      if (res) {
        window.gs.success(res.data.success);
        this.onTabSwitch(this.state.activeTab);
      }
    });
  };

  onResetPass = (id) => {
    RequestHandler.PostRequest(UPDATE_PASSWORD_ACCESS, { userData: { id } }, (res, err) => {
      if (res) {
        window.gs.success(res.data.success);
        this.onTabSwitch(this.state.activeTab);
      }
    });
  };

  toggleView = (tab) => {
    this.onTabSwitch(tab);
  };

  changeUpgrade = (data) => {
    this.setState(data);
  }

  // email log show
  showEmailLogs = () => {
    this.setState({ isEmailLogs: true})
  } 

  closeEmailLogs = () => {
    this.setState({ emailId:null, isEmailLogs: false})
  }

  onEmailLogs = (id) => {
    this.setState({ emailId: id})
  }

  onDelete = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you Sure to Delete this user",
      okText: "Delete",
      onOk: () => {
        RequestHandler.PostRequest(DELETE_USER_DATA, { userData: { id } }, (res, err) => {
          if (res) {
            const { data } = res;
            if (data.success) {
              window.gs.success(true, data.message);
              this.onTabSwitch(this.state.activeTab);
            }
          }
        });
      },
      cancelText: "Cancel",
    });
  };

  updateScript = () => {
    RequestHandler.PostRequest(SCRIPT_UPDATE, {}, (res, err) => {
      let response = res.data;
      if(response.success) {
        window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.SUCCESS });
      } else {
        window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
      }
    });
  }

  render() {
    const { user, reseller, link, id, linkId, isAdd, activeTab, isSubuser, emailId} = this.state;
    const modelProps = {
      visible: id ? true : false,
      onClose: this.onClose,
      data: id ? this.getUserData(id) : {},
      onSave: this.onSave
    };

    const linkProps = {
      visible: linkId ? true : false,
      onClose: this.onLinkClose,
      data: linkId ? this.getUserData(linkId) : {},
      updateLinks: this.updateLinks,
      isSubuser: isSubuser
    }

    const emailProps = {
      onClose: this.closeEmailLogs,
      data: emailId ? this.getUserData(emailId) : {}
    }

    return (
      <div className="container admin" name="admin">
        {this.state.productPop  ? <ProductModel {...this.state} popClose={()=>this.onPopClose()} OTO1={this.OTO1} onChange={this.changeUpgrade} />:null}
        {activeTab !== 3 ? (id ? <EditModel {...modelProps} /> : null) : null}
        { activeTab !== 3 ? (emailId ? <GetEmailLogs  {...emailProps} /> : null) : null}
        
        { activeTab === 3 ? (linkId ? <EditLinkModel {...linkProps} /> : null) : null}

        {/* <ADDLinkModel onAddClick={this.addLinks} visible={isAdd} onClose={this.onCloseAdd} /> */}
        {activeTab === 3 ? null : <ADDModel onAddClick={this.addUser} visible={isAdd} onClose={this.onCloseAdd} productPopClick={()=>this.productPopClick()}/> }
        <div className="row">
          <SearchInput onSearch={this.onSearch} />

          {/* <ADD_LINKS_BUTTON onAddClicked={this.onAddClick} /> */}
      
          {activeTab === 3 && !isSubuser? null : (!isSubuser ? <ADD_USER_BUTTON onAddClicked={this.onAddClick} /> : null) }
          <UpdateScript updateScript={this.updateScript} />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="toggle-chart m-2 align-items-center">
              <div onClick={() => this.toggleView(1)} className={activeTab === 1 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                Admin
              </div>
              <div onClick={() => this.toggleView(2)} className={activeTab === 2 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                User
              </div>
              <div onClick={() => this.toggleView(3)} className={activeTab === 3 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                Links
              </div>
            </div>
          </div>
          <div className="col-12">
            {activeTab === 2 ? (
              <USERTABLE data={user} isSubuser={isSubuser} onResetPass={this.onResetPass} onEdit={this.onEdit} showEmailLogs={this.showEmailLogs} onEmailLogs={this.onEmailLogs} onAdmin={this.makeAdmin} onDelete={this.onDelete}/>
            ) : null }
            { activeTab === 1 ?
              <RESELLERTABLE data={reseller} isSubuser={isSubuser} onEdit={this.onEdit} onResetPass={this.onResetPass} showEmailLogs={this.showEmailLogs} onEmailLogs={this.onEmailLogs} onAdmin={this.makeAdmin} onDelete={this.onDelete}/>
            : null }
            { activeTab === 3 ?
              <LINKTABLE data={link} onEdit={this.onLinkEdit} isSubuser={isSubuser}/>
            : null }
          </div>
        </div>
      </div>
    );
  }
}

const SearchInput = function (props) {
  const [search, setSearch] = useState(props.search);
  return (
    <div className="col-md-6 col-sm-12 col-lg-6">
      <div className="input-group mb-3">
        <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search" />
        <div className="input-group-append">
          <span className="input-group-text" onClick={() => props.onSearch(search)} style={{ cursor: "pointer" }}>
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

const ADD_USER_BUTTON = function (props) {
  return (
    <div className="col-md-6 col-sm-12 col-lg-3 ">
      <button className="btn btn-sm btn-primary pull-right" onClick={props.onAddClicked}>
        Add User
      </button>
    </div>
  );
};

const UpdateScript = function (props) {
  return (
    <div className="col-md-6 col-sm-12 col-lg-3 ">
      <button className="btn btn-sm btn-primary pull-left" onClick={props.updateScript}>
        Update User Script
      </button>
    </div>
  );
};

const ADD_LINKS_BUTTON = function (props) {
  return (
    <div className="col-md-6 col-sm-12 col-lg-6 ">
      <button className="btn btn-sm btn-primary pull-right" onClick={props.onAddClicked}>
        Add Links
      </button>
    </div>
  );
};

const USERROW = function (props) {
  const item = props.item;
  return (
    <tr>
      <td>{item.firstname}</td>
      <td>{item.email}</td>
      <td>{item.isActive ? <span className="badge badge-success">Active</span> : <span className="badge badge-secondary">De-Active</span>}</td>
      <td>{dateParser(item.date)}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEmailLogs(item.id)}>
          <i className="fa fa-envelope" aria-hidden="true"></i> Email Logs
          </button>
        </div>
      </td>
      {!props.isSubuser ? <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEdit(item.id)}>
            <i className="fa fa-edit" aria-hidden="true"></i> Edit
          </button>
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onDelete(item.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i> Delete
          </button>
          <button className="btn btn-sm btn-font-size makeAdminBtn" onClick={() => props.onAdmin(item.id)}>
            <i className="fa fa-user-secret" aria-hidden="true"></i> Make Admin
          </button>
          <button className="btn btn-sm btn-font-size makeAdminBtn" onClick={() => props.onResetPass(item.id)}>
            <i className="fa fa-user-secret" aria-hidden="true"></i> Reset
          </button>
        </div>
      </td> : null}
    </tr>
  );
};

const USERTABLE = function (props) {
  return (
    <div className="cz_userTable">
      <table className="table userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Created</th>
            <th>Script</th>
            {!props.isSubuser ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {props.data.length ? props.data.map((value, i) => (
            <USERROW key={i} item={value} isSubuser={props.isSubuser} onEdit={props.onEdit} onEmailLogs={props.onEmailLogs} onResetPass={props.onResetPass} onAdmin={props.onAdmin}  onDelete={props.onDelete}/>
          )): <tr><td colSpan="5">There is no user.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

const RESELLERROW = function (props) {
  const item = props.item;
  return (
    <tr>
      <td>{item.firstname}</td>
      <td>{item.email}</td>
      <td>{item.isActive ? <span className="badge badge-success">Active</span> : <span className="badge badge-secondary">De-Active</span>}</td>
      <td>{dateParser(item.date)}</td>
      <td>{item.totallicence}</td>
      <td>{item.consumeLicence}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEmailLogs(item.id)}>
          <i className="fa fa-envelope" aria-hidden="true"></i> Email Logs
          </button>
        </div>
      </td>
      {!props.isSubuser ? <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEdit(item.id)}>
            <i className="fa fa-edit" aria-hidden="true"></i> Edit
          </button>
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onDelete(item.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i> Delete
          </button>
          <button className="btn btn-sm btn-font-size makeAdminBtn" onClick={() => props.onAdmin(item.id)}>
            <i className="fa fa-user-secret" aria-hidden="true"></i> Remove Admin
          </button>
          <button className="btn btn-sm btn-font-size makeAdminBtn" onClick={() => props.onResetPass(item.id)}>
            <i className="fa fa-user-secret" aria-hidden="true"></i> Reset
          </button>
        </div>
      </td> : null }
    </tr>
  );
};

const RESELLERTABLE = function (props) {
  return (
    <div className="cz_userTable">
      <table className="table userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Created</th>
            <th>Total Licence</th>
            <th>Consume Licence</th>
            <th>Email Log</th>
            {!props.isSubuser ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {props.data.length ? props.data.map((value, i) => (
            <RESELLERROW key={i} item={value} isSubuser={props.isSubuser} onEdit={props.onEdit} onEmailLogs={props.onEmailLogs} onResetPass={props.onResetPass} onAdmin={props.onAdmin}  onDelete={props.onDelete}/>
          )) : <tr><td colSpan="5">There is no user.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

const LINKROW = function (props) {
  const item = props.item;
  var val = "";

  if(item.name === "oto1") {
    val = "(Agency)";
  } else if(item.name === "oto2") {
    val = "(Pro)";
  } else if(item.name === "oto3") {
    val = "(Club)";
  } else if(item.name === "oto4") {
    val = "(Mobile App)";
  }

  return (
    <tr>
      <td>{item.name} {val}</td>
      <td>{item.url}</td>
      {!props.isSubuser ? <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEdit(item.id)}>
            <i className="fa fa-edit" aria-hidden="true"></i> Edit
          </button>
        </div>
      </td> : null }
    </tr>
  );
};

const LINKTABLE  = function (props) {
  return (
    <div className="cz_userTable">
      <table className="table userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Url</th>
            {!props.isSubuser ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {props.data.length ? props.data.map((value, i) => (
            <LINKROW key={i} item={value} isSubuser={props.isSubuser} onEdit={props.onEdit} />
          )) : <tr><td colSpan="5">There is no link.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

const EditModel = function (props) {
  const [name, setName] = useState(props.data.firstname);
  const [isActive, setisActive] = useState(props.data.isActive);
  // const [tools, setTools] = useState(props.data.allowedTool);
  const [isUpgrade1, setisUpgrade1] = useState(props.data.isUpgrade1);
  const [isUpgrade2, setisUpgrade2] = useState(props.data.isUpgrade2);
  return (
    <Modal title="Edit User" centered visible={props.visible} onOk={() => props.onSave(name, isActive, isUpgrade1, isUpgrade2)} onCancel={() => props.onClose(false)}>
      <div className="form-group admin-form-group">
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group" style={{ display: "flex" }}>
        <label>IsActive</label>
        <Switch className="pull-right m-2" onChange={() => setisActive(!isActive)} size="small" defaultChecked={isActive} />
      </div>
      <div className="form-group admin-form-group" style={{ display: "flex" }}>
        <label>Upgrade - 1</label>
        <Switch className="pull-right m-2" onChange={() => setisUpgrade1(!isUpgrade1)} size="small" defaultChecked={isUpgrade1} />
      </div>
      <div className="form-group admin-form-group" style={{ display: "flex" }}>
        <label>Upgrade - 2</label>
        <Switch className="pull-right m-2" onChange={() => setisUpgrade2(!isUpgrade2)} size="small" defaultChecked={isUpgrade2} />
      </div>
    </Modal>
  );
};

const EditLinkModel = function (props) {
  const [name, setName] = useState(props.data.name);
  const [url, setUrl] = useState(props.data.url);
  let [val, setVal] = useState("");
  
  useEffect(() => {
    if(name === "oto1") {
      setVal("(Agency)");
    } else if(name === "oto2") {
      setVal("(Pro)");
    } else if(name === "oto3") {
      setVal("(Club)");
    } else if(name === "oto4") {
      setVal("(Mobile App)");
    }
  }, []);

  return (
    <Modal title="Edit Links" centered visible={props.visible} onOk={() => props.updateLinks(name, url)} onCancel={() => props.onClose(false)}>
      <div className="form-group admin-form-group">
        <label>Name</label>
        <input type="text" name="name" value={name + " " + val } onChange={(e) => setName(e.target.value)} className="form-control" readOnly/>
      </div>
      <div className="form-group admin-form-group">
        <label>URL</label>
        <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" />
      </div>
    </Modal>
  );
};

const GetEmailLogs = function (props) {
  let logs = (props.data ? props.data.logs : null);
  return (
    <>
    <div className="product_popup_wrapper">
      <div className="product_popup_overlay"></div>
      <div className="product_popup_box">
        <div className="product_popup_close" onClick={props.onClose}>✖︎</div>
        <h3>Email Log</h3>
        { logs ? <div><br/><br/>
          Dear <strong> { logs.name }</strong>,<br/><br/>
          Congratulations on your purchase of Converzee software. You’ve made a significant step towards solidifying your business success by opting for this organized, standardized, streamlined and efficient tool. <br/><br/>
  
          Based on our recent study, One Single Line Of Code Gives You Up To 330% More Leads & Sales, and Recovers 50-86% Lost Traffic.<br/><br/>
          
          Your success is critical to us. We know that you will be utterly satisfied after using this growth hacking 18 in 1 tool, which will save you time and grow your business exponentially.<br/><br/>
          
          So, without wasting any more time, click on the below link and start using this fantastic tool right away.<br/><br/>
          
          https://app.converzee.com<br/><br/>
          
          Login credentials:<br/><br/>
          Username:  <strong> { logs.ccustemail }</strong><br/><br/>
          Password:  <strong> { logs.password }</strong><br/><br/>
          
          We request you to change the password immediately after your login.<br/><br/>
          
          Please write back to us on this same thread if you have any further queries about the software, we would be happy to help.<br/><br/>;
         </div>: 
          <div> This user has no Email logs. </div>
          }
      </div>
    </div> 
      {/* <div dangerouslySetInnerHTML={props.logs}>
      
      </div> */}
      </>
  );
};

const OptionItem = (props) => {
  return (
    <div className={props.selected ? "tool_menuItem tool_menuItem_selected" : "tool_menuItem"} onClick={() => props.onChange(props.tid, props.index, props.selected)}>
      {props.text}
      <span>
        <i className="fa fa-check" />
      </span>
    </div>
  );
};

const ProductModel = function(props){
  const [selectTools, setSelectTools] = useState(false);
  const [isUpgrade1, setisUpgrade1] = useState(props.isUpgrade1);
  const [isUpgrade2, setisUpgrade2] = useState(props.isUpgrade2);
  const [checked, setChecked] = useState(false);
  const [tools, setTools] = useState(props.tool);
  let newTool = [];

  useEffect(() => {
    if(tools.length) {
      let ft = document.querySelectorAll(".frontend_tools");
      for(let i = 0; i<ft.length; i++) {
        let id = parseInt(ft[i].childNodes[1].getAttribute("data-label"));
        for(let j=0; j<tools.length; j++) {
          if(id === tools[j]) {
            ft[i].childNodes[0].setAttribute("checked", "");
          }
        }
      }
      if(props.OTO1.length === ft.length) {
        document.querySelector(".fe_selectAll").childNodes[0].setAttribute("checked", "");
      }
    }
  }, [])

  const selectAllProduct = (e) => {
    let toolArray = [];
    if(checked) {
      e.target.previousSibling.removeAttribute("checked");
    } else {
      e.target.previousSibling.setAttribute("checked", "");
    }
    
    let items = document.querySelectorAll(".frontend_tools");
    items.forEach(element => {
      if(!checked) {
        toolArray.push(parseInt(element.childNodes[1].getAttribute("data-label")));
        element.childNodes[0].setAttribute("checked", "");
      } else {
        toolArray = [];
        element.childNodes[0].removeAttribute("checked");
      }
    });
    setSelectTools(!selectTools);
    setTools(toolArray);
    props.onChange({tool : toolArray})
  }

  const SelectSingleProduct = (e) => {
    var event = e || window.e,
        target = event.target || event.srcElement;
        
    if (target.tagName.toUpperCase() == 'INPUT') {
      let toolId = parseInt(target.nextElementSibling.getAttribute("data-label"));
      if (target.checked){
        tools.push(toolId)
        setTools(tools);
        props.onChange({tool : tools})
        target.setAttribute("checked", "");
      } else {
        target.removeAttribute("checked");
        tools.filter(tool => {
          if(tool !== toolId) {
            newTool.push(tool);
          }
        });
        setTools(newTool);
        props.onChange({tool : newTool})
      }
    }
  }
  
  const selectUpgrade1 = (e) => {
    var event = e || window.e,
        target = event.target || event.srcElement;
        
    if (target.tagName.toUpperCase() == 'INPUT') {
      if (target.checked){
        target.setAttribute("checked", "");
      } else {
        target.removeAttribute("checked");
      }
      setisUpgrade1(!isUpgrade1); 
      props.onChange({isUpgrade1 : !isUpgrade1})
    }
  } 

  const selectUpgrade2 = (e) => {
    var event = e || window.e,
        target = event.target || event.srcElement;
        
    if (target.tagName.toUpperCase() == 'INPUT') {
      if (target.checked){
        target.setAttribute("checked", "");
      } else {
        target.removeAttribute("checked");
      }
      setisUpgrade2(!isUpgrade2);
      props.onChange({isUpgrade2 : !isUpgrade2})
    }
  }

  return(
    <div className="product_popup_wrapper">
      <div className="product_popup_overlay"></div>
      <div className="product_popup_box">
        <div className="product_popup_close" onClick={props.popClose}>✖︎</div>
        <h3>Select Products</h3>
        <div className="product_type_heading">
          <h5>Frontend</h5>
          <label className="product_check fe_selectAll" data-label="frontend">
            <input type="checkbox"/>
            <span onClick={(e)=> {
              setChecked(!checked);
              selectAllProduct(e);
            }}>Select All</span>
          </label>
        </div>
        <ul onClick={(e)=> SelectSingleProduct(e)}>
          {props.OTO1.map( tool => {
            return (
              <li key={tool.tid}>
                <label className="product_check frontend_tools">
                  <input type="checkbox"/>
                  <span data-label={tool.tid}>{tool.text}</span>
                </label>
              </li>
            )
          })}
        </ul>
        
        <div className="product_type_heading" onClick={(e)=> selectUpgrade1(e)}>
          <h5>Upgrade 1</h5>
          <label className="product_check">
            <input type="checkbox" defaultChecked={isUpgrade1 ? "true": null}/>
            <span>Select</span>
          </label>
        </div>
        <div className="product_type_heading" onClick={(e)=> selectUpgrade2(e)}>
          <h5>Upgrade 2</h5>
          <label className="product_check">
            <input type="checkbox" defaultChecked={isUpgrade2 ? "true": null}/>
            <span>Select</span>
          </label>
        </div>
      </div>
    </div> 
  )
}

/* const SelectProductBtn = function (props) {
  return (
    <button className="btn" onClick={props.onProductClick}>Select Products</button>
  );
}; */

const ADDModel = function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [tools, setTools] = useState([]);
  const [access, setAccess] = useState(false);

  return (
    <Modal title="Add User" centered visible={props.visible} onOk={() => props.onAddClick(email, password, firstname, access, tools)} onCancel={() => props.onClose(false)}>
      <div className="form-group admin-form-group">
        <label>Email</label>
        <input type="text" autoComplete={"off"} name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>Password</label>
        <input type="password" autoComplete={"off"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>Name</label>
        <input type="text" name="name" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>Is Reseller</label>
        <Switch defaultChecked={access} onChange={(value) => setAccess(value)} />
      </div>
      <div className="form-group admin-form-group">
        <button className="cz_btn btn" onClick={props.productPopClick} >Select Products</button>
        {/* <label className="admin_tools" onClick={() => {setIsOTOAll(!isOTOAll); onFrontEndSelectAll(ToolUtil.getToolsOptions(), !isOTOAll) }}>Tools <p>Select All Tools</p></label> */}
        {/* <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select Product"
          defaultValue={tools}
          onChange={(newTool) => {
            if(newTool) {
              setTools(newTool);
            }
          }}
          optionLabelProp="label"
        >
          {ToolUtil.getToolsOptions().map(renderTools)}
        </Select> */}
      </div>
    </Modal>
  );
};

const ADDLinkModel = function (props) {
  const [state, setState] = useState({
    fe : "",
    oto1 : "",
    oto2 : "",
    oto3 : "",
    oto4 : "",
  });
  
  const updateState = () => {
    setState({
      fe : "",
      oto1 : "",
      oto2 : "",
      oto3 : "",
      oto4 : "",
    })
  }

  return (
    <Modal title="Add Link" centered visible={props.visible} onOk={() => props.onAddClick(state)} onCancel={() => { updateState(); props.onClose(false) }}>
      <div className="form-group admin-form-group">
        <label>FE Url</label>
        <input type="text" autoComplete={"off"} name="fe" value={state.fe} onChange={(e) => setState({...state, fe : e.target.value})} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>OTO-1(Agency)</label>
        <input type="text" autoComplete={"off"} name="oto1" value={state.oto1} onChange={(e) => setState({...state, oto1 : e.target.value})} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>OTO-2(Pro)</label>
        <input type="text" autoComplete={"off"} name="oto2" value={state.oto2} onChange={(e) => setState({...state, oto2 : e.target.value})} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>OTO-3(Club)</label>
        <input type="text" autoComplete={"off"} name="oto3" value={state.oto3} onChange={(e) => setState({...state, oto3 : e.target.value})} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>OTO-4(Mobile App)</label>
        <input type="text" autoComplete={"off"} name="oto4" value={state.oto4} onChange={(e) => setState({...state, oto4 : e.target.value})} className="form-control" />
      </div>
    </Modal>
  );
};
