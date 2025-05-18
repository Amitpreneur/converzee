 import {
  TABMESSAGING,
  URGENCY,
  HELLOBARTIMER,
  HELLOBAR,
  IMAGEPOPUP,
  VIDEOPOPUP,
  CENTRALTIMER,
  GEOREDIRECTION,
  BREAKEVENCALCULATOR,
  EXITINTENT,
  MOBILEVIBRATOR,
  EMAIL_INTRIGATION,
  IMAGE_OPTIOMAZTION,
  DYNEMICELEMENT,
  OFFERIFRAME,
  BACKBUTTONREDIRECTION,
  CHATBOT,
  EMAIL_BUILDER,
  THIRD_PARTY,
  OPTIN_FORM,
  CLUB,
  REVIEW_ENGIN,
  INPUT_FORM,
  SPECIAL_OPTIN_FORM,
  HELLOBAROPTIN_FORM,
  HELLOBARTIMEROPTIN_FORM,
  EXITINTENTOPTIN_FORM,
  AUTO_PLAY_VIDEO,
  PROOF_APP
} from "./Routes";

import _, { first } from "lodash";
import RequestHandler from "../actions/RequestHandler";
import { GET_TOOL_PERMISSION, TEMPLATES, AUTO_RESPONDER_TEST, getPath } from "../actions/URLs";
import { Request } from "../components/auth/authHandler";

export default class ToolUtil {
  static CURRENT_TOOL = "";
  static toolsToItemIdMap = new Map();
  static isUpgrade1 = false;
  static isUpgrade2 = false;
  static isUpgrade3 = false;
  static isVipBonus = false;
  static toolsAccess = null;
  static isSubuser = null;
  static parent = null;
  static linksList = null;
  static autoResponder = null;
  static host = "";
  static domainLimit = 0;
  static setToolsToItemIdMap = function () {
    const items = new Map();
    items.set(1, { name: "Tab Messaging", img: "asset/toolIcon/tabmessaging.png", url: TABMESSAGING });
    items.set(2, { name: "Urgency Timer", img: "asset/toolIcon/urgencytimer.png", url: URGENCY });
    items.set(5, { name: "Video Popup", img: "asset/toolIcon/videopopup.png", url: VIDEOPOPUP });
    items.set(6, { name: "Central Timer", img: "asset/toolIcon/centraltime.png", url: CENTRALTIMER });
    items.set(7, { name: "Geo Redirection", img: "asset/toolIcon/georedirection.png", url: GEOREDIRECTION });
    items.set(3, { name: "HELLO BAR", img: "asset/toolIcon/hellobar.png", url: HELLOBAR });
    items.set(4, { name: "Image Popup", img: "asset/toolIcon/imagepopup.png", url: IMAGEPOPUP });

    // items.set(8, { name: "Break-Even Calculator", img: "asset/toolIcon/calculator.png", url: BREAKEVENCALCULATOR });
    items.set(9, { name: "Exit Intent", img: "asset/toolIcon/exitintent.png", url: EXITINTENT });
    items.set(10, { name: "Mobile Vibrator", img: "asset/toolIcon/mobilevibrator.png", url: MOBILEVIBRATOR });
    // items.set(11, { name: "Email Integration", img: "asset/toolIcon/emailintegration.png", url: EMAIL_INTRIGATION });
    // items.set(12, { name: "Image Optimization", img: "asset/toolIcon/imageoptimization.png", url: IMAGE_OPTIOMAZTION });
    items.set(13, { name: "Dynamic Elements", img: "asset/toolIcon/dynamicelements.png", url: DYNEMICELEMENT });
    items.set(14, { name: "Offer iframe", img: "asset/toolIcon/offeriframe.png", url: OFFERIFRAME });
    items.set(15, { name: "Back Button Redirection", img: "asset/toolIcon/backbuttonredirection.png", url: BACKBUTTONREDIRECTION });
    // items.set(16, { name: "Landing Page protection", img: "asset/toolIcon/landingpageprotection.png", url:  });
    items.set(17, { name: "HELLO BAR + Timer", img: "asset/toolIcon/hellobartimer.png", url: HELLOBARTIMER });
    items.set(8, { name: "Optin forms", img: "asset/icon/hellobartimer.png", url: INPUT_FORM });
    items.set(18, { name: "Run campaign on third party site", img: "asset/toolIcon/hellobartimer.png", url: THIRD_PARTY });
    // items.set(18, { name: "ChatBot", img: "asset/icon/hellobartimer.png", url: CHATBOT });
    items.set(19, { name: "Optin forms", img: "asset/toolIcon/hellobartimerwithoptin.png", url: OPTIN_FORM });
    items.set(20, { name: "Template Club", img: "asset/toolIcon/urgencytimer.png", url: CLUB });
    // items.set(22, { name: "Template Club", img: "asset/toolIcon/urgencytimer.png", url: CLUB });
    items.set(21, { name: "Review Engine", img: "asset/toolIcon/review_engine.png", url: REVIEW_ENGIN });
    items.set(23, { name: "Special Optin forms", img: "asset/icon/hellobartimer.png", url: SPECIAL_OPTIN_FORM });
    items.set(24, { name: "Auto Play Video", img: "asset/toolIcon/Autoplay-01.png", url: AUTO_PLAY_VIDEO });
    items.set(25, { name: "Proof App", img: "asset/toolIcon/Proof-App.png", url: PROOF_APP });
    ToolUtil.toolsToItemIdMap = items;
  };
  static getToolData = function (key) {
    if (!key || !ToolUtil.toolsToItemIdMap.has(key)) {
      return {};
    }
    return ToolUtil.toolsToItemIdMap.get(key);
  };

