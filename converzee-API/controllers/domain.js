var express = require("express");
var app = express();
var Domain = require("../models/domain");
const User = require("../models/user");
function saveDomain(id, domain, limit, res) {
  if (domain.length > limit) {
    res.status(200).json({ success: false, message: "Domain Out of Limit" });
    return;
  }
  const newDomain = new Domain();
  newDomain.userId = id;
  newDomain.domains = domain;
  newDomain.save((err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Domain Saved Successfully" });
    }
  });
}

function updateDomain(id, domain, limit, res) {
  if (domain.length > limit) {
    res.status(200).json({ success: false, message: "Domain Out of Limit" });
    return;
  }
  const updateDomain = domain;
  Domain.findOneAndUpdate({ userId: id }, { $set: { domains: updateDomain } }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Domain Successfully" });
    }
  });
}

app.post("/insert", function (req, res) {
  const domainData = req.body.domainData;
  const userId = req.doc._id;
  const domains = domainData.domains;
  User.findOne({ _id: userId }, (err, doc) => {
    if (doc) {
      const limit = doc.domainLimit;
      Domain.findOne({ userId: userId }, (err, doc) => {
        if (err) {
        } else {
          if (!doc) {
            saveDomain(userId, domains, limit, res);
          } else {
            updateDomain(userId, domains, limit, res);
          }
        }
      });
    }
  });
});

app.post("/get", function (req, res) {
  const userId = req.doc._id;
  Domain.findOne({ userId: userId }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      if (doc) {
        res.status(200).json({ success: true, message: "Found", domains: doc.domains });
      } else {
        res.status(200).json({ success: true, message: "Found", domains: null });
      }
    }
  });
});

module.exports = app;
