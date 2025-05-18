var me = {};
me.avatar = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg";
var you = {};
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function getItemFromUrl(attr) {
  var items = document.getElementsByName("CHATBOT")[0];
  return items.getAttribute(attr);
}

function sendChats(text) {
  var campId = getItemFromUrl("campId");
  var userId = getItemFromUrl("userId");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var resp = JSON.parse(xmlhttp.response);
      insertChat(false, resp.text, new Date());
    }
  };
  var url = "http://localhost:3002/chatbot/get/";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");

  xmlhttp.send(JSON.stringify({ text: text, campId: campId, userId: userId }));
}

var bgColor = getItemFromUrl("bgColor");
var fontColor = getItemFromUrl("fontColor");
var titleBg = getItemFromUrl("titleBg");
var titleColor = getItemFromUrl("titleColor");
var botTitle = getItemFromUrl("botTitle");
you.avatar = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg";
var chatBootElement =
  '<div class="chatbootButton" style="background:' +
  titleBg +
  ";color:" +
  titleColor +
  ';" onclick="hideShowChatBoot()">' +
  botTitle +
  '</div><div id="chatBootMainElement_123"  class="col-sm-offset-4 frame"><ul style="background:' +
  bgColor +
  ";color:" +
  fontColor +
  ';" id="chatBootElement_123"></ul><div style="background:' +
  bgColor +
  ";color:" +
  fontColor +
  ';"><div class="msj-rta macro"><div class="text text-r" style="background:whitesmoke !important"><input class="mytext" id="chatBootInput_123" onkeypress="chatBootKeyUp(event)" placeholder="Type a message"/></div></div><div style="padding:10px;"><span class="glyphicon glyphicon-share-alt"></span></div></div></div>';
var chatBootStyle =
  ".chatbootButton{background:#000;height:40px;width:100%;padding-top: 10px;padding-left: 10px; font-weight: 800;}.mytext{border:0;padding:10px;background:#f5f5f5}.text{width:75%;display:flex;flex-direction:column}.text>p:first-of-type{width:100%;margin-top:0;margin-bottom:auto;line-height:13px;font-size:12px !important}.text>p:last-of-type{width:100%;text-align:right;color:silver;margin-bottom:-7px;margin-top:auto}.text-l{float:left;padding-right:10px}.text-r{float:right;padding-left:10px}.avatar{display:flex;justify-content:center;align-items:center;width:25%;float:left;padding-right:10px}.macro{margin-top:5px;width:85%;border-radius:5px;padding:5px;display:flex}.msj-rta{float:right;background:#f5f5f5}.msj{float:left;background:#fff}.frame{background: #e0e0de;height: 287px;width: 300px;padding: 0;position: relative;}.frame>div:last-of-type{position:absolute;bottom:0;width:100%;display:flex} .frame > ul{width:100%;list-style-type:none;padding:18px;position:absolute;bottom:40px;display:flex;flex-direction:column;top:0;overflow-y:auto}.msj:before{width:0;height:0;top:-5px;left:-14px;position:relative;border-style:solid;border-width:0 13px 13px 0;border-color:transparent #fff transparent transparent}.msj-rta:after{width:0;height:0;top:-5px;left:14px;position:relative;border-style:solid;border-width:13px 13px 0 0;border-color:#f5f5f5 transparent transparent transparent}input:focus{outline:0}::-webkit-input-placeholder{color:#d4d4d4}::-moz-placeholder{color:#d4d4d4}:-ms-input-placeholder{color:#d4d4d4}:-moz-placeholder{color:#d4d4d4}";
var chatBootScript = "";
function chatBootKeyUp(e) {
  var keyCode = event.which || event.keyCode;
  if (keyCode == 13) {
    var text = e.target.value;
    insertChat(true, text, formatAMPM(new Date()));
  }
}
var show = true;
function hideShowChatBoot() {
  var element = document.getElementById("chatBootMainElement_123");
  if (show) {
    element.style = "height:0px;";
    element.children[1].style = "height:inherit;";
    show = false;
  } else {
    element.style = "";
    element.children[1].style = "";
    show = true;
  }
}
function insertChat(isReply, text, time) {
  if (text == "" || text == null) return;
  if (time === undefined) {
    time = 0;
  }
  var control = "";
  var date = formatAMPM(new Date());
  if (!isReply) {
    control =
      '<li style="width:100%;font-size:12px !important;">' +
      '<div class="msj macro">' +
      '<div class="avatar"><img class="img-circle" style="width:100%;" src="' +
      me.avatar +
      '" /></div>' +
      '<div class="text text-l">' +
      '<p style="font-size:12px !important;">' +
      text +
      "</p>" +
      '<p style="font-size:12px !important;"><small>' +
      date +
      "</small></p>" +
      "</div>" +
      "</div>" +
      "</li>";
  } else {
    control =
      '<li style="width:100%; font-size:12px !important;">' +
      '<div class="msj-rta macro">' +
      '<div class="text text-r">' +
      '<p style="font-size:12px !important;">' +
      text +
      "</p>" +
      '<p style="font-size:12px !important;"><small>' +
      date +
      "</small></p>" +
      "</div>" +
      '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' +
      you.avatar +
      '" /></div>' +
      "</li>";
    sendChats(text);
  }
  var ul = document.getElementById("chatBootElement_123");
  ul.innerHTML = ul.innerHTML + control;
  document.getElementById("chatBootInput_123").value = "";
}

function setUpChatBoot() {
  var mainBody = document.createElement("div");
  mainBody.style = "position:fixed;bottom:10px;right:25px;";
  mainBody.innerHTML = chatBootElement;
  var botStyle = document.createElement("style");
  botStyle.innerHTML = chatBootStyle;
  document.getElementsByTagName("body")[0].appendChild(mainBody);
  document.getElementsByTagName("body")[0].appendChild(botStyle);
  insertChat(false, "Hello , ", formatAMPM(new Date()));
}
setUpChatBoot();
