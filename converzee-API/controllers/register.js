var express = require("express");
var app = express();
var passwordHash = require("password-hash");
var User = require("../models/user");
const Util = require("./Util");
const License = require("../models/licencekey");

app.post("/refreshServerFiles/:KEY", (req, res) => {
  const KEY = req.params.KEY;
  if (KEY != "9610147808") {
    res.status(200).json({ success: false, message: "LOL" });
  } else {
    User.find({}, (err, docs) => {
      if (err) res.status(200).json({ success: false, message: err });
      else {
        const users = [];
        const doc2 = new Array(...docs);
        doc2.forEach((e) => {
          users.push(e._id);
        });
        Util.createAndSendFileToCDN(users, (success, error) => {
          if (success) res.status(200).json({ success: true, message: "Successfully Saved" });
          else res.status(200).json({ success: false, message: err });
        });
      }
      User.updateMany({ access: 100 }, { $set: { allowedTool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], isUpgrade2: true, isUpgrade1: true } }, (a, s) => {});
    });
  }
});

app.post("/resetTool/:KEY", (req, res) => {
  const KEY = req.params.KEY;
  if (KEY != "9610147808") {
    res.status(200).json({ success: false, message: "LOL" });
  } else {
    Util.resetToolData();
    res.status(200).json({ success: true, message: "Successfully Saved" });
  }
});

app.post("/verify-add-user", function (req, res) {
  var keyData = req.body.keyData;
  if (keyData.key == null || keyData.key == "") {
    res.status(200).json({ success: false, message: "Not an Valid Key" });
  } else {
    License.findOne({ key: keyData.key }, (err, doc) => {
      if (doc && doc != null) {
        License.findByIdAndUpdate(doc._id, { isActive: true }, (err1, doc1) => {
          if (!err1) {
            const newUser = new User();
            newUser.email = keyData.email;
            newUser.password = passwordHash.generate(keyData.password);
            newUser.firstname = keyData.firstname;
            newUser.allowedTool = doc.tools;
            newUser.createdBy = doc.userId;
            newUser.status = true;
            newUser.save((err2, doc2) => {
              if (err2) {
                res.status(200).json({ success: false, message: "Error" });
              } else {
                Util.createAndSendFileToCDN([doc2._id], function () {});
                res.status(200).json({ success: true, message: "Valid Key" });
              }
            });
          } else {
            res.status(200).json({ success: false, message: "Error" });
          }
        });
      } else {
        res.status(200).json({ success: false, message: "Invalid key" });
      }
    });
  }
});

app.post("/init-setup", function (req, res) {
  var newUser = new User();
  newUser.email = "amitpreneur@gmail.com";
  newUser.firstname = "Amit";
  newUser.password = passwordHash.generate("Amit!@#");
  newUser.access = 100;
  newUser.isActive = true;
  newUser.allowedTool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24];
  newUser.isUpgrade1 = true;
  newUser.isUpgrade2 = true;
  newUser.isUpgrade3 = true;
  newUser.domainLimit = 1000;
  newUser.oto2Limit = 1000;
  newUser.oto2Remain = 0;
  newUser.oto3Product = 2;
  newUser.isDeveloperAccess = true; 
  newUser.isAdvancedOpt = true;

  newUser.save(function (err, userOne) {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      Util.createAndSendFileToCDN(userOne._id, function () {});
      res.status(200).json({ success: true, message: "Successfully Saved" });
    }
  });
});

