import React, { Component, useEffect } from "react";
import Portal from "../comman/Portal";
import TimeCounter from "../comman/TimeCounter";
import "./Preview.css";
import "./dynamicElements.css";
import "./clubOptinForm.css";
import "./centralTimer.css";
import { parseImgUrl } from "../Util";
// import FlipClock from "./flipClock";
import CircularClock from "./circularClock";

export class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDateTime: props.toolData.endDateTime,
      timeZone: props.toolData.timeZone
    }
    this.flipClockScriptCalled = this.flipClockScriptCalled.bind(this);
  }

  setPosition() {
    const element = document.getElementsByClassName("mck_optForm_container_HELLOBAR")[0];
    if (element && this.props.toolData.position !== "bottom") {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-top:" + element.offsetHeight + "px;";
    } else if (element) {
      const body = document.getElementsByTagName("body")[0];
      body.style = "margin-bottom:" + element.offsetHeight + "px;";
    }
  }

  componentDidMount() {
    const { toolData } = this.props;
    const { layout, endDateTime, timeZone } = toolData;
    
    if(document.querySelector(".timerClassdefault")){
      window.clockTimerChange(new Date(endDateTime ), timeZone);
    }
    
    if(layout === 3){
      this.flipClockScriptCalled();
    }
    if (layout === 0 || layout === 1) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    const body = document.getElementsByTagName("body")[0];
    body.style = "";
  }

  componentDidUpdate(newProps) {
    const { toolData } = this.props;
    const { position } = toolData;
    if (position !== newProps.toolData.position) {
      this.setPosition();
    }
  }
  getcolor(element, key) {
    let color = "";
    element.forEach((value) => {
      if (value.id === key) {
        color = value.value;
      }
    });
    return color;
  }

  flipClockScriptCalled = () => {
    const { endDateTime, timeZone } = this.state;
    var time = `"${new Date(endDateTime)}"`;

    if(document.getElementById('flipclock-1')) {
      window.FlipClock({ endDate: new Date(time), timeZone : timeZone}); 
    }

    if(document.querySelector('.circular_timer')) {
      window.CircularTimer(new Date(time), timeZone);
    }
  }

  render() {
    const { toolData, onClose, templates, toolId, items } = this.props;
    const { layout } = toolData;
    let { template } = toolData;
    if (toolId === 22) template = template + 10;

    return (
      <Portal defaultOpen={true} closeOnEsc={true} closeOnOutsideClick={true}>
        {layout === 0 ? <HelloBar onClose={onClose} {...toolData} ps={templates[template]} /> : null}
        {layout === 1 ? <HelloBarTimer onClose={onClose} {...toolData} ps={templates[template]} /> : null}
        {layout === 2 ? <ExitIntent onClose={onClose} {...toolData} ps={templates[template]} /> : null}
        {layout === 3 ? <CentralTimer onClose={onClose} {...toolData} ps={templates[template]} /> : null}
        {layout === 4 ? <DynamicElement onClose={onClose} {...toolData} items={items} ps={templates[template]}/> : null}
        {layout === 5 ? <HelloBarWithOptin onClose={onClose} {...toolData} ps={templates[template]}/> : null}
        {layout === 6 ? <HelloBarTimerWithOptin onClose={onClose} {...toolData} ps={templates[template]}/> : null}
        {layout === 7 ? <ExitIntentWithOptin onClose={onClose} {...toolData} ps={templates[template]}/> : null}
      </Portal>
    );
  }
}

const HelloBar = function (props) {
  const { ps, logo, cta, text, subTitle } = props;
  const newLogo = parseImgUrl(logo);  
  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");
  let replaced = replaceItemByObj(bb, { MCKTEXT: text, MCKCTA: cta, MCKSUBTITLE: subTitle, MCKLOGO: newLogo });
  return <div className={"mck_clubPos-bottom mck_club_parent"} onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
};

const HelloBarTimer = function (props) {
  const { ps, logo, cta, text, subTitle, noThanks, endDateTime } = props;
  const newLogo = parseImgUrl(logo);
  const timer = `<div class="MCK_CLUB_CLOCK"><div class="hellobartimer3-timer timerClassdefault"><li data-label="Days">00<span>Days</span></li><li data-label="Hours">03<span>Hours</span></li><li data-label="Minutes">55<span>Minutes</span></li><li data-label="Seconds">41<span>Seconds</span></li></div></div>`;
  
  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");

  let replaced = replaceItemByObj(bb, { 
    MCKTEXT: text, 
    MCKCTA: cta, 
    MCKSUBTITLE: subTitle, 
    MCKLOGO: newLogo, 
    MCKTIMER: timer, 
    MCKNOTHANKS: noThanks
  });
  return <div className={"mck_clubPos-bottom mck_club_parent"} onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
};

