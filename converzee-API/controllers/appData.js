var express = require("express");
var app = express();
var User = require("../models/user");
const Tools = require("../models/tool");
const AppData = require("../models/appData");
const CustomAR = require("../models/customAutoResponder");

const Util = require("./Util");
const Subscriber = require("./subscriber");
var MAILDATA = new Map();
app.post("/", function (req, res) {
  const data = req.body.data;
  
  if (!Util.validateEmail(data.email)) {
    res.status(200).json({ success: false, message: "Enter Valid Email" });
    return false;
  }

  const id = data.user, campId = data.campId, uid = data.uid;

  Tools.findById(campId , async (err, campaign) => {
    if(err) {
      res.status(401).json({ success: false, message: "Data not found", data: null });
    } else {
      let mailServerName = campaign.AutoResponder.mailServer, filtered = "";

      User.findById(id, "autoResponder", async (err, doc) => {
        if (doc) {
          let ar = doc.autoResponder;
          ar.filter( (el, i) => {
            if(el.mailServer === mailServerName) {
              filtered = i;
            }
          });
          
          let action = "subscribe", responder = ar[filtered].mailServer, apiJson = ar[filtered];
          apiJson["userId"] = id;
          apiJson["email"] = data.email;
          apiJson["name"] = data.name ? data.name : "";
          apiJson["uid"] = uid;

          let response = await Subscriber( apiJson, action, responder );
          if(response) {
            AppData.findOne({ campId: data.campId }, (err, doc) => {
              if (err) {
                res.status(200).json({ success: false, message: "Failed" });
              } else {
                if (doc) {
                  AppData.findByIdAndUpdate(doc._id, { $push: { contact: { email: data.email, name: data.name } } }, (doc1, err1) => {});
                } else {
                  const newAppData = new AppData();
                  newAppData.userId = data.user;
                  newAppData.campId = data.campId;
                  newAppData.campName = data.campName;
                  newAppData.contact = [{ email: data.email, name: data.name }];
                  newAppData.save();
                }
                res.status(200).json({success: true, "message": response.message});
              }
            });
          } else {
            res.status(401).json({ success: false, "message": response.error });
          }
        } else {
          res.status(200).json({ success: false, message: "Something went wrong", data: null });
        }
      });
    }
  })
});

app.post("/getForm", async function (req, res) {
  const { id, uid } = req.body;
  
  await CustomAR.findById(uid, (err, doc) => {
    if(doc) {
      res.status(200).json({success: true, doc: doc});
    } else {
      res.status(401).json({ success: false, "message": response.error });
    }
  })
});

app.get("/clearCache", function (req, res) {
  MAILDATA = new Map();
  res.status(200).json({ success: true, message: "Saved" });
});

module.exports = app;
