const ToolUtil = new Object();
const HOSTURL = process.env.HOSTURL;
const getItem = require("../template");
// KEYS : === include || exclude
ToolUtil.getCODE = function (CODE, KEY = "include") {
  const data = new Array();
  if (CODE) {
    if (KEY === "include" && CODE.include.length) {
      CODE.include.forEach((element) => {
        let str = element.type + "";
        data.push({ type: str.toUpperCase(), data: element.url });
        // data.push({ type: "CONTAINS", data: element });
      });
    } else if (CODE.exclude.length) {
      CODE.exclude.forEach((element) => {
        let str = element.type + "";
        data.push({ type: str.toUpperCase(), data: element.url });
        // data.push({ type: "CONTAINS", data: element });
      });
    }
  }
  return data;
};

ToolUtil.getAllInclude = function (CODE, popup_condition, id) {
  if (CODE) {
    CODE.include.forEach((element) => {
      if (element.type === "contains") popup_condition.contains.push({ campid: id, check: element.url });
      else popup_condition.exact.push({ campid: id, check: element.url });
    });
  }
};

ToolUtil.getAllExclude = function (CODE, exclude_conditions, id) {
  if (CODE) {
    CODE.exclude.forEach((element) => {
      if (element.type === "contains") exclude_conditions.contains.push({ campid: id, check: element.url });
      else exclude_conditions.exact.push({ campid: id, check: element.url });
      // exclude_conditions.contains.push({ campid: id, check: element });
    });
  }
};

ToolUtil.getDomains = function (data, domains) {
  data.websites.push(...domains.domains);
};

const ToolsData = new Map();
ToolsData.set(1, { element_name: "tab_message" });
ToolsData.set(2, { element_name: "urgencyTimer" });
ToolsData.set(3, { element_name: "hellobar" });
ToolsData.set(4, { element_name: "image_popup" });
ToolsData.set(5, { element_name: "video_popup" });
ToolsData.set(6, { element_name: "timer" });
ToolsData.set(7, { element_name: "geoRedirection" });
ToolsData.set(8, { element_name: "tab_message" });
ToolsData.set(9, { element_name: "exit_intent" });
ToolsData.set(10, { element_name: "mobile_vib" });
ToolsData.set(11, { element_name: "tab_message" });
ToolsData.set(12, { element_name: "tab_message" });
ToolsData.set(13, { element_name: "dynemic_element" });
ToolsData.set(14, { element_name: "tab_message" });
ToolsData.set(15, { element_name: "window_back" });
ToolsData.set(17, { element_name: "hellobar_timer" });
ToolsData.set(18, { element_name: "chatbot" });
ToolsData.set(19, { element_name: "optinForm" });
ToolsData.set(20, { element_name: "club" });
ToolsData.set(22, { element_name: "club" });
ToolsData.set(21, { element_name: "reviewEngin" });
ToolsData.set(24, { element_name: "autoplay_video" });
ToolsData.set(25, { element_name: "proof_app" });

ToolUtil.getToolElementName = function (key) {
  if (ToolsData.has(key)) {
    return ToolsData.get(key).element_name;
  }
  return key;
};

ToolUtil.getToolData = function (tool) {
  switch (tool.toolId) {
    case 1:
      return tabMessage(tool);
      break;
    case 2:
      return urgencyTimer(tool);
      break;
    case 3:
      return helloBar(tool);
      break;
    case 4:
      return imagePopUp(tool);
      break;
    case 5:
      return video_Popup(tool);
      break;
    case 6:
      return timer(tool);
      break;
    case 7:
      return geo_Redirection(tool);
      break;
    case 8:
      return {}; // tabMessage(tool);
      break;
    case 9:
      return exitIntent(tool);
      break;
    case 10:
      return mobile_vib(tool); //tabMessage(tool);
      break;
    case 11:
      return {}; //tabMessage(tool);
      break;
    case 12:
      return {}; //tabMessage(tool);
      break;
    case 13:
      return dynemicElements(tool);
      break;
    case 14:
      return {}; //tabMessage(tool);
      break;
    case 15:
      return window_back(tool);
      break;
    case 17:
      return helloBarTimer(tool);
      break;
    case 18:
      return chatBot(tool);
      break;
    case 19:
      return optinForm(tool);
      break;
    case 20:
      return club(tool);
      break;
    case 22:
      return club(tool);
      break;
    case 21:
      return reviewEngin(tool);
    case 23:
      return optinForm(tool);
      break;
    case 24:
      return autoplayVideo(tool);
      break;
    case 25:
      return proofApp(tool);
      break;
    default:
      break;
  }
};