const ExitIntent = function (props) {
  const { ps, logo, cta, noThanks, subTitle, text, endDateTime } = props;
  const newLogo = parseImgUrl(logo);
  const timer = `<div class="MCK_CLUB_CLOCK"><div class="hellobartimer3-timer timerClassdefault"><li data-label="Days">00<span>Days</span></li><li data-label="Hours">03<span>Hours</span></li><li data-label="Minutes">55<span>Minutes</span></li><li data-label="Seconds">41<span>Seconds</span></li></div></div>`;
  
  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");

  let replaced = replaceItemByObj(bb, {
    MCKTEXT: text,
    MCKTEXT1: text,
    MCKCTA: cta,
    MCKSUBTITLE: subTitle,
    MCKSUBTITLE1: subTitle,
    MCKIMAGELOGO: newLogo,
    MCKTIMER: timer,
    MCKNOTHANKS: noThanks,
  });
  return <div className="mck_club_parent" onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
};

const CentralTimer = function (props) {
  const { ps, template, timeZone, endDateTime } = props;
  const timer = `<div class="MCK_CLUB_CLOCK"><div class="timerClassdefault"><li data-label="Days">00<span>Days</span></li><li data-label="Hours">03<span>Hours</span></li><li data-label="Minutes">55<span>Minutes</span></li><li data-label="Seconds">41<span>Seconds</span></li></div></div>`;
  
  let replaced = replaceItemByObj(ps, { 
    MCKTIMER: timer
  });

  return ( 
    <div className="mck_club_parent mckclub_exitIntent" onClick={(e) => props.onClose(e, "close")}  dangerouslySetInnerHTML={{ __html: replaced }}></div> 
  )
}

const DynamicElement = function (props) {
  const { ps, items } = props;

  return <div className="mck_club_parent" onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: ps }}></div>;
}

const HelloBarWithOptin = function (props) {
  const { ps, logo, cta, subTitle, text } = props;
  const newLogo = parseImgUrl(logo); 
  
  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");

  let replaced = replaceItemByObj(bb, {
    MCKTEXT: text,
    MCKCTA: cta,
    MCKSUBTITLE: subTitle,
    MCKIMAGELOGO: newLogo,
  });

  return <div className="mck_club_parent" onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
}

const HelloBarTimerWithOptin = function (props) {
  const { ps, logo, cta, noThanks, subTitle, text, endDateTime } = props;
  const newLogo = parseImgUrl(logo); 
  const timer = `<div class="MCK_CLUB_CLOCK"><div class="timerClassdefault"><li data-label="Days">00<span>Days</span></li><li data-label="Hours">03<span>Hours</span></li><li data-label="Minutes">55<span>Minutes</span></li><li data-label="Seconds">41<span>Seconds</span></li></div></div>`;

  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");

  let replaced = replaceItemByObj(bb, {
    MCKTEXT: text,
    MCKCTA: cta,
    MCKSUBTITLE: subTitle,
    MCKIMAGELOGO: newLogo,
    MCKTIMER: timer
  });

  return <div className="mck_club_parent" onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
}

const ExitIntentWithOptin = function (props) {
  const { ps, logo, cta, noThanks, subTitle, text, endDateTime } = props;
  const newLogo = parseImgUrl(logo);
  const timer = `<div class="MCK_CLUB_CLOCK"><div class="timerClassdefault"><li data-label="Days">00<span>Days</span></li><li data-label="Hours">03<span>Hours</span></li><li data-label="Minutes">55<span>Minutes</span></li><li data-label="Seconds">41<span>Seconds</span></li></div></div>`;

  let str = `${ps}`;
  let bb = str.replace(`onclick="toggleclub();"`, "");

  let replaced = replaceItemByObj(bb, {
    MCKTEXT: text,
    MCKTEXT1: text,
    MCKCTA: cta,
    MCKSUBTITLE: subTitle,
    MCKSUBTITLE1: subTitle,
    MCKIMAGELOGO: newLogo,
    MCKTIMER: timer
  });

  return <div className="mck_club_parent" onClick={(e) => props.onClose(e, "close")} dangerouslySetInnerHTML={{ __html: replaced }}></div>;
}


function getStyle(layout, isTop) {
  if (layout === 2) return { position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "#fff" };
  if (!isTop) return { position: "fixed", top: "0px", left: "0px", width: "100%" };
  return { position: "fixed", bottom: "0px", left: "0px", width: "100%" };
}

function replaceItemByObj(str = "", obj) {
  var keys = Object.keys(obj);
  keys.forEach((e) => {
    str = str.replace(e, obj[e]);
  });
  return str;
}
