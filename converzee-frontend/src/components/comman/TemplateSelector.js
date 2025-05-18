import React from "react";
import { Info } from "./Info";
const TemplateSelector = (props) => {
  return (
    <div className="main-campaing">
      <center>
        <h5>
          Select Template <Info text="Select layout to apply options" />
        </h5>
        {props.isExit ? (
          <div>
            {props.templates.map((item, i) => (
              <TEAMP_EXIT onSelectClick={props.onSelectClick} isChacked={i === props.selected} i={i} img={item} />
            ))}
          </div>
        ) : (
          <div>
            {props.templates.map((item, i) => (
              <TEAMP onSelectClick={props.onSelectClick} isChacked={i === props.selected} i={i} img={item} />
            ))}
          </div>
        )}
      </center>
    </div>
  );
};

const TEAMP = function (prop) {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <input type="radio" name="template" checked={prop.isChacked ? "checked" : false} value={prop.i} onClick={() => prop.onSelectClick(prop.i)} />
      </div>
      <div>
        <img style={{ width: "300px" }} src={prop.img} />
      </div>
    </div>
  );
};

const TEAMP_EXIT = function (prop) {
  return (
    <div>
      <div>
        <input type="radio" name="template" checked={prop.isChacked ? "checked" : false} value={prop.i} onClick={() => prop.onSelectClick(prop.i)} />
      </div>
      <div>
        <img style={{ width: "300px" }} src={prop.img} />
      </div>
    </div>
  );
};

export default TemplateSelector;