  static getTool = function (key) {
    if (!key || !ToolUtil.toolsToItemIdMap.has(key)) {
      return "";
    }
    return ToolUtil.toolsToItemIdMap.get(key).name;
  };
  static getImg = function (key = 1) {
    if (!key) {
      return "";
    }
    if(ToolUtil.toolsToItemIdMap.get(key)){
      return ToolUtil.toolsToItemIdMap.get(key).img;
    }
  };

  static getToolByName = function (name) {
    const keys = ToolUtil.toolsToItemIdMap.keys();
    let key = 0;
    keys.forEach((element) => {
      if (ToolUtil.toolsToItemIdMap.get(element).name == name) key = element;
    });
    return key;
  };

  static getImgByName = function (name) {
    const key = ToolUtil.getToolByName(name);
    if (key !== 0) {
      return ToolUtil.getImg(key);
    }
  };

  static getToolsOptions = function () {
    const keys = Array.from(ToolUtil.toolsToItemIdMap.keys());
    const toolsOptions = [];
    keys.forEach((element) => {
      toolsOptions.push({ id: element, name: ToolUtil.toolsToItemIdMap.get(element).name });
    });
    return toolsOptions;
  };

  static toolsToAccess = null;
  static isResponsed = false;
}

export function generateIframeContant(url = "", title = "", pixel = "") {
  return (
    `<html>

  <head>

    <title>` +
    title +
    `</title>

    <style>

      * {

        margin: 0;

        padding: 0;

      }

      body {

        margin: 0;

        padding: 0;

      }

    </style>

  </head>

  <body>

    <iframe src="` +
    url +
    `" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">

      <p>Click <a href="` +
    url +
    `">here</a>! (Your browser does not support iframes)</p>

    </iframe>

  </body>
      ` +
    pixel +
    `
</html>`
  );
}

export const resetToolAccess = (cb) => {
  RequestHandler.PostRequest(GET_TOOL_PERMISSION, {}, function (res, err) {
    if (res) {
      if (res.status == 205) {
        cb(null, "Error");
        return;
      } else {
        if (res) {
          const data = res.data;
          const obj = { keys: data.keys, consumeLicence: data.consumeLicence };
          ToolUtil.toolsAccess = Object.assign(ToolUtil.toolsAccess, { keys: data.keys, consumeLicence: data.consumeLicence });
          cb(obj, null);
        }
      }
    }
  });
};

