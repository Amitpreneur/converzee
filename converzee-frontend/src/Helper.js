import React, { Component, createRef } from "react";
import Loader from "./components/comman/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessModel, SayUpdate, CopyScript, ErrorModel } from "./components/comman/Popup";

export default class Helper extends Component {
  state = {
    loading: false,
    visible: false,
    update: false,
    showError: false,
  };
  isSuccess = "";
  msg = "";
  defaultUpdateMsg = "Follow to Update your App.";
  updateMsg = "";
  hideUpdate = false;
  link = "";
  componentDidMount() {
    window.gs.toast = toast;
    window.gs.loader = this.initLoader;
    window.gs.success = this.setVisible;
    window.gs.sayUpdate = this.sayupdatePopup;
    window.gs.setScript = this.setScript;
    window.gs.showErrorWithHtml = this.showErrorWithHtml;
  }
  setVisible = (isSuccess, msg = "") => {
    this.isSuccess = isSuccess;
    this.msg = msg;
    this.setState({ visible: true }, () => {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 5000);
    });
  };

  setScript = (script = "", isShow = true) => {
    if (isShow) {
      this.setState({ showCopyScript: true, script });
    } else {
      this.setState({ showCopyScript: false, script });
    }
  };

  sayupdatePopup = (msg = null, hideButton = false, link = "") => {
    if (msg) {
      this.updateMsg = msg;
    } else {
      this.updateMsg = this.defaultUpdateMsg;
    }
    this.link = link;
    this.hideUpdate = hideButton;
    this.setState({ update: true });
  };

  closeUpdate = () => {
    this.setState({ update: false });
  };

  initLoader = (isOn) => {
    this.setState({ loading: isOn });
  };

  showErrorWithHtml = (err) => {
    const { showError } = this.state;
    if (showError) {
      this.setState({ showError: false });
    } else {
      this.setState({ showError: err });
    }
  };

  render() {
    const { loading, update, showCopyScript, script, showError } = this.state;
    return (
      <React.Fragment>
        {loading ? <Loader /> : null}
        <ToastContainer autoClose={5000} />
        {showError ? <ErrorModel visible={showError ? true : false} Close={this.showErrorWithHtml} {...showError} /> : null}
        <SuccessModel isSuccess={this.isSuccess} msg={this.msg} visible={this.state.visible} />
        <SayUpdate msg={this.updateMsg} link={this.link} hideButton={this.hideUpdate} visible={update} Close={this.closeUpdate} />
        <CopyScript script={script} Close={() => this.setScript("", false)} visible={showCopyScript} />
      </React.Fragment>
    );
  }
}
