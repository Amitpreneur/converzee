import React, { Component } from "react";
import { Input, Avatar, Modal } from "antd";
import { getPath, GET_PROFILE_INFO, DELETE_USER, CHANGE_PASSWORD, SAVE_DEVELOPER } from "../../actions/URLs";
import RequestHandler from "../../actions/RequestHandler";
import ToolUtil from "../../utils/ToolUtil";
import { AddAccount } from "../comman/Popup";

export default class UserSettings extends Component {
  state = { MODAL: null, settings: 0, access: 30, users: [], name: window.userName, email: window.email, cpassword: "", newPassword: "", repassword: "", plan: [] };

  componentDidMount() {
    window.gs.navTitle("User Settings");
    this.getAndUpdateData();

    window.gs.accountUpdate = this.getAndUpdateData;
  }

  componentWillUnmount() {
    delete window.gs.accountUpdate;
  }

  getAndUpdateData = () => {
    RequestHandler.PostRequest(GET_PROFILE_INFO, {}, (res, err) => {
      if (res) {
        const { data } = res;
        if (data.success) {
          this.state.access = (ToolUtil.toolsAccess) ? ToolUtil.toolsAccess.access : null;
          this.setState({ users: data.users || [] });
        }
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    const { name, email } = this.state;
    if (window.userName !== name || email !== window.email) {
      this.state.access = ToolUtil.toolsAccess.access;
      this.setState({ name: window.userName, email: window.email });
    }
  }

  onValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
              this.getAndUpdateData();
            }
          }
        });
      },
      cancelText: "Cancel",
    });
  };

  onChangePasswordClick = () => {
    const { newPassword, cpassword, repassword } = this.state;
    if (newPassword !== repassword) {
      window.gs.toast("Confirm Password Same as new Password", { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
    } else {
      RequestHandler.PostRequest(CHANGE_PASSWORD, { userData: { currentPassword: cpassword, newPassword: newPassword } }, (res, err) => {
        if (res) {
          const data1 = res.data;
          if (data1.success) {
            this.setState({ newPassword: "", repassword: "", cpassword: "" });
            window.gs.success(true, data1.message);
          } else {
            window.gs.toast(data1.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
          }
        }
      });
    }
  };

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
        const data1 = res.data;
        this.closeAll();
        if (data1.success) {
          this.getAndUpdateData();
          window.gs.success(true, data1.message);
        } else {
          window.gs.success(false, data1.message);
        }
      }
    });
  };

  toggleTab = (key) => {
    const { settings } = this.state;
    this.setState({ settings: key });
    if(key === 2) {
      if(window.isUpgrade1) {
        this.setState({plan : [...this.state.plan, { "name" : "Pro"}]})
      }
      if(window.isUpgrade2) {
        this.setState({plan : [...this.state.plan, { "name" : "Club"}]})
      }
    }
    
  };
  render() {
    const { settings, name, users, email, MODAL, cpassword, newPassword, repassword, access } = this.state;
    return (
        <div className="cz_user_setting_wrapper">
        <div className="container-fluid">
          {MODAL === "ADD" ? <AddAccount visible={MODAL === "ADD" ? true : false} submit={this.onSubmit} Close={this.closeAll} /> : null}
          <div className="row">
            <div className="col-md-12 col-md-12 col-md-12 col-md-12">
              <div className="toggle-chart align-items-center">
                <div onClick={() => this.toggleTab(0)} className={settings === 0 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                  GENERAL
                </div>
                {access > 30 ? (
                  <React.Fragment>
                    <div onClick={() => this.toggleTab(1)} className={settings === 1 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                      ACCOUNT
                    </div>
                    {/* <div onClick={() => this.toggleTab(2)} className={settings === 2 ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                      BILLING
                    </div> */}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
          {settings === 0 ? (
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4 cz_user_setting_content">
                <div className="mt-2">Profile Settings</div>
                <div className="form-element">
                  <div className="label-text">Name</div>
                  <Input value={name} name="name" disabled />
                </div>
                <div className="form-element">
                  <div className="label-text">Email ID</div>
                  <Input value={email} name="email" disabled />
                </div>
                <div className="mt-2 password_heading">Password Settings</div>
                <div className="form-element">
                  <div className="label-text">Current Password</div>
                  <Input.Password autoComplete="off" name="cpassword" value={cpassword} onChange={this.onValueChange} />
                </div>
                <div className="form-element">
                  <div className="label-text">New Password</div>
                  <Input.Password autoComplete="off" value={newPassword} name="newPassword" onChange={this.onValueChange} />
                </div>
                <div className="form-element">
                  <div className="label-text">Confirm Password</div>
                  <Input.Password autoComplete="off" value={repassword} name="repassword" onChange={this.onValueChange} />
                </div>
                <p>Note : Password should be atleast 8 characters.</p>
                <div className="form-element">
                  <button className="btn btn-sm ant-btn-primary color-with cz_btn" disabled={newPassword.length < 8 || newPassword !== repassword} onClick={this.onChangePasswordClick}>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {settings === 1 ? (
            <div className="row">
              <div className="col-12 cz_user_setting_content">
                <div className="row">
                  {users.map((e, i) => (
                    <CardItem key={i} {...e} onDeleteClick={this.onDeleteClick} />
                  ))}
                  <CardItem key={1500} isAdd={true} onAddClick={this.onAddAccountClick} />
                </div>
              </div>
            </div>
          ) : null}
          {/* {settings === 2 ? (
            <div className="row mt-3 cz_user_setting_content">
              <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12">
                <div className="card account-cardItem">
                  <img className="img-fluid" src={getPath("/asset/Group-128.svg")} />
                  <div className="row">
                    <div className="col-12 ml-2">
                      <div className="white cz_white_heading description color-with">{"CURRENT PLAN"}</div>
                      <div className="white cz_orange_heading masonry-title color-base">{"Reseller Advanced"}</div>
                    </div>
                  </div>
                </div>
                <div className="card account-cardItem next_billing_box">
                  <img className="img-fluid" src={getPath("/asset/Group130.svg")} />
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="white cz_white_heading description color-with">{"NEXT BILLING DATE"}</div>
                      <div className="white cz_orange_heading masonry-title color-base">{"24th June 2020"}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="card black-account-card m-2 p-3">
                      <div className="black-account-card-title">Payment Methods</div>
                      <div className="black-account-card-body">No Card Found</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12 ">
                    <div className="card black-account-card m-2 p-3">
                      <div className="black-account-card-title">Subscription Information</div>
                      <div className="black-account-card-body">No Active Subsciption</div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12 col-sm-12 ">
                    <div className="card black-account-card m-2 p-3">
                      <div className="black-account-card-title">Active Plans</div>
                      <div className="black-account-card-body" style={{ margin: "unset" }}>
                        <div className="d-block account-plans-row">
                          <span className="Name">Name</span>
                          <span className="pull-right">Status</span>
                        </div>
                        {this.state.plan.map(RowItem)}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12 col-sm-12 ">
                    <div className="card black-account-card m-2 p-3">
                      <div className="black-account-card-title">Invoices</div>
                      <div className="black-account-card-body">No Invoice</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null} */}
        </div>
      </div>
    );
  }
}

const CardItem = function (props) {
  return (
    <div className="Account-Card-item">
      <div className="Accountcard-body">
        {!props.isAdd ? (
          <div className="AccountDelete-Icon" onClick={() => props.onDeleteClick(props._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="9.497" height="12.211" viewBox="0 0 9.497 12.211" style={{display:'inline',margin:'auto'}}><path id="Icon_material-delete" data-name="Icon material-delete" d="M8.178,15.354a1.361,1.361,0,0,0,1.357,1.357h5.427a1.361,1.361,0,0,0,1.357-1.357V7.213H8.178ZM17,5.178H14.623L13.944,4.5H10.553l-.678.678H7.5V6.535H17Z" transform="translate(-7.5 -4.5)" fill="gray"/></svg>
          </div>
        ) : null}
        {props.isAdd ? (
          <Avatar onClick={() => props.onAddClick()} size={106} style={{ backgroundColor: "#ed8a25", margin: "auto", color: "#fff", verticalAlign: "middle" }}>
            <i className="fa fa-plus"></i>
          </Avatar>
        ) : (
          <Avatar size={106} style={{ backgroundColor: "#ffffff", margin: "auto", color: "#fff", verticalAlign: "middle" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M21,.563a21,21,0,1,0,21,21A21,21,0,0,0,21,.563Zm0,8.129a7.452,7.452,0,1,1-7.452,7.452A7.452,7.452,0,0,1,21,8.692Zm0,29.129A16.226,16.226,0,0,1,8.595,32.046a9.441,9.441,0,0,1,8.341-5.064,2.072,2.072,0,0,1,.6.093A11.211,11.211,0,0,0,21,27.659a11.169,11.169,0,0,0,3.463-.584,2.072,2.072,0,0,1,.6-.093,9.441,9.441,0,0,1,8.341,5.064A16.226,16.226,0,0,1,21,37.821Z" transform="translate(0 -0.563)" fill="#ed8a25"/></svg>
          </Avatar>
        )}
      </div>
      <div className="Accountcard-footer">{props.name}</div>
    </div>
  );
};

const RowItem = function (e, i) {
  return (
    <div className="d-block account-plans-row" key={i+1}>
      <span className="Name">{e.name}</span>
      <span className="pull-right account-Active">Active</span>
      <span className="Ellipse-6 pull-right"></span>
    </div>
  );
};
