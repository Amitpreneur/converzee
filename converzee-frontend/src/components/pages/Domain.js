import React, { Component } from "react";
import { SAVE_TOOL, SAVE_DOMAIN, GET_DOMAIN } from "../../actions/URLs";
import RequestHandler from "../../actions/RequestHandler";
import _ from "lodash";
import ToolUtil from "../../utils/ToolUtil";
export default class Domain extends Component {
  state = {
    domains: [""],
  };
  componentDidMount() {
    window.gs.navTitle("Domains");
    RequestHandler.PostRequest(GET_DOMAIN, {}, (res, err) => {
      if (res) {
        const domains = res.data.domains;
        if (domains) {
          this.setState({ domains }, () => {
            if (this.state.domains && !this.state.domains.length) {
              this.setState({ domains: [""] });
            }
          });
        }
      }
    });
  }

  onClickSave = () => {
    const newDomains = _.compact(this.state.domains);
    if (ToolUtil.domainLimit >= newDomains.length) {
      RequestHandler.PostRequest(SAVE_DOMAIN, { domainData: { domains: newDomains } }, (res, err) => {
        if (res.data.success) {
          window.gs.toast("Domain Save Successfully", { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
          this.setState({ domains: newDomains }, () => {
            if (this.state.domains && !this.state.domains.length) {
              this.setState({ domains: [""] });
            }
          });
        } else {
          const msg = res.data.message || "Something went wrong";
          window.gs.toast(msg, { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
        }
      });
    } else {
      window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
    }
  };

  onItemChange = (index, e) => {
    let { domains } = this.state;
    const value = e.target.value;
    domains[index] = value;
    this.setState({ domains });
  };

  onAddClick = () => {
    const { domains } = this.state;
    domains.push("");
    this.setState({ domains });
  };

  onRemoveClick = (index) => {
    const domains = this.state.domains || [""];
    domains.splice(index, 1);
    this.setState({ domains }, () => {
      if (!this.state.domains.length) {
        this.setState({ domains: [""] });
      }
    });
  };

  renderDomainList = (item, index) => {
    const size = this.state.domains.length;
    const props = {
      value: item,
      onChange: this.onItemChange,
      index,
      onAddClick: this.onAddClick,
      size,
      onRemoveClick: this.onRemoveClick,
    };
    return (
      <div className="col-12" key={index+1}>
        <TextInput {...props} />
      </div>
    );
  };

  render() {
    const { domains } = this.state;
    return (
      <div className="container cz_domain_box">
        <div className="row">
          <div className="col-12">
            <div className="create-top-bar-button">
              <button onClick={this.onClickSave} className="btn btn-primary btn-md create-top-button">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <center>
              <div style={{ width: "80%", textAlign: "left" }}>
                <div style={{ fontSize: "20px", paddingLeft: "33px" }}>
                  <strong>Domain</strong>
                </div>
                <div style={{ paddingLeft: "33px" }}>
                  <p>Total Domain limit ({ToolUtil.domainLimit})</p>
                  <p style={{ color: "gray" }}>List of Domain where you want to run your tool</p>
                </div>
              </div>
            </center>
          </div>
          <div className="col-12">
            <center>
              <div className="create-center-main" style={{ paddingTop: "20px", marginTop: "2%" }}>
                <div style={{ width: "80%" }}>{domains.map(this.renderDomainList)}</div>
              </div>
            </center>
          </div>
          <div className="col-12">
            <center>
              <div style={{ width: "80%", textAlign: "left", paddingTop: "10px" }}>
                <div style={{ paddingLeft: "33px" }}>
                  <p style={{ color: "gray" }}>Use HTTP / HTTPS </p>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

const TextInput = (props) => {
  return (
    <div className="code-input-block ">
      <input type="text" value={props.value} className="form-control" onChange={(e) => props.onChange(props.index, e)} />
      <div className="code-plusIcon">
        {props.size - 1 === props.index ? (
          <i onClick={() => props.onAddClick()} className="fa fa-plus-circle" aria-hidden="true" title="Click to Add Domain" />
        ) : (
          <i onClick={() => props.onRemoveClick(props.index)} className="fa fa-minus-circle" aria-hidden="true" title="Click to Remove Domain" />
        )}
      </div>
    </div>
  );
};
