var express = require("express");
var app = express();
var moment = require("moment");
var User = require("../models/user");
var Tool = require("../models/tool");
var passwordHash = require("password-hash");
const CampSchema = require("../models/user-campData");
const _ = require("lodash");
function getGraphData(userId) {
  Tool.find({ userId: userId }, ["_id"], function (err, doc) {
    if (doc) {
      const newArr = [];
      _.forEach(new Array(...doc), (item) => {
        newArr.push(item._id);
      });
      if (newArr.length) {
        CampSchema.find({ userId: { $in: newArr } }, function (err1, doc1) {
          if (!err1) return new Array(...doc1);
          else return [];
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
  });
}

app.post("/get", async (req, res) => {
  const userId = req.doc.parent ? req.doc.parent : req.doc._id;
  const { selection } = req.body ;
  Tool.find({ userId: userId }, ["views", "clicks"], (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      // getGraphData(userId);
      let clicks = 0,
        views = 0;
      doc.forEach((item) => {
        clicks = clicks + item.clicks;
        views = views + item.views;
      });

      var jsonData = {};
      let sDate = moment(selection[0].startDate).format('YYYY-MM-DD');
      let eDate = moment(selection[0].endDate).format('YYYY-MM-DD');
      let dayCount = moment(selection[0].endDate).diff(moment(selection[0].startDate),'days');
      let monthCount = moment(selection[0].endDate).diff(moment(selection[0].startDate),'month', true);
      if(monthCount > 1) {
        for(let d=0;d<=monthCount;d++) {
          jsonData[moment(sDate).add(d,'month').format('MMMM')]= { "clicks" : 0, "views" : 0};
        }
      } else {
        for(let d=0;d<=dayCount;d++) {
          jsonData[moment(sDate).add(d,'days').format('YYYY-MM-DD')]= { "clicks" : 0, "views" : 0};
        }
      }

      let graphData = null;
      let totalCampaign = 0;
      Tool.find({ userId: userId }, ["_id"], function (err, doc) {
        if (doc) {
          const newArr = [];
          _.forEach(new Array(...doc), (item) => {
            newArr.push(item._id);
          });
          if (newArr.length) {
            totalCampaign = newArr.length;
            CampSchema.find({ userId: { $in: newArr } }, ["views", "clicks"], function (err1, doc1) {
              if (!err1){ 
                if(monthCount > 1) {
                  doc1.forEach(element => {
                    element.clicks.forEach(e => {
                      if(jsonData[moment(e.date).format('MMMM')]) {
                        jsonData[moment(e.date).format('MMMM')]["clicks"] += e.click;
                      }
                    })
                    element.views.forEach(e => {
                      if(jsonData[moment(e.date).format('MMMM')]) {
                        jsonData[moment(e.date).format('MMMM')]["views"] += e.view;
                      }
                    })
                  });
                } else {
                  doc1.forEach(element => {
                    if(element) {
                      element.clicks.forEach(e => {
                        if(jsonData[moment(e.date).format('YYYY-MM-DD')]) {
                          jsonData[moment(e.date).format('YYYY-MM-DD')]["clicks"] += e.click;
                        }
                      })
                      element.views.forEach(e => {
                        if(jsonData[moment(e.date).format('YYYY-MM-DD')]) {
                          jsonData[moment(e.date).format('YYYY-MM-DD')]["views"] += e.view;
                        }
                      })
                    }
                  });
                }

                res.status(200).json({ success: true, data: { clicks, views, graphData: jsonData, totalCampaign }, message: "Success" });
              } else {
                res.status(200).json({ success: true, data: { clicks, views, graphData, totalCampaign }, message: "Success" });
              }
            });
          } else {
            res.status(200).json({ success: true, data: { clicks, views, graphData: jsonData, totalCampaign }, message: "Success" });
          }
        } else {
          res.status(200).json({ success: true, data: { clicks, views, graphData: jsonData, totalCampaign }, message: "Success" });
        }
      });

      //res.status(200).json({ success: true, data: { clicks, views }, message: "Success" });
    }
  });
  
});

app.post("/update-user", function (req, res) {
  const access = req.doc.access;
  console.log(req.doc);

  if (access < 80) {
    res.status(200).json({ success: false, message: "LOL" });
    return;
  } else {
    const userData = req.body.userData;
    if (!userData.id) {
      res.status(200).json({ success: false, message: "Missing Id" });
    } else {
      var updatedObj = { firstname: userData.name, isUpgrade1: userData.isUpgrade1, isUpgrade2: userData.isUpgrade2, isActive: userData.isActive, allowedTool: userData.tools };
      if(userData.isUpgrade1) {
        updatedObj["isDeveloperAccess"] = true;
        updatedObj["isAdvancedOpt"] = true;
        updatedObj["oto2Limit"] = 1000;
        updatedObj["domainLimit"] = 1000;
      } else {
        updatedObj["isDeveloperAccess"] = false;
        updatedObj["isAdvancedOpt"] = false;
        updatedObj["domainLimit"] = 10;
      }

      User.findByIdAndUpdate(userData.id, updatedObj, (err, doc) => {
        console.log("err",err);
        
        if (err) {
          res.status(200).json({ success: false, message: "Error" });
        } else {
          res.status(200).json({ success: true, message: "Successfully Updated" });
        }
      });
    }
  }
});

app.post("/change-Access", function (req, res) {
  const access = req.doc.access;
  if (access != 100) {
    res.status(200).json({ success: false, message: "LOL" });
  } else {
    const userData = req.body.userData;
    const id = userData.id;
    if (!id) {
      res.status(200).json({ success: false, message: "ID missing" });
      return;
    }
    User.findById(id, (err, doc) => {
      if (doc) {
        if (doc.access === 80) {
          User.findByIdAndUpdate(id, { access: 50 }, (err1, doc1) => {
            if (doc) {
              res.status(200).json({ success: true, message: "Update Successfully" });
            } else {
              res.status(200).json({ success: false, message: "Error" });
            }
          });
        } else {
          User.findByIdAndUpdate(id, { access: 80 }, (err1, doc1) => {
            if (doc) {
              res.status(200).json({ success: true, message: "Update Successfully" });
            } else {
              res.status(200).json({ success: false, message: "Error" });
            }
          });
        }
      }
    });
  }
});

app.post("/resetPassword", function (req, res) {
  const access = req.doc.access;
  if (access != 100) {
    res.status(200).json({ success: false, message: "LOL" });
  } else {
    const userData = req.body.userData;
    const id = userData.id;
    const newPass = passwordHash.generate("MyConversionKit!@#$%");
    User.findByIdAndUpdate(id, { password: newPass }, (err1, doc1) => {
      if (doc1) {
        res.status(200).json({ success: true, message: "Update Successfully" });
      } else {
        res.status(200).json({ success: false, message: "Error" });
      }
    });
  }
});

module.exports = app;

