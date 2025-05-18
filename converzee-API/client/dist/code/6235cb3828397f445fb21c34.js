window.userid="6235cb3828397f445fb21c34";window.myConversionKit_host="https://api.converzee.com";window.mck_rUrl="https://d257yxqteot439.cloudfront.net/static";window.mck_support_URL="https://api.converzee.com/";window.campaigns = "";
    window.include_hosts = "";
    window.httpgetAsync = function(jsonurl, cb) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       cb(xmlhttp.responseText);
      }
     };
     xmlhttp.open("POST", jsonurl, true);
     xmlhttp.send(null);
    };
    window.mck_createScript = function(id = "mycon", url) {
     var isObj = document.getElementById(id);
     if (!isObj) {
      var jqueryJS = document.createElement("script");
      jqueryJS.setAttribute("src", url);
      jqueryJS.setAttribute("id", id);
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(jqueryJS);
     }
    };
    document.addEventListener('readystatechange', event => { 
      if (event.target.readyState === "complete") {
        if(window.mck_hello_ID){
          const posHelloBar = document.getElementById(window.mck_hello_ID);
          if(posHelloBar){
            var body = document.getElementsByTagName("body")[0];
            body.style = "margin-top:" + posHelloBar.offsetHeight + "px";
          }
        }
      }
    });
    window.mck_hello_ID = null;
    window.mck_setTopPos = function(id){
      window.mck_hello_ID = id;
    }
    window.mck_createStyle = function(id = "mycon", url) {
     var isObj = document.getElementById(id);
     if (!isObj) {
      var link = document.createElement("link");
      link.setAttribute("href", url);
      link.setAttribute("id", id);
      link.setAttribute("rel", "stylesheet");
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
     }
    };
    window.mck_getElementdata = function (name,attr) {
      var items = document.getElementsByName(name);
      if(items && items.length){
        return items[0].getAttribute(attr);
      } 
      return "";
    }
    window.mck_tackingCamp = function(arr){
      // window.mck_MakeCall(window.mck_support_URL+"track/",{"camps":arr,"address":window.location,"time":new Date()},function(data){});
    }
    window.mck_MakeCall = function(url, data = {}, cb) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       cb(xmlhttp.responseText);
      }
     };
     xmlhttp.open("POST", url, true);
     xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
     xmlhttp.send(JSON.stringify(data));
    };

    window.mck_fatchCall = function(url,reqType,data="", cb){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {method: reqType,headers: myHeaders,body: data,redirect: 'follow'};
      fetch(url, requestOptions)
        .then(response => cb(response.text(),null))
        .catch(error => cb(null,error));
    }
    //---
    window.leadengagr_init = function() {
     if (!window.leadengagr_loaded) {
      window.leadengagr_loaded = 1;
      var leadengagr = {
       campaigns: window.campaigns,
       mck_IncludeCampign: window.mck_IncludeCampign,
       exclude_conditions: "",
       domid: window.userid,
       websites: [],
      };
      window.leadengagr = leadengagr;
      window.mck_createStyle("mck_Style", window.mck_rUrl + "/lib/style.css");
      window.mck_createStyle("mck_bootstrap", window.mck_rUrl + "/lib/bootstrap.css");
      setTimeout(function(){
        if(!window.jQuery){
           window.mck_createScript("mck_jquery", "https://code.jquery.com/jquery-3.5.1.min.js");
        }
      }, 4000);
      leadengagr.loadgoogleFonts = function() {
       var fonts = {
        Raleway: "https://fonts.googleapis.com/css?family=Raleway:400,700",
        Roboto: "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "Droid Sans": "https://fonts.googleapis.com/css?family=Droid+Sans:400,700",
        "Abril Fatface": "https://fonts.googleapis.com/css?family=Abril+Fatface:400,700",
        "PT Sans": "https://fonts.googleapis.com/css?family=PT+Sans:400,700",
        "Merriweather Sans": "https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700",
        Quicksand: "https://fonts.googleapis.com/css?family=Quicksand:400,700",
        "Open Sans": "https://fonts.googleapis.com/css?family=Open+Sans:400,700",
        Montserrat: "https://fonts.googleapis.com/css?family=Montserrat:400,700",
        "Libre Baskerville": "https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700",
       };
       Object.keys(fonts).forEach(function(item) {
        window.mck_createStyle("mck_" + item, fonts[item]);
       });
      };
      leadengagr.loadgoogleFonts();
      leadengagr.loadClick = function(campid, action) {
       var url = window.myConversionKit_host + "/cv/" + campid + "/" + action;
       window.mck_MakeCall(url, {}, function(data) {});
      };
      leadengagr.subscribe_email = function(campid) {
       var email = document.getElementById("leadengagr_exit_intent_input");
       var url = window.myConversionKit_host + "/campData/insert";
       window.mck_MakeCall(
        url, {
         campid: campid,
         email: email.value,
        },
        function(text) {}
       );
       toggleModal();
      };
      leadengagr.loadView = function(campids) {
       if (!leadengagr.getCookie("leadengagr_view")) {
        leadengagr.setCookie("leadengagr_view", "leadengagr_view", 365, 0);
        for (var i = 0; i < campids.length; i++) leadengagr.loadClick(campids[i], 1);
       }
      };
      leadengagr.copyScript = function() {
       var range = document.createRange();
       range.selectNode(document.getElementById("scriptToCopy"));
       window.getSelection().removeAllRanges();
       window.getSelection().addRange(range);
       document.execCommand("copy");
       window.getSelection().removeAllRanges();
       var notification = document.getElementById("leadengagr_notification");
       if (notification) {
        notification.style = "position: fixed;top: 0px;left: 48%;margin: 8px;padding: 5px;border-radius: 5px;background-color: #fff;";
       } else {
        notification = document.createElement("div");
        notification.id = "leadengagr_notification";
        notification.style = "position: fixed;top: 0px;left: 48%;margin: 8px;padding: 5px;border-radius: 5px;background-color: #fff;";
        notification.innerHTML = "Copied to clipboard";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(notification);
       }
       setTimeout(() => {
        notification.style = "display:none";
       }, 2000);
      };
      leadengagr.setCookie = function(name, val, days, hours) {
       var date = new Date();
       if (!days) {
        days = 1;
       }
       if (!hours || hours == "") {
        date.setTime(date.getTime() + 24 * 60 * 60 * days * 1000);
       } else {
        date.setTime(date.getTime() + 60 * hours * 1000);
       }
       var expires = "; expires=" + date.toGMTString();
       document.cookie = name + "=" + val + "; expires=" + expires + "; path=/";
      };
      leadengagr.getCookie = function(name) {
       var value = "; " + document.cookie;
       var parts = value.split("; " + name + "=");
       if (parts.length == 2) return parts.pop().split(";").shift();
      };
      leadengagr.initImagePopUplib = function() {
       window.mck_createStyle("imagePopUp_lib", window.mck_rUrl + "/lib/img-lightbox.min.css");
       window.mck_createScript("imagePopUp_libJS", window.mck_rUrl + "/lib/img-lightbox.min.js");
      };
    
      String.prototype.regexChange = function(search, replace) {
       return this.replace(new RegExp(search, "g"), replace);
      };
      leadengagr.getItem = function(key) {
       return leadengagr.getCookie(key);
      };
      leadengagr.setData = function(key, value, days, hours, mins) {
       leadengagr.setCookie(key, value, days, hours, mins);
      };
      leadengagr.deleteCookie = function(key) {
       document.cookie = key + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      };
      leadengagr.removeData = function(key) {
       leadengagr.deleteCookie(key);
      };
      leadengagr.initWindowback = function(campid) {
       try {
        (function(window, location) {
          history.replaceState(null, document.title, location.pathname+"#!/history");
          history.pushState(null, document.title, location.pathname);
          window.addEventListener("popstate", function() {
            if(location.hash === "#!/history") {
              history.replaceState(null, document.title, location.pathname);
              setTimeout(function(){
                location.replace(leadengagr.campaigns[campid].element_data.redirectUrl);
              },10);
            }
          }, false);
          }(window, location));
       } catch (err) {
        console.log(err);
       }
      };
      // ..........
      leadengagr.initHelloBarElement = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var templateType = element_data.templateType;
       var template = element_data.template;
       window.mck_createStyle("leadengarge_hellobar_style", window.mck_rUrl + "/lib/hellobar.css");
       window.mck_createStyle("leadengarge_style", window.mck_rUrl + "/lib/style.css");
       var helloBar = document.createElement("div");
       helloBar.setAttribute("id", campid);
       helloBar.classList.add("sk-fixed-height");
       helloBar.classList.add("sk-top");
       element_data.position == "top" ? helloBar.classList.add("top") : helloBar.classList.add("bottom");
       var action = "",
        html = "";
       var funct = "leadengagr.loadClick('" + campid + "',0);";
       if (element_data.buttonAction == "redirect") {
        action = '<a href="' + element_data.redirectUrl + '" onclick="' + funct + '" class="leadengagr-button-url" style="opacity: 1; transform: translateY(0%);" >';
       } else if (element_data.buttonAction == "redirectInNewTab") {
        action = '<a href="' + element_data.redirectUrl + '" onclick="' + funct + '" target="_blank" class="leadengagr-button-url" style="opacity: 1; transform: translateY(0%);" >';
       } else {
        action =
         '<a href="javascript:(function(){window.scrollTo(0,' +
         element_data.redirectUrl +
         ')})();" onclick="' +
         funct +
         '" class="leadengagr-button-url" style="opacity: 1; transform: translateY(0%);" >';
       }
       if (template == 0) {
        var code = element_data.cpCode;
        var codeText = element_data.codeText;
        if (templateType == 1) {
         html =
          '<div class="hellobar1" style="background-color:' +
          element_data.bgColor +
          '"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="hellobar1-text1">' +
          element_data.text +
          '</div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><center>' +
          '<div class="hellobar1-code-box"><div class="hellobar1-code"><p style="margin-top:5px;" id="scriptToCopy">' +
          code +
          '</p></div><div class="hellobar1-copy-button" onclick="leadengagr.copyScript()"><p>Copy Code</p></div></div></center></div></div><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="mck_text-center">' +
          action +
          '<div class="hellobar1-button" style="background-color:' +
          element_data.CTAColor +
          ';">' +
          element_data.buttonText +
          "</div></a></div></div></div></div></div>";
        } else {
         html =
          '<div class="hellobar1" style="background-color:' +
          element_data.bgColor +
          '"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="mck_text-center">' +
          action +
          '<div class="hellobar1-button" style="background-color:' +
          element_data.CTAColor +
          ';">' +
          element_data.buttonText +
          '</div></a></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center">' +
          '<div class="hellobar1-code-box"><div class="hellobar1-code"><p id="scriptToCopy">' +
          code +
          '</p></div><div class="hellobar1-copy-button" onclick="leadengagr.copyScript()"><p>Copy Code</p></div></div></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="hellobar1-text1">' +
          element_data.text +
          "</div></div></div></div></div>";
        }
       }
       // if(template==1){
       //   html='<div class="hellobar2" style="background-color:'+element_data.bgColor+'"><div class="container"><div class="row"><div class="col-md-4 col-sm-6"><div class="hellobar2-text1">'+element_data.text+'</div></div><div class="col-md-4 col-sm-6"><div class="text-center"><input type="email" name="" placeholder="Enter Email"></div></div><div class="col-md-4 col-sm-12"><div class="text-center"><div class="hellobar2-button">'+action+'</div></div></div></div></div></div>';
       //   // if(templateType==1){
    
       //   // }else{
    
       //   // }
       // }
       if (template == 1) {
        //html='<div class="hellobar3"  style="background-color:'+element_data.bgColor+'"><div class="container"><div class="row"><div class="col-sm-12"><div class="text-center"><div class="hellobar3-text1" style="display:flex;">'+element_data.text+action+element_data.buttonText+'</a></div></div></div></div></div></div>';
        if (templateType == 1) {
         html =
          '<div class="leadengagr-smart-bar-wrap leadengagr-background-pattern1" style="background-color:' +
          element_data.bgColor +
          '"><div class="leadengagr--smart-bar-padding"> <div class="leadengagr-element-message" style="color: rgb(255, 255, 255); opacity: 1; transform: translateY(0%);" >' +
          element_data.text +
          "</div></div>" +
         '<div class="leadengagr--smart-bar-padding"> '+action+element_data.buttonText+'</a > </div></div>';
        } else {
         html =
          '<div class="leadengagr-smart-bar-wrap leadengagr-background-pattern1" style="background-color:' +
          element_data.bgColor +
          '"><div class="leadengagr--smart-bar-padding"> ' +
          action +
          element_data.buttonText +
          "</a > </div>" +
         '<div class="leadengagr--smart-bar-padding"> <div class="leadengagr-element-message" style="color: rgb(255, 255, 255); opacity: 1; transform: translateY(0%);" > ' +
          element_data.text +
          "</div></div></div>";
        }
       }
       if (template == 2) {
        if (templateType == 1) {
         html =
          '<div class="hellobar4" style="background-color:' +
          element_data.bgColor +
          '"><div class="mck_container"><div class="mck_row"><div class="mck_col-lg-6 mck_col-md-6 mck_col-sm-12 mck_align-self-center"><div class="hellobar4-text1">' +
          element_data.text +
          '</div></div><div class="mck_col-lg-6 mck_col-md-6 mck_col-sm-12 mck_align-self-center"><div class="mck_text-center">' +
          action +
          '<div class="hellobar4-button" style="background-color:' +
          element_data.CTAColor +
          ';">' +
          element_data.buttonText +
          "</div></a></div></div></div></div></div>";
        } else {
         html =
          '<div class="hellobar4" style="background-color:' +
          element_data.bgColor +
          '"><div class="mck_container"><div class="mck_row"><div class="mck_col-lg-1 mck_col-md-12 mck_col-sm-12"></div><div class="mck_col-lg-5 mck_col-md-6 mck_col-sm-6"><div class="mck_text-center">' +
          action +
          '<div class="hellobar4-button" style="background-color:' +
          element_data.CTAColor +
          ';">' +
          element_data.buttonText +
          '</div></a></div></div><div class="mck_col-lg-5 mck_col-md-6 mck_col-sm-6"><div class="hellobar4-text1">' +
          element_data.text +
          "</div></div></div></div></div>";
        }
       }
       helloBar.innerHTML = html;
       var body = document.getElementsByTagName("body")[0];
       body.appendChild(helloBar);
       if (element_data.position == "top") {
        window.mck_setTopPos(campid);
       }
      };
      //---
      leadengagr.initHelloBarTimerElement = function(campid) {
       var mobileOptimised = 0;
       if (leadengagr.campaigns[campid].element_data.mobileOptimised !== undefined) {
        if (leadengagr.campaigns[campid].element_data.mobileOptimised == 1) {
         mobileOptimised = 1;
        }
       }
       var floating = 0;
       if (leadengagr.campaigns[campid].element_data.floating !== undefined) {
        if (leadengagr.campaigns[campid].element_data.floating == 1) {
         floating = 1;
        }
       }
       var html = "";
       var templateType = leadengagr.campaigns[campid].element_data.templateType;
       var template = leadengagr.campaigns[campid].element_data.template;
       var bgColor = leadengagr.campaigns[campid].element_data.bgColor;
       var buttonText = leadengagr.campaigns[campid].element_data.buttonText;
       var text = leadengagr.campaigns[campid].element_data.text;
       var hbgColor = leadengagr.campaigns[campid].element_data.highlightBgColor;
       var code = leadengagr.campaigns[campid].element_data.cpCode || "";
       var codeText = leadengagr.campaigns[campid].element_data.codeText || "";
       var barColor = leadengagr.campaigns[campid].element_data.barColor || "";
       var timerBox = leadengagr.campaigns[campid].element_data.timerBox || "#fff";
       var timerTextColor = leadengagr.campaigns[campid].element_data.timerTextColor || "#fff";
       var position = leadengagr.campaigns[campid].element_data.position == "top" ? "top:0px;position:fixed;" : "bottom:0px;position:fixed;";
       if (templateType === "template0") {
        var style = document.createElement("style");
        style.innerHTML = ".hellobartimer3-timer > li{color:" +
        timerTextColor +"!important;} .arrow{border-left-color: " + barColor + ";}.hellobartimer1-arrow:before{border-left-color: " + barColor + "!important;}";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        html +=
         '<div class="hellobartimer1" style="background-color:' +
         bgColor +
         ';"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-3 mck_col-sm-6 mck_align-self-center order-md-0 order-sm-12"><div class="mck_text-center">' +
         '<div class="hellobartimer1-code-box"><div class="hellobartimer1-code"><p id="scriptToCopy">' +
         code +
         '</p></div><div class="hellobartimer1-copy-button" onclick="leadengagr.copyScript()"><p>Copy Code</p></div></div></div></div><div class="mck_col-md-3 mck_col-sm-6 mck_align-self-center"><div class="hellobartimer1-arrow" style="background-color: ' +
         barColor +
         "; borde-left-color: " +
         barColor +
         '">' +
         text +
         '</div></div><div class="mck_col-md-3 mck_col-sm-6 mck_align-self-center"><center><div class="mck_clock_2"></div></center></div><div class="mck_col-md-3 mck_col-sm-6 mck_align-self-center order-md-0 order-sm-12"><div class="text-center"><div class="hellobartimer1-button mck_hello_bar_btn" style="background-color:' +
         hbgColor +
         '">' +
         buttonText +
         "</div></div></div></div></div></div>";
       } else if (templateType === "template1") {
        var style = document.createElement("style");
        style.innerHTML =
         ".arrow{border-left-color: " +
         barColor +
         ";} .hellobartimer2-arrow:before{border-left-color: " +
         barColor +
         ";content: '';position: absolute;right: -40px;bottom: 0;width: 0;height: 0;border-left: 40px solid " +
         barColor +
         ";border-top: 40px solid transparent;border-bottom: 40px solid transparent;} .hellobartimer3-bg{background-color:" +
         timerBox +
         ";} .hellobartimer3-timer > li{color:" +
         timerTextColor +
         "!important;}";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        html +=
         '<div class="hellobartimer2" style="background-color:' +
         bgColor +
         ';"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="hellobartimer2-text"'+
         '><div style="margin:auto;">' +
         text +
         '</div></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><center><div class="mck_clock_2"></div></center></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><div class="hellobartimer2-button mck_hello_bar_btn" style="background-color:' +
         hbgColor +
         '">' +
         buttonText +
         "</div></div></div></div></div></div>";
       } else if (templateType === "template2") {
        var style = document.createElement("style");
        style.innerHTML = ".hellobartimer3-bg{background-color:" + timerBox + ";} .hellobartimer3-timer > li{color:" + timerTextColor + "!important;}";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        html +=
         '<div class="hellobartimer3" style="background-color:' +
         bgColor +
         ';"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="hellobartimer3-text1">' +
         text +
         '</div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center hellobartimer3-bg"><center><div class="mck_clock_2"></div></center></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><div class="hellobartimer3-button mck_hello_bar_btn" style="background-color:' +
         hbgColor +
         '">' +
         buttonText +
         "</div></div></div></div></div></div>";
       } else if (templateType === "template3") {
        var style = document.createElement("style");
        style.innerHTML =
         ".hellobartimer4-bg{background-color:" +
         timerBox +
         ";} .hellobartimer4-timer > li{font-size: 25px;background-color:" +
         timerBox +
         ";color:" +
         timerTextColor +
         ";width: 60px !important;height: 80%;margin: 5px;} .hellobartimer4-timer > li > span{font-size: 12px;font-weight: 500;}";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        html +=
         '<div class="hellobartimer3" style="background-color:' +
         bgColor +
         ';"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="hellobartimer3-text1">' +
         text +
         '</div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center hellobartimer3-bg"><center><div class="mck_clock_2"></div></center></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><div class="hellobartimer3-button mck_hello_bar_btn" style="background-color:' +
         hbgColor +
         '">' +
         buttonText +
         "</div></div></div></div></div></div>";
       } else {
        html +=
         '<div class="hellobartimer4" style="background-color:' +
         bgColor +
         ';"><div class="mck_container"><div class="mck_row"><div class="mck_col-md-4 mck_col-sm-12 mck_align-self-center"><div class="hellobartimer4-text1">' +
         text +
         '</div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center hellobartimer4-bg"><center><div class="mck_clock_2"></div></center></div></div><div class="mck_col-md-4 mck_col-sm-6 mck_align-self-center"><div class="mck_text-center"><div class="hellobartimer4-button mck_hello_bar_btn" style="background-color:' +
         hbgColor +
         '">' +
         buttonText +
         "</div></div></div></div></div></div>";
       }
       var dv = document.createElement("DIV");
       dv.id = "hellobar_timer_" + campid;
       dv.style = position + "width:100%;z-index: 999;";
       dv.classList.add("mck_clock_" + campid);
       dv.innerHTML = html;
       document.getElementsByTagName("body")[0].appendChild(dv);
       leadengagr.initClock(campid);
       if (document.querySelector(".mck_hello_bar_btn") !== null) {
        document.querySelector(".mck_hello_bar_btn").addEventListener("click", function() {
         if (leadengagr.campaigns[campid].element_data.buttonAction == "scroll") {
          leadengagr.loadClick(campid, 0);
          window.scroll(0, leadengagr.campaigns[campid].element_data.redirectUrl);
         } else if (leadengagr.campaigns[campid].element_data.buttonAction == "redirect") {
          leadengagr.loadClick(campid, 0);
          window.location.replace(leadengagr.campaigns[campid].element_data.redirectUrl);
         } else if (leadengagr.campaigns[campid].element_data.buttonAction == "redirectInNewTab") {
          leadengagr.loadClick(campid, 0);
          window.open(leadengagr.campaigns[campid].element_data.redirectUrl, "_blank");
         }
        });
       }
       if (floating == 1) {
        leadengagr.hbarlastScrollTop = 0;
        document.addEventListener(
         "scroll",
         function() {
          var height = Math.max(
           document.body.scrollHeight,
           document.body.offsetHeight,
           document.documentElement.clientHeight,
           document.documentElement.scrollHeight,
           document.documentElement.offsetHeight
          );
          var st = window.pageYOffset || document.documentElement.scrollTop;
          if (st > 0.3 * height) {
           if (st > leadengagr.hbarlastScrollTop) {
            document.querySelector(".outer_helloBar_leadengagr").style.transform = "translateY(-100%)";
           } else {
            document.querySelector(".outer_helloBar_leadengagr").style.transform = "none";
           }
           leadengagr.hbarlastScrollTop = st <= 0 ? 0 : st;
          } else {
           document.querySelector(".outer_helloBar_leadengagr").style.transform = "none";
          }
         },
         !1
        );
       }
       if (leadengagr.campaigns[campid].element_data.position == "top") {
        window.mck_setTopPos("hellobar_timer_" + campid);
       }
      };
      //---
      leadengagr.initVibrator = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var leadengagr_initVibrator = document.getElementById("leadengagr_initVibrator");
       if (!leadengagr_initVibrator) {
        var script = document.createElement("script");
        script.innerHTML =
         'function leadEngargeVibratorInit(startDelay, timerDuration) {if("vibrate" in navigator){setTimeout(() => {navigator.vibrate(timerDuration);}, startDelay);}else{console.warn("HTML VIBRATOR API NOT SUPPORT")}}';
        script.setAttribute("id", "leadengagr_initVibrator");
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
       }
       leadEngargeVibratorInit(element_data.timerDuration[0], element_data.timerDuration);
      };
      //---
      //---ExitIntent
      leadengagr.initExitIntent = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var title = element_data.title;
       var subheading = element_data.subheading;
       var ctaText = element_data.ctaText;
       var ctaBg = element_data.ctaBg;
       var ctaAction = element_data.ctaAction;
       var url = element_data.url;
       var isimageBg = element_data.isimageBg;
       var backGround = element_data.backGround;
       var mediaType = element_data.mediaType;
       var mediaURL = element_data.mediaURL;
       var height = element_data.height;
       var width = element_data.width;
       var isInput = element_data.isInput;
       var leadengagr_ExitIntent = document.getElementById("leadengagr_ExitIntent");
       if (!leadengagr_ExitIntent) {
        var newIntent = document.createElement("div");
        newIntent.classList.add("popupexit_wrapper");
        newIntent.style = 'height: -webkit-fill-available;z-index: 99999999; text-align: center;' 
        var subheadings = subheading;
        newIntent.innerHTML =
         '<div class="popupexit"><img src="' +
         window.mck_rUrl +
         '/lib/close.png" onclick="toggleModal()" class="exitbtnclose" style="position: absolute;right: 10px;top: 10px;width: 40px;"> <div class="popupexit-inner" style=" width: 80%; left: 10%;"> <div class="heading-top" style="text-align: center;"><span>' +
         title +
         '</span><br></div><div class="subheading-top"><span>' +
         subheadings +
         '</span></div><div class="result-img" style=" text-align: center;">' +
         getMainainElement(mediaType, mediaURL, height, width, isInput) +
         '</div><div class="exitpopup-btns">' +
         getCTA(ctaAction, ctaText, ctaBg, url, campid, isInput) +
         '<br/><br/><br/></div></div></div>';
    
        var script = document.createElement("script");
        var style = document.createElement("style");
        style.innerHTML =
         ".popupexit_wrapper{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.5);visibility:hidden;}.closeModel{visibility:visible}.popupexit_wrapper .popupexit{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;max-width:100%;max-height:100%;overflow:auto;width:50%;height:fit-content}.popupexit_wrapper .popupexit .popupexit-inner{position:static;width:100%!important}.popupexit_wrapper .popupexit .popupexit-inner br{display:none}.closeModel .popupexit{display:block !important;} .popupexit{ display: none ;position:fixed;top:0;left:0;height:100%;width:100%;}.popupexit div{font-family:Montserrat,sans-serif}.popupexit-inner{position:absolute;width:48%;left:26%;margin-top:40px;margin-bottom:40px;bacground:#000;}.popupexit .heading-top{text-align:justify;font-family:Montserrat,sans-serif}.popupexit .fbembedpost{text-align:center;margin-top:20px;color:#fff;font-size:18px}.popupexit .exitpopup-btns{text-align:center;margin-top:15px;margin-bottom:15px;}.exitbtnstay{color:#fff;background:orange;padding:8px;display:inline-block;width:auto;font-size:22px;cursor:pointer;border-radius:2px;transition-duration:.4s}.exitbtnstay:hover{text-decoration:none;color:#fff;transform:scale(1.03)!important;box-shadow:0 8px 8px rgba(0,0,0,.24)!important}.exitbtnclose{color:#fff;margin-top:10px;font-size:15px;display:inline-block;cursor:pointer}.exitbtnclose:hover{text-decoration:none;color:#fff}@media(max-width:576px){.popupexit_wrapper .popupexit:95%;}.popupexit-inner{padding:20px;background-color:#070336;position:static;max-height:unset;min-height:unset;border:none;display:inline-block;vertical-align:middle;margin:0;}.popupexit-inner .heading-top{color:#ff9c00;font-weight:700;margin:0;font-size:26px}.popupexit-inner .subheading-top{color:#fff;margin-bottom:30px}.popupexit .exitpopup-btns{display:inline-flex;justify-content:center;flex-direction:column;color:#fff;font-size:14px;margin:0}.popupexit .exitpopup-btns a{height:50px;background:#e71a1a;color:#fff;font-size:24px;padding:0 30px;font-weight:700;border-radius:0;cursor:pointer;line-height:50px;text-decoration:none;margin-bottom:15px;margin-top:20px!important}@media(max-width:768px){.popupexit_wrapper .popupexit {width: 100%;}}"; 
         script.innerHTML =
         'var modalShowd = true;var modal=document.querySelector(".popupexit_wrapper");var trigger=document.querySelector(".trigger");var closeButton=document.querySelector(".exitbtnclose");function toggleModal(){modal.classList.toggle("closeModel")}function windowOnClick(event){if(event.target===modal){toggleModal()}}';
        script.setAttribute("id", "leadengagr_ExitIntent");
        script.innerHTML =
         script.innerHTML +
         'let details = navigator.userAgent; let isMobile = false; let regexp = /android|iphone|kindle|ipad/i; let isMobileDevice = regexp.test(details); if (isMobileDevice) { isMobile = true; } function addEvent(obj, evt, fn) {if (obj.addEventListener) {obj.addEventListener(evt, fn, false);} else if (obj.attachEvent) {obj.attachEvent("on" + evt, fn);}}addEvent(window, "load", function(e) {if(isMobile) { addEvent(document, "visibilitychange", function() { if (document.hidden){ toggleModal(); } }); } else {addEvent(document, "mouseout", function(e) { e = e ? e : window.event; var from = e.relatedTarget || e.toElement; if (!from || from.nodeName == "HTML") { if(modalShowd){ toggleModal(); modalShowd = false;} }})} });';
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(newIntent);
        head.appendChild(script);
        let popupExitInner = document.querySelector(".popupexit-inner");
        if (isimageBg) {
          newIntent.style = 'height: -webkit-fill-available;z-index: 99999999; text-align: center; background-size: cover;';
          popupExitInner.style = "background-image: url(" + backGround + "); background-size:cover;";
        } else {
          newIntent.style = "height: -webkit-fill-available;z-index: 99999999;  text-align: center; ";
          popupExitInner.style = "background-color:" + backGround + ";";
        }
       }
      };
    
      function getCTA(action, text, bg, url, id, isInput) {
       var funct = "leadengagr.loadClick('" + id + "',0);";
       var funct2 = "leadengagr.subscribe_email('" + id + "');";
       if (isInput) {
        return '<button style="margin-top: 10px;border:none;background-color:' + bg + '" class="mck_btn mck_btn-sm mck_btn-success" onclick="' + funct2 + '">Subscribe</button>';
       }
       if (action === "redirectInNewTab") {
        return (
         '<a style="margin-top: 10px;border:none;background-color:' +
         bg +
         '" class="mck_btn mck_btn-sm mck_btn-success" href="' +
         url +
         '" onclick="' +
         funct +
         '" target="_blank" class="cta_button' +
         id +
         '">' +
         text +
         "</a>"
        );
       } else if (action === "scroll") {
        return (
         '<a style="margin-top: 10px;border:none;background-color:' +
         bg +
         '" class="mck_btn mck_btn-sm mck_btn-success" href="javascript:(function(){toggleModal();window.scrollTo(0,' +
         url +
         ');})();"  onclick="' +
         funct +
         '" class="cta_button' +
         id +
         '">' +
         text +
         "</a>"
        );
       } else {
        return (
         '<a style="margin-top: 10px;border:none;background-color:' + bg + '" class="mck_btn mck_btn-sm mck_btn-success" href="' + url + '" onclick="' + funct + '"  class="cta_button' + id + '">' + text + "</a>"
        );
       }
      }
    
      function getMainainElement(type, url, height, width, isInput) {
       if (isInput) {
        return '<center><input type="text" placeholder="Name" style="width:30%;height:35px;margin:2px;" class="Input-text" name="leadengagr_exit_intent_input" id="leadengagr_exit_intent_input_1"/><br/><input type="text" placeholder="Email" style="width:30%;height:35px;" class="Input-text" name="leadengagr_exit_intent_input" id="leadengagr_exit_intent_input"/></center>';
       }
       if (type === "IMAGE") {
        return '<img src="' + url + '" style="height:auto;width:' + width + '%" />';
       } else {
        var videoObj = youtubeVideo(url);
        var id = videoObj.id;
        if (videoObj.type == "vimeo") {
         return (
          '<center><div class="embed-responsive embed-responsive-16by9" style="width:50%;"><iframe class="embed-responsive-item" src="https://player.vimeo.com/video/' +
          id +
          '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></center>'
         );
        } else {
         return '<center><div class="embed-responsive embed-responsive-16by9" style="width:50%;"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe></div></center>';
        }
       }
      }
    
      function youtubeVideo(url) {
        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
       if (RegExp.$3.indexOf("youtu") > -1) {
        var type = "youtube";
       } else if (RegExp.$3.indexOf("vimeo") > -1) {
        var type = "vimeo";
       }
       return {
        type: type,
        id: RegExp.$6,
       };
      }
    
      //End Of ExitInitent
      //---
      //ChatBot
      leadengagr.initChatBot = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var userid = window.userid;
       var chatbot = document.createElement("script");
       chatbot.setAttribute("src", window.mck_rUrl + "/lib/chatBoot.js");
       chatbot.setAttribute("campId", campid);
       chatbot.setAttribute("userid", userid);
       chatbot.setAttribute("name", "CHATBOT");
       chatbot.setAttribute("bgColor", element_data.bgColor);
       chatbot.setAttribute("fontColor", element_data.fontColor);
       chatbot.setAttribute("titleBg", element_data.titleBg);
       chatbot.setAttribute("titleColor", element_data.titleColor);
       chatbot.setAttribute("botTitle", element_data.botTitle);
       var body = document.getElementsByTagName("body")[0];
       body.appendChild(chatbot);
      };
      //EndChatBot

      //Optin Form
      leadengagr.initOptinForm = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var userid = window.userid;
       var mckOptinForm = document.createElement("script");
       mckOptinForm.setAttribute("src", window.mck_rUrl + "/lib/optinForm.js");
       mckOptinForm.setAttribute("campId", campid);
       mckOptinForm.setAttribute("EID", campid);
       mckOptinForm.setAttribute("userid", userid);
       mckOptinForm.setAttribute("name", "MCK_OPTINFORM");
       var body = document.getElementsByTagName("body")[0];
       body.appendChild(mckOptinForm);
      };
      //End Optin Form

      //Club
      leadengagr.initclub = function(campid) {
        var element_data = leadengagr.campaigns[campid].element_data;
        var userid = window.userid;
        if(document.querySelector(".club_"+userid)) {
          let id = document.querySelector(".club_"+userid).getAttribute("EID");
          id += ", "+ campid;
          document.querySelector(".club_"+userid).setAttribute("EID", id);
        } else {
          var mckclub = document.createElement("script");
          mckclub.classList.add("club_"+userid);
          mckclub.setAttribute("src", window.mck_rUrl + "/lib/club.js");
          mckclub.setAttribute("campId", campid);
          mckclub.setAttribute("EID", campid);
          mckclub.setAttribute("userid", userid);
          mckclub.setAttribute("name", "MCK_CLUB");
          var body = document.getElementsByTagName("body")[0];
          body.appendChild(mckclub);
        }
      };
      //Club

      //Review Engin
      leadengagr.initReviewEngin = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var userid = window.userid;
       var mckclub = document.createElement("script");
       mckclub.setAttribute("src", window.mck_rUrl + "/lib/reviewEngin.js");
       mckclub.setAttribute("campId", campid);
       mckclub.setAttribute("EID", campid);
       mckclub.setAttribute("userid", userid);
       mckclub.setAttribute("name", "MCK_REVIEW_ENGIN");
       var body = document.getElementsByTagName("body")[0];
       body.appendChild(mckclub);
      };
      //Review Engin

      // Autoplay Video
      leadengagr.initAutoplayVideo = function(campid) {
        var element_data = leadengagr.campaigns[campid].element_data;
        var userid = window.userid;
        var mckautoplay = document.createElement("script");
        mckautoplay.setAttribute("src", window.mck_rUrl + "/lib/autoplay.js");
        mckautoplay.setAttribute("campId", campid);
        mckautoplay.setAttribute("EID", campid);
        mckautoplay.setAttribute("userid", userid);
        mckautoplay.setAttribute("name", "MCK_AUTOPLAY_VIDEO");
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(mckautoplay);
      }

      // Proof App
      leadengagr.initProofApp = function(campid) {
        var element_data = leadengagr.campaigns[campid].element_data;
        var userid = window.userid;
        var mckproofapp = document.createElement("script");
        mckproofapp.setAttribute("src", window.mck_rUrl + "/lib/proofApp.js");
        mckproofapp.setAttribute("campId", campid);
        mckproofapp.setAttribute("EID", campid);
        mckproofapp.setAttribute("userid", userid);
        mckproofapp.setAttribute("name", "MCK_PROOF_APP");
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(mckproofapp);
      }
      // Proof App  

      //Dynemic Element
      leadengagr.initdynemic_Element = function(campid, postion, color, bg, items = []) {
        var element_data = leadengagr.campaigns[campid].element_data;
        var funct = "leadengagr.loadClick('" + campid + "',0);";
        var items = element_data.items;
        var leadengagr_dynemic = document.getElementById("dy_elem_" + campid);
        window.mck_createStyle("dy_elem_fontAwasome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css");
        if (!leadengagr_dynemic) {
         var style = document.createElement("style");
         style.setAttribute("id", "dy_elem_" + campid);
         var dy_parent = document.createElement("div");
         var temp = "";
         style.innerHTML =
          ".dynamic_elements2{position:fixed;bottom:30px;right:30px}.dynamic_elements2 .mck_toggle{display:block;cursor:pointer;height:50px;padding-top:20px}.dynamic_elements2 .mck_toggle span{display:block;width:30px;height:6px;background:#313131;margin-bottom:4px;border-radius:100px;-webkit-transition:all .3s ease;-moz-transition:all .3s ease;-ms-transition:all .3s ease;-o-transition:all .3s ease;transition:all .3s ease}.dynamic_elements2 .mck_toggle span:nth-child(3){opacity:0;visibility:hidden}.dynamic_elements2 .mck_toggle span:nth-child(2){width:20px;margin-left:auto}.dynamic_elements2 .mck_toggle:hover span:nth-child(2){width:30px}.dynamic_elements2 .mck_social_icon{position:absolute;width:60px;text-align:center;bottom:100%;right:-10px}.dynamic_elements2 .mck_social_icon>ul{padding:0;margin:0}.dynamic_elements2 .mck_social_icon>ul>li{list-style:none;transition:.3s ease-in-out;opacity:0;visibility:hidden;transform:translateX(20px)}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li{opacity:1;visibility:visible}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li{transform:translateX(0)}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li:nth-child(01){transition:.4s ease-in-out}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li:nth-child(02){transition:.4s ease-in-out .1s}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li:nth-child(03){transition:.4s ease-in-out .2s}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li:nth-child(04){transition:.4s ease-in-out .3s}.dynamic_elements2 .mck_toggle:hover .mck_social_icon>ul>li:nth-child(05){transition:.4s ease-in-out .4s}.dynamic_elements2 .mck_social_icon>ul>li>a{display:inline-block;padding:10px 0}.dynamic_elements2 .mck_social_icon>ul>li>a>svg{fill:#3A3A3A;width:20px;height:20px}.dynamic_elements2 .mck_social_icon>ul>li:nth-child(1) a>svg{fill:#25D366}.dynamic_elements2 .mck_social_icon>ul>li:nth-child(2) a>svg{fill:#bd081c}.dynamic_elements2 .mck_social_icon>ul>li:nth-child(3) a>svg{fill:#1da1f2}.dynamic_elements2 .mck_social_icon>ul>li:nth-child(4) a>svg{fill:#0a66c2}.dynamic_elements2 .mck_social_icon>ul>li:nth-child(5) a>svg{fill:#1877f2}";
          temp += '<div class="mck_dyelement dynamic_elements2"><div class="mck_toggle"><span></span><span></span><span></span><div class="mck_social_icon"><ul>';
 
         for (var i = 0; i < items.length; i++) {
           if(items[i].text == "Whatsapp") {
             if(items[i].link) {
               temp += '<li data-label="Whatsapp"><a href='+items[i].link+' onclick="' + funct + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.44 10.49"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M8.92,1.52A5.2,5.2,0,0,0,0,5.2a5.11,5.11,0,0,0,.7,2.59L0,10.49l2.76-.72a5.22,5.22,0,0,0,2.48.63h0A5.2,5.2,0,0,0,8.92,1.52m-3.68,8h0A4.35,4.35,0,0,1,3,8.92l-.16-.1-1.63.43.43-1.59-.1-.16A4.33,4.33,0,0,1,8.3,2.14,4.33,4.33,0,0,1,5.24,9.52"/><path class="cls-1" d="M7.61,6.28l-.89-.42c-.11,0-.2-.06-.29.07A5.69,5.69,0,0,1,6,6.44c-.07.08-.15.09-.28,0a3.48,3.48,0,0,1-1-.65A3.72,3.72,0,0,1,4,4.92.18.18,0,0,1,4,4.66a2.33,2.33,0,0,0,.19-.23.67.67,0,0,0,.13-.21.21.21,0,0,0,0-.23l-.4-1c-.1-.25-.21-.21-.29-.22H3.4A.46.46,0,0,0,3.06,3,1.44,1.44,0,0,0,2.6,4a2.61,2.61,0,0,0,.53,1.35,6,6,0,0,0,2.22,2c.31.13.55.21.74.27a1.82,1.82,0,0,0,.82,0,1.34,1.34,0,0,0,.88-.62,1.14,1.14,0,0,0,.07-.61c0-.06-.12-.09-.25-.16"/></g></svg></a></li>'
             }
           }
           if(items[i].text == "Pinterest") {
             if(items[i].link) {
               temp += '<li data-label="Pinterest"><a href='+items[i].link+' onclick="' + funct + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.85 10.9"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="#cb2027" d="M4.58,0C1.59,0,0,2,0,4.19A3.08,3.08,0,0,0,1.41,6.87c.13.06.2,0,.23-.09L1.83,6a.2.2,0,0,0-.05-.2,2.75,2.75,0,0,1-.51-1.58,3,3,0,0,1,3.12-3A2.74,2.74,0,0,1,7.29,4c0,1.87-1,3.17-2.18,3.17A1,1,0,0,1,4.08,6a13.4,13.4,0,0,0,.58-2.31.87.87,0,0,0-.88-1c-.69,0-1.25.72-1.25,1.68a2.51,2.51,0,0,0,.21,1L1.92,8.82a6.16,6.16,0,0,0,0,1.77.34.34,0,0,0,.23.29.35.35,0,0,0,.41-.15,7.36,7.36,0,0,0,.71-1.57c.09-.33.43-1.65.43-1.65a1.87,1.87,0,0,0,1.59.8c2.09,0,3.6-1.92,3.6-4.31A4.06,4.06,0,0,0,4.58,0"/></g></g></svg></a></li>'
             }
           }
           if(items[i].text == "Twitter") {
             if(items[i].link) {
               temp += '<li data-label="Twitter"><a href='+items[i].link+' onclick="' + funct + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.92 8.06"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="#55acee" d="M3.12,8.06A5.75,5.75,0,0,0,8.91,2.27c0-.09,0-.18,0-.26A4.28,4.28,0,0,0,9.92,1a3.91,3.91,0,0,1-1.17.32A2,2,0,0,0,9.64.15,4.1,4.1,0,0,1,8.35.64,2,2,0,0,0,4.83,2a2.42,2.42,0,0,0,0,.47A5.79,5.79,0,0,1,.69.37a2.09,2.09,0,0,0-.28,1,2,2,0,0,0,.91,1.69A1.93,1.93,0,0,1,.4,2.83v0A2,2,0,0,0,2,4.85a1.91,1.91,0,0,1-.54.08,2.45,2.45,0,0,1-.38,0A2,2,0,0,0,3,6.3a4,4,0,0,1-2.52.87,3.91,3.91,0,0,1-.49,0,5.74,5.74,0,0,0,3.12.92"/></g></g></svg></a></li>'
             }
           }
           if(items[i].text == "Linkedin") {
             if(items[i].link) {
               temp += '<li data-label="Linkedin"><a href='+items[i].link+' onclick="' + funct + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.37 9.35"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M.15,3.11h2V9.35H.15ZM1.13,0A1.12,1.12,0,0,1,2.25,1.13,1.12,1.12,0,0,1,1.13,2.25,1.13,1.13,0,1,1,1.13,0"/><path d="M3.32,3.11H5.18V4h0A2.05,2.05,0,0,1,7,3c2,0,2.33,1.29,2.33,3V9.35H7.43v-3c0-.72,0-1.65-1-1.65s-1.17.79-1.17,1.6V9.35H3.32Z"/></g></g></svg></a></li>'
             }
           }
           if(items[i].text === "Facebook") {
             if(items[i].link) {
               temp += '<li data-label="Facebook"><a href='+items[i].link+' onclick="' + funct + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.18 11.9"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="#3b5998" d="M4,11.9V6.47H5.83l.28-2.11H4V3c0-.62.17-1,1-1H6.18V.08C6,.06,5.32,0,4.55,0A2.55,2.55,0,0,0,1.83,2.8V4.36H0V6.47H1.83V11.9Z"/></g></g></svg></a></li>'
             }
           }
           if(items[i].text === "Reddit") {
             if(items[i].link) {
               temp += '<li data-label="Reddit"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="reddit-alien" class="svg-inline--fa fa-reddit-alien fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FF5700" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Skype") {
             if(items[i].link) {
               temp += '<li data-label="Skype"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="skype" class="svg-inline--fa fa-skype fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#00AFF0" d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Vimeo") {
             if(items[i].link) {
               temp += '<li data-label="Vimeo"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="vimeo-v" class="svg-inline--fa fa-vimeo-v fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#1AB7EA" d="M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Telegram") {
             if(items[i].link) {
               temp += '<li data-label="Telegram"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram-plane" class="svg-inline--fa fa-telegram-plane fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#0088CC" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Instagram") {
             if(items[i].link) {
               temp += '<li data-label="Instagram"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E4405F" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Behance") {
             if(items[i].link) {
               temp += '<li data-label="Behance"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="behance" class="svg-inline--fa fa-behance fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#053eff" d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path></svg></a></li>'
             }
           }
           if(items[i].text === "Dribbble") {
             if(items[i].link) {
               temp += '<li data-label="Dribbble"><a href='+items[i].link+' onclick="' + funct + '"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="dribbble" class="svg-inline--fa fa-dribbble fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#EA4C89" d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path></svg></a></li>'
             }
           }
           
           if( i == (items.length-1) ) {
             temp += "</ul></div></div></div>";
 
             dy_parent.innerHTML += temp;
           }
         }
         
         style.innerHTML = style.innerHTML + temp.style;
         var head = document.getElementsByTagName("head")[0];
         var body = document.getElementsByTagName("body")[0];
         head.appendChild(style);
         body.appendChild(dy_parent);
        }
       };
    
      // ..........
      leadengagr.initTabMessage = function(campid) {
       leadengagr.tab_message = {};
       leadengagr.tab_message.oldTitle = document.title;
       var link;
       if (document.querySelector("link[rel*='icon']") === null) {
        link = document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        document.getElementsByTagName("head")[0].appendChild(link);
       }
       link = document.querySelector("link[rel*='icon']");
       link.type = "image/x-icon";
       link.rel = "shortcut icon";
       leadengagr.tab_message.oldFavicon = link.href;
       if (leadengagr.campaigns[campid].element_data.sound == 1) {
        var audio = document.createElement("DIV");
        audio.innerHTML = '<audio src="' + window.mck_rUrl + '/files/sound.mp3" id="leadengagr_tabsound"></audio>';
        document.getElementsByTagName("body")[0].appendChild(audio);
       }
       setInterval(function() {
        if (document.hasFocus()) {
         if (leadengagr.tab_message.intervalinit !== undefined) {
          if (document.title != leadengagr.tab_message.oldTitle) {
           document.title = leadengagr.tab_message.oldTitle;
           document.querySelector("link[rel*='icon']").href = leadengagr.tab_message.oldFavicon;
          }
          if (leadengagr.tab_message.interval !== undefined) {
           clearInterval(leadengagr.tab_message.interval);
           leadengagr.tab_message.intervalinit = undefined;
          }
         }
        } else {
         if (leadengagr.campaigns[campid].element_data.sound == 1) {
          if (!leadengagr.tab_message.tabsoundplayed) {
           setTimeout(function() {
            if (!document.hasFocus()) {
             leadengagr.tab_message.tabsoundplayed = 1;
             var tabelemnt = document.getElementById("leadengagr_tabsound");
             if(tabelemnt) tabelemnt.play();
            }
           }, parseInt(leadengagr.campaigns[campid].element_data.timeBeforeFirst ? 2 : leadengagr.campaigns[campid].element_data.timeBeforeFirst) * 1000);
          }
         }
         if (!leadengagr.tab_message.intervalinit) {
          leadengagr.tab_message.intervalinit = 1;
          setTimeout(function() {
           if (!document.hasFocus()) {
            var i = 0;
            var iconFavicon = leadengagr.campaigns[campid].element_data.messages[i].icon;
            var isImage = leadengagr.campaigns[campid].element_data.isImage;
            if (document.title != leadengagr.campaigns[campid].element_data.messages[i].text) {
             document.title = leadengagr.campaigns[campid].element_data.messages[i].text;
             if (isImage) document.querySelector("link[rel*='icon']").href = window.mck_rUrl + "/contains/" + iconFavicon;
             else document.querySelector("link[rel*='icon']").href = leadengagr.getFaviconIcon(iconFavicon);
             i++;
            }
            leadengagr.tab_message.interval = setInterval(function() {
             document.title = leadengagr.campaigns[campid].element_data.messages[i].text;
             if (isImage) document.querySelector("link[rel*='icon']").href = window.mck_rUrl + "/contains/" + iconFavicon;
             else document.querySelector("link[rel*='icon']").href = leadengagr.getFaviconIcon(iconFavicon);
             i++;
             if (i >= leadengagr.campaigns[campid].element_data.messages.length) {
              i = 0;
             }
            }, parseInt(leadengagr.campaigns[campid].element_data.frequency) * 1000);
           }
          }, parseInt(leadengagr.campaigns[campid].element_data.timeBeforeFirst ? 2 : leadengagr.campaigns[campid].element_data.timeBeforeFirst) * 1000);
         }
        }
       }, 200);
      };
      leadengagr.iconCode = null;
      leadengagr.getFaviconIcon = function(iconCode) {
       if (!leadengagr.iconCode) {
        const canvas = document.createElement("canvas");
        canvas.height = 55;
        canvas.width = 55;
        const ctx = canvas.getContext("2d");
        ctx.font = "55px serif";
        ctx.fillText(iconCode, 0, 55);
        leadengagr.iconCode = canvas;
       }
       return leadengagr.iconCode.toDataURL();
      };
      //........
      leadengagr.initUrgencyTimer = function(campid) {
       var element_data = leadengagr.campaigns[campid].element_data;
       var leadengagr_UrgencyTimer = document.getElementById("leadengagr_UrgencyTimer");
       if (!leadengagr_UrgencyTimer) {
        var script = document.createElement("script");
        //script.setAttribute('src',window.mck_rUrl+'/lib/geoRedirection.js')
        script.innerHTML =
         'function leadengagr_urgencyTimerFunc(id, text, timer,style,label,timerText) {var countDownDate = new Date(timer).getTime();var x = setInterval(function() {var now = new Date().getTime();var distance = countDownDate - now;if(distance<=0)return;var days = Math.floor(distance / (1000 * 60 * 60 * 24));var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));var seconds = Math.floor((distance % (1000 * 60)) / 1000);document.getElementById(id).innerHTML =  "<div "+style+"> <div "+timerText+"><span>"+hours+" :</span><center><div "+label+">H</div></center></div><div "+timerText+"><span>"+minutes+" :</span><center><div "+label+">M</div></center></div><div "+timerText+"><span>"+seconds+"</span><center><div "+label+">S</div></center></div></div>";if (distance <= 0) {clearInterval(x);document.getElementById(id).innerHTML = text;window.location.replace(text);}}, 1000);}';
        script.setAttribute("id", "leadengagr_UrgencyTimer");
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
       }
       var style1 = "class='urgencyMain'";
       var label = "class='urgencyLabel'";
       var timerText = "class='urgencyTime'";
       leadengagr_urgencyTimerFunc(campid, element_data.redirectUrl, element_data.timer, style1, label, timerText);
       var ele = document.getElementById(campid);
       var style = document.createElement("style"); //"font-size:"+element_data.fontSize+"px;color:"+element_data.fontColor+";";
       style.innerHTML =
        ".urgencyMain{display:flex;font-size:20px}.urgencyMain div{padding-left:10px;text-align: center;}.urgencyTime{font-size:" +
        element_data.fontSize +
        "px;color:" +
        element_data.fontColor +
        ";font-weight:" +
        element_data.timerBold +
        ";}.urgencyLabel{font-size:" +
        element_data.labelSize +
        "px;color:" +
        element_data.labelColor +
        ";display: table-footer-group;font-weight:" +
        element_data.labelBold +
        ";}";
       var head = document.getElementsByTagName("head")[0];
       head.appendChild(style);
      };
      // .............
      // leadengagr.initTimerElement = function(campid) {
      //  var color = leadengagr.campaigns[campid].element_data["timerColor"];
      //  var bgcolor = leadengagr.campaigns[campid].element_data["highlightColor"];
      //  var template = leadengagr.campaigns[campid].element_data["timerTemplate"];
      //  var html =
      //   '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" /><style>           .leadengagr_timer_class' +
      //   campid +
      //   " .mck_clock_" +
      //   campid +
      //   "{display: inline-block;color:" +
      //   leadengagr.campaigns[campid].element_data.timerColor +
      //   ";font-size: " +
      //   leadengagr.campaigns[campid].element_data.timerFontSize +
      //   "px;font-family:" +
      //   leadengagr.campaigns[campid].element_data.timerFont +
      //   ";             font-weight:500;           }           .leadengagr_timer_class" +
      //   campid +
      //   " .mck_daysleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_hoursleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_minsleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_secsleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_holder,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_separator{               margin: 0 5px;               display: inline-block;               text-align: center;           }           .leadengagr_timer_class" +
      //   campid +
      //   " .mck_holder{               display: block !important;             color:" +
      //   leadengagr.campaigns[campid].element_data.labelColor +
      //   ";               font-size: " +
      //   leadengagr.campaigns[campid].element_data.labelFontSize +
      //   "px;               margin-top: 20px;             font-family:" +
      //   leadengagr.campaigns[campid].element_data.labelFont +
      //   ";           }           .leadengagr_timer_class" +
      //   campid +
      //   " h{             font-size:" +
      //   leadengagr.campaigns[campid].element_data.highlightFontSize +
      //   "px;             color:" +
      //   leadengagr.campaigns[campid].element_data.highlightColor +
      //   ";             font-family:" +
      //   leadengagr.campaigns[campid].element_data.highlightFont +
      //   ";             background:" +
      //   leadengagr.campaigns[campid].element_data.highlightBgColor +
      //   ";             display:inline-block;             padding:0 3px;           }           .leadengagr_timer_class" +
      //   campid +
      //   " .mck_separator{               vertical-align: top;           }           @media screen and (max-width:960px){               .leadengagr_timer_class" +
      //   campid +
      //   "  .mck_holder{                   display: none;               }           }           @media screen and (max-width:500px){               .leadengagr_timer_class" +
      //   campid +
      //   "  .mck_holder{                   display: none !important;               }               .leadengagr_timer_class" +
      //   campid +
      //   " .mck_daysleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_hoursleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_minsleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_secsleft,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_holder,.leadengagr_timer_class" +
      //   campid +
      //   " .mck_separator{                   text-align: center;                   margin:3px;               }               .TMPmck_clock_" +
      //   campid +
      //   "{                   font-size: 35px;               }               .mck_holder{                   font-size: 10px;                   margin-top: 8px;               }           } ";
      //  if (template == "template2") html = html + ".timerClassdefault{background-color:" + bgcolor + ";color:" + color + " } ";
      //  html = html + " </style> ";
    
      //  var dv = document.createElement("div");
      //  dv.innerHTML = html;
      //  dv.id = "timer_" + campid;
      //  document.getElementsByTagName("body")[0].appendChild(dv);
      //  var mckqTimer = document.querySelectorAll(".leadengagr_container_clock" + campid);
      //  if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
      //   mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".leadengagr_container_clock" + campid));
      //  }
      //  mckqTimer.forEach(function(item) {
      //   item.innerHTML =
      //    '<div style="width:100%;text-align:center" class="leadengagr_timer_class' +
      //    campid +
      //    '"><div class="leadengagr_clock_text" style="line-height:' +
      //    (parseInt(leadengagr.campaigns[campid].element_data.titleFontSize) + 7) +
      //    "px;font-size:" +
      //    leadengagr.campaigns[campid].element_data.titleFontSize +
      //    "px;color:" +
      //    leadengagr.campaigns[campid].element_data.titleColor +
      //    ";font-family:" +
      //    leadengagr.campaigns[campid].element_data.titleFont +
      //    ';margin-bottom:10px">' +
      //    leadengagr.campaigns[campid].element_data.title +
      //    '</div><div class="mck_clock_' +
      //    campid +
      //    '"></div></div>';
      //  });
      //  leadengagr.initClock(campid);
      // };
    
      // ..........
      leadengagr.initVideo = function(campid) {
       var elemenetData = leadengagr.campaigns[campid].element_data;
       var id = campid;
       var img = elemenetData.image;
       var video = elemenetData.url;
       var element = document.getElementById("video_" + id);
       if(element){
        element.setAttribute("href", video);
        element.classList.add("mediabox");
        var thumb = document.createElement("IMG");
        thumb.setAttribute("style", "height:auto;width:100%;");
        thumb.setAttribute("src", img);
        element.appendChild(thumb);
        }
       window.mck_createScript("leadengagr_video_player_link", window.mck_rUrl + "/lib/video.js");
       window.mck_createStyle("leadengagr_video_player_link_style", window.mck_rUrl + "/lib/video.css");
      };
    
      leadengagr.initImagePopUp = function(campid) {
       var elemenetData = leadengagr.campaigns[campid].element_data;
       var id = elemenetData.id;
       var img = elemenetData.image;
       leadengagr.initImagePopUplib();
       var leadEngVideoOverlay = document.getElementById("image_" + id);
       if (leadEngVideoOverlay) leadEngVideoOverlay.innerHTML = '<a href="' + img + '" class="img-lightbox-link" aria-hidden="true" rel="lightbox"><img src="' + img + '" alt="Image Lightbox" /></a>';
      };
    
      leadengagr.initGeoRedirection = function(campid) {
       var counties = leadengagr.campaigns[campid].element_data.redirection;
       var leadengagr_geoScript = document.getElementById("leadengagr_geoScript");
       if (!leadengagr_geoScript) {
        var script = document.createElement("script");
        script.innerHTML =
         'function leadEngarge_gro_Redirection(onSuccess) { var xhttp = new XMLHttpRequest();xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {onSuccess(this.responseText);}};xhttp.open("GET", "https://ipapi.co/json/", true);xhttp.send();}';
        script.setAttribute("id", "leadengagr_geoScript");
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
       }
    
       leadEngarge_gro_Redirection((json) => {
        var details = JSON.parse(json);
        var regx = new RegExp(details.country_code, "g");
        counties.forEach((element) => {
         if (element.country.match(regx)) {
          window.location.href = element.redirectUrl;
         }
        });
       });
      };
      //End Video Player
      leadengagr.setCampaign = function(campid) {
        var element = leadengagr.campaigns[campid];
        if (element.element_type == "window_back") {
          if (!leadengagr.window_back_called) {
          leadengagr.window_back_called = 1;
          leadengagr.initWindowback(campid);
          }
        } else if (element.element_type == "tab_message") {
          if (!leadengagr.tab_message_called) {
          leadengagr.tab_message_called = 1;
          leadengagr.initTabMessage(campid);
          }
        } else if (element.element_type == "urgencyTimer") {
          if (!leadengagr.urgencyTimer_called) {
          leadengagr.urgencyTimer_called = 1;
          leadengagr.initUrgencyTimer(campid);
          }
        } else if (element.element_type == "bonus_popup") {
          if (!leadengagr.bonus_popup_called) {
          leadengagr.bonus_popup_called = 1;
          leadengagr.initBonusPopupElement(campid);
          }
        } else if (element.element_type == "hellobar") {
          if (!leadengagr.hellobar_called) {
          leadengagr.hellobar_called = 1;
          leadengagr.initHelloBarElement(campid);
          }
        } else if (element.element_type == "timer") {
          leadengagr.initTimerElement(campid);
        } else if (element.element_type == "hellobar_timer") {
          if (!leadengagr.hellobar_timer_called) {
          leadengagr.hellobar_timer_called = 1;
          leadengagr.initHelloBarTimerElement(campid);
          }
        } else if (element.element_type == "exit_intent") {
          if (!leadengagr.exit_intent_called) {
          leadengagr.exit_intent_called = 1;
          leadengagr.initExitIntent(campid);
          }
        } else if (element.element_type == "mobile_vib") {
          if (!leadengagr.mobile_vib_called) {
          leadengagr.mobile_vib_called = 1;
          leadengagr.initVibrator(campid);
          }
        } else if (element.element_type == "review_box") {
          if (!leadengagr.review_box_called) {
          leadengagr.review_box_called = 1;
          leadengagr.initReviewBoxElement(campid);
          }
        } else if (element.element_type == "video_popup") {
          if (!leadengagr.video_popup_called) {
          leadengagr.video_popup_called = 1;
          leadengagr.initVideo(campid);
          }
        } else if (element.element_type == "image_popup") {
          if (!leadengagr.autoplay_image_called) {
          leadengagr.autoplay_image_called = 1;
          leadengagr.initImagePopUp(campid);
          }
        } else if (element.element_type == "geoRedirection") {
          if (!leadengagr.geoRedirection_called) {
          leadengagr.geoRedirection_called = 1;
          leadengagr.initGeoRedirection(campid);
          }
        } else if (element.element_type == "dynemic_element") {
          if (!leadengagr.dynemic_element_called) {
          leadengagr.dynemic_element_called = 1;
          leadengagr.initdynemic_Element(campid);
          }
        } else if (element.element_type == "chatbot") {
          if (!leadengagr.chatbot_called) {
          leadengagr.chatbot_called = 1;
          leadengagr.initChatBot(campid);
          }
        }else if(element.element_type == "optinForm"){
          if(!leadengagr.optinForm_called){
            leadengagr.optinForm_called = 1;
            leadengagr.initOptinForm(campid);
          }
        }else if(element.element_type == "club"){
          let layout = element.element_data.layout;
          
          if(!leadengagr.club_called){
            leadengagr.club_called = {};
            leadengagr.club_called["Club"+layout] = 1;
            leadengagr.initclub(campid);
          } else {
            if(layout === 3) {
              leadengagr.club_called["Club"+layout] = 1;
              leadengagr.initclub(campid);
            } else {
              if(!leadengagr.club_called["Club"+layout]) {
                leadengagr.club_called["Club"+layout] = 1;
                leadengagr.initclub(campid);
              }
            }
          }
        }else if(element.element_type == "reviewEngin"){
          if(!leadengagr.reviewEngin_called){
          leadengagr.reviewEngin_called = 1;
            leadengagr.initReviewEngin(campid);
          }
        }else if(element.element_type == "autoplay_video"){
          if(!leadengagr.autoplayVideo_called){
            leadengagr.autoplayVideo_called = 1;
            leadengagr.initAutoplayVideo(campid);
          }
        }else if(element.element_type == "proof_app"){
          if(!leadengagr.proofApp_called) {
            leadengagr.proofApp_called = 1;
            leadengagr.initProofApp(campid);
          }
        }
      };
      leadengagr.check_campaign_display_conditions = function(campid) {
       if (!leadengagr.campaigns[campid].camp_displaycondition) {
        leadengagr.setCampaign(campid);
       } else {
        if (window.innerWidth < 1024) {
         camp_condition = leadengagr.campaigns[campid].camp_displaycondition.mobile;
        } else {
         camp_condition = leadengagr.campaigns[campid].camp_displaycondition.desktop;
        }
        if (camp_condition.type == "TIME") {
         setTimeout(function() {
          leadengagr.setCampaign(campid);
         }, camp_condition.data * 1000);
        } else if (camp_condition.type == "SCROLL") {
         if (
          window.innerHeight ==
          Math.max(
           document.body.scrollHeight,
           document.documentElement.scrollHeight,
           document.body.offsetHeight,
           document.documentElement.offsetHeight,
           document.body.clientHeight,
           document.documentElement.clientHeight
          )
         ) {
          leadengagr.setCampaign(campid);
         }
         window.onscroll = function() {
          if (window.pageYOffset > (camp_condition.data * document.body.offsetHeight) / 100) {
           if (leadengagr.loadedcampaign != 1) {
            leadengagr.setCampaign(campid);
            leadengagr.loadedcampaign = 1;
           }
          }
         };
        } else if (camp_condition.type == "LEAVE") {
         document.addEventListener("mouseout", function(e) {
          if (e.clientY < 0) {
           if (leadengagr.loadedcampaign != 1) {
            leadengagr.loadedcampaign = 1;
            leadengagr.setCampaign(campid);
           }
          }
         });
        } else if (camp_condition.type == "LOAD") {
         leadengagr.setCampaign(campid);
        }
       }
      };
      leadengagr.check_mck_IncludeCampign = function() {
       var flg = 0;
       var matchedcampaigns = [];
       var cloc = window.location.href;
       if (leadengagr.mck_IncludeCampign.contains !== undefined) {
        leadengagr.mck_IncludeCampign.contains.forEach(function(item) {
         if (item.check != "" && cloc.indexOf(item.check) !== -1) {
          flg = 1;
          matchedcampaigns.push(item.campid);
         }
        });
       }
       if (leadengagr.mck_IncludeCampign.regex !== undefined) {
        leadengagr.mck_IncludeCampign.regex.forEach(function(item) {
         var pattern = new RegExp(item.check);
         if (pattern.test(cloc)) {
          flg = 1;
          matchedcampaigns.push(item.campid);
         }
        });
       }
       if (leadengagr.mck_IncludeCampign.exact !== undefined) {
        leadengagr.mck_IncludeCampign.exact.forEach(function(item) {
         if (cloc == item.check || cloc == item.check + "/") {
          flg = 1;
          matchedcampaigns.push(item.campid);
         }
         if (cloc.regexChange("/", "") == item.check) {
          flg = 1;
          matchedcampaigns.push(item.campid);
         }
        });
       }
       if (location.pathname == "/") {
        if (leadengagr.mck_IncludeCampign.showatroot !== undefined) {
         Object.keys(leadengagr.mck_IncludeCampign.showatroot).forEach(function(index, item) {
          if (leadengagr.mck_IncludeCampign.showatroot[index] == 1) {
           flg = 1;
           matchedcampaigns.push(index);
          }
         });
        }
       }
       leadengagr.websites.forEach(function(item) {
        if (location.host.indexOf(item) !== -1) {
         flg = 1;
        }
       });
       if (window.leadengagr_sbdom !== undefined) {
        flg = 1;
       }
       window.mck_tackingCamp(matchedcampaigns);
       leadengagr.loadView(matchedcampaigns);
       if (matchedcampaigns.length > 0 && flg == 1) {
        matchedcampaigns.reverse();
        //leadengagr.track_visitor(matchedcampaigns);
        matchedcampaigns.forEach(function(item) {
         leadengagr.check_campaign_display_conditions(item);
        });
       } else {
        matchedcampaigns = [];
        if (leadengagr.mck_IncludeCampign.contains !== undefined) {
         leadengagr.mck_IncludeCampign.contains.forEach(function(item) {
          if (item.check != "" && cloc.indexOf(item.check) !== -1) {
           flg = 1;
           matchedcampaigns.push(item.campid);
          }
         });
        }
        if (matchedcampaigns.length > 0) {
         matchedcampaigns.reverse();
         matchedcampaigns.forEach(function(item) {
          leadengagr.check_campaign_display_conditions(item);
         });
        }
       }
      };
      leadengagr.initClock = function(campid) {
       if (leadengagr.campaigns[campid].element_data.timerType == "cookie") {
        time =
         1000 *
         (parseInt(leadengagr.campaigns[campid].element_data.days) * 24 * 60 * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.hours) * 60 * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.minutes) * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.seconds));
        if (!leadengagr.getItem("leadengagr_timer_" + campid)) {
         leadengagr.setData("leadengagr_timer_" + campid, new Date(), 60);
        } else {
         var nw = new Date();
         var d = new Date(leadengagr.getItem("leadengagr_timer_" + campid));
         time = time - (nw - d);
        }
       } else if (leadengagr.campaigns[campid].element_data.timerType == "evergreen") {
        var duration =
         1000 *
         (parseInt(leadengagr.campaigns[campid].element_data.days) * 24 * 60 * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.hours) * 60 * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.minutes) * 60 +
          parseInt(leadengagr.campaigns[campid].element_data.seconds));
        if (!leadengagr.getItem("leadengagr_timer_" + campid)) {
         var date = new Date();
         date.setTime(date.getTime() + duration);
         var expires = "; expires=" + date.toGMTString();
         document.cookie = "leadengagr_timer_" + campid + "=" + new Date() + "; expires=" + expires + "; path=/";
         time = duration;
        } else {
         var nw = new Date();
         var d = new Date(leadengagr.getItem("leadengagr_timer_" + campid));
         time = duration - ((nw - d) % duration);
        }
       } else {
        var currentTimezone = new Date().toLocaleString("en-US", { timeZone: leadengagr.campaigns[campid].element_data.timezone });
        var date = new Date(currentTimezone);
        time = parseInt(leadengagr.campaigns[campid].element_data.endTimeUTC) - date;
       }
       if (!leadengagr.langs) {
        leadengagr.langs = {};
       }
       if (leadengagr.campaigns[campid].element_type == "hellobar_timer") {
        if (!leadengagr.campaigns[campid].element_data.timerTemplate) {
         leadengagr.campaigns[campid].element_data.timerTemplate == "template1";
        }
        if (leadengagr.campaigns[campid].element_data.labels !== undefined) {
         leadengagr.langs[".mck_clock_2"] = leadengagr.campaigns[campid].element_data.labels;
        } else {
         leadengagr.langs[".mck_clock_2"] = {
          days: "Days",
          hours: "Hours",
          minutes: "Minutes",
          seconds: "Seconds",
         };
        }
        if (time <= 1000) {
         if (!window.leadengagr_in_dashboard) {
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "redirect") {
            if(leadengagr.campaigns[campid].element_data.postExpiryRedirectUrl) {
              window.top.location = leadengagr.campaigns[campid].element_data.postExpiryRedirectUrl;
            }
          }
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "static") {
           leadengagr.loadclock(1000, ".mck_clock_2", leadengagr.campaigns[campid].element_data.timerTemplate);
          }
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "hide") {
           var mckqTimer = document.querySelectorAll(".hello_bar_outer_leadengagr");
           if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
            mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".hello_bar_outer_leadengagr"));
           }
           mckqTimer.forEach(function(item) {
            item.remove();
           });
          }
         }
        } else {
         leadengagr.loadclock(time, ".mck_clock_2", leadengagr.campaigns[campid].element_data.timerTemplate);
        }
        if (leadengagr.campaigns[campid].element_data.position == "top") {
         leadengagr.hbartopinterval = setInterval(function() {
          var mckqTimer = document.querySelectorAll("body");
          if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
           mckqTimer = Array.prototype.slice.call(document.querySelectorAll("body"));
          }
          mckqTimer.forEach(function(item) {
           var mckqTimer2 = document.querySelectorAll(".hello_bar_outer_leadengagr");
           if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
            mckqTimer2 = Array.prototype.slice.call(document.querySelectorAll(".hello_bar_outer_leadengagr"));
           }
           mckqTimer2.forEach(function(item2) {
            item.style.marginTop = item2.clientHeight + "px";
           });
          });
          var mckqTimer = document.querySelectorAll(".iframe-container_leadenagr");
          if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
           mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".iframe-container_leadenagr"));
          }
          mckqTimer.forEach(function(item) {
           var mckqTimer2 = document.querySelectorAll(".hello_bar_outer_leadengagr");
           if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
            mckqTimer2 = Array.prototype.slice.call(document.querySelectorAll(".hello_bar_outer_leadengagr"));
           }
           mckqTimer2.forEach(function(item2) {
            item.style.top = item2.clientHeight + "px";
           });
          });
         }, 400);
         setTimeout(function() {
          clearInterval(leadengagr.hbartopinterval);
         }, 2000);
        }
       } else {
        if (leadengagr.campaigns[campid].element_data.labels !== undefined) {
         leadengagr.langs[".mck_clock_" + campid] = leadengagr.campaigns[campid].element_data.labels;
        } else {
         leadengagr.langs[".mck_clock_" + campid] = {
          days: "Days",
          hours: "Hours",
          minutes: "Minutes",
          seconds: "Seconds",
         };
        }
        if (time <= 1000) {
         if (!window.leadengagr_in_dashboard) {
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "redirect") {
            if(leadengagr.campaigns[campid].element_data.postExpiryRedirectUrl) {
              window.top.location = leadengagr.campaigns[campid].element_data.postExpiryRedirectUrl;
            }
          }
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "static") {
           leadengagr.loadclock(1000, ".mck_clock_" + campid, leadengagr.campaigns[campid].element_data.timerTemplate);
          }
          if (leadengagr.campaigns[campid].element_data.postExpiryAction == "hide") {
           var mckqTimer = document.querySelectorAll(".clock_container_leadengagr" + campid);
           if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
            mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".clock_container_leadengagr" + campid));
           }
           mckqTimer.forEach(function(item) {
            item.remove();
           });
          }
         }
        } else {
         leadengagr.loadclock(time, ".mck_clock_" + campid, leadengagr.campaigns[campid].element_data.timerTemplate);
        }
       }
      };
      leadengagr.loadclock = function(time, selector, template) {
       if (!leadengagr.timers) {
        leadengagr.timers = {};
       }
       if (!leadengagr.timers[selector]) {
        leadengagr.timers[selector] = {};
       }
       if (time < 10) {}
       var msPerDay = 24 * 60 * 60 * 1000;
       time = time;
       if (template != "template3") {
        leadengagr.timers[selector].invtime = 100;
       } else {
        leadengagr.timers[selector].invtime = 100;
       }
       leadengagr.timers[selector].intvfunc = setInterval(function() {
        var e_daysLeft = time / msPerDay;
        var daysLeft = Math.floor(e_daysLeft);
        var e_hrsLeft = (e_daysLeft - daysLeft) * 24;
        var hrsLeft = Math.floor(e_hrsLeft);
        var e_minsLeft = (e_hrsLeft - hrsLeft) * 60;
        var minsLeft = Math.floor(e_minsLeft);
        var e_secsLeft = (e_minsLeft - minsLeft) * 60;
        var secsLeft = Math.floor(e_secsLeft);
        var e_millisecsLeft = (e_secsLeft - secsLeft) * 10;
        var millisecsLeft = Math.floor(e_millisecsLeft);
        if (daysLeft < 10 && daysLeft >= 0) daysLeft = "0" + daysLeft;
        if (hrsLeft < 10) hrsLeft = "0" + hrsLeft;
        if (minsLeft < 10) minsLeft = "0" + minsLeft;
        if (secsLeft < 10) secsLeft = "0" + secsLeft;
        var timeString = "";
        // if(daysLeft != 00){
        //   timeString = '<div class="hellobartimer1-timer"><div class="mck_daysleft">' + daysLeft + '<div class="mck_holder">' + leadengagr.langs[selector].days + '</div></div><div class="mck_separator">:</div>';
        // }
        if (template != "template4") {
         timeString += '<div class="hellobartimer4-timer timerClassdefault">';
        } else if (template != "template3") {
         timeString += '<div class="hellobartimer3-timer">';
        } else if (template != "template2") {
         timeString += '<div class="hellobartimer2-timer">';
        } else {
         timeString += '<div class="hellobartimer1-timer">';
        }
        timeString +=
         "<li>" +
         daysLeft +
         "<br><span>" +
         leadengagr.langs[selector].days +
         "</span></li><li>" +
         hrsLeft +
         "<br><span>" +
         leadengagr.langs[selector].hours +
         "</span></li><li>" +
         minsLeft +
         "<br><span>" +
         leadengagr.langs[selector].minutes +
         "</span></li><li>" +
         secsLeft +
         "<br><span>" +
         leadengagr.langs[selector].seconds +
         "</span></li>";
        timeString += "</div>";
        var mckqTimer = document.querySelectorAll(selector);
        if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
         mckqTimer = Array.prototype.slice.call(document.querySelectorAll(selector));
        }
        mckqTimer.forEach(function(item) {
         item.innerHTML = timeString;
        });
        time = time - leadengagr.timers[selector].invtime;
        if (time <= 0) {
          let campId = selector.split("clock_")[1];
          mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".clock_container_leadengagr" + campId));
          mckqTimer.forEach(function(item) {
            item.remove();
          });
         clearInterval(leadengagr.timers[selector].intvfunc);
        }
        if (template == "template2") {
         setTimeout(function() {
          if (document.querySelector("mck_secs_left_number")) {
           document.querySelector("mck_secs_left_number").classList.remove("fadeInDown");
           document.querySelector("mck_secs_left_number").classList.add("fadeOutDown");
          }
         }, 560);
        }
       }, leadengagr.timers[selector].invtime);
      };
    
      leadengagr.initTimerElement = function(campid) {
       var color = leadengagr.campaigns[campid].element_data["timerColor"];
       var bgcolor = leadengagr.campaigns[campid].element_data["highlightColor"];
       var template = leadengagr.campaigns[campid].element_data["timerTemplate"];
       var html =
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" /><style>           .leadengagr_timer_clock_' +
        campid +
        " .mck_clock_" +
        campid +
        "{               display: inline-block;               color:" +
        leadengagr.campaigns[campid].element_data.timerColor +
        ";               font-size: " +
        leadengagr.campaigns[campid].element_data.timerFontSize +
        "px;             font-family:" +
        leadengagr.campaigns[campid].element_data.timerFont +
        ";             font-weight:500;           }           .leadengagr_timer_clock_" +
        campid +
        " .mck_daysleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_hoursleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_minsleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_secsleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_holder,.leadengagr_timer_clock_" +
        campid +
        " .mck_separator{               margin: 0 5px;               display: inline-block;               text-align: center;           }           .leadengagr_timer_clock_" +
        campid +
        " .mck_holder{               display: block !important;             color:" +
        leadengagr.campaigns[campid].element_data.labelColor +
        ";               font-size: " +
        leadengagr.campaigns[campid].element_data.labelFontSize +
        "px;               margin-top: 20px;             font-family:" +
        leadengagr.campaigns[campid].element_data.labelFont +
        ";           }           .leadengagr_timer_clock_" +
        campid +
        " h{             font-size:" +
        leadengagr.campaigns[campid].element_data.highlightFontSize +
        "px;             color:" +
        leadengagr.campaigns[campid].element_data.highlightColor +
        ";             font-family:" +
        leadengagr.campaigns[campid].element_data.highlightFont +
        ";             background:" +
        leadengagr.campaigns[campid].element_data.highlightBgColor +
        ";             display:inline-block;             padding:0 3px;           }           .leadengagr_timer_clock_" +
        campid +
        " .mck_separator{               vertical-align: top;           }           @media screen and (max-width:960px){               .leadengagr_timer_clock_" +
        campid +
        "  .mck_holder{                   display: none;               }           }           @media screen and (max-width:500px){               .leadengagr_timer_clock_" +
        campid +
        "  .mck_holder{                   display: none !important;               }               .leadengagr_timer_clock_" +
        campid +
        " .mck_daysleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_hoursleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_minsleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_secsleft,.leadengagr_timer_clock_" +
        campid +
        " .mck_holder,.leadengagr_timer_clock_" +
        campid +
        " .mck_separator{                   text-align: center;                   margin:3px;               }               .TMPmck_clock_" +
        campid +
        "{                   font-size: 35px;               }               .mck_holder{                   font-size: 10px;                   margin-top: 8px;               }           } .mck_clock_" +
        campid +
        " li span{ font-size: " +
        leadengagr.campaigns[campid].element_data.labelFontSize +
        "px;font-family:" +
        leadengagr.campaigns[campid].element_data.labelFont +
        ";color:" +
        leadengagr.campaigns[campid].element_data.labelColor +
        "; }";
       if (template == "template2") html = html + ".timerClassdefault{background-color:" + bgcolor + ";color:" + color + " } ";
       if (template == "template3") html = html + ".timerClassdefault{ color:" + color + " } .hellobartimer4-timer li{background-color:" + bgcolor + ";} ";
       html = html + " </style> ";
       var dv = document.createElement("div");
       dv.innerHTML = html;
       dv.id = "timer_" + campid;
       document.getElementsByTagName("body")[0].appendChild(dv);
       var mckqTimer = document.querySelectorAll(".clock_container_leadengagr" + campid);
       if (navigator.appName == "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
        mckqTimer = Array.prototype.slice.call(document.querySelectorAll(".clock_container_leadengagr" + campid));
       }
       mckqTimer.forEach(function(item) {
        item.innerHTML =
         '<div style="width:100%;text-align:center" class="leadengagr_timer_clock_' +
         campid +
         '"><div class="leadengagr_clock_text" style="line-height:' +
         (parseInt(leadengagr.campaigns[campid].element_data.titleFontSize) + 7) +
         "px;font-size:" +
         leadengagr.campaigns[campid].element_data.titleFontSize +
         "px;color:" +
         leadengagr.campaigns[campid].element_data.titleColor +
         ";font-family:" +
         leadengagr.campaigns[campid].element_data.titleFont +
         ';margin-bottom:10px">' +
         leadengagr.campaigns[campid].element_data.title +
         '</div><div class="mck_clock_' +
         campid +
         '"></div></div>';
       });
       leadengagr.initClock(campid);
      };
      leadengagr.check_mck_IncludeCampign();
     } else {
      console.log("Duplicate Script Detected!");
     }
    };
    (function() {
     url = window.myConversionKit_host + "/gettool/getUserData/" + window.userid;
     window.httpgetAsync(url, function(data) {
      data = JSON.parse(data);
      window.campaigns = data.data.campaigns;
      window.mck_IncludeCampign = data.data.popup_conditions;
      if (document.readyState != "loading") {
       window.leadengagr_init();
      } else {
       document.addEventListener("DOMContentLoaded", window.leadengagr_init, !1);
      }
     });
    })();