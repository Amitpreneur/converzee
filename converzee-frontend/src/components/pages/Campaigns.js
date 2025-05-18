import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Campaigns.css";
import RequestHandler from "../../actions/RequestHandler";
import { GET_CAMPAIGNS, CLONE_TOOL, ARCHIVE_TOOL, PURGE_TOOL, getPath, DOWNLOAD_DATA } from "../../actions/URLs";
import ToolUtil, { exportCSVFile } from "../../utils/ToolUtil";
import { EMAIL_SEND } from "../../utils/Routes";
import { Filter } from "../comman/Filter";
import { CampignItem } from "../layout/ToolLayout";
import {Link} from "react-router-dom";

export default class Campaigns extends Component {
  toolId = 0;
  url = null;
  state = {
    items: [],
    emails: [],
    isRedirect: false,
    isopenFilter: false,
    searchStr: "",
  };

  componentDidMount() {
    window.gs.navTitle("Campaigns");
    this.getCampaigns(); 
  }
  componentDidUpdate() {
    let sidebar = document.querySelectorAll(".sidebar_content");
    sidebar.forEach(sd => {
      if(sd.getAttribute("title") === "Campaigns") {
        if(!sd.classList.contains("nav-active")) {
          sd.classList.add("nav-active");
        }
      } else {
        sd.classList.remove("nav-active");
      }
    });
  }
  getCampaigns = (data = {}) => {
    RequestHandler.PostRequest(GET_CAMPAIGNS, { searchData: data }, (res, err) => {
      if (res) {
        const items = res.data.campaigns;
        this.setState({ items });
      }
    });
  };

  getToolurl(toolId, id) {
    if (toolId) this.url = ToolUtil.getToolData(toolId).url + "/" + id || null;
    else this.url = EMAIL_SEND + "/" + id || null;
  }

  cloneRequest = (id) => {
    RequestHandler.PostRequest(CLONE_TOOL + id, {}, (res, err) => {
      if (res) {
        window.gs.toast("Clone Success", { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
        this.getCampaigns();
      }
    });
  };

  archiveRequest = (id) => {
    RequestHandler.PostRequest(ARCHIVE_TOOL + id, {}, (res, err) => {
      if (res) {
        window.gs.toast("Successfully", { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
        this.getCampaigns();
      }
    });
  };

  purgeTool = (id) => {
    RequestHandler.PostRequest(PURGE_TOOL + id, {}, (res, err) => {
      if (res) {
        window.gs.toast("Archive Success", { position: "bottom-right", type: window.gs.toast.TYPE.SUCCESS });
        this.getCampaigns();
      }
    });
  };

  downloadData = (id) => {
    RequestHandler.PostRequest(DOWNLOAD_DATA + id, {}, (res, err) => {
      if (res) {
        const { data } = res.data;
        if (data) {
          exportCSVFile(data, "converzee");
        }
      }
    });
  };

  onClickAction = (id, toolId, action) => {
    if (action == "CLONE") {
      if (!ToolUtil.isUpgrade1 && !window.isAdvancedOpt) {
        window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
        return;
      }
    }
    this.getToolurl(toolId, id);
    switch (action) {
      case "EDIT":
        this.setState({ isRedirect: true });
        break;
      case "CLONE":
        this.cloneRequest(id);
        break;
      case "ARCHIVE":
        this.purgeTool(id);
        break;
      case "STATUS":
        this.archiveRequest(id);
        break;
      case "SEND":
        this.setState({ isRedirect: true });
        break;
      default:
        this.setState({ isRedirect: true });
        break;
    }
  };

  renderListItems = (item, i) => {
    const items = {
      ...item,
      onClickAction: this.onClickAction,
      archiveRequest: this.archiveRequest,
      downloadData: this.downloadData,
      isLock: (ToolUtil.isUpgrade1 && window.isAdvancedOpt) ? false : true,
    };
    return <CampignItem {...items} key={i} />;
  };

  openFilterClick = () => {
    if (!ToolUtil.isUpgrade1 || !window.isAdvancedOpt) {
      window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
      return;
    }
    this.setState({ isopenFilter: true });
  };

  onFilterClose = () => {
    this.setState({ isopenFilter: false });
  };

  onFilterChange = (filters) => {
    if (!ToolUtil.isUpgrade1 || !window.isAdvancedOpt) {
      window.gs.sayUpdate(null, false, ToolUtil.linksList ? ToolUtil.linksList.oto2 : "");
      return;
    }
    const { searchStr } = this.state;
    if (searchStr !== "") filters["searchStr"] = searchStr;
    this.getCampaigns(filters);
  };

  onSearchClick = () => {
    const { searchStr } = this.state;
    this.getCampaigns({ searchStr });
  };

  onSearchChange = (e) => {
    this.setState({ searchStr: e.target.value });
  };

  onSortingChange = (istrue) => {
    this.setState({ sorting: istrue ? 1 : 0 });
  };

  PressEnter = (e) => {
    if (e.keyCode === 13) this.onSearchClick();
  };

  resetSearch = () => {
    this.setState({ searchStr: "" }, () => this.onSearchClick());
  };

  render() {
    const { items, isRedirect, isopenFilter, searchStr } = this.state;
    const url = this.url;
    return (
      <div className="container" name="Campaigns">
        <Filter visible={isopenFilter} onChangeFilter={this.onFilterChange} onClose={this.onFilterClose} />
        
        <div className="row">
          <div className="col-md-3 col-sm-2 d-none d-sm-block"></div>
          <div className="col-md-5 col-sm-8 camp_filterItem1">
            <div className="pull-right input-group mb-3">
              <input type="text" className="form-control search-field" onKeyUp={this.PressEnter} value={searchStr} onChange={this.onSearchChange} placeholder="Search By Campaign Name" />
              <div className="input-group-append">
                <span className="input-group-text search-icon" onClick={this.onSearchClick}>
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-2 camp_filterItem2">
            <div className="pull-right">
              <button className="btn btn-sm filter-btn" onClick={this.openFilterClick}>
                <span className="d-block d-sm-none">
                  <i className="fa fa-filter"></i>
                </span>
                <span className="d-none d-sm-block">
                  <i className="fa fa-filter"></i>Filter
                </span>
              </button>
            </div>
          </div>
        </div>  
        { !items.length ? 
        <div className="cz_empty_box">
          <h2>No campaigns available right now</h2>
          <p>You have not created any campaigns so far. Click on the button below to create a campaign.</p>
          <Link className="cz_btn cz_orange_btn" to="/Create">Create Campaign</Link>
        </div> : null}
        {isRedirect && url ? <Redirect to={url} /> : null}
        {items.map(this.renderListItems)}
      </div> 
    );
  }
}
