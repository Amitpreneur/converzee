import React, { Component, useState, useEffect } from 'react';
import './Admin.css';
import { Select, Modal, Result, Icon, Input, Switch } from 'antd';
import ToolUtil, { resetToolAccess } from '../../utils/ToolUtil';
import { VerifyCreateAccount, checkTools } from '../../actions/ResellerUtil';
import RequestHandler from '../../actions/RequestHandler';
import {
  ADD_RESELLER_USER,
  KEY_GENERATE,
  SEND_LINK_BY_URL,
  getPath,
  USER_DISABLE,
  UPDATE_USER,
  DELETE_USER_DATA
} from '../../actions/URLs';
import { dateParser } from '../Util';
import { getUserList, parseUserData } from '../comman/TableWithData';
import { ToolSelectorDropDown } from '../comman/DropDown';
const { Option } = Select;
export default class Admin extends Component {
  state = {
    email1: '',
    email2: '',
    password: '',
    tools: [],
    url: '',
    key: null,
    count: 0,
    user: [],
    keys: 0,
    id: null,
    consumeLicence: 0,
    totalLicence: 0,
    productPop: false,
    isUpgrade1: false,
    isUpgrade2: false,
  };

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
  users = []; 

  componentDidMount() {
    this.toolOptions = ToolUtil.getToolsOptions();
    console.log(this.props);
    
    this.setState({
      keys: this.props.keys,
      consumeLicence: this.props.consumeLicence,
      totalLicence: this.props.totalLicence
    });
    this.setState({ count: 1 });
    this.getUser();
  }

  componentWillReceiveProps(nextProps) {
    const { keys, consumeLicence, totalLicence } = this.state;
    if (nextProps.keys != keys || nextProps.consumeLicence != consumeLicence || nextProps.totalLicence != totalLicence) {
      this.setState({
        keys: nextProps.keys,
        consumeLicence: nextProps.consumeLicence, 
        totalLicence: nextProps.totalLicence
      });
    }
  }

  toolOptions = [];

  handleChange = (value) => {
    this.setState({ tools: value });
  };

  updateKeysData = () => {
    resetToolAccess((data, err) => {
      if (data)
        this.setState({ keys: data.keys, consumeLicence: data.consumeLicence });
      this.getUser();
    });
  };

  getUser = () => {
    getUserList(2, (data, err) => {
      if (data) {
        this.users = data;
        this.setState({ user: parseUserData(data) });
      }
    });
  };

  handleFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderTools = (tool) => {
    return (
      <Option key={tool.id} value={tool.id} label={tool.name}>
        {tool.name}
      </Option>
    );
  };

  onClose = () => {
    this.setState({ visible: false, success: null, key: null, id: null });
  };

  onCreateAccount = (accountType) => {
    const { email1, password, tools, isUpgrade1, isUpgrade2 } = this.state;
    if (VerifyCreateAccount(email1, password) && checkTools(tools)) {
      RequestHandler.PostRequest(
        ADD_RESELLER_USER,
        { userData: { email: email1, password: password, allowedTool: tools, isUpgrade1: isUpgrade1, isUpgrade2: isUpgrade2 } },
        (res, err) => {
          if (res) {
            this.setState({ visible: true, success: true, email1: "", password: "", tools: [], isUpgrade1: false, isUpgrade2: false }, () => {
              this.getUser();
            });
          } else {
            // this.setState({ visible: true, success: false });
            window.gs.toast(res.data.message, {
              position: 'bottom-right',
              type: window.gs.toast.TYPE.FAILED,
            });
          }
        }
      );
    }
  };

  generateKey = () => {
    const { tools, isUpgrade1, isUpgrade2 } = this.state;
    RequestHandler.PostRequest(
      KEY_GENERATE,
      { toolData: { tools, isUpgrade1, isUpgrade2 } },
      (res, err) => {
        if (res) {
          this.setState({ visible: true, success: true, key: res.data.key });
          this.updateKeysData();
        } else {
          this.setState({ visible: true, success: false });
        }
      }
    );
  };

  sendKey = () => {
    const { tools, email2 } = this.state;
    RequestHandler.PostRequest(
      SEND_LINK_BY_URL,
      { userData: { email: email2, tools } },
      (res, err) => {
        if (res) {
          this.setState({ visible: true, success: true });
          this.updateKeysData();
        } else {
          this.setState({ visible: true, success: false });
          window.gs.toast('Failed', {
            position: 'bottom-right',
            type: window.gs.toast.TYPE.FAILED,
          });
        }
      }
    );
  };

