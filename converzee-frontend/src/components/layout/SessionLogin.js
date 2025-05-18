import React, { Component, useState, useCallback } from "react";
import { Input } from "antd";
import "./Landing.css";
import { Request } from "../auth/authHandler";
import { getPath } from "../../actions/URLs";

class SessionLogin extends Component {
  state = {
    loginPage: true,
    process: false,
    checkSession: false
  };
  componentDidMount() {
    // if (Request.getAuth()) {
    //   this.props.setAuth(true);
    // } else {
    //   this.setState({ checkSession: true });
    // }
  }
  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (email = "", password = "") => {
    this.setState({ process: true });
    const emailId = email.trim();
    const passworded = password.trim();
    Request.loginAuth({ email: emailId, password: passworded }, (res, err) => {
      if (res) {
        if (!res.data.success) {
          this.setState({ process: false });
          window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
        } else if (res.data.user.isActive) {
          window.email = emailId;
          this.props.setAuth(true);
          window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.SUCCESS });
          window.location.reload();
        } else {
          this.setState({ loginPage: "REG", process: false });
        }
      } else {
        this.setState({ process: false });
        window.gs.toast("Something Wrong", { position: "bottom-right", type: window.gs.toast.TYPE.FAILED });
      }
    });
  };

  changeView = (view) => {
    this.setState({ loginPage: view }); 
  };

  render() {
    const { loginPage, loader, process } = this.state;
    return (
      <LoginPage req={process} onSubmit={this.onSubmit} email={""} password={""} changeView={this.changeView} checkSession={this.props.checkSession}></LoginPage>
    );
  }
}

export default SessionLogin;
// onSubmit, email, password
const LoginPage = function (props) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const changeEmail = useCallback(
    (newEmail) => {
      setEmail(newEmail);
    },
    [email]
  );
  const changePassword = useCallback(
    (newPassword) => {
      setPassword(newPassword);
    },
    [password]
  );
  return (
    <div className={"session_login_wrapper".concat(props.checkSession ? "" : " cz_hide")}>
      <div className="session_login_overlay"></div>
      <div className="session_login_inner">
        <div className="col-md-12 col-sm-12 col-lg-12 login-form-1">
          <div className="cz_auth_wrapper cz_login_wrapper">
            <div className="cz_logo">
              <img src={getPath("/asset/dark_logo.png")} style={{ height: "50px" }} /> 
            </div>
            <div className="loginTitle">Get started</div>
            <div className="subtitle">Use your email to login.</div>
            <div className="cz_auth_form">
              <div className="inputBox">
                <label className="login_label">Email-ID</label>
                <Input placeholder="Email" className="form-control" name="email" onChange={(e) => changeEmail(e.target.value)} value={email} />
              </div>
              <div className="inputBox">
                <label className="login_label">Password</label>
                <Input.Password placeholder="Password" onChange={(e) => changePassword(e.target.value)} value={password} />
              </div>
            </div>
            <div className="forgot_password">
              <div style={{ cursor: "pointer" }} onClick={() => props.changeView("FORGOT")}>
                Forget Password?
              </div>
            </div>
            <div className="form-group">
              <button disabled={props.req} name="Sign In" className="login_button" onClick={() => props.onSubmit(email, password)}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