function getColorElement(elements, key) {
  let color = "#fff";
  elements.forEach((value) => {
    if (value.name === key) {
      color = value.color;
    }
  });
  return color;
}

function getColor(elements, key) {
  let color = "#fff";
  elements.forEach((value) => {
    if (value.id === key) {
      color = value.value;
    }
  });
  return color;
}

function getTImerType(timer) {
  if (timer === "EVERGREEN") {
    return "evergreen";
  } else if (timer === "COOKIE_BASED") {
    return "cookie";
  } else {
    return "date";
  }
}

function getTimer(dateTime) {
  return new Date(dateTime).getTime(); //* 1000;
}

function getFileURL(url) {
  try {
    if (url.indexOf("http") != -1) {
      return url;
    } else {
      return HOSTURL + "/static/contains/" + url;
    }
  } catch (e) {
    return "";
  }
}

function convert_youtube(link) {
  return link.replace("http://www.youtube.com/watch?v=", "http://www.youtube.com/embed/");
}

function convert_vimeo(input) {
  var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(\S+)/g;
  if (pattern.test(input)) {
    var replacement = "player.vimeo.com/video/$1";
    var input = input.replace(pattern, replacement);
  }
  return input;
}

function videoUrl(input) {
  if (input.indexOf("youtube") > -1) {
    return convert_youtube(input);
  } else {
    return convert_vimeo(input);
  }
}

const tabMessage = function (tool) {
  const messages = [];
  const icon = tool.toolData ? (tool.toolData.isImage ? tool.toolData.FAVICON : tool.toolData.emoji) : null;
  if (tool.toolData.messages) {
    for (let index = 0; index < tool.toolData.messages.length; index++) {
      messages.push({ icon, text: tool.toolData.messages[index] });
    }
  }
  return { isImage: tool.toolData.isImage, messages, timeBeforeFirst: tool.toolData.timeFirstMsg, frequency: tool.toolData.timeBetweenTwoMsg, sound: tool.toolData.SOUND };
};
//IMage Popup

const imagePopUp = function (tool) {
  return {
    id: tool._id,
    image: getFileURL(tool.image),
  };
};

//Video Popup
const video_Popup = function (tool) {
  return {
    url: tool.video.url, //videoUrl(tool.video.url),
    taptext: "",
    width: "1100",
    height: "410",
    autoplay: tool.STYLE.switchElement ? "1" : "0",
    fullscreen: "0",
    video_type: tool.video.videoType,
    image: getFileURL(tool.image),
  };
};
//Timer
const timer = function (tool) {
  return {
    timerTemplate: "template" + tool.layout,
    timerType: getTImerType(tool.timer.timerType),
    endDateTime: tool.timer.endDateTime,
    timezone: tool.timer.timeZone,
    title: tool.TEXT.timerText,
    postExpiryAction: tool.timer.whenTimeExp,
    postExpiryRedirectUrl: (tool.timer.url ? tool.timer.url : ""),
    timerFontSize: tool.STYLE.timerFont,
    timerColor: getColorElement(tool.STYLE.elements, "centralTimer"),
    timerFont: "",
    titleFontSize: "",
    titleColor: "",
    titleFont: "",
    labelFontSize: tool.STYLE.timerLabelFont,
    labelColor: getColorElement(tool.STYLE.elements, "centralTimerLabel"),
    labelFont: "Quicksand",
    highlightFontSize: tool.STYLE.timerLabelFont,
    highlightColor: getColorElement(tool.STYLE.elements, "highlight"),
    highlightFont: "Quicksand",
    highlightBgColor: getColorElement(tool.STYLE.elements, "highlightBackground"),
    endTimeUTC: getTimer(tool.timer.endDateTime),
    days: tool.timer.DD,
    hours: tool.timer.HH,
    minutes: tool.timer.MM,
    seconds: tool.timer.SS,
  };
};

//Hello bar
const helloBar = function (tool) {
  return {
    templateType: 1, //tool.layout,
    template: tool.layout,
    text: tool.create.textBody,
    position: tool.create.helloBarPos,
    buttonText: tool.cta.ctaText,
    buttonAction: tool.cta.ctaAction,
    redirectUrl: (tool.cta.redirectUrl ? tool.cta.redirectUrl : ""),
    scrollTo: "",
    textFontSize: "",
    textColor: "",
    textFont: "",
    bgColor: getColorElement(tool.STYLE.elements, "highlight"),
    CTAColor: getColorElement(tool.STYLE.elements, "highlightCTA"),
    cpCode: tool.create.cpCode,
    codeText: tool.create.codeText,
    buttonTextFontSize: "",
    buttonTextColor: "",
    buttonTextFont: "Quicksand",
    buttonBgColor: "",
    highlightFontSize: "",
    highlightColor: "",
    highlightFont: "",
    highlightBgColor: "",
  };
};

