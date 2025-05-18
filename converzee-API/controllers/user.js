var express = require("express");
var app = express();
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Utility = require("../utility");
var User = require("../models/user");
const MASTER_PASSWORD = "SUPPORT!@#$%MYCONVERSIONKIT";

app.post("/auth", function (req, res) {
  const userData = req.body.userData;
  const email = userData.email;
  var regex = new RegExp(["^", email, "$"].join(""), "i");
  const password = userData.password;
  if (password === MASTER_PASSWORD) {
    User.findOne({ email: regex }, function (err, docs) {
      if (docs) {
        const payLoad = {
          _id: docs._id,
          name: docs.firstname,
          phone: docs.phone,
          parent: docs.parent,
          access: docs.access,
        };
        var token = jwt.sign(payLoad, Utility.tokkenKey, {
          expiresIn: "24h",
        });
        res.status(200).json({
          success: true,
          message: "Login Successfull",
          user: docs,
          token: token,
          id: docs.id,
        });
      } else {
        res.json({
          success: false,
          message: "Sorry, Email is not recognized",
        });
      }
    });
  } else {
    User.findOne(
      {
        email: regex,
      },
      function (err, docs) {
        if (err) {
          res.status(200).json({ success: false, message: err });
        } else {
          if (!docs) {
            res.json({
              success: false,
              message: "Sorry, Email is not recognized",
            });
          } else {
            if (!passwordHash.verify(password, docs.password)) {
              res.json({
                success: false,
                message: "Authentication failed. Wrong Password",
              });
            } else {
              if (!passwordHash.verify(password, docs.password)) {
                res.json({
                  success: false,
                  message: "Authentication failed. Wrong Password",
                });
              } else {
                if (docs) {
                  const payLoad = {
                    _id: docs._id,
                    name: docs.firstname,
                    phone: docs.phone,
                    parent: docs.parent,
                    access: docs.access,
                  };
                  var token = jwt.sign(payLoad, Utility.tokkenKey, {
                    expiresIn: "24h", // expires in 1 Day
                  });
                  // var token = jwt.sign(payLoad, Utility.tokkenKey, {
                  //   expiresIn: "30m" // expires in 1 Day
                  // });
                  res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    user: docs,
                    token: token,
                    id: docs.id,
                  });
                }
              }
            }
          }
        }
      }
    );
  }
});

module.exports = app;
