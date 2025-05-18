import React, { Component, useState, useCallback } from "react";
import { Input } from "antd";
import "./Landing.css";
import { Request } from "../auth/authHandler";
import RequestHandler from "../../actions/RequestHandler";
import { SAVE_USER_DETAILS, VERIFY_AND_ADD_USER, UPDATE_PASSWORD, FORGOT_PASSWORD, getPath, getBGPath } from "../../actions/URLs";
import { message } from "antd";
import Loader from "../comman/Loader";

class Landing extends Component {
  componentDidMount() {
    if (Request.getAuth()) {
      this.props.setAuth(true);
    }
  }
  state = {
    loginPage: true,
    process: false,
  };
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
          window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
          this.setState({ process: false });
        } else if (res.data.user.isActive) {
          window.email = emailId;
          this.props.setAuth(true);
          window.gs.toast(res.data.message, { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
          window.location.pathname = "/Dashboard";
        } else {
          this.setState({ loginPage: "REG", process: false });
        }
      } else {
        this.setState({ process: false });
        window.gs.toast("Something Wrong", { position: "bottom-right", type: window.gs.toast.TYPE.FAILED });
      }
    });
  };

  onSaveClick = (firstname) => {
    RequestHandler.PostRequest(SAVE_USER_DETAILS, { userData: { firstname } }, (res, err) => {
      if (err) {
      } else {
        if (res.data.success) this.props.setAuth(true);
      }
    });
  };

  onVerifyKeyClick = (e, key, email, password, firstname) => {
    this.setLoder();
    RequestHandler.RegRequest(VERIFY_AND_ADD_USER, { keyData: { key, email, password, firstname } }, (res, err) => {
      if (res) {
        if (res.data.success) {
          this.setState({ loader: false });
          message.success("Successfully Applied");
        } else {
          this.setState({ loader: false });
          message.error(res.data.message);
        }
      } else {
        this.setState({ loader: false });
        message.error("Something wrong");
      }
    });
  };

  setLoder = () => {
    this.setState({ loader: true });
  };

  changeView = (view) => {
    this.setState({ loginPage: view });
  };

  resendTimer;

  onSendOTP = (email, cb, cb2) => {
    RequestHandler.ForgotRequest(FORGOT_PASSWORD, { userData: { email } }, (res, err) => {
      if (res.data.success) {
        cb(true);
        setTimeout(() => {
          cb2(true);
        }, 2000 * 60);
      } else {
        window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
      }
    });
  };

  updatePassword = (email, otp, password) => {
    RequestHandler.ForgotRequest(UPDATE_PASSWORD, { userData: { email, otp, password } }, (res, err) => {
      if (res.data.success) {
        window.gs.toast(res.data.message, { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
      } else {
        window.gs.toast(res.data.message, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
      }
    });
  };

  renderForm = () => {
    let component = null;
    const { loginPage, process } = this.state;
    switch (loginPage) {
      case "LOGIN":
        component = <LoginPage req={process} onSubmit={this.onSubmit} email={""} password={""} changeView={this.changeView} />;
        break;
      case "REG":
        component = <RegisterPage req={process} onSaveClick={this.onSaveClick} firstName={""} changeView={this.changeView} />;
        break;
      case "KEY":
        component = <KEYRegisterPage req={process} onVerifyKeyClick={this.onVerifyKeyClick} key={""} email={""} password="" firstName={""} changeView={this.changeView} />;
        break;
      case "FORGOT":
        component = <ForgotPassword req={process} onSendOTP={this.onSendOTP} updatePassword={this.updatePassword} email={""} password="" firstName={""} changeView={this.changeView} />;
        break;
      default:
        component = <LoginPage req={process} onSubmit={this.onSubmit} email={""} password={""} changeView={this.changeView} />;
        break;
    }
    return component;
  };

  render() {
    const { loginPage, loader } = this.state;
    return (
      <>
        {loader ? <Loader /> : null}
        <center>
          <div className="row center-row">{this.renderForm()}</div>
        </center>
      </>
    );
  }
}

export default Landing;
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

  //const onKeyUp(event) {
  //   if (event.charCode === 13) {
  //     this.setState({ inputValue: event.target.value });
  //   }
  // }

  return (
    <div className="col-md-12 col-sm-12 col-lg-12 login-form-1 login_page">
      <div className="login_vector">
          <img src={getPath("asset/login_vector.png")} /> 
      </div>
      <div className="cz_auth_wrapper cz_login_wrapper">
        <div className="cz_logo">
          <img src={getPath("asset/dark_logo.png")} style={{ height: "50px" }} /> 
        </div>
        <div className="cz_login_inner">
        <div className="loginTitle">Login Your Account</div>
        {/* <div className="subtitle">Use your email to login.</div> */}
        <div className="cz_auth_form">
          <div className="inputBox">
            {/* <label className="login_label">Email-ID</label> */}
            <img src={getPath("asset/user.png")}/> 
            <Input placeholder="Email" className="form-control" name="email" onChange={(e) => changeEmail(e.target.value)} value={email} />
          </div>
          <div className="inputBox">
            {/* <label className="login_label">Password</label> */}
            <img src={getPath("asset/lock.png")}/> 
            <Input.Password placeholder="Password" onChange={(e) => changePassword(e.target.value)} value={password} />
          </div>
        </div>
        <div className="form-group">
          <button disabled={props.req} name="Sign In" className="login_button" onClick={() => props.onSubmit(email, password)}>
            LOGIN
          </button>
        </div>
        <div className="bottom_text" onClick={() => props.changeView("KEY")} style={{fontWeight:800}}>
          Create Account
        </div>
        <div className="forgot_password">
          <div onClick={() => props.changeView("FORGOT")}>
            Forget Password?
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = function (props) {
  const [firstName, setfirstName] = useState(props.firstName);
  const changeFirstName = useCallback(
    (newfirstName) => {
      setfirstName(newfirstName);
    },
    [firstName]
  );
  return (
    <div className="col-md-12 col-sm-12 col-lg-12 login-form-1">
      <div className="cz_auth_wrapper">
        <div className="cz_logo">
          <img src={getPath("asset/logo-wb.png")} style={{ height: "50px" }} />
        </div>
        <div className="loginTitle">Fill the details to Conti...:</div>

        <div className="inputBox">
          <label className="login_label">Firstname</label>
          <input type="text" name="firstname" placeholder="Firstname" onChange={(e) => changeFirstName(e.target.value)} className="form-control" value={firstName} />
        </div>
        <div className="form-group" style={{ display: "flex" }}>
          <button name="Save" disabled={props.req} onClick={() => props.onSaveClick(firstName)} className="btnSubmit btnSigUp">
            Save
          </button>
        </div>
        <div style={{ cursor: "pointer",fontWeight:800 }} onClick={() => props.changeView("KEY")}>
          Click to Register throught to KEY
        </div>
      </div>
    </div>
  );
};

const KEYRegisterPage = function (props) {
  const [key, setkey] = useState(props.key);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [firstName, setfirstName] = useState(props.firstName);
  const changeKey = useCallback(
    (newkey) => {
      setkey(newkey);
    },
    [key]
  );
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
  const changeFirstName = useCallback(
    (newfirstName) => {
      setfirstName(newfirstName);
    },
    [firstName]
  );
  return (
    <div className="col-md-12 col-sm-12 col-lg-12 login-form-1 login_page">
      <div className="login_vector">
          <img src={getPath("asset/login_vector.png")} /> 
      </div>
      <div className="cz_auth_wrapper cz_login_wrapper">
        <div className="cz_logo">
          <img src={getPath("asset/dark_logo.png")} style={{ height: "50px" }} />
        </div>
        <div className="cz_login_inner">
        <div className="loginTitle">Create Your Account</div>
        {/* <div className="subtitle">Enter your details below.</div> */}
        <div className="cz_auth_form">
          <div className="inputBox">
            {/* <label className="login_label">Key</label> */}
            <img src={getPath("asset/lock.png")}/> 
            <Input name="key" placeholder="key" onChange={(e) => changeKey(e.target.value)} className="form-control" value={key} />
          </div>
          <div className="inputBox">
            {/* <label className="login_label">Email-ID</label> */}
            <img src={getPath("asset/user.png")}/> 
            <Input name="email" placeholder="Email" onChange={(e) => changeEmail(e.target.value)} className="form-control" value={email} />
          </div>
          <div className="inputBox">
            {/* <label className="login_label">Password</label> */}
            <img src={getPath("asset/lock.png")}/> 
            <Input.Password placeholder="Password" onChange={(e) => changePassword(e.target.value)} value={password} />
            {/* <input type="password" name="password" placeholder="Password" onChange={(e) => changePassword(e.target.value)} className="form-control" value={password} /> */}
          </div>
          <div className="inputBox">
            {/* <label className="login_label">Firstname</label> */}
            <img src={getPath("asset/user.png")}/> 
            <Input name="firstName" placeholder="Name" onChange={(e) => changeFirstName(e.target.value)} className="form-control" value={firstName} />
          </div>
        </div>
        <div className="mt-3 cz_auth_btns">
          <button type="button" disabled={props.req} onClick={(e) => props.onVerifyKeyClick(e, key, email, password, firstName)} className="btnSubmit btnSigUp verify-key">
            VerifyKey
          </button>
          <button type="button" onClick={(e) => props.changeView("LOGIN")} className="btnSubmit btnSigUp">
            Back to Login
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = function (props) {
  const [email, setEmail] = useState(props.email);
  const [show, setShow] = useState(false);
  const [resend, setResend] = useState(false);
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const changeEmail = useCallback(
    (newEmail) => {
      setEmail(newEmail);
    },
    [email]
  );
  const changeOTP = useCallback(
    (newotp) => {
      setOTP(newotp);
    },
    [otp]
  );
  const changePassword = useCallback(
    (newPassword) => {
      setPassword(newPassword);
    },
    [password]
  );
  const changeConfPass = useCallback(
    (newConfPass) => {
      setConfPass(newConfPass);
    },
    [confPass]
  );
  return (
    <div className="col-md-12 col-sm-12 col-lg-12 login-form-1 login_page">
      <div className="login_vector">
          <img src={getPath("asset/login_vector.png")} /> 
      </div>
      <div className="cz_auth_wrapper cz_login_wrapper">
        <div className="cz_logo">
          <img src={getPath("asset/dark_logo.png")} style={{ height: "50px" }} />
        </div>
        <div className="cz_login_inner">
        <div className="loginTitle">Reset Password</div>
        {/* <div className="subtitle">Use your email for password reset.</div> */}
        <div className="form-group">
          <input type="text" name="email" placeholder="email" onChange={(e) => changeEmail(e.target.value)} className="form-control" value={email} />
        </div>
        {show ? (
          <React.Fragment>
            <div className="form-group">
              <input type="text" name="OTP" placeholder="OTP" onChange={(e) => changeOTP(e.target.value)} className="form-control" value={otp} />
            </div>
            <div className="form-group">
              <Input.Password placeholder="Password" onChange={(e) => changePassword(e.target.value)} value={password} />
            </div>
            <div className="form-group">
              <Input.Password placeholder="Conf Password" onChange={(e) => changeConfPass(e.target.value)} value={confPass} />
            </div>
          </React.Fragment>
        ) : null}
        <div className="form-group cz_auth_btns" style={{ display: "flex" }}>
          {!show || resend ? (
            <button name="Save" onClick={() => props.onSendOTP(email, setShow, setResend)} className="btnSubmit btnSigUp cz_black_btn">
              Send OTP
            </button>
          ) : null}
          {show ? (
            <button name="Save" disabled={password.length == 0 || password !== confPass || otp.length < 3} onClick={() => props.updatePassword(email, otp, password)} className="btnSubmit btnSigUp cz_black_btn">
              Update Password
            </button>
          ) : null}
          <button onClick={() => props.changeView("LOGIN")} className="btnSubmit btnSigUp">
            Back to login
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
