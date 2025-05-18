const path = require("path");
const express = require("express");
const multer = require("multer");
const ImageOpti = require("../models/imageOpi");

function saveImageName(fileName, user) {
  const newImage = new ImageOpti();
  newImage.userId = user;
  newImage.fileName = fileName;
  newImage.save();
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "client/dist/contains");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage }).array("photo", 20);

const app = express.Router();

app.post("/", upload.single("photo"), (req, res, next) => {
  saveImageName(req.file.filename, req.doc._id);
  return res.json({
    image: req.file.filename
  });
});

module.exports = app;