  onDeActive = (id, isActive) => {
    RequestHandler.PostRequest(
      USER_DISABLE,
      { userData: { id, isActive } },
      (res, err) => {
        Modal.success({
          content: 'SuccessFully',
        });
      }
    );
  };

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
              this.getUser();
            }
          }
        });
      },
      cancelText: "Cancel",
    });
  };

  onEdit = (id) => {
    this.setState({ id });
  };
  
  getUserData = (id) => {
    let data = this.users.find((e) => e._id === id);
    return data;
  };

  getTools = (isUpgrade1 = false, isUpgrade2 = false) => {
    const tools = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 17, 19, 24]);
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
        if (res.data.success) {
          window.gs.success(res.data.message);
          this.setState({ id: null });
          this.getUser();
        } else {
          window.gs.success(false, res.data.message);
        }
      }
    });
  };

  productPopClick=()=>{
    this.setState({ productPop: true });
  }

  onPopClose=()=>{
    this.setState({ productPop: false });
  }

  changeUpgrade = (data) => {
    this.setState(data);
  }

  render() {
    const {
      email1,
      email2,
      password,
      tools,
      url,
      visible,
      success,
      key,
      user,
      keys,
      id,
      consumeLicence,
      totalLicence
    } = this.state;
    const clicks = 5;

    const modelProps = {
      visible: id ? true : false,
      onClose: this.onClose,
      data: id ? this.getUserData(id) : {},
      onSave: this.onSave
    };

    return (
      <div className="container admin" name="admin">
        {success ? (
          <SuccessModel visible={visible} askey={key} onClose={this.onClose} />
        ) : (
          <FailedModel visible={visible} onClose={this.onClose} />
        )}
        {id ? <EditModel {...modelProps} /> : null}
        {this.state.productPop  ? <ProductModel {...this.state} popClose={()=>this.onPopClose()} OTO1={this.OTO1} onChange={this.changeUpgrade} />:null}
        <div className="row">
          <div className="col-md-4 col-sm-12 col-lg-3">
            <div className="row dashboard-card m-3">
              <div className="col-4 card-title">
                <div className="card-text">{keys}</div>
                <div className="card-subtext">Key Created</div>
              </div>
              <div className="col-8 card-img">
                <img
                  className="img-fluid"
                  src={getPath('asset/group-14.png')}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-lg-3">
            <div className="row dashboard-card m-3">
              <div className="col-4 card-title">
                <div className="card-text">{consumeLicence}</div>
                <div className="card-subtext">Key Used</div>
              </div>
              <div className="col-8 card-img">
                <img
                  className="img-fluid"
                  src={getPath('asset/group-15.png')}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-lg-3">
            <div className="row dashboard-card m-3">
              <div className="col-4 card-title">
                <div className="card-text">{totalLicence}</div>
                <div className="card-subtext">Total Licences</div>
              </div>
              <div className="col-8 card-img">
                <img
                  className="img-fluid"
                  src={getPath('asset/Group130.svg')}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-lg-3">
            <div className="row dashboard-card m-3">
              <div className="col-4 card-title">
                <div className="card-text">{user.length}</div>
                <div className="card-subtext">Users</div>
              </div>
              <div className="col-8 card-img">
                <img
                  className="img-fluid"
                  src={getPath('asset/group-16.png')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: '35px' }}>
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="card adminform">
              <div className="box-title">Create Account</div>
              <div className="form-group admin-form-group">
                <label>Email address</label>
                <Input
                  name="email1"
                  onChange={this.handleFieldChange}
                  value={email1}
                />
              </div>
              <div className="form-group admin-form-group">
                <label>Password</label>
                <Input.Password
                  name="password"
                  onChange={this.handleFieldChange}
                  value={password}
                />
              </div>
              <div className="form-group admin-form-group">
                <label>Tools</label>
                {/* <Select mode="multiple" style={{ width: "100%" }} placeholder="Select Product" defaultValue={tools} onChange={this.handleChange} optionLabelProp="label">
                  {this.toolOptions.map(this.renderTools)}
                </Select> */}
                {/* <ToolSelectorDropDown
                  defaultValue={tools}
                  onChange={this.handleChange}
                /> */}
                <br></br>
                <button className="cz_btn btn" onClick={this.productPopClick} >Select Products</button>
                
              </div>
              <button
                type="button"
                className="btn btn-sm primaryBtn"
                onClick={this.onCreateAccount}
              >
                Create Account
              </button>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="card adminform">
              <div className="box-title">Send Access By Email</div>
              <div className="form-group admin-form-group">
                <label for="exampleInputEmail1">Email address</label>
                <Input
                  name="email2"
                  value={email2}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="form-group admin-form-group">
                <label for="exampleInputEmail1">Tools</label>
                {/* <Select mode="multiple" style={{ width: "100%" }} placeholder="Select Product" defaultValue={tools} onChange={this.handleChange} optionLabelProp="label">
                  {this.toolOptions.map(this.renderTools)}
                </Select> */}
                {/* <ToolSelectorDropDown
                  defaultValue={tools}
                  onChange={this.handleChange}
                /> */}
                <br></br>
                <button className="cz_btn btn" onClick={this.productPopClick} >Select Products</button>
                
              </div>
              <button onClick={this.sendKey} className="btn btn-sm primaryBtn">
                Send Email with Key
              </button>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="card adminform">
              <div className="box-title">Send Access By Key</div>
              <div className="form-group admin-form-group">
                <label for="exampleInputEmail1">Tools</label>
                {/* <Select mode="multiple" style={{ width: "100%" }} placeholder="Select Product" defaultValue={tools} onChange={this.handleChange} optionLabelProp="label">
                  {this.toolOptions.map(this.renderTools)}
                </Select> */}
                {/* <ToolSelectorDropDown
                  defaultValue={tools}
                  onChange={this.handleChange}
                /> */}
                <br></br>
                <button className="cz_btn btn" onClick={this.productPopClick} >Select Products</button>
                
              </div>
              <button
                className="btn btn-sm primaryBtn"
                onClick={this.generateKey}
              >
                Send access by email
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '10px' }} className="box-title">
          Active Accounts
        </div>
        <div className="row">
          <div className="col-12">
            <USERTABLE
              data={user}
              onDelete={this.onDelete}
              onDeActive={this.onDeActive}
              onEdit={this.onEdit} 
            />
          </div>
        </div>
      </div>
    );
  }
}