export const getToolsPermission = function (cb) {
  if(Request.getAuth()) {
    if (ToolUtil.toolsAccess && ToolUtil.isResponsed) {
      const temp = ToolUtil.toolsAccess;
      const obj = { access: temp.access, keys: temp.keys, consumeLicence: temp.consumeLicence, tools: temp.tools, totallicence: temp.totallicence};
      cb(obj, null);
    } else {
      RequestHandler.PostRequest(GET_TOOL_PERMISSION, {}, function (res, err) {
        try {
          if (res) {
            if (res.status == 205) {
              cb(null, "Error");
            } else {
              if (res) {
                const data = res.data;
                const obj = { access: data.access, tools: data.tools, keys: data.keys, consumeLicence: data.consumeLicence, totallicence: data.totallicence };
                ToolUtil.toolsAccess = obj;
                ToolUtil.isResponsed = true;
                ToolUtil.isUpgrade1 = data.isUpgrade1;
                ToolUtil.isUpgrade2 = data.isUpgrade2;
                ToolUtil.isUpgrade3 = data.isUpgrade3;
                ToolUtil.isVipBonus = data.vipBonus;
                ToolUtil.host = data.host;
                ToolUtil.autoResponder = data.autoResponder;
                ToolUtil.domainLimit = data.domainLimit;
                ToolUtil.createdAt = data.createdAt;
                ToolUtil.isSubuser = data.isSubuser;
                ToolUtil.parent = data.parent;
                ToolUtil.linksList = data.linkList;
                window.userName = data.userName;
                window.email = data.email;
                window.isUpgrade1 = data.isUpgrade1;
                window.isUpgrade2 = data.isUpgrade2;
                window.isUpgrade3 = data.isUpgrade3;
                window.access = data.access;
                window.isSubuser = data.isSubuser;
                window.isDeveloperAccess = data.isDeveloperAccess;
                window.isAdvancedOpt = data.isAdvancedOpt; 
                cb(obj, null);
              } else {
                ToolUtil.isResponsed = false;
                cb(null, "Error");
              }
            }
          } else {
            cb(null, "Premission Issue");
          }
        } catch (e) {
          cb(null, "Premission Issue");
        }
      });
    }
  }
};

export const createBonusContent = function (title = "", url = "", logo = "", sideImage = "", bg = "#000", footer = "", logoID) {
  const itemColor = bg.replace("#", "");
  return (
    "<!DOCTYPE html><html><head><title>" +
    title +
    '</title><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/></head><body><style>.mck_row1{display: flex; text-align: center;background-color: #f7f7f7;display: inline-flex;width: 100%;padding: 0px;}.mck_row{display: block;}.mckCol{position: relative; width: 100%; min-height: 1px; text-align: center;}.inputBox{height: 30px; margin: 5px; padding: 5px; width: 65%; border: 1px solid gray;}.genButton{height: 30px; margin: 8px; padding: 5px; padding-top: 16px; width: 50%; font-size: 18px; background: #ffae00; color: #fff; cursor: pointer;}.mckima_sm{} .mck-imgDiv{height: auto;width: 310px;position: absolute;right: 0px;}@media (max-width: 576px){.mckima_sm{display: none;}}.mckimg-fluid {max-width: 100%;height: auto;}.mck_logo{width: 100px;}</style><script type="text/javascript">var target="' +
    url +
    '";var logoID = "' +
    logoID +
    '";var mckColor = "' +
    itemColor +
    '";function onpageGenClick(){var name=document.getElementById("name").value; var affID=document.getElementById("affID").value; var url=`${target}?name=${name}&affID=${affID}&logoID=${logoID}&color=${mckColor}` ;window.open(url, "_blank");}</script><div style="background-color: #fff;"><div class="mck_row" style="text-align: center;padding: 10px;background-color: ' +
    bg +
    ';"><center><div class="mck_logo"><img class="mckimg-fluid"  src="' +
    ToolUtil.host +
    "/static/contains/" +
    logo +
    '"/></div></center></div><div class="mck_row" style="text-align: center;padding: 10px;"><h3>Bonus page Generator</h3><h5>Generate your bonus page below...</h5></div><div class="mck_row1"><div class="mckCol mckima_sm"><div class="mck-imgDiv"><img class="mckimg-fluid" src="' +
    ToolUtil.host +
    "/static/contains/" +
    sideImage +
    '"/></div></div><div class="mckCol"> <h4>Boost Conversions!</h4> <div><input class="inputBox" placeholder="Name" id="name"/></div><div><input class="inputBox" placeholder="Affilate Id" id="affID"/></div><div><center><div class="genButton" onclick="onpageGenClick();">Generate Page</div></center></div></div></div><div class="mck_row" style="text-align: center;padding: 10px;background-color: ' +
    bg +
    ';">' +
    footer +
    "</div></div></body></html>"
  );
};

