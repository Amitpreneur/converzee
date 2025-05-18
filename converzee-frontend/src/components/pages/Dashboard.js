import React, { Component, useState, useCallback } from "react";
import Chart from "react-apexcharts";
import RequestHandler from "../../actions/RequestHandler";
import { DASHBOARD_DATA, getPath } from "../../actions/URLs";
import { Tabs } from "antd";
import { Storage } from "../../utils/Storage";
import "./DashBoard.css";
import _ from "lodash";
import { getChartData } from "../Util";
import { addDays, subDays } from "date-fns";
import DateRangeFilter from "./DateRangeFilter";
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;

let settingIcon = null;
let createCampaingnID = null;
export default class Dashboard extends Component {
  constructor() {
    super();
    const tips = Storage.getOneItem("tips");
    if (tips) {
      this.state.closePopup = false;
    }
  }
  state = {
    views: 0,
    clicks: 0,
    closePopup: true,
    showGraph: false,
    totalCampaign: 0,
    isShowViews: true,
    datePickerPop:false,
    selection: [
      {
        startDate: subDays(new Date(), 6),
        endDate: addDays(new Date(), 0),
        key: "selection"
      }
    ]
  };
  onLogoutClick = (e) => {
    e.preventDefault();
    window.gs.logout();
  };

  handleDatePicker(){
    this.setState({
      datePickerPop:!this.state.datePickerPop
    })
  }
  handleDateOverlay(){
    this.setState({
      datePickerPop:false
    })
  }

  // componentWillMount() {
  //   this.handleDashboard(this.state.selection);
  // }

  componentDidMount() {
    try {
      const react1 = document.getElementById("settingIcon").getBoundingClientRect().x;
      const react2 = document.getElementById("createCampaingnID").getBoundingClientRect().y;
      settingIcon = `${react1}px`;
      createCampaingnID = `${react2}px`;
    } catch (e) {
      settingIcon = "62%";
      createCampaingnID = "40%";
    }
    window.gs.navTitle("Dashboard");
    this.handleDashboard(this.state.selection);
  }

