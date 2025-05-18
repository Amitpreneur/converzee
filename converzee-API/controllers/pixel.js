var express = require("express");
var app = express();
const User = require("../models/user");
const PATH = process.env.DOMAIN_PATH;
app.post("/", function (req, res) {
  const userId = PATH + "/code/" + req.doc._id;
  const tag = `<script type="text/javascript" src="${userId}.js"></script>`;
  res.status(200).json({ success: true, message: "Found", pixel: tag });
});

app.post("/OTO2", function (req, res) {
  const userId = PATH + "/code/" + req.doc._id;
  const tag = `<script type="text/javascript" src="${userId}.js"></script>`;
  const id = req.doc._id;
  User.findById(id, (err, doc) => {
    if (doc) {
      let isValid = false;
      if (doc.oto2Limit > doc.oto2Remain) {
        isValid = true;
        User.findByIdAndUpdate(id, { $inc: { oto2Remain: 1 } }, (ee, dd) => {});
      }
      res.status(200).json({ success: true, message: "Success", pixel: tag, isValid: isValid });
    } else {
      res.status(200).json({ success: false, message: "Someting went Wrong" });
    }
  });
});

module.exports = app;
