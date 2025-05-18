import React, { Component } from "react";
import "../../Create.css";
import RequestHandler from "../../../../actions/RequestHandler";
import { GET_ONE_TOOL, SAVE_TOOL } from "../../../../actions/URLs";
import SideBar from "./SideBar";
import ToolUtil from "../../../../utils/ToolUtil";
import Number from "./Number";
import Result from "./Result";
import Util from "../../../Util";
import { BreakEvenCalculatorModal, BreakEvenCalculatorModalResponse } from "../../../utils/Modal";

const backEven = {
  activeTab: 1,
  number: { spent: 0, revenue: 0, offerpayout: 0, costperclick: 0, conversion: 0 },
  result: "",
};
export default class BreakEvenCalculator extends Component {
  state = backEven;
  componentDidMount() {
    const id = this.props.match ? (this.props.match.params ? this.props.match.params.id : null) : null;
    if (id) {
      RequestHandler.PostRequest(GET_ONE_TOOL + id, {}, (res, err) => {
        if (res) {
          Util.isRedirected = true;
          const data = BreakEvenCalculatorModalResponse(res);
          if (data) {
            this.setState(data, () => {
              window.gs.navTitle(ToolUtil.getTool(data.toolId) + "(" + data.name + ")");
            });
          }
        }
      });
    } else {
      const toolId = 8;
      this.setState({ toolId: toolId, toolName: ToolUtil.getTool(toolId), name: Util.CAMPAIGNS_NAME });
      Util.RedirectWhenCampaignEmpty(this.props);
      window.gs.navTitle(ToolUtil.getTool(toolId) + "(" + Util.CAMPAIGNS_NAME + ")");
    }
  }
  onChangeActive = (tabIndex) => {
    const { activeTab } = this.state;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  onUpdate = (index, data) => {
    switch (index) {
      case 1:
        this.setState({ number: data });
        break;
      case 2:
        this.setState({ result: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, number, result } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Number {...number} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <Result {...result} onChange={this.onUpdate} />;
        break;
      default:
        component = <Number {...number} onChange={this.onUpdate} />;
        break;
    }
    return component;
  };

  onClickSave = () => {
    const toolData = this.state;
    if (!Util.isArrayEqual(backEven, this.state, 3)) {
      RequestHandler.PostRequest(SAVE_TOOL, { toolData: BreakEvenCalculatorModal(toolData) }, (res, err) => {
        if (res) {
          if (res.data.script) {
            this.setState({ openPopUp: true, popUpScript: res.data.script });
          }
        } else {
          console.log(err);
        }
      });
    }
  };

  closePopup = () => {
    this.setState({ openPopUp: false, success: false });
    this.props.history.push("/");
  };

  render() {
    const { openPopUp, popUpScript } = this.state;
    const scriptPorps = {
      popUpScript: popUpScript,
      closePopup: this.closePopup,
    };
    return (
      <div className="container">
        {openPopUp ? <ScriptPopup {...scriptPorps} /> : null}
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button">
              <button className="btn btn-primary btn-md create-top-button">Preview</button>
              <button onClick={this.onClickSave} className="btn btn-primary btn-md create-top-button">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "35px" }}>
          <div className="col">
            <center>
              <div className="create-center-main" style={{ marginTop: "unset" }}>
                {this.renderMain()}
              </div>
            </center>
          </div>
          <div className="col col-lg-2">
            <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
          </div>
        </div>
      </div>
    );
  }
}

function copyScript() {
  var copyText = document.getElementById("scriptToCopy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

const ScriptPopup = (props) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="popUpMainContainer">
          <div className="popUpTitlebar">
            <div onClick={() => props.closePopup()} className="popupCloseButton">
              <i className="fa fa-close" />
            </div>
          </div>
          <div className="main-campaing">
            <label>Script</label>
            <div class="input-group mb-3">
              <input type="text" className="form-control" id="scriptToCopy" value={props.popUpScript} name="campaignsName" required />
              <div class="input-group-append">
                <span class="input-group-text" onClick={copyScript} style={{ cursor: "pointer" }}>
                  <i className="fa fa-copy" />
                </span>
              </div>
            </div>
            {/* <input type="text" className="form-control" value={props.popUpScript} name="campaignsName" required /> */}
          </div>
          <div className="popUpbottomBar">
            <div>
              <button className="btn btn-xs btn-danger" onClick={() => props.closePopup()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