export const getTemplates = (typ, cb) => {
  RequestHandler.PostRequest(TEMPLATES + typ, {}, (res, err) => {
    if (res) {
      cb(res.data.data);
    } else {
      cb({});
    }
  });
};

export const TestAutoResponder = function (uid, apiKey, cb) {
  RequestHandler.PostRequest(AUTO_RESPONDER_TEST, { userData: { uid, apiKey } }, (res, err) => {
    if (res) {
      const data = res.data;
      if (data.error) {
        const err = data.urlKeys;
        cb(false);
        window.gs.showErrorWithHtml({ error: err.title, urlKeys: err });
      } else {
        cb(true);
      }
    } else {
      cb(false);
      window.gs.success(false, "Something went wrong");
    }
  });
};

export const getCodeOptions = function () {
  const isDisable = ToolUtil.isUpgrade1 ? false : true;
  return [
    { label: "Exact", value: "exact", disable: isDisable },
    { label: "Contains", value: "contains" },
  ];
};

export const getDefaultItems = function (key) {
  switch (key) {
    case 1:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',

        style: [
          { name: "Background", id: "backgound", value: "#014a81" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
        ],
      };
      break;
    case 2:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',

        style: [
          { name: "Background", id: "backgound", value: "#070336" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ffa800" },
        ],
      };
      break;
    case 3:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',

        style: [
          { name: "Background", id: "backgound", value: "#cd075e" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ffe401" },
        ],
      };
      break;
    case 4:
      return {
        text: '<span style="font-size: 36px;"><font color="#000">Converzee</font></span>',
        subTitle: '<span style="font-size: 18px;"><font color="#636363">Subtitle here</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',
        style: [
          { name: "Background", id: "backgound", value: "#e9a431" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#4a4a4a" },
        ],
        noThanks: '<font color="#636363">No thanks</font>',
      };
      break;
    case 6:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',
        style: [
          { name: "Background", id: "backgound", value: "#014a81" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
        ],
      };
      break;
    case 7:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',
        style: [
          { name: "Background", id: "backgound", value: "#014a81" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
        ],
      };
      break;
    case 8:
      return {
        text: '<span style="font-size: 36px;"><font color="#ff9c00">Converzee</font></span>',
        cta: '<font color="#000"><span style="font-size: 18px;">Buy Now</span></font>',
        style: [
          { name: "Background", id: "backgound", value: "#014a81" },
          { name: "CTA Backgound", id: "ctabackgound", value: "#ff3a65" },
        ],
      };
      break;
    default:
      break;
  }
};

export const clubTemplate = function (key, toolId) {
  let prefix = "asset/hb/hb";
  if (key == 1) prefix = "asset/hbt/hbt";
  if (key == 2) prefix = "asset/exit/";
  if (key == 3) prefix = "asset/ct/c_timer";
  if (key == 4) prefix = "asset/de/";
  if (key == 5) prefix = "asset/optin/hb/";
  if (key == 6) prefix = "asset/optin/hbt/";
  if (key == 7) prefix = "asset/optin/exit/";
  const arr = [];
  if (toolId !== 22) {
    /* let templateLength = (key == 2 ) ? 21 : 11;  */
      if( key == 2 ) {
        for (let i = 1; i < 24; i++) {
          arr.push(prefix + i + ".PNG");
        }  
      } else if( key == 3 || key == 5 || key == 6 || key == 7 ){ 
        let length = key == 3 ? 30 : 25;
        for (let i = 1; i < length; i++) {
          arr.push(prefix + i + ".PNG");
        }
      } else if( key == 4 ){
        for (let i = 1; i < 17; i++) {
          arr.push(prefix + i + ".png");
        }
      } else {
        for (let i = 1; i < 35; i++) {
          arr.push(prefix + i + ".PNG");
        }
      }
  } else if (toolId === 23) {
    for (let i = 1; i < 11; i++) {
      arr.push(prefix + i + ".PNG");
    }
  } else {
    for (let i = 11; i < 16; i++) {
      arr.push(prefix + i + ".PNG");
    }
  }
  return arr;
};

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";
      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
}

export const exportCSVFile = function (items, fileTitle) {
  var headers = {
    email: "Email",
    name: "Name",
  };
  items.unshift(headers);
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + ".csv" || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