  handleDashboard(data) {
    RequestHandler.PostRequest(DASHBOARD_DATA, {"selection" : data}, (res, err) => {
      if (res) {
        if (res.data.success) {
          const { clicks = 0, views = 0, graphData, totalCampaign = 0 } = res.data.data;
          this.setState({ clicks, views, totalCampaign });
          if (graphData) {
            try {
              // const clicksViews = processGraphData(graphData);
              var clickItems = getChartData(pointDateToDot(graphData, "clicks"));
              var viewItems = getChartData(pointDateToDot(graphData, "views"));
              this.setState({ clickItems, viewItems, showGraph: true });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    });
  }

  callback(key) {
    console.log(key);
  }

  onClosePopup = () => {
    this.setState({ closePopup: false });
  };

  onClickCheck = () => {
    Storage.put("tips", 0);
  };

  toggleChart = () => {
    this.setState({ isShowViews: !this.state.isShowViews });
  };

  handleSelect = (ranges) => {
    this.handleDashboard(ranges);
  }
  
  render() {
    const { clicks, views, isShowViews, showGraph, clickItems, viewItems, totalCampaign, closePopup = true, selection } = this.state;
    return (
      <>
        <div className="cz_dashboard_head">
          <div className="cz_start_text">
            <h3>Get Started</h3>
            <p>Follow these 3 simple steps<br/>to create a new campaign.</p>
          </div>
          <div className="cz_dash_header_boxes">
            <Link to="/Domain">
              <div className="rectangle mt-4 react-item1">
                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8" >
                    <img className="img-fluid" src="/asset/domain.png"/>
                  </div>
                </div>
                <div className="row">
                  <div className="bottom-desc">
                    <div className="white mt-3 mb-2 masonry-title">Domain Setup</div>
                    <div className="white description">Add your domain under domain profile</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Pixel">
              <div className="rectangle mt-4 react-item1">
                <div className="row">
                  <div className="col-sm-4"> </div>
                  <div className="col-sm-8" >
                    <img className="img-fluid" src="/asset/add_pixels.png"/>
                  </div>
                </div>
                <div className="row">
                  <div className="bottom-desc">
                    <div className="white mt-3 mb-2 masonry-title">Add Pixel</div>
                    <div className="white description">Add Converzee Pixel to you webpage</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Create">
              <div className="rectangle mt-4 react-item1">
                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8" >
                    <img className="img-fluid" src="/asset/create_campaigns.png"/>
                  </div>
                </div>
                <div className="row">
                  <div className="bottom-desc">
                    <div className="white mt-3 mb-2 masonry-title">Create  Campaign</div>
                    <div className="white description">Create a campaign from the choice of your tools</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="cz_dashboard_wrapper" name="Dashboard">
          <div className="row mb-4">
            <div className="col-md-4 col-sm-12 col-lg-4">
              <div className="dashboard-card">
                <div className="col-4 card-title">
                  <div className="card-text">{clicks}</div>
                  <div className="card-subtext">Total Clicks</div>
                </div>
                <div className="col-8 card-img">
                  <img className="img-fluid" src={getPath("/asset/group-15.png")} />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <div className="dashboard-card">
                <div className="col-4 card-title">
                  <div className="card-text">{views}</div>
                  <div className="card-subtext">Total Views</div>
                </div>
                <div className="col-8 card-img">
                  <img className="img-fluid" src={getPath("/asset/group-16.png")} />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <div className="dashboard-card">
                <div className="col-4 card-title">
                  <div className="card-text">{totalCampaign}</div>
                  <div className="card-subtext">Total Campaigns</div>
                </div>
                <div className="col-8 card-img">
                  <img className="img-fluid" src={getPath("/asset/group-14.png")} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="chart-container">
                <div className="row">
                  <div className="col-12">
                    <div className="cz_chart_head">
                      <div className="toggle-chart m-2 align-items-center">
                        <div onClick={this.toggleChart} className={isShowViews ? "toggle-button align-items-center toogle-active" : "toggle-button align-items-center"}>
                          Views
                        </div>
                        <div onClick={this.toggleChart} className={isShowViews ? "toggle-button align-items-center" : "toggle-button align-items-center toogle-active"}>
                          Clicks
                        </div>
                      </div>
                      <div className={"cz_chart_filter ".concat(this.state.datePickerPop === true ? ' active' : null)}>
                        <div className="cz_filter_box" onClick={()=>this.handleDatePicker()}>
                          Fiter by Date
                          <i className="fa fa-calendar"></i>
                        </div>
                        <div className="cz_date_picker">
                          <div className="cz_date_overlay" onClick={()=>this.handleDateOverlay()}></div>
                          <DateRangeFilter state={selection} onChange={this.handleSelect} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {showGraph ? (
                    <div className="col-12">
                      {isShowViews ? (
                        <Chart options={viewItems.options} series={viewItems.series} type="line" height={350} />
                      ) : (
                        <Chart options={clickItems.options} series={clickItems.series} type="line" height={350} />
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const Popover = function (props) {
  return (
    <div className={"tip-popup " + props.cs} style={{ left: props.left, top: props.top }}>
      {props.children}
    </div>
  );
};
const showToolTips = Storage.getOneItem("tips");
const Tips = (props) => {
  const [show, setShow] = useState(props.isShow);
  const [count, setCount] = useState(0);
  const setCounter = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount > 2) {
      setShow(false);
    }
  });
  if (showToolTips == 0 || !show) {
    return null;
  }
  return (
    <React.Fragment>
      {count == 2 ? (
        <Popup onClosePopup={setCounter} onClickCheck={() => Storage.put("tips", 0)} />
      ) : (
        <div className="loader-item tip" onClick={setCounter}>
          {count == 0 ? (
            <Popover left={"12%"} top={createCampaingnID} cs={"arrow_box1"}>
              <p>Add Campaigns from here</p>
            </Popover>
          ) : null}
          {count == 1 ? (
            <Popover left={settingIcon} top={"12%"} cs={"arrow_box2"}>
              <p>Copy pixel from here</p>
            </Popover>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup_inner" style={{ height: "fit-content", maxHeight: "185px", minHeight: "200px" }}>
        <div className="popUpMainContainer">
          <div className="popUpTitlebar">
            <div onClick={props.onClosePopup} className="popupCloseButton">
              <i className="fa fa-close" />
            </div>
          </div>
          <div className="main-campaing">
            <div>Steps to initial setup</div>
            <div style={{ textAlign: "left" }}>
              1. copy pixel
              <br />
              2. Add Domains
              <br />
              3. Make sure to add trigger
            </div>
          </div>
          <div className="popUpbottomBar row" style={{ display: "flex", position: "unset" }}>
            <div style={{ paddingTop: "20px", left: "20px", display: "flex" }}>
              <input type="checkbox" onClick={props.onClickCheck} style={{ marginTop: "5px" }} /> Skip tips
            </div>
            <div className="float-right" style={{ right: "10px", position: "absolute" }}>
              <button className="btn btn-xs btn-danger" onClick={props.onClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function processGraphData(graphData = null) {
  if (graphData) {
    const clicks = new Array();
    const views = new Array();
    _.forEach(graphData, (item) => {
      //for clicks
      _.forEach(item.clicks, (c) => {
        clicks.push(c);
      });
      _.forEach(item.views, (v) => {
        views.push(v);
      });
    });
    const clicksItems = findDuplicateAndAdd(clicks, "click");
    const viewsItems = findDuplicateAndAdd(views, "view");
    return { clicksItems, viewsItems };
  }
}

function findDuplicateAndAdd(arrayItems, typ) {
  const items = [];
  _.forEach(arrayItems, (i, index) => {
    if (items.length === 0) items.push(i);
    const itemIndex = _.findIndex(items, (o) => {
      return o.date == i.date;
    });
    if (itemIndex !== -1) {
      items[itemIndex][typ] = items[itemIndex][typ] + i[typ];
    } else {
      items.push(i);
    }
  });
  return items;
}

function pointDateToDot(items = [], typ = "clicks") {
  const obj = { dates: [], dots: [] };
  for(var k in items){
    obj.dates.push(k);
    obj.dots.push(items[k][typ]);
  }
  return obj;
}
