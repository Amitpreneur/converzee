var express = require("express");
var app = express();
var passwordHash = require("password-hash");
var User = require("../models/user");
const Util = require("./Util");
var mongoose = require("mongoose");
const License = require("../models/licencekey");
const JvzooEmailLogs = require("../models/jvZooEmailLog");

function generateLicence(res, toolData, key, userId) {
  const newLicenseKey = new License();
  newLicenseKey.userId = userId;
  newLicenseKey.key = key;
  newLicenseKey.isActive = false;
  newLicenseKey.tools = toolData.tools;
  newLicenseKey.save((err, doc) => {
    if (!err) {
      res.status(200).json({ success: true, message: "GOT IT", key });
    } else {
      res.status(200).json({ success: false, message: "Error" });
    }
  });
}

function updateConsumer(userID) {
  User.findByIdAndUpdate(userID, { $inc: { consumeLicence: 1, totallicence: -1 } }, (err, doc) => {});
}

app.post("/send-by-email", (req, res) => {
  const key = mongoose.Types.ObjectId();
  if (!req.doc._id) {
    res.status(200).json({ success: false, message: "LOL" });
    return;
  }
  const toolData = req.body.userData;
  User.findById(req.doc._id, (err, doc) => {
    if (doc) {
      if (doc.totallicence > doc.consumeLicence || doc.access > 80) {
        const key = mongoose.Types.ObjectId();
        generateLicence(res, toolData, key, req.doc._id);
        Util.sendMail(toolData.email, "===>" + key + "<===", "Key");
      } else {
        res.status(200).json({ success: false, message: "Limit Over" });
      }
    } else {
      res.status(200).json({ success: false, message: "Error" });
    }
  });
});

app.post("/verify-license-key", (req, res) => {
  var keyData = req.body.keyData;
  if (keyData.key == null || keyData.key == "") {
    res.status(200).json({ success: false, message: "Not an Valid Key" });
  } else {
    License.findOne({ key: keyData.key }, (err, doc) => {
      if (doc && doc != null) {
        License.findByIdAndUpdate(doc._id, { isActive: true }, (err1, doc1) => {
          if (!err1) {
            res.status(200).json({ success: true, message: "Valid Key" });
          } else {
            res.status(200).json({ success: false, message: "Error" });
          }
        });
      }
    });
  }
});

app.post("/generate-key", (req, res) => {
  if (!req.doc._id) {
    res.status(200).json({ success: false, message: "LOL" });
    return;
  }
  const toolData = req.body.toolData;
  const key = mongoose.Types.ObjectId();
  generateLicence(res, toolData, key, req.doc._id);
});

app.post("/add-reseller-user", function (req, res) {
  var userData = req.body.userData;
  if (req.doc.access < 60) {
    res.status(200).json({ success: false, message: "Not allow" });
  }
  if (userData) {
    var newUser = new User();
    newUser.email = userData.email;
    newUser.password = passwordHash.generate(userData.password);
    newUser.allowedTool = userData.allowedTool;
    newUser.isActive = true;
    newUser.createdBy = req.doc._id;
    newUser.isUpgrade1 = userData.isUpgrade1;
    newUser.isUpgrade2 = userData.isUpgrade2;
    User.findById(req.doc._id, (err, doc) => {
      if (doc) {
        if (doc.totallicence > doc.consumeLicence || doc.access > 80) {
          newUser.save(function (err, userOne) {
            if (err) {
              res.status(200).json({ success: false, message: err });
            } else {
              updateConsumer(req.doc._id);
              Util.createAndSendFileToCDN([userOne._id], function (e, s) {});
              res.status(200).json({ success: true, message: "Successfully Saved" });
            }
          });
        } else {
          res.status(200).json({ success: false, message: "Limit Over" });
        }
      } else {
        res.status(200).json({ success: false, message: "Something Want Wrong" });
      }
    });
  }
});

app.post("/update-userdata", function (req, res) {
  const userData = req.body.userData;
  var newuserData = Object.assign(userData, { isActive: true });
  const id = req.doc._id;
  if (userData) {
    User.findByIdAndUpdate(id, newuserData, function (err, doc) {
      if (err) {
        res.status(200).json({ success: false, message: "Something Wrong" });
      } else {
        res.status(200).json({ success: true, message: "Done" });
      }
    });
  }
});

app.post("/getUser/:userType", function (req, res) {
  const access = req.doc.parent ? 100 : req.doc.access;
  const userID = req.doc.parent ? req.doc.parent : req.doc._id;
  
  let query, docArray = [];
  if (access === 50) {
    res.status(200).json({ success: false, message: "SO SWEET" });
    return;
  }
  if (access === 80) {
    query = User.find({ createdBy: userID }) ;
  }
  if (access === 100) {
    if (req.params.userType == 1) query = User.find({ access: 80 });
    else query = User.find({ access: 50 });
  }
  query.exec(async function (err, doc) {
    if (err) {
      res.status(200).json({ success: false, message: "Something Went Wrong" });
    } else {
      if(doc.length) {
        for await (let el of doc) {
          let logs = await JvzooEmailLogs.findOne({ccustemail: el.email});
          if(logs) {
            let emailLogs = {
              "name" : logs.name,
              "ccustemail" : logs.ccustemail,
              "password" : logs.password,
            }
            el = {...el._doc, logs : {...emailLogs} };
            
            docArray.push(el);
          } else {
            docArray.push(el);
          }
        }
      }
      res.status(200).json({ success: true, message: "Done", data: docArray });
    }
  });
});

