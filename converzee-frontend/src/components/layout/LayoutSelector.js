import React from "react";
import "./LayoutSelector.css";
import { getPath } from "../../actions/URLs";

export const LayoutSelector = (props) => {
  return (
    <div>
      <div className={"cz_hellobar_timer_layout".concat(props.isExit ? " cz_club_exit_layout".concat(props.layout === 4 ? " cz_dynamic_layouts": "") : "").concat(props.layout === 3 ? " cz_ct_layouts": "")}>
        <p>Select Layout</p>
        {props.items.map((e, i) => (
          <TemplateView isExit={props.isExit} isText={props.isText} key={"TEMP_" + i} index={i} onClick={props.onLayoutSelect} checkedIndex={props.selected} img={e} />
        ))}
      </div>
    </div>
  );
};

const TemplateView = (props) => {
  return (
    <div className="template_item" onClick={() => props.onClick(props.index)}>
      {props.checkedIndex === props.index ? (
        <span className="Icon-awesome-check-circle">
          <i className="fa fa-check-circle"></i>
        </span>
      ) : (
        <span className="Icon-awesome-uncheck-circle">
          <i className="fa fa-circle-o"></i>
        </span>
      )}
      {props.isText ? <span>{props.img}</span> : <img className={props.isExit ? "layoutSelector_img layoutSelector_img_height" : "layoutSelector_img "} src={window.rPath+getPath(props.img)} />}
    </div>
  );
};

export const ColorSelector = (props) => {
  return (
    <div onClick={() => props.onClick(props.index)} className={props.selectedIndex === props.index ? "layout-color-selected layout_colors_boxes" : " layout_colors_boxes"}>
      <h3>{props.showName ? props.name : props.text}</h3>
      <div className={props.selectedIndex === props.index ? "layout-color-box layout-color-box-selected" : "layout-color-box"} style={{ backgroundColor: props.value || props.color }}></div>
    </div>
  );
};
