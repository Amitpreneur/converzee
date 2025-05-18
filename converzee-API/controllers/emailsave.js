var express = require("express");
var app = express();
var EmailTemplate = require("../models/emailTemplate");
const Util = require("./Util");
app.post("/insert/:id", function (req, res) {
  const emailData = req.body.data;
  const userId = req.doc._id;
  const id = req.params.id;

  if (id == 0) {
    const newEmailTemplate = new EmailTemplate();
    newEmailTemplate.userId = userId;
    newEmailTemplate.template = emailData.data;
    newEmailTemplate.campName = emailData.campName;
    newEmailTemplate.save((err, doc) => {
      res.status(200).json({ success: true, message: "Found", domains: null });
    });
  } else {
    EmailTemplate.findByIdAndUpdate(id, { $set: { template: emailData.email } }, (err, doc) => {
      res.status(200).json({ success: true, message: "Found", domains: null });
    });
  }
});

app.post("/get", function (req, res) {
  const userId = req.doc._id;
  EmailTemplate.find({ userId: userId }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      if (doc) {
        res.status(200).json({ success: true, message: "Found", emails: doc });
      } else {
        res.status(200).json({ success: true, message: "Found", emails: [] });
      }
    }
  });
});

app.post("/getEmailList", function (req, res) {
  const userId = req.doc._id;
  const campId = req.body.data.id;
  Util.sendGetRequest("user/get/" + campId, (error, data) => {
    if (data) {
      res.status(200).json({ success: true, message: "Found", data: data });
    } else {
      res.status(200).json({ success: true, message: "Found", emails: [] });
    }
  });
});

app.post("/sendMail", (req, res) => {
  const emailData = req.body.data;
  const id = emailData.id;
  const email = emailData.email;
  const password = emailData.password;
  const domain = emailData.domain;
  const emails = emailData.emails;
  const subject = emailData.subject;
  EmailTemplate.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      Util.sendPostRequest("email/send", { template: doc.template, email, password, domain, emails, subject }, (err1, data) => {
        res.status(200).json({ success: data.success, message: data.message });
      });
    } else {
      res.status(200).json({ success: true, message: "Not Found" });
    }
  });
});

module.exports = app;
