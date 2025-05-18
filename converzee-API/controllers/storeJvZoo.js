var express = require("express");
var app = express();
var JvZoo = require("../models/jvZooUser");
const User = require("../models/user");
const JvZooEmailLog = require("../models/jvZooEmailLog");
const Util = require("./Util");
var passwordHash = require("password-hash");

function saveJvuser(pid, jvZooData, res) {
  const newJvZoo = new JvZoo();
  newJvZoo.ccustemail = jvZooData.ccustemail || "";
  newJvZoo.jvZooData = jvZooData;
  newJvZoo.pid = pid;
  newJvZoo.save((err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Saved Successfully" });
    }
  });
}

app.post("/insert/frontEnd/1", function (req, res) {
  const jvZooData = req.body;
  saveJvuser("FRONTEND", jvZooData, res);
  saveAndUpdateUser(jvZooData, 1, 1);
});

app.post("/insert/frontEnd/2", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 1, 2);
  saveJvuser("FRONTEND", jvZooData, res);
});

app.post("/insert/MCKupgread1/1", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 2, 1);
  saveJvuser("UPGREAD1", jvZooData, res);
});

app.post("/insert/MCKupgread1/2", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 2, 2);
  saveJvuser("UPGREAD1", jvZooData, res);
});

app.post("/insert/MCKupgread2/1", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 3, 1);
  saveJvuser("UPGREAD2", jvZooData, res);
});

app.post("/insert/MCKupgread2/2", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 3, 2);
  saveJvuser("UPGREAD2", jvZooData, res);
});

app.post("/insert/MCKupgread2/3", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 3, 3);
  saveJvuser("UPGREAD2", jvZooData, res);
});

app.post("/insert/MCKupgread3/1", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 4, 1);
  saveJvuser("UPGREAD3", jvZooData, res);
});

app.post("/insert/MCKupgread3/2", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 4, 2);
  saveJvuser("UPGREAD3", jvZooData, res);
});

app.post("/insert/MCKupgread4/1", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 5, 1);
  saveJvuser("UPGREAD4", jvZooData, res);
});

app.post("/insert/MCKupgread5/1", function (req, res) {
  const jvZooData = req.body;
  saveAndUpdateUser(jvZooData, 6, 1);
  saveJvuser("UPGREAD4", jvZooData, res);
});

function saveAndUpdateUser(data, product, typ) {
  if (data.ctransaction == "SALE") {
    saveUser(data.ccustemail, data.ccustname, product, typ);
  }
  if (data.ctransaction == "RFND") {
    updateUser(data.ccustemail);
  }
}

function updateUser(email) {
  const newEmail = email.toLowerCase();
  User.findOne({ email: newEmail }, (err, doc) => {
    if (!err) {
      if (doc) {
        User.findByIdAndUpdate(doc._id, { isActive: false, status: false }, () => {});
      }
    }
  });
}

function saveUser(email, name, product, typ) {
  const newEmail = email.toLowerCase();
  User.findOne({ email: newEmail }, (err, doc) => {
    if (!err) {
      if (doc) {
        const data = getData(product, typ);
        User.findByIdAndUpdate(doc._id, data, () => {});
        Util.sendMailUpgread(newEmail, name, product);
      } else {
        const password = Util.randomPassword();
        const newUser = new User();
        const data = getData(product, typ);
        newUser.email = newEmail;
        newUser.password = passwordHash.generate(password);
        newUser.firstname = name;
        newUser.allowedTool = data.allowedTool;
        newUser.createdBy = "5e957ee6ad1ed70e6afb513a";
        newUser.domainLimit = data.domainLimit;
        newUser.status = true;
        newUser.isActive = true;
        newUser.save((err2, doc2) => {
          if (err2) {
          } else {
            User.findByIdAndUpdate(doc2._id, data, () => {});
            const newJvZooEmailLog = new JvZooEmailLog();
            newJvZooEmailLog.ccustemail = newEmail || "";
            newJvZooEmailLog.pid = product;
            newJvZooEmailLog.name = name;
            newJvZooEmailLog.password = password;
            newJvZooEmailLog.save(async (err3, doc3) => {
              if (err3) {
                res.status(200).json({ success: false, message: err3 });
              } else {
                let id = [doc2._id];
                let response = await Util.sendMailOnPurchase(newEmail, password, name);
                if(response) {
                  await Util.createAndSendFileToCDN(id, (e, a) => {});
                }
              }
            });
          }
        });
      }
    }
  });
}

function getData(product, typ) {
  switch (product) {
    case 1:
      if (typ == 1) return { domainLimit: 5, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 24] };
      if (typ == 2) return { domainLimit: 50, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 24] };
      break;
    case 2:
      if (typ == 1) return { access: 80, totallicence: 100, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 24] };
      if (typ == 2) return { access: 80, totallicence: 1000, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 24] };
      break;
    case 3:
      if (typ == 1) return { oto2Limit: 100, isUpgrade1: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19] };
      if (typ == 2) return { oto2Limit: 100, isAdvancedOpt: true, isUpgrade1: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19] };
      if (typ == 3) return { domainLimit: 1000, isDeveloperAccess: true, isAdvancedOpt: true, isUpgrade1: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19] };
      break;
    case 4:
      if (typ == 1) return { oto3Product: 1, isUpgrade2: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19, 20, 21] };
      if (typ == 2) return { oto3Product: 2, isUpgrade2: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19, 20, 21] };
      break;
    case 5:
        if (typ == 1) return { isUpgrade3: true };
        break;
    case 6:
      if (typ == 1) return { domainLimit: 1000, access: 50, totallicence: 1000, oto2Limit: 100, oto3Product: 2, isDeveloperAccess: true, isAdvancedOpt: true, isUpgrade1: true, isUpgrade2: true, isUpgrade3: true, allowedTool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 24, 18, 19, 20, 21] };
      break;
    default:
      break;
  }
}

module.exports = app;
