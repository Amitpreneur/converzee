var mck_clubElement = "";
var mck_clubData = {};
function setUpclub() {
  var clubID = window.mck_getElementdata("MCK_CLUB", "EID");
  window.mck_createStyle("clubCss", window.mck_rUrl + "/lib/club.css");
  mck_clubData = window.campaigns[clubID].element_data;
  if (mck_clubData) {
    console.log(mck_clubData);
    var script = document.createElement("script");
    var clubElement = "";
    if (mck_clubData.layout === 0) {
      var pos = "mck_club_TOP";
      if (mck_clubData.position !== "TOP") {
        pos = "mck_club_BOTTOM";
      }
      clubElement = replaceItemByObj(mck_clubData.element, { MCKCLUBCTAID: clubID, POSITION: pos, MCKTEXT: mck_clubData.text, MCKCTA: mck_clubData.ctaText, MCKLOGO: mck_clubData.logo });
    } else if (mck_clubData.layout === 1) {
      var pos = "mck_club_TOP";
      if (mck_clubData.position !== "TOP") {
        pos = "mck_club_BOTTOM";
      }
      clubElement = replaceItemByObj(mck_clubData.element, {
        MCKCLUBCTAID: clubID,
        POSITION: pos,
        MCKTEXT: mck_clubData.text,
        MCKCTA: mck_clubData.ctaText,
        MCKLOGO: mck_clubData.logo,
        MCKCAMPID: clubID,
      });
    } else {
      script.innerHTML =
        'var MCK_EXIT_CLUB = true;var EXIT_CLUB=document.querySelector(".");var trigger=document.querySelector(".trigger");var closeButton=document.querySelector(".mxk_exit_close");function toggleclub(){EXIT_CLUB.classList.toggle("hide_club")}function windowOnClick(event){if(event.target===EXIT_CLUB){toggleclub()}}';
      script.innerHTML =
        script.innerHTML +
        'function clubEvent(obj, evt, fn) {if (obj.addEventListener) {obj.addEventListener(evt, fn, false);} else if (obj.attachEvent) {obj.attachEvent("on" + evt, fn);}}clubEvent(window, "load", function(e) {clubEvent(document, "mouseout", function(e) {e = e ? e : window.event;var from = e.relatedTarget || e.toElement;if (!from || from.nodeName == "HTML") {if(MCK_EXIT_CLUB){toggleclub();MCK_EXIT_CLUB = false;}}});});';

      clubElement = replaceItemByObj(mck_clubData.element, {
        MCKCLUBCTAID: clubID,
        MCKTITLE: mck_clubData.text,
        MCKCTA: mck_clubData.ctaText,
        MCKSUBTITLE: mck_clubData.subtext,
        MCKIMAGELOGO: mck_clubData.logo,
        MCKNOTHANKS: mck_clubData.noThanks,
      });
    }

    var body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", clubElement);

    if (mck_clubData.layout === 1) {
      leadengagr.initClock(clubID);
    }
    if (mck_clubData.layout === 2) {
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }
  }
}
function onMCKClick(id) {
  var mck_tempData = window.campaigns[id].element_data;
  if (mck_tempData && mck_tempData.ctaAction) {
    if (mck_tempData.ctaAction === "redirect") {
      window.open(mck_tempData.redirectUrl);
    } else if (mck_tempData.ctaAction === "redirectInNewTab") {
      window.open(mck_tempData.redirectUrl, "_blank");
    } else {
      window.scrollTo(0, mck_tempData.redirectUrl);
    }
    if (toggleclub) {
      toggleclub();
    }
  }
}
function replaceItemByObj(str = "", obj) {
  var keys = Object.keys(obj);
  keys.forEach((e) => {
    str = str.replace(e, obj[e]);
  });
  return str;
}
setUpclub();
