import React from "react";
import { Tooltip } from "antd";

export const Info = function (props) {
  return (
    <span style={{ marginLeft: "8px", fontSize: "18px" }}>
      <Tooltip placement="topRight" title={props.text || ""}>
        <i className="fa fa-info-circle"></i>
      </Tooltip>
    </span>
  );
};