//HelloBar Timer

const helloBarTimer = function (tool) {
  return {
    templateType: "template" + tool.layout,
    // template: tool.toolData.templateType,
    text: tool.create.textBody,
    position: tool.create.helloBarPos,
    buttonText: tool.cta.ctaText,
    buttonAction: tool.cta.ctaAction,
    redirectUrl: tool.cta.redirectUrl,
    scrollTo: "",
    timerTemplate: tool.layout === 3 ? "template1" : "template4", //"template1",
    timerType: getTImerType(tool.timer.timerType),
    endDateTime: "2018-09-24 01:30:00",
    timezone: tool.timer.timeZone,
    postExpiryAction: tool.timer.whenTimeExp,
    postExpiryRedirectUrl: tool.timer.redirectUrl,
    timerFontSize: "25",
    timerColor: "#ffffff",
    timerFont: "Roboto",
    labelFontSize: "10",
    labelColor: "#dcdcdc",
    labelFont: "Quicksand",
    textFontSize: "18",
    textColor: "#ffffff",
    textFont: "Quicksand",
    bgColor: getColorElement(tool.STYLE.elements, "highlight"),
    buttonTextFontSize: "",
    buttonTextColor: "",
    buttonTextFont: "Quicksand",
    buttonBgColor: "",
    highlightFontSize: "",
    highlightColor: "",
    highlightFont: "",
    highlightBgColor: getColorElement(tool.STYLE.elements, "highlightBackground"),
    endTimeUTC: getTimer(tool.timer.endDateTime),
    days: tool.timer.DD,
    hours: tool.timer.HH,
    minutes: tool.timer.MM,
    seconds: tool.timer.SS,
    cpCode: tool.create.cpCode,
    codeText: tool.create.codeText,
    barColor: getColorElement(tool.STYLE.elements, "arrowBackground") || "#fff",
    timerBox: getColorElement(tool.STYLE.elements, "timerBox"),
    timerTextColor: getColorElement(tool.STYLE.elements, "timerTextColor") || "#fff",
  };
};

const exitIntent = function (tool) {
  const toolData = tool.toolData;
  return {
    title: toolData.headline,
    subheading: toolData.subheadline,
    ctaText: toolData.ctaText,
    ctaBg: getColorElement(tool.STYLE.elements, "ctaBackgound"),
    ctaAction: toolData.ctaAction,
    url: (toolData.redirectUrl ? toolData.redirectUrl : ""),
    isimageBg: tool.STYLE.isbackGroundImage,
    backGround: tool.STYLE.isbackGroundImage ? getFileURL(tool.STYLE.backgroundImage) : getColorElement(tool.STYLE.elements, "popupBackgoundColor"),
    mediaType: toolData.mediaType,
    mediaURL: toolData.mediaType === "IMAGE" ? getFileURL(toolData.url) : toolData.url,
    height: tool.STYLE.height,
    width: tool.STYLE.width,
    nothanksText: toolData.noThanksText,
    isInput: toolData.isInput,
  };
};

//Back Window
const window_back = function (tool) {
  return {
    redirectUrl: tool.TEXT.redirectUrl,
  };
};

//Geo Redirection
const geo_Redirection = function (tool) {
  return {
    userId: tool._id,
    redirection: tool.redirection,
  };
};

//urgency Timer
const urgencyTimer = function (tool) {
  const timer = new Date();
  timer.setHours(timer.getHours() + parseInt(tool.TIMER.HH || 0));
  timer.setMinutes(timer.getMinutes() + parseInt(tool.TIMER.MM || 0));
  timer.setSeconds(timer.getSeconds() + parseInt(tool.TIMER.SS || 0));
  return {
    timer: timer,
    redirectUrl: (tool.TEXT.redirectUrl ? tool.TEXT.redirectUrl : ""),
    fontColor: getColorElement(tool.STYLE.elements, "timerText"),
    fontSize: tool.STYLE.timerFont,
    labelColor: getColorElement(tool.STYLE.elements, "centralTimerLabel"),
    labelSize: tool.STYLE.labelFont,
    postExpiryAction: "static",
    labelBold: tool.STYLE.labelBold || "200",
    timerBold: tool.STYLE.timerBold || "200",
  };
};

