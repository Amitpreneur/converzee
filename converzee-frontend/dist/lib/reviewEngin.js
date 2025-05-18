var mck_reviewEnginIDA = 0;
function setUpReviewEngin() {
  var mck_reviewEnginData = {};
  var reviewEnginID = window.mck_getElementdata("MCK_REVIEW_ENGIN", "EID");
  window.mck_createStyle("clubCss", window.mck_rUrl + "/lib/reviewEngin.css");
  mck_reviewEnginData = window.campaigns[reviewEnginID].element_data;
  if (mck_reviewEnginData) {
    var positon = mck_reviewEnginData.position == "left" ? "mck_reviewIcon_left" : "mck_reviewIcon_right";
    var mck_reviewEnginElement = '<div id="msgbox-area" class="reviewIcon ' + positon + ' mck_hideReview" style="background-color:' + mck_reviewEnginData.bgColor + ';" ></div>';
    var body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", mck_reviewEnginElement);
    initReviewEnginShowAndHide(mck_reviewEnginData.items);
  }
}
function mck_hideShowReview() {
  var msgboxArea = document.querySelector("#msgbox-area");
  if (msgboxArea) msgboxArea.classList.toggle("mck_hideReview");
}

function initReviewEnginShowAndHide(items) {
  if (items.length) {
    setInterval(() => {
      var msgboxArea = document.querySelector("#msgbox-area");
      var msg = items[mck_reviewEnginIDA].msg;
      var label = items[mck_reviewEnginIDA].name;
      if (msgboxArea) {
        msgboxArea.innerHTML =
          '<div class="mxk_review-icon"><img class="mck_avatar" src="https://www.w3schools.com/howto/img_avatar.png" /></div><div><div>' + label + "</div><div>" + msg + "</div></div>";
      }
      if (items.length - 1 === mck_reviewEnginIDA) mck_reviewEnginIDA = 0;
      else mck_reviewEnginIDA++;
      mck_hideShowReview();
      setTimeout(() => {
        mck_hideShowReview();
      }, 5000);
    }, 10000);
  }
}
setUpReviewEngin();