const SuccessModel = function (props) {
  if (props.askey) {
    return (
      <Modal
        title="Success"
        centered
        visible={props.visible}
        onOk={() => props.onClose(false)}
        onCancel={() => props.onClose(false)}
      >
        <Result
          status="success"
          title="Successfully Generate the Key"
          subTitle={props.askey}
          extra={[
            <Input
              /* addonAfter={<Icon type="copy" />} */
              defaultValue={props.askey}
            />,
          ]}
        />
      </Modal>
    );
  } else {
    return (
      <Modal
        title="Success"
        centered
        visible={props.visible}
        onOk={() => props.onClose(false)}
        onCancel={() => props.onClose(false)}
      >
        <Result
          status="success"
          title="Successfully Generate the Key"
          subTitle={props.key}
          extra={[]}
        />
      </Modal>
    );
  }
};

const FailedModel = function (props) {
  return (
    <Modal
      title="Failed"
      centered
      visible={props.visible}
      onOk={() => props.onClose(false)}
      onCancel={() => props.onClose(false)}
    >
      <Result
        status="warning"
        title="Something went Wrong"
        subTitle={''}
        extra={[]}
      />
    </Modal>
  );
};

const USERTABLE = function (props) {
  return (
    <div>
      <table className="table userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((value, i) => (
            <USERROW
              key={i}
              item={value}
              onDelete={props.onDelete}
              onDeActive={props.onDeActive}
              onEdit={props.onEdit} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const USERROW = function (props) {
  const item = props.item;
  return (
    <tr>
      <td>{item.firstname}</td>
      <td>{item.email}</td>
      <td>
        <Switch
          size="small"
          defaultChecked={item.isActive}
          onChange={() => props.onDeActive(item.id, item.isActive)}
        />
      </td>

      <td>{dateParser(item.date)}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onEdit(item.id)}>
            <i className="fa fa-edit" aria-hidden="true"></i> Edit
          </button>
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onDelete(item.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const ProductModel = function(props){
  const [selectTools, setSelectTools] = useState(false);
  const [isUpgrade1, setisUpgrade1] = useState(props.isUpgrade1);
  const [isUpgrade2, setisUpgrade2] = useState(props.isUpgrade2);
  const [checked, setChecked] = useState(false);
  const [tools, setTools] = useState(props.tools);
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
    props.onChange({tools : toolArray})
  }

  const SelectSingleProduct = (e) => {
    var event = e || window.e,
        target = event.target || event.srcElement;
        
    if (target.tagName.toUpperCase() == 'INPUT') {
      let toolId = parseInt(target.nextElementSibling.getAttribute("data-label"));
      if (target.checked){
        tools.push(toolId)
        setTools(tools);
        props.onChange({tools : tools})
        target.setAttribute("checked", "");
      } else {
        target.removeAttribute("checked");
        tools.filter(tool => {
          if(tool !== toolId) {
            newTool.push(tool);
          }
        });
        setTools(newTool);
        props.onChange({tools : newTool})
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

const EditModel = function (props) {
  console.log("props.data", props.data)
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
