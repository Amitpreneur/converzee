const Util = new Object();
const Tools = require("../models/tool");
const path = require("path");
const fs = require("fs");
const LIB = require("./lib");
const request = require("request");
const AWSUtil = require("../util/AwsUtil");
const mailjet = require("node-mailjet").connect("4ffb289144ee53614e213f3876edcf18", "3a9f74dc8798c2d2936be7eb5c00cf9e");
const DOMAIN_PATH = process.env.DOMAIN_PATH;
const MODE = process.env.MODE;
Util.createScriptCode = function (toolId, domId, layout) {
  switch (toolId) {
    case 2:
      return '<div id="' + domId + '"></div>';
      break;
    case 4:
      return '<a id="image_' + domId + '"></a>';
      break;
    case 5:
      return '<div id="video_' + domId + '" class="mediabox"></div>';
      break;
    case 6:
      return `<div class="clock_container_leadengagr${domId} clock_timer"></div>`;
      break;
    case 20:
      return (layout === 3 ? `<div class="club_central_timer${domId}"></div>` : "");
      break;
    case 24:
      return `<div style="padding:56.25% 0 0 0;position:relative;">
        <iframe class="mck_autoplay_video_${domId}" frameborder="0" scrolling="no" allow="autoplay; fullscreen" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
      </div>`;
      break;
    case 25: 
      return `<div class="mck_proof_app_${domId}"></div>`
    default:
      return "";
      break;
  }
};

Util.readDir = function (dir = "../client/dist/code/", callBack) {
  const directoryPath = path.join(__dirname, dir);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      callBack(err, null);
    } else {
      callBack(null, files);
    }
  });
};

Util.removeFile = function (dir = "../client/dist/code/", file, callBack) {
  const directoryPath = path.join(__dirname, dir) + file;
  try {
    fs.unlinkSync(directoryPath);
    const fileId = file.split(".")[0];
    callBack(null, fileId);
  } catch (err) {
    callBack(err, null);
  }
};

Util.resetToolData = function () {
  Tools.remove({}, () => {
    console.log("ALL TOOL REMOVED");
  });
};

Util.validateEmail = function (email) {
  var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
  if (pattern.test(email)) {
    return true;
  } else {
    return false;
  }
};

Util.sendMail = async function (email, body, subject) {
  return new Promise((resolve, reject) => {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "info@converzee.com",
            Name: "Converzee",
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: subject,
          HTMLPart: body,
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
        resolve(result.body);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.statusCode);
        reject(err.statusCode);
      });
  })
};

Util.sendGetRequest = function (url = "", cb = function () {}) {
  var options = {
    method: "GET",
    url: "http://127.0.0.1:3002/" + url,
    headers: { "Content-Type": "application/json" },
  };
  try {
    request(options, function (error, response) {
      if (error) cb(error, null);
      else cb(null, JSON.parse(response.body));
    });
  } catch (e) {}
};

