const path = require("path");
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const uploader = require("../util/AwsUtil");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/dist/contains");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const app = express.Router();
var upload1 = multer({ storage: storage });
//Upload Handler
app.post("/", upload1.single("photo"), asyncHandler(upload));

function asyncHandler(handler) {
  return function (req, res, next) {
    if (!handler) {
      next(new Error(`Invalid handler ${handler}, it must be a function.`));
    } else {
      handler(req, res, next).catch(next);
    }
  };
}

async function upload(req, res) {
  let response = await uploader(req.file.filename, req.file.path, "static/contains");
  // res.send(response);
  if(response) {
    res.json({
      image: response,
    });
  }
  res.end();
}

module.exports = app;