app.post("/forgot-password", function (req, res) {
  var userData = req.body.userData;
  if (userData.email == null || userData.email == "") {
    res.status(200).json({ success: false, message: "No Email" });
    return false;
  } else {
    const email = userData.email.toLowerCase();
    User.findOne({ email: email }, function (err, doc) {
      if (!doc) {
        res.status(200).json({ success: false, message: "No Email Found" });
      } else {
        const num = generateOTP();
        User.findByIdAndUpdate(doc._id, { $set: { otp: num } }, (err2, doc2) => {
          if (err2) {
            res.status(200).json({ success: false, message: "Something Wrong" });
          } else {
            var body = `Hi ${doc.firstname}, <br/>
            Your request to reset password for your converzee has been acknowledged. Please find below your One Time Password to reset it.<br/><br/>
            ${num}<br/>
            If you did not request a password reset, please ignore this email. This password reset is valid only for the next 30 minutes.<br/><br/>
            
            Thanks,<br/>
            Team Converzee<br/>
            
            P.S. Please send all your queries to support@converzee.com and we will be happy to help you with any step along the way.`;
            Util.sendMail(email, body, "Reset Password");
            res.status(200).json({ success: true, message: "OTP sent thorough mail check mail" });
          }
        });
      }
    });
  }
});

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

app.post("/verify-password", function (req, res) {
  var userData = req.body.userData;
  res.status(200).json({ success: true, message: "Verifyed" });

  if (userData.otp == null || userData.otp == "") {
    res.status(200).json({ success: false, message: "No Email" });
    return false;
  } else {
    const email = userData.email.toLowerCase();
    const otp = userData.otp;
    User.findOne({ $and: [{ email: email }, { otp: otp }] }, function (err, doc) {
      if (err) {
        res.status(200).json({ success: false, message: "Wrong email" });
      } else {
        res.status(200).json({ success: true, message: "Verifyed" });
      }
    });
  }
});

app.post("/update-password", function (req, res) {
  var userData = req.body.userData;

  if (userData.otp == null || userData.otp == "") {
    res.status(200).json({ success: false, message: "No Email" });
    return false;
  } else {
    const email = userData.email;
    const otp = userData.otp;
    User.findOne({ $and: [{ email: email }, { otp: otp }] }, function (err, doc) {
      if (err) {
        res.status(200).json({ success: false, message: "Wrong OTP" });
      } else {
        if (doc) {
          const password = userData.password;
          User.findByIdAndUpdate(doc._id, { $set: { password: passwordHash.generate(password) } }, (err2, doc2) => {
            if (err2) {
              res.status(200).json({ success: true, message: "Something went wrong" });
            } else {
              res.status(200).json({ success: true, message: "Verifyed and Update" });
            }
          });
        } else {
          res.status(200).json({ success: false, message: "User not Found" });
        }
      }
    });
  }
});

app.post("/getMailChimpConfig/:id", function (req, res) {
  const id = req.params.id;
  User.findById(id, "autoResponder", (err, doc) => {
    if (doc) {
      res.status(200).json({ success: true, message: "Success fully Update", data: doc });
    } else {
      res.status(200).json({ success: false, message: "Something went wrong", data: null });
    }
  });
});

app.post("/applySpecial", function (req, res) {
  var userData = req.body.userData;
  const email = userData.email ? userData.email.trim() : null;
  User.findOneAndUpdate({ email: email }, { vipBonus: true, $push: { allowedTool: 20 } }, (err, doc) => {
    if (doc) {
      res.status(200).json({ success: true, message: "Success fully Update", data: doc });
    } else {
      res.status(200).json({ success: false, message: "Something went wrong", data: null });
    }
  });
});

app.post("/createSubscribeAccount", function (req, res) {
  var userData = req.body.userData;
  User.findOne({ email: userData.email }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      if (!doc) {
        var newUser = new User();
        newUser.email = userData.email;
        newUser.firstname = userData.name;
        newUser.password = passwordHash.generate(userData.password);
        newUser.access = 50;
        newUser.allowedTool = [1, 17, 9];
        newUser.isActive = true;
        newUser.save(function (err, userOne) {
          if (err) {
            res.status(200).json({ success: false, message: err });
          } else {
            Util.createAndSendFileToCDN([userOne._id], function () {});
            res.status(200).json({ success: true, message: "Successfully Saved" });
          }
        });
      } else {
        res.status(200).json({ success: false, message: "User Already Exist" });
      }
    }
  });
});

module.exports = app;
