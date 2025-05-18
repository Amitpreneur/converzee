var express = require("express");
var app = express();
var Tool = require("../models/tool");
const CampSchema = require("../models/user-campData");
const _ = require("lodash");
function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + today.getFullYear();
}

function viewClicks(id, data) {
  Tool.findByIdAndUpdate(id, { $inc: data }, { new: true }, function (err, doc) {});
}

function updateClick(userID) {
  const date = getTodayDate();
  CampSchema.findOne({ userId: userID }, function (err, doc) {
    if (!err) {
      if (doc) {
        const isDate = _.find(new Array(...doc.clicks), function (o) {
          return o.date == date;
        });
        if (isDate) {
          CampSchema.findOneAndUpdate({ "clicks.date": date,  userId: userID }, { $set: { "clicks.$.click": isDate.click + 1 } }, function (err1, doc1) {});
        } else {
          CampSchema.findOneAndUpdate({ userId: userID }, { $push: { clicks: { date: date, click: 1 } } }, function (err1, doc1) {});
        }
      } else {
        const newCampSchema = new CampSchema();
        newCampSchema.userId = userID;
        newCampSchema.clicks =  [{ date: getTodayDate(), click: 1 }];
        newCampSchema.save();
      }
    }
  });
}
function updateView(userID, data) {
  const date = getTodayDate();
  CampSchema.findOne({ userId: userID }, function (err, doc) {
    if (!err) {
      if (doc) {
        const isDate = _.find(new Array(...doc.views), function (o) {
          return o.date == date;
        });
        if (isDate) {
          CampSchema.findOneAndUpdate({ "views.date": date, userId: userID }, { $set: { "views.$.view": isDate.view + 1 } }, function (err1, doc1) {});
        } else {
          CampSchema.findOneAndUpdate({ userId: userID }, { $push: { views: { date: date, view: 1 } } }, function (err1, doc1) {});
        }
      } else {
        const newCampSchema = new CampSchema();
        newCampSchema.userId = userID;
        newCampSchema.views =  [{ date: getTodayDate(), view: 1 }];
        newCampSchema.save();
      }
    }
  });
}

app.post("/:id/:actionType", function (req, res) {
  const campId = req.params.id;
  const actionType = req.params.actionType;
  if (actionType == 1) {
    viewClicks(campId, { views: 1 });
    updateView(campId);
    res.status(200).json({ success: false, message: "Success" });
  } else {
    viewClicks(campId, { clicks: 1 });
    updateClick(campId);
    res.status(200).json({ success: true, message: "Success" });
  }
});

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + today.getFullYear();
}

module.exports = app;
