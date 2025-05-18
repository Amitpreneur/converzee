var express = require("express");
var app = express();
var CampData = require("../models/subscriptiondata");

function PushAndUpdate(id, data) {
  CampData.findOneAndUpdate({ campid: id }, { $push: { data: data } }, (err, doc) => {});
}

app.post("/insert", function (req, res) {
  const data = req.body;
  const email = data.email;
  const campid = data.campid;
  CampData.findOne({ campid: campid }, (err, doc) => {
    if (err) {
    } else {
      if (doc) {
        PushAndUpdate(campid, email);
        res.status(200).json({ success: true, message: "Saved Successfully" });
      } else {
        const newData = new CampData();
        newData.campid = campid;
        newData.data.push(email);
        newData.save();
        res.status(200).json({ success: true, message: "Saved Successfully" });
      }
    }
  });
});

module.exports = app;
