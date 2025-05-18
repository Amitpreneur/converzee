function mck_getAllParms(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  console.log(params);
  return params;
}
function mck_bonusSetup() {
  var urlObj = mck_getAllParms(window.location.search);
  var styleElement = document.createElement("style");
  styleElement.innerHTML =
    ".mck_row{display: flex; text-align: center; display: inline-flex; width: 100%; padding: 0px; align-items: center;}.mck_col-itme{width: 100%;position: relative;}.mck_img{max-width: 100%;height: auto;max-height: 100px;right: 0;padding-left: 50%;}";
  var headerElement = document.createElement("div");
  headerElement.classList.add("mck_row");
  headerElement.style = "min-height: 70px; background-color:#" + urlObj.color + ";";
  headerElement.innerHTML =
    '<div class="mck_col-itme"><img class="mck_img" src="https://d257yxqteot439.cloudfront.net/static/contains/' + urlObj.logoID + '"/></div><div class="mck_col-itme">' + urlObj.name + "</div>";
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(styleElement);
  var body = document.getElementsByTagName("body")[0];
  body.insertBefore(headerElement, body.childNodes[0]);

  var mckBuyButton = document.getElementById("MCK_BUYBUTTON");
  if (mckBuyButton) {
    mckBuyButton.addEventListener("click", mck_buyButtonClick);
  }
}
function mck_buyButtonClick() {
  console.log("BUYBUTTONCLICK");
}
mck_bonusSetup();
