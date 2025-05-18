import React from "react";
import "./ToolLayout.css";
import { LockTool } from "../comman/Popup";
import ToolUtil from "../../utils/ToolUtil";
import { getPath } from "../../actions/URLs";
import { isMobile } from "../utils/ScreenUtil";
import { Switch } from "antd";
import moment from "moment";

export const ToolLayout = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">{props.children}</div>
      </div>
    </div>
  );
};

export const ButtonsGroup = (props) => {
  return (
    <div className="col-12 toolbox_bottom_btns" style={{ marginTop: "20px" }}>
      {
        <button onClick={props.backUrl} className="btn btn-sm closeButton">
          Close
        </button>
      }
      {props.download ? (
        <button onClick={props.download} className="pull-right btn btn-sm downloadButton">
          Download
        </button>
      ) : null}

      

      {props.save ? (
        <button onClick={props.save} className="pull-right btn btn-sm SaveButton ck_btn">
          Save
        </button>
      ) : null}

      {props.preview ? (
        <button onClick={props.preview} className="pull-right btn btn-sm PreviewButton ck_btn">
          Preview
        </button>
      ) : null}
      {props.refresh ? (
        <button onClick={props.refresh} className="pull-right btn btn-sm PreviewButton">
          Refresh
        </button>
      ) : null}
    </div>
  );
};

export const SideButton = (props) => {
  return (
    <center>
      <div className="SideBarButton">
        <span className="sidebar-img">
          <i className={props.class}></i>
        </span>
        <br />
        {props.text}
      </div>
    </center>
  );
};

export const CreateItem = (props) => {
  if (isMobile()) {
    return <DIVElementMobile {...props} />;
  } else {
    return <DIVElement {...props} />;
  }
};

