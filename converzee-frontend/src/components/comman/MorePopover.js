import React, { Component } from "react";
import "./MorePopover.css";
const MorePopover = function(props) {
  return (
    <div className="dropdown">
      <i className="fa fa-ellipsis-v dropdown-toggle more-button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className={props.status ? "dropdown-item" : "dropdown-item isDisabled"} onClick={() => props.onClickAction(props.id, props.toolId, "EDIT")}>
          Edit
        </a>
        <a className={props.status ? "dropdown-item" : "dropdown-item isDisabled"} onClick={() => props.onClickAction(props.id, props.toolId, "CLONE")}>
          Clone
        </a>
        <a className={"dropdown-item"} onClick={() => props.onClickAction(props.id, props.toolId, "ARCHIVE")}>
          Archive
        </a>
      </div>
    </div>
  );
};
export default MorePopover;