Util.sendPostRequest = function (url = "", data, cb = _.noop) {
  var options = {
    method: "POST",
    url: "http://127.0.0.1:3002/" + url,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return new Promise((resolve, reject) => {
    try {
      request(options, function (error, response) {
        if (error) cb(error, null);
        else cb(null, JSON.parse(response.body));
      });
    } catch (e) {
      cb("Error", null);
    }
  });
};
const dirName = "client/dist/code/";

function createFile(id) {
  return new Promise((resolve, reject) => {
    LIB.createfile(id, DOMAIN_PATH, (err) => {
      if (err) {
        reject(id);
      } else {
        resolve(id);
      }
    });
  });
}

Util.createAndSendFileToCDN = async function (users = [], cb) {
  for (let i = 0; i < users.length; i++) {
    const id = users[i];
    const filename = `${id}.js`;
    const fileGen = await createFile(id);
    if (MODE !== "DEV") {
      await AWSUtil(filename, dirName + filename, "code");
      Util.removeFile(dirName, filename, (err, fileId) => {});
    }
  }
  cb(true, null);
};


Util.updateFile = (id) => {
  return new Promise((resolve, reject) => {
    LIB.updatefile(id, DOMAIN_PATH, (err) => {
      if (err) {
        reject(id);
      } else {
        resolve(id);
      }
    });
  });
}

Util.randomPassword = function () {
  var randomstring = Math.random().toString(36).slice(-8);
  return randomstring;
};

Util.getAutoReponderMsg = function (data, code) {
  return { ...data, url: "https://mailchimp.com/developer/guides/error-glossary/#" + code };
};

Util.sendMailOnPurchase = async function (email, password, name) {
  let msg = `
  Dear ${name},<br/><br/>
  
  Congratulations on your purchase of Converzee software. You’ve made a significant step towards solidifying your business success by opting for this organized, standardized, streamlined and efficient tool. <br/><br/>
  
  Based on our recent study, One Single Line Of Code Gives You Up To 330% More Leads & Sales, and Recovers 50-86% Lost Traffic.<br/><br/>
  
  Your success is critical to us. We know that you will be utterly satisfied after using this growth hacking 18 in 1 tool, which will save you time and grow your business exponentially.<br/><br/>
  
  So, without wasting any more time, click on the below link and start using this fantastic tool right away.<br/><br/>
  
  https://app.converzee.com<br/><br/>
  
  Login credentials:<br/><br/>
  Username:  ${email}<br/><br/>
  Password:  ${password}<br/><br/>
  
  We request you to change the password immediately after your login.<br/><br/>
  
  Please write back to us on this same thread if you have any further queries about the software, we would be happy to help.<br/><br/>
  `;
  let subject = "Login credentials for Converzee";
  let mailSend = await Util.sendMail(email, msg, subject);
  console.log(mailSend);
  if(mailSend) {
    return mailSend;
  }
};

Util.sendMailUpgread = function (email, name, typ) {
  let msg = getMsgString(typ, name);
  let subject = getSubject(typ);
  Util.sendMail(email, msg, subject);
};

function getSubject(typ) {
  if (typ == 2) return "Confirmation for the purchase of Converzee Agency";
  if (typ == 3) return "Confirmation for the purchase of Converzee Pro";
  if (typ == 4) return "Confirmation for the purchase of Converzee Club";
  if (typ == 5) return "Confirmation for the purchase of Converzee Mobile App";
  if (typ == 6) return "Confirmation for the purchase of Converzee Bundle OTO";
}

function getMsgString(typ, name) {
  let msg = "";
  if (typ === 2 || typ === 6) {
    msg = `Hi ${name},<br/><br/>

    Congratulations on your purchase of "Converzee Whitelabel".<br/>
    You are required to re-login into your Converzee account to enable all the features offered in the "Converzee Whitelabel."<br/><br/>
    
    You will get access to:<br/><br/>
    
    Individual Whitelabel Licence:  <br/>
    This license will authorize you to resell the product to any number of customers you wish.<br/>
    
    Ability to give an individual access to all tools: <br/>
    Not only can you sell it as a package, but it can also sell them as a unique tool. And there are many other platforms available in the market that are selling only these tools very costly, and even if you keep the price comparatively low, you will still be in the profit.<br/><br/>
    
    Sales Videos for individual tools: <br/>
    To make the reselling process easier, as part of this feature, we assist you with sales pitch videos for each tool present in this package. So that you can sell the product effortlessly.<br/><br/>
    
    Sales Pages for individual tools: <br/>
    Sales pages have a direct impact on the overall sales of the product. The impressive your page looks, the more profit margin you will be able to generate. It is also a tedious job to design them. Don't worry; we have already covered it up for you. The Converzee Whitelabel version has highly convertible templates sales template for each of the tools present in the package, so enjoy them directly and boost your conversion.<br/>
    
    Thanks,<br/>
    Team Converzee<br/><br/>
    
    P.S. To be fair to our JV partners & affiliates, your Whitelabel access will be unlocked 1 month after your purchase.

    Please send all your queries to https://spiety.freshdesk.com/support/home and we will be happy to help you with any step along the way.`;
  }
  if (typ === 3) {
    msg = `Hi ${name},<br/><br/>

    Congratulations on your purchase of "Converzee Pro".<br/>
    You are required to re-login into your Converzee account to enable this feature of "Converzee Pro."<br/><br/>
    
    Let me give you a brief about the tool:<br/><br/>
    
    This version will empower you to run your campaign on other's website using the special jackered "Converzee Pro" link.<br/><br/>
    
    
    It's simple, there are just three steps, and it takes only two minutes.<br/>
    Step1: Pick any website.<br/>
    2nd - Insert your optin forms in Hello bars, Hellobar+Timer, and Exit Intents.<br/>
    3rd - Collect hot leads and sales.<br/>
    
    And it's 100% legal and ethical.<br/>
    You don't even have to contact the website owner.<br/><br/>
    
    The reality is consumers in any area or niche often only want to purchase through an authority website that they already know and trust, and Converzee pro gives you the ability to do <br/>
    that and a whole lot more in just minutes, which means you start earning profits from day one.<br/>
     
    As a pro member, you also get the developer access of the tool. Having this access will authorize you to:<br/>
    Add team members' accounts to manage campaigns for you.<br/>
    You're going to love this feature when you see the avalanche of customers coming towards you – asking you to create campaigns for them.<br/><br/>
     
    Thanks,<br/>
    Team Converzee<br/><br/>
    
    P.S. Please send all your queries to https://spiety.freshdesk.com/support/home, and we will be happy to help you with any step along the way`;
  }
  if (typ === 4) {
    msg = `Hi ${name},<br/><br/>

    Congratulations on your purchase of "Converzee Template Club".<br/>
    You are required to re-login into your Converzee account to enable these features.<br/><br/>
    
    Now you are a proud member of the Converzee Template club.<br/><br/>
    
     Being a member of this Template club, you will get:<br/>
     Instant access to our closed community on Facebook and tap into genuine buyers' traffic daily.<br/>
    Get over 200+ stunning "ULTRA CONVERTING" ready-to-deploy Hellobar, Hellobar + Timer, and Exit Intent templates created by the business's best designers.<br/>
     Individual masterclass training for all the 18 tools included inside Converzee for explosive growth in any niche.<br/>
    <br/>
    Thanks,<br/>
    Team Converzee<br/><br/>
    
    P.S. Please send all your queries to https://spiety.freshdesk.com/support/home, and we will be happy to help you with any step along the way.`;
  }
  if (typ === 5) {
    msg = ` Hi ${name},<br/><br/>

    Congratulations on your purchase of "Converzee Mobile App".<br/><br/>
    
    Now you are a proud member of the Converzee Mobile App.<br/><br/>
    
     You can download the Converzee Mobile App from here - https://drive.google.com/file/d/1ImLFFjA5-dhSYhmgZPAr9MDI1VB1bNoa/view?usp=sharing<br/><br/>
    Converzee mobile app runs your business from anywhere so you can create, manage, sell & profit from campaigns from right inside your smartphone.<br/>
    <br/>
    Thanks,<br/>
    Team Converzee<br/><br/>
    
    P.S. Please send all your queries to https://spiety.freshdesk.com/support/home, and we will be happy to help you with any step along the way.`;
  }
  return msg;
} 

module.exports = Util;
