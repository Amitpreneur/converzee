var mck_OptinFormElement = "";
var mck_OptinFormData = {};
function setUpOptinForm() {
  var optinFormID = window.mck_getElementdata("MCK_OPTINFORM", "EID");
  window.mck_createStyle("optinFormCss", window.mck_rUrl + "/lib/optinForm.css");
  mck_OptinFormData = window.campaigns[optinFormID].element_data;
  if (mck_OptinFormData) {
    console.log(mck_OptinFormData);
    var script = document.createElement("script");
    var optinFormElement = document.createElement("div");
    optinFormElement.setAttribute("id", "MCK_OPTIN_FORM" + optinFormID);
    if (mck_OptinFormData.layout === 0) {
      var inputfields = mck_OptinFormData.isNameInput
        ? '<div class="mck_col-md-2 mck_col-lg-2 mck_col-sm-8"><input placeholder="Email" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' +
          optinFormID +
          '"/></div><div class="mck_col-md-2 mck_col-lg-2 mck_col-sm-8"><input placeholder="Name" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' +
          optinFormID +
          '"/></div>'
        : '<div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-8"><input placeholder="Email" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' + optinFormID + '"/></div>';
      if (mck_OptinFormData.position === "TOP") {
        optinFormElement.classList.add("mck_optForm_TOP");
        setTimeout(() => {
          window.mck_setTopPos("MCK_OPTIN_FORM" + optinFormID);
        }, 1500);
      } else {
        optinFormElement.classList.add("mck_optForm_BOTTOM");
      }
      var optinTemplate = mck_OptinFormData.template != null ? "OPTIN_HELLOBAR-T" + mck_OptinFormData.template : "";
      optinFormElement.innerHTML =
        '<div class="mck_row mck_optForm_container_HELLOBAR' +
        optinTemplate +
        '" style="background-color:' +
        mck_OptinFormData.bgColor +
        ';"><div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-12"><div class="mck_optForm_HELLOBAR">' +
        mck_OptinFormData.text +
        "</div></div>" +
        inputfields +
        '<div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-2"><div class="mck_optForm_cta_HELLOBAR" ><a class="mck_BuyNowBtn_HELLOBAR" onclick="submitOptinForm(`' +
        optinFormID +
        '`)" style="background-color:' +
        mck_OptinFormData.ctaBackgound +
        ';">' +
        mck_OptinFormData.ctaText +
        "</a></div></div></div>";
    } else if (mck_OptinFormData.layout === 1) {
      var inputfields = mck_OptinFormData.isNameInput
        ? '<div class="mck_col-md-2 mck_col-lg-2 mck_col-sm-8"><input placeholder="Email" name="email" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' +
          optinFormID +
          '"/></div><div class="mck_col-md-2 mck_col-lg-2 mck_col-sm-8"><input placeholder="Name" name="name" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' +
          optinFormID +
          '"/></div>'
        : '<div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-8"><input placeholder="Email" name="email" class="mck--optForm-input_HELLOBAR OPTION_FORM_INPUT_' + optinFormID + '"/></div>';

      if (mck_OptinFormData.position == "TOP") {
        optinFormElement.classList.add("mck_optForm_TOP");
      } else {
        optinFormElement.classList.add("mck_optForm_BOTTOM");
      }
      // optinFormElement.classList.add("mck_clock_" + optinFormID);
      optinFormElement.innerHTML =
        '<div class="mck_row mck_optForm_container_HELLOBAR mck_optForm_hellobartimer" style="background-color:' +
        mck_OptinFormData.bgColor +
        ';"><div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-12"><div class="mck_optForm_HELLOBAR"><div class="mck_clock_' +
        optinFormID +
        '"><div class="mck_clock_2"></div></div></div></div>' +
        inputfields +
        '<div class="mck_col-md-4 mck_col-lg-4 mck_col-sm-2"><div class="mck_optForm_cta_HELLOBAR" ><a class="mck_BuyNowBtn_HELLOBAR" onclick="submitOptinForm(`' +
        optinFormID +
        '`)" style="background-color:' +
        mck_OptinFormData.ctaBackgound +
        ';">' +
        mck_OptinFormData.ctaText +
        "</a></div></div></div>";
    } else {
      script.innerHTML =
        'var MCK_OPTIN_FORM = true;var OPTIN_FORM=document.querySelector(".mckoptin_exitIntent");var trigger=document.querySelector(".trigger");var closeButton=document.querySelector(".exitbtnclose");function toggleOPTINFORM(){OPTIN_FORM.classList.toggle("hide_OPTINFORM")}function windowOnClick(event){if(event.target===OPTIN_FORM){toggleOPTINFORM()}}';
      script.innerHTML =
        script.innerHTML +
        'function optinFormEvent(obj, evt, fn) {if (obj.addEventListener) {obj.addEventListener(evt, fn, false);} else if (obj.attachEvent) {obj.attachEvent("on" + evt, fn);}}optinFormEvent(window, "load", function(e) {optinFormEvent(document, "mouseout", function(e) {e = e ? e : window.event;var from = e.relatedTarget || e.toElement;if (!from || from.nodeName == "HTML") {if(MCK_OPTIN_FORM){toggleOPTINFORM();MCK_OPTIN_FORM = false;}}});});';

      var inputfields = mck_OptinFormData.isNameInput
        ? '<p> <input type="text" class="OPTION_FORM_INPUT_' +
          optinFormID +
          '" name="email" placeholder="Email" value="" autofocus> </p><p> <input type="text" class="OPTION_FORM_INPUT_' +
          optinFormID +
          '" name="name" value="" placeholder="Name" autofocus> </p>'
        : '<p> <input type="text" placeholder="Email" class="OPTION_FORM_INPUT_' + optinFormID + '" name="email" value="" autofocus> </p>';

      var background = mck_OptinFormData.isBGIMG
        ? "background-image: url('" + mck_OptinFormData.bgImg + "');background-size: cover;background-repeat: no-repeat;background-position: center;background-size: cover;"
        : "background-color:" + mck_OptinFormData.bgImg + ";";
      // optinFormElement.outerHTML =
      var optinTemplate = mck_OptinFormData.template != null ? "MCK_OPTIN_EXIT_MAIN_T" + mck_OptinFormData.template : "";
      var temp =
        '<div class="mckoptin_exitIntent hide_OPTINFORM"><div class="mck_exit_club_handler mckoptin_exitIntent_wrapper ' +
        optinTemplate +
        '" style="' +
        background +
        '"><div class="MCK_OPTIN_exitbutton"><img class="mxk_exit_close" onclick="toggleOPTINFORM();" src="http://d2xdmgqpa5567i.cloudfront.net/static/templateclub/exitbg/1/Close.png" /></div><div class="MCK_OPTIN_EXIT_T8"><div class="MCK_OPTIN_EXIT_CONTAINER_T9"><div class="MCK_OPTIN_EXIT_CONTAINER_ICON_T9"><img style="height: auto; width: 100%;" src="http://d2xdmgqpa5567i.cloudfront.net/static/templateclub/exitbg/9/Icon.png" /></div><div style="width: 100%; text-align: center; padding-top: 24px;">' +
        mck_OptinFormData.text +
        '</div></div><div class="MCK_OPTINEXIT_SUBTEXT_T9"> ' +
        mck_OptinFormData.subtext +
        '</div><div class="MCK_OPTIN_EXIT_HEADER_T9"><div>' +
        inputfields +
        '</div></div><div class="MCK_OPTINEXIT_CTA_T9"><center> <div onclick="submitOptinForm(`' +
        optinFormID +
        '`) style="background-color:' +
        mck_OptinFormData.ctaBackgound +
        ';">' +
        mck_OptinFormData.ctaText +
        '</div></center></div><div class="MCK_OPTIN_EXIT_nothanks"><div>' +
        mck_OptinFormData.noThanks +
        "</div></div></div></div></div>";
      var body = document.getElementsByTagName("body")[0];
      body.insertAdjacentHTML("beforeend", temp);
      // ('<div class="mckoptin_exitIntent"><div class="mck_exit_club_handler mckoptin_exitIntent_wrapper_T5 mck_optin_EXIT_MAIN_T9"><div class="mck_optin_exitbutton"><img class="mxk_exit_close" onclick="toggleclub();" src="http://d2xdmgqpa5567i.cloudfront.net/static/templateclub/exitbg/1/Close.png" /></div><div class="mck_optin_EXIT_T8"><div class="mck_optin_EXIT_CONTAINER_T9"><div class="mck_optin_EXIT_CONTAINER_ICON_T9"><img style="height: auto; width: 100%;" src="http://d2xdmgqpa5567i.cloudfront.net/static/templateclub/exitbg/9/Icon.png" /></div><div style="width: 100%; text-align: center; padding-top: 24px;">MCKTITLE</div></div><div class="mck_optinEXIT_SUBTEXT_T9"> MCKSUBTITLE</div><div class="mck_optin_EXIT_HEADER_T9"><div><img src="MCKIMAGELOGO" /></div></div><div class="mck_optinEXIT_CTA_T9"><center> <div>MCKCTA</div></center></div><div class="mck_optin_EXIT_nothanks"><div>MCKNOTHANKS</div></div></div></div></div>');
      // optinFormElement.innerHTML =
      //   '<div class="OPTIN_EXIT_INTENT hide_OPTINFORM" style="' +
      //   background +
      //   '"> <div id="OPTIN_EXIT_INTENT"> <div class="OPTIN_EXIT_WRAPPER"> <div onclick="toggleOPTINFORM();" id="OPTIN_EXIT_INTENT_close"><img src="http://d2xdmgqpa5567i.cloudfront.net/static/templateclub/exitbg/1/Close.png"/></div><div class="OPTIN_EXIT_CONTENT" style="background-color:' +
      //   mck_OptinFormData.bgColor +
      //   ';"> <h2>' +
      //   mck_OptinFormData.text +
      //   "</h2> <p>" +
      //   mck_OptinFormData.subtext +
      //   '</p><form class="signup-form" id="signup-form">' +
      //   inputfields +
      //   '<p class="button"> <button type="button" style="background-color:' +
      //   mck_OptinFormData.ctaBackgound +
      //   ';" onclick="submitOptinForm(`' +
      //   optinFormID +
      //   '`)">' +
      //   mck_OptinFormData.ctaText +
      //   '</button> </p></form> <p class="footnote">' +
      //   mck_OptinFormData.noThanks +
      //   "</p></div></div></div></div>";
    }

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(optinFormElement);

    if (mck_OptinFormData.layout === 2) {
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }
    if (mck_OptinFormData.layout === 1) {
      leadengagr.initClock(optinFormID);
    }
  }
}
function submitOptinForm(id) {
  var inputs = document.getElementsByClassName("OPTION_FORM_INPUT_" + id);
  if (inputs) {
    var _name, _email;
    for (let i = 0; i < inputs.length; i++) {
      var attrib = inputs[i].getAttribute("name");
      if (attrib == "name") {
        _name = inputs[i].value;
      } else {
        _email = inputs[i].value;
      }
    }
    var data = { data: { user: window.userid, campId: id, campName: "OPTIN FORM", email: _email, name: _name } };
    window.mck_fatchCall(window.mck_support_URL + "AppData", "POST", JSON.stringify(data), function (res, err) {
      try {
        toggleOPTINFORM();
      } catch (e) {}
    });
  }
}
setUpOptinForm();
