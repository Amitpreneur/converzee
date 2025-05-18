import React, { Component } from "react";
import Editor from "../../../comman/Editor";
import DropDown from "../../../comman/DropDown";
export default class Script extends Component {
  state = {
    cta: this.props.cta,
    position: this.props.position,
  };

  onChange = (value) => {
    this.setState({ cta: value }, () => {
      this.props.onChange({ cta: this.state.cta });
    });
  };

  onPositionChange = (value) => {
    this.setState({ position: value }, () => {
      this.props.onChange({ position: this.state.position });
    });
  };

  copyScript = () => {
    var copyText = document.querySelector(".iframe_script");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    window.gs.toast("Copied", { position: "top-center", type: window.gs.toast.TYPE.INFO });
  }

  render() {
    const { cta, position } = this.state;
    return (
      <div className="cz_autoplay_script">
        {/* <div className="cz_script_box">
          <h2>Script</h2>
          <p>Place the script above the closing body tag on the page where your video is already placed. Playboost will automatically detect your video and apply your customizations.</p>
          <textarea readOnly value='<script class="playboost-js" src="https://playboost.co/remote/play.js?q=2831"></script>'></textarea>
          <button className="cz_btn">Copy</button>
        </div> */}
        <div className="cz_script_box">
          <h2>Iframe</h2>
          <p>Use this iframe code as your installation step if you are using a page builder. If you this, you won't need to use the other playboost installation script. Place this iframe code anywhere where you want your playboost campaign to be displayed inside your page builder (if you have an existing embed video, replace it with this iframe code). Please note: this iframe code this will not track clicks and views. If you want to track those metrics, you'll need to use the other installation script.</p>
          <textarea className="iframe_script" readOnly value='<iframe class="converzee_auto_play" frameborder="0" scrolling="no" allow="autoplay; fullscreen" width="560" height="315" ></iframe>'></textarea>
          <button className="cz_btn" onClick={this.copyScript}>Copy</button>
        </div>
      </div>
    );
  }
}
