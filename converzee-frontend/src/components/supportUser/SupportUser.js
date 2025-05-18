import React, { Component, useState } from "react";
import "./SupportUser.css";
import { dateParser } from "../Util";
import { getUserList, parseUserData, parseResellerData } from "../comman/TableWithData";
import { Tabs, Modal, Select, Switch } from "antd";
import RequestHandler from "../../actions/RequestHandler";
import { UPDATE_USER, SEARCH_USER, ADD_SUBUSER, GET_SUBUSER, DELETE_USER } from "../../actions/URLs";
const { Option } = Select;

export default class SuperAdmin extends Component {
  state = {
    user: [],
    loading: true,
    id: null,
    isAdd: false,
  };
  users = [];

  componentDidMount() {
    this.getSubUser();
  }

  getSubUser = () => {
    RequestHandler.PostRequest(GET_SUBUSER, {  }, (res, err) => {
      if (res) {
        const data = res.data.data;
        this.setState({ user: parseUserData(data) });
      } else {
        window.gs.success(false, res.data.message);
      }
    });
  }

  onSearch = (searchString) => {
    const userType = 0;
    RequestHandler.PostRequest(SEARCH_USER, { userData: { searchString, userType } }, (res, err) => {
      if (res) {
        const data = res.data.data;
        this.setState({ user: parseUserData(data) });
      }
    });
  };

  onAddClick = () => {
    this.setState({ isAdd: true });
  };

  onCloseAdd = () => {
    this.setState({ isAdd: false });
  };

  addUser = (firstname, email, password) => {
    let tools = this.getTools(true, true);
    if(firstname && email && password) {
      RequestHandler.PostRequest(ADD_SUBUSER, { userData: { firstname, email, password, tools } }, (res, err) => {
        if (res) {
          if (res.data.success) {
            window.gs.success(res.data.success);
            this.setState({ isAdd: false });
            this.getSubUser();
          } else {
            window.gs.success(false, res.data.message);
          }
        }
      });
    } else {
      window.gs.success(false, "Please fill all the fields.");
    }
  };

  getUserData = (id) => {
    let data = this.users.find((e) => e._id === id);
    return data;
  };

  onEdit = (id) => {
    this.setState({ id });
  };

  onClose = () => {
    this.setState({ id: null });
  };

  getTools = (isUpgrade1 = false, isUpgrade2 = false) => {
    const tools = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 17, 24]);
    if (isUpgrade1) {
      tools.add(18);
      tools.add(19);
    }
    if (isUpgrade2) {
      tools.add(20);
      tools.add(21);
    }
    return Array.from(tools);
  };

  // onSave = (name, isActive, isUpgrade1 = false, isUpgrade2 = false) => {
  //   const { id } = this.state;
  //   const tools = this.getTools(isUpgrade1, isUpgrade2);
  //   RequestHandler.PostRequest(UPDATE_USER, { userData: { id, name, isActive, tools, isUpgrade1, isUpgrade2 } }, (res, err) => {
  //     if (res) {
  //       window.gs.success(res.data.success);
  //       if (res.data.success) {
  //         // this.onTabSwitch(this.state.activeTab);
  //         this.setState({ id: null });
  //       }
  //     }
  //   });
  // };

  onDeleteClick = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you Sure to Delete this user",
      okText: "Delete",
      onOk: () => {
        RequestHandler.PostRequest(DELETE_USER, { userData: { id } }, (res, err) => {
          if (res) {
            const { data } = res;
            if (data.success) {
              window.gs.success(true, data.message);
              this.getSubUser();
            }
          }
        });
      },
      cancelText: "Cancel",
    });
  };

  render() {
    const { user, id, isAdd } = this.state;
    const modelProps = {
      visible: id ? true : false,
      onClose: this.onClose,
      data: id ? this.getUserData(id) : {},
      // onSave: this.onSave,
    };
    return (
      <div className="container admin" name="admin">
        {/* {id ? <EditModel {...modelProps} /> : null} */}
        <ADDModel onAddClick={this.addUser} visible={isAdd} onClose={this.onCloseAdd} />
        <div className="row">
          <SearchInput onSearch={this.onSearch} />
          <ADD_USER_BUTTON onAddClicked={this.onAddClick} />
        </div>
        <div className="row">
          <div className="col-12">
              <USERTABLE data={user} onEdit={this.onEdit}  onDelete={this.onDeleteClick}/>
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
    <div className="col-md-6 col-sm-12 col-lg-6 ">
      <button className="btn btn-sm btn-primary pull-right" onClick={props.onAddClicked}>
        Add Support User
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
          <button className="btn btn-sm btn-font-size editbtn" onClick={() => props.onDelete(item.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i> Delete
          </button>
        </div>
      </td>
    </tr>
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
          {props.data.length ? props.data.map((value, i) => (
            <USERROW key={i} item={value} onEdit={props.onEdit} onDelete={props.onDelete}/>
          )): <tr><td colSpan="5">There is no user.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

// const EditModel = function (props) {
//   const [name, setName] = useState(props.data.firstname ? props.data.firstname : "");
//   const [email, setEmail] = useState(props.data.email);
  
//   return (
//     <Modal title="Edit User" centered visible={props.visible} onOk={() => props.onSave(name, email)} onCancel={() => props.onClose(false)}>
//       <div className="form-group admin-form-group">
//         <label>Name</label>
//         <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
//       </div>
//       <div className="form-group admin-form-group">
//         <label>Email</label>
//         <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
//       </div>
//     </Modal>
//   );
// };


const ADDModel = function (props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal title="Add User" centered visible={props.visible} onOk={() => props.onAddClick(name, email, password)} onCancel={() => props.onClose(false)}>
      <div className="form-group admin-form-group">
        <label>Email</label>
        <input type="text" autoComplete={"off"} name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>Password</label>
        <input type="password" autoComplete={"off"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
      </div>
      <div className="form-group admin-form-group">
        <label>name</label>
        <input type="text" autoComplete={"off"} name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
      </div>
    </Modal>
  );
};