//Mobile Vib
const mobile_vib = function (tool) {
  return {
    id: tool._id,
    timerDuration: [tool.toolData.firstVib, tool.toolData.pause, tool.toolData.secondVib],
  };
};
//Dynemic ELement
const dynemicElements = function (tool) {
  let pos = tool.STYLE.position;
  // pos = pos === "TL" ? 0 : pos === "TR" ? 1 : pos === "BL" ? 2 : pos === "BR" ? 3 : 0;
  return {
    postion: pos,
    color: getColorElement(tool.STYLE.elements, "textColor"),
    bg: getColorElement(tool.STYLE.elements, "background"),
    items: tool.toolData.items,
    fontSize: tool.STYLE.fontSize + "px",
  };
};

const chatBot = function (tool) {
  return {
    titleBg: getColorElement(tool.STYLE.elements, "titleBg"),
    titleColor: getColorElement(tool.STYLE.elements, "titleColor"),
    fontColor: getColorElement(tool.STYLE.elements, "fontColor"),
    bgColor: getColorElement(tool.STYLE.elements, "backgroundColor"),
    botTitle: tool.chattitle,
  };
};

const optinForm = function (tool) {
  const toolData = tool.toolData;
  return {
    text: toolData.text,
    subtext: toolData.subTitle,
    ctaText: toolData.cta,
    ctaAction: toolData.ctaAction,
    ctaRedirectUrl: (toolData.ctaRedirectUrl ? toolData.ctaRedirectUrl : ""),
    template: toolData.template,
    isBGIMG: toolData.isBGIMG,
    bgImg: toolData.isBGIMG ? getFileURL(toolData.bgImg) : toolData.bgImg,
    noThanks: toolData.noThanks,
    layout: toolData.layout,
    bgColor: getColor(toolData.style, "backgound"),
    ctaBackgound: getColor(toolData.style, "ctabackgound"),
    position: toolData.position,
    endTimeUTC: getTimer(toolData.endDateTime),
    days: toolData.days,
    hours: toolData.hours,
    minutes: toolData.minutes,
    seconds: toolData.seconds,
    timerTemplate: "template3",
    timerType: getTImerType(toolData.timerType),
    endDateTime: toolData.endDateTime,
    timezone: tool.timeZone,
    postExpiryAction: toolData.postExpiryAction,
    timerFontSize: "25",
    timerColor: "#ffffff",
    timerFont: "Roboto",
    isNameInput: toolData.isNameInput,
    AutoResponder: tool.AutoResponder,
  };
};

const club = function (tool) {
  const toolData = tool.toolData;
  return {
    text: toolData.text,
    subtext: toolData.subTitle,
    ctaText: toolData.cta,
    ctaAction: toolData.ctaAction,
    ctaRedirectUrl: (toolData.ctaRedirectUrl ? toolData.ctaRedirectUrl : ""),
    logo: toolData.logo ? getFileURL(toolData.logo) : "",
    noThanks: toolData.noThanks,
    layout: toolData.layout,
    template: toolData.template,
    element: getItem(toolData.layout, toolData.template),
    items: tool.items,
    position: toolData.position,
    endTimeUTC: getTimer(toolData.endDateTime),
    days: toolData.days,
    hours: toolData.hours,
    minutes: toolData.minutes,
    seconds: toolData.seconds,
    scale: toolData.scale,
    timerTemplate: "template3",
    timerType: getTImerType(toolData.timerType),
    endDateTime: toolData.endDateTime,
    timezone: toolData.timeZone,
    postExpiryAction: toolData.postExpiryAction,
    postExpiryRedirectUrl: (toolData.redirectUrl ? toolData.redirectUrl : ""),
    timerFontSize: "25",
    timerColor: "#ffffff",
    timerFont: "Roboto",
    AutoResponder: tool.AutoResponder,
  };
};

const reviewEngin = function (tool) {
  const toolData = tool.toolData;
  return {
    bgColor: getColor(toolData.style, "backgound"),
    items: toolData.items,
    position: toolData.position,
  };
};

const autoplayVideo = function (tool) {
  const toolData = tool.toolData;
  return {
    text: toolData.text,
    image: tool.image ? getFileURL(tool.image) : tool.image,
    video: tool.video,
    icons: tool.icons
  };
};

const proofApp = function (tool) {
  const toolData = tool.toolData;
  return {
    text: toolData.text,
    subtext: toolData.subText,
    position: toolData.position,
    duration: toolData.duration,
    timeFirstUser: toolData.timeFirstUser,
    timeBetweenTwoUser: toolData.timeBetweenTwoUser,
    titleColor: getColorElement(tool.STYLE.elements, "titleColor"),
    subtitleColor: getColorElement(tool.STYLE.elements, "subtitleColor"),
    logoColor: getColorElement(tool.STYLE.elements, "logoColor")
  }
}

module.exports = ToolUtil;