app.post("/search", function (req, res) {
  const access = req.doc.access;
  const userID = req.doc._id;
  const { userType, searchString } = req.body.userData;
  let query;
  if (access === 50) {
    res.status(200).json({ success: false, message: "SO SWEET" });
    return;
  }
  if (access === 80) {
    const con = { $or: [{ firstname: { $regex: searchString } }, { email: { $regex: searchString } }], $and: [{ createdBy: userID }] };
    query = User.find(con);
  }
  if (access === 100) {
    let con;
    if (userType == 0) con = { $or: [{ firstname: { $regex: searchString } }, { email: { $regex: searchString } }], $and: [{ isSubuser: true }] };
    else if (userType == 1) con = { $or: [{ firstname: { $regex: searchString } }, { email: { $regex: searchString } }], $and: [{ access: 80 }] };
    else con = { $or: [{ firstname: { $regex: searchString } }, { email: { $regex: searchString } }], $and: [{ access: 50 }] };
    query = User.find(con);
  }
  query.exec(function (err, doc) {
    if (err) {
      res.status(200).json({ success: false, message: "Something Went Wrong" });
    } else {
      res.status(200).json({ success: true, message: "Done", data: doc });
    }
  });
});

app.post("/add-user", function (req, res) {
  if (req.doc.access != 100) {
    res.status(200).json({ success: false, message: "LOL" });
  } else {
    const userData = req.body.userData;
    if (userData.email == "" || userData.email == null) {
      res.status(200).json({ success: false, message: "Missing Infomation" });
      return;
    }
    const newUser = new User();
    newUser.email = userData.email;
    newUser.isActive = true;
    newUser.firstname = userData.firstname;
    newUser.access = userData.access;
    newUser.totallicence = userData.access == 80 ? 100 : 0;
    newUser.password = passwordHash.generate(userData.password);
    newUser.allowedTool = userData.tool;
    newUser.isUpgrade1 = userData.isUpgrade1;
    newUser.isUpgrade2 = userData.isUpgrade2;
    newUser.isUpgrade3 = userData.isUpgrade3;

    if(userData.isUpgrade1) {
      newUser["isDeveloperAccess"] = true;
      newUser["isAdvancedOpt"] = true;
      newUser["oto2Limit"] = 1000;
      newUser["domainLimit"] = 1000;
    } 

    newUser.save((err, doc) => {
      if (err) {
        res.status(200).json({ success: false, message: "Error" });
      } else {
        Util.createAndSendFileToCDN([doc._id], function (e, s) {});
        res.status(200).json({ success: true, message: "Done" });
      }
    });
  }
});

app.post("/user-deactive", (req, res) => {
  const access = req.doc.access;
  const userData = req.body.userData;
  if (access > 70) {
    User.findByIdAndUpdate(userData.id, { $set: { isActive: !userData.isActive } }, (err, doc) => {
      res.status(200).json({ success: true, message: "Done" });
    });
  } else {
    res.status(200).json({ success: false, message: "Invalid User" });
  }
});

app.post("/add-subuser", (req, res) => {
  const userData = req.body.userData;
  if (userData.email == "" || userData.email == null) {
    res.status(200).json({ success: false, message: "Missing Infomation" });
    return;
  }
  const newUser = new User();
  newUser.email = userData.email;
  newUser.isActive = true;
  newUser.isSubuser = true;
  newUser.access = 30;
  newUser.firstname = userData.firstname;
  newUser.password = passwordHash.generate(userData.password);
  newUser.allowedTool = userData.tools;
  newUser.isUpgrade1 = true;
  newUser.isUpgrade2 = true;
  newUser.parent = req.doc._id;

  newUser.save((err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: "Email Already exists....please try another one." });
    } else {
      Util.createAndSendFileToCDN([doc._id], function (e, s) {});
      res.status(200).json({ success: true, message: "Done" });
    }
  });
});

app.post("/get-subuser", (req, res) => {
  User.find({isSubuser: true}).then(doc => {
    res.status(200).json({ success: true, message: "Done", data: doc });
  }).catch(err => {
    res.status(200).json({ success: false, message: "Something Went Wrong", err: err });
  })
})

app.post("/update-script", async(req, res) => {
  try {
    await User.find({}, {_id: 1, allowedTool: 1}, async function(err, doc) {
      if(err) {
        res.status(200).json({ success: false, message: "Something Went Wrong", err: err });
      } else{
        await Promise.all(doc.map(async (elem, i) => {
          try {
            if(!elem.allowedTool.includes(25)) {
              let updateTool = await User.findByIdAndUpdate(elem._id, { "$push": { "allowedTool": 25 } });
              console.log("updateTool update.");
            }
            await Util.updateFile(elem._id);
          } catch(error) {
            res.status(200).json({ success: false, message: "Script not update.", "error": error });
          }
        }));
        res.status(200).json({ success: true, message: "Script updated." });
      }
    })
  } catch(err) {
    res.status(200).json({ success: false, message: "Script not update.", "err": err });
  }
});

module.exports = app;