const DIVElementMobile = (props) => {
  return (
    <div className={"col-lg-4 col-md-6 col-sm-12 react-item "}>
      <div className={"rectangle mt-4 " + props.classnm2} onClick={!props.isLock ? () => props.openTool(props.URL, props.byPass, props.params, props.ie, props.isOpenAble) : ""}>
        {props.isLock ? <LockTool style={{ height: props.height, minWidth: "230px" }} /> : null}
        <div className="row">
          <div className="col-8">
            <div className="white mt-3 mb-2 masonry-title">{props.diaplayName}</div>
            <div className="white description">{props.desc}</div>
          </div>
          <div className="col-4">
            <div className="col-sm-5">{props.img ? <img className="img-fluid" src={getPath(props.img)} /> : <img className="img-fluid" src={getPath(ToolUtil.getImg(props.routeName))} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DIVElement = (props) => {
  let classnm = props.classnm;
  return (
    <div className={"col-lg-4 col-md-6 col-sm-12 cz_mobile_box react-item " + classnm}>
      <div
        className={"rectangle mt-4 " + props.classnm2}
        style={{ height: props.height }}
        onClick={!props.isLock ? () => props.openTool(props.URL, props.byPass, props.params, props.ie, props.isOpenAble) : ""}
      >
        {props.isLock ? <LockTool style={{ height: props.height, minWidth: "230px" }} /> : null}
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-8" style={{textAlign: 'right'}}>{props.img ? <img className="img-fluid" src={getPath(props.img)} /> : <img className="img-fluid" src={getPath(ToolUtil.getImg(props.routeName))} />}</div>
        </div>
        <div className="row">
          <div className="bottom-desc">
            <div className="white mt-3 mb-2 masonry-title">{props.diaplayName}</div>
            <div className="white description">{props.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CampignItem = (props) => {
  if (isMobile()) {
    return <ListItemMobile {...props} />;
  } else {
    return <ListItem {...props} />;
  }
};

const LockWithToolTip = function () {
  return (
    <div title="Upgrade to unlock">
      <span>
        <i className="fa fa-lock"></i>
      </span>
    </div>
  );
};

const ListItem = (item) => {
  let img = "", layout = "";
  if( item.toolId === 20 ) {
    if(item.toolData.layout === 2) {
      img = "asset/toolIcon/exitintent.png";
    } else if(item.toolData.layout === 1) {
      img = "asset/toolIcon/hellobartimer.png";
    } else if(item.toolData.layout === 4) {
      img = "asset/toolIcon/dynamicelements.png";
    } else if(item.toolData.layout === 5) {
      img = "asset/toolIcon/hellobarwithoptin.png";
    } else if(item.toolData.layout === 6) {
      img = "asset/toolIcon/hellobartimerwithoptin.png";
    } else if(item.toolData.layout === 7) {
      img = "asset/toolIcon/exitintentwithoptin.png";
    } else if(item.toolData.layout === 3) {
      layout = 3;
      img = "asset/toolIcon/centraltime.png";
    } else {
      img = "asset/toolIcon/hellobar.png";
    }
  }

  if( item.toolId === 19) {
    if(item.toolData.layout === 0) {
      img = "asset/toolIcon/hellobarwithoptin.png";
    } else if(item.toolData.layout === 1) {
      layout = 3;
      img = "asset/toolIcon/hellobartimerwithoptin.png";
    } else {
      img = "asset/toolIcon/exitintentwithoptin.png";
    }
  }
  return (
    <div className="Camp_ListItem">
      <div className="row">
        <div className="col-md-12 col-lg-2 col-sm-12 align-self-center">
          <center>
            <img className="img-fluid Camp_ListItem_img" src={img !== "" ? img : getPath(ToolUtil.getImg(item.toolId))} />
          </center>
        </div>
        <div className="col-md-12 col-lg-4 col-sm-12 Camp_Details">
          <div className="row" style={{ height: "100%" }}>
            <div className="col-12">
              <div className="float-left Camp_label">Name : {item.title || item.toolName} { item.copied ? ` ( Copied ${item.copied === 1 ? "" : item.copied-1})` : ""} </div>
              <div>Type : {item.toolName}</div>
            </div>
            <div className="col-12">
              <div className="row camp_info">
                <div className="col">
                  <div className="float-left Camp_label">Views</div>
                  {item.isLock ? <LockWithToolTip /> : <div>{item.views}</div>}
                </div>
                { item.toolId !== 1 && item.toolId !== 6 && item.toolId !== 25 && item.toolId !== 21 ?
                  (layout === 3 ? null : 
                    <div className="col">
                      <div className="float-left Camp_label">Clicks</div>
                      {item.isLock ? <LockWithToolTip /> : <div>{item.clicks}</div>}
                    </div> )
                  : null
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6 col-sm-12">
          <div className="row">
            <div className="col">
              <div className="pull-right" style={{ display: "grid" }}>
                <div key={item._id}>
                  <Switch
                    className="pull-right m-2"
                    onChange={() => {
                      item.archiveRequest(item._id, item.toolId, "STATUS");
                    }}
                    size="small"
                    defaultChecked={item.status}
                  />
                  <span style={{ paddingTop: "12px !important" }} className={item.status ? "pull-right m-2 camp-Active" : "pull-right m-2 camp-InActive"}>
                    {item.status ? "Active" : "In-Active"}
                  </span>
                </div>
                <div className="pull-right m-2">
                  <span>{moment(item.updatedAt).format("DD-MMM-YYYY HH:mm:ss")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row Camp_Button_Grp_row">
            <div className="col">
              {item.toolId === 19 || item.toolId === 23 ? (
                <button className="btn btn-sm btn-outline-success archive-btn action-button" onClick={() => item.downloadData(item._id)}>
                  <span>
                    <i className="fa fa-down-arrow"></i>Download
                  </span>
                </button>
              ) : null}
              <button className="btn btn-sm btn-outline-danger archive-btn action-button" onClick={() => item.onClickAction(item._id, item.toolId, "ARCHIVE")}>
                <span>
                  <i className="fa fa-archive"></i>Archive
                </span>
              </button>
              <button className="btn btn-sm clone-btn action-button" onClick={() => item.onClickAction(item._id, item.toolId, "CLONE")}>
                <span>
                  <i className="fa fa-copy"></i>Clone
                </span>
              </button>
              <a className={item.status ? "btn btn-sm edit-btn action-button" : "btn btn-sm edit-btn action-button disabled"} onClick={() => item.onClickAction(item._id, item.toolId, "EDIT")}>
                <span>
                  <i className="fa fa-edit"></i>Edit
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListItemMobile = (item) => {
  let img = "", layout = "";
  if( item.toolId === 20 ) {
    if(item.toolData.layout === 2) {
      img = "asset/toolIcon/exitintent.png";
    } else if(item.toolData.layout === 1) {
      img = "asset/toolIcon/hellobartimer.png";
    } else if(item.toolData.layout === 4) {
      img = "asset/toolIcon/dynamicelements.png";
    } else if(item.toolData.layout === 5) {
      img = "asset/toolIcon/hellobarwithoptin.png";
    } else if(item.toolData.layout === 6) {
      img = "asset/toolIcon/hellobartimerwithoptin.png";
    } else if(item.toolData.layout === 7) {
      img = "asset/toolIcon/exitintentwithoptin.png";
    } else if(item.toolData.layout === 3) {
      layout = 3;
      img = "asset/toolIcon/centraltime.png";
    } else {
      img = "asset/toolIcon/hellobar.png";
    }
  }

  if( item.toolId === 19) {
    if(item.toolData.layout === 0) {
      img = "asset/toolIcon/hellobarwithoptin.png";
    } else if(item.toolData.layout === 1) {
      layout = 3;
      img = "asset/toolIcon/hellobartimerwithoptin.png";
    } else {
      img = "asset/toolIcon/exitintentwithoptin.png";
    }
  }
  return (
    <div className="Camp_ListItem Camp_ListItem_mob">
      <div className="row">
        <div className="col-12">
          <div className="d-flex">
            <div className="m-2">
              <img className="img-fluid Camp_ListItem_img_mob" src={img !== "" ? img : getPath(ToolUtil.getImg(item.toolId))} />
            </div>
            <div>
              <div className="float-left Camp_label Camp_label_mob">Name : {item.title || item.toolName} { item.copied ? ` ( Copied ${item.copied === 1 ? "" : item.copied-1})` : ""} </div>
              <div>Type : {item.toolName}</div>
            </div>
            <div>
              <div className="pull-right" style={{ display: "grid" }}>
                <div key={item._id}>
                  <Switch
                    className="pull-right m-2"
                    onChange={() => {
                      item.archiveRequest(item._id, item.toolId, "STATUS");
                    }}
                    size="small"
                    defaultChecked={item.status}
                  />
                  <span style={{ paddingTop: "12px !important" }} className={item.status ? "pull-right m-2 camp-Active" : "pull-right m-2 camp-InActive"}>
                    {item.status ? "Active" : "In-Active"}
                  </span>
                </div>
                <div className="pull-right m-2">
                  <span>{moment(item.updatedAt).format("DD-MMM-YYYY HH:mm:ss")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex camp_info_mob mt-3 mb-3 p-3">
            <div className="col">
              <div className="float-left Camp_label Camp_label_mob">Views</div>
              <div>{item.isLock ? <LockWithToolTip /> : item.views}</div>
            </div>
            { item.toolId !== 1 && item.toolId !== 6 && item.toolId !== 25 && item.toolId !== 21 ?
              (layout === 3 ? null : <div className="col">
                <div className="float-left Camp_label Camp_label_mob">Clicks</div>
                <div>{item.isLock ? <LockWithToolTip /> : item.clicks}</div>
              </div>) : null
            }
          </div>
        </div>
        <div className="col-12">
          {item.toolId === 19 || item.toolId === 23 ? (
            <button className="btn btn-sm btn-outline-success archive-btn action-button" onClick={() => item.downloadData(item._id)}>
              <span>
                <i className="fa fa-down-arrow"></i>Download
              </span>
            </button>
          ) : null}
          <button className="btn camp_btn_mob btn-sm btn-outline-danger archive-btn action-button" onClick={() => item.onClickAction(item._id, item.toolId, "ARCHIVE")}>
            <span>
              <i className="fa fa-archive"></i>Archive
            </span>
          </button>
          <button className="btn camp_btn_mob btn-sm clone-btn action-button" onClick={() => item.onClickAction(item._id, item.toolId, "CLONE")}>
            <span>
              <i className="fa fa-copy"></i>Clone
            </span>
          </button>
          <a
            className={item.status ? "btn camp_btn_mob btn-sm edit-btn action-button" : "btn btn-sm edit-btn action-button disabled"}
            onClick={() => item.onClickAction(item._id, item.toolId, "EDIT")}
          >
            <span>
              <i className="fa fa-edit"></i>Edit
            </span>
          </a>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
