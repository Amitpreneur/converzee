var express = require("express");
var app = express();
var Tool = require("../models/tool");
const AppData = require("../models/appData");
const Util = require("./Util");
const _ = require("lodash");
const request = require("request");
const DOMAIN_PATH = process.env.DOMAIN_PATH;

function checkCodeInEx(CODE) {}

function toolDataVerify(toolData) {
  if (toolData.toolId == 17) {
    const requiredKeys = ["layout", "create", "cta", "timer", "STYLE"];
    const keys = _.keys(toolData);
    if (_.includes(keys, requiredKeys)) {
      return true;
    }
  } else if (toolData.toolId == 3) {
    const requiredKeys = ["layout", "create", "cta", "STYLE", "toolData"];
    const keys = _.keys(toolData);
    if (_.includes(keys, requiredKeys)) {
      return true;
    }
  } else if (toolData.toolId == 9) {
    const requiredKeys = ["headline", "subheadline", "timer", "STYLE", "mediaType"];
    const keys = _.keys(toolData);
    if (_.includes(keys, requiredKeys)) {
      return true;
    }
  } else {
    return false;
  }
  return false;
}

function saveTool(id, toolData, res) {
  const newToolData = new Tool();
  if (toolDataVerify(toolData)) {
    res.status(200).json({ success: false, message: "Missing Options" });
    return false;
  }

  newToolData.userId = id;
  newToolData.name = toolData.name;
  newToolData.toolId = toolData.toolId;
  newToolData.title = toolData.title;
  newToolData.toolName = toolData.toolName;
  newToolData.script = toolData.script;
  newToolData.TEXT = toolData.TEXT;
  newToolData.CODE = toolData.CODE;
  newToolData.items = toolData.items;
  newToolData.video = toolData.video;
  newToolData.STYLE = toolData.STYLE;
  newToolData.TIMER = toolData.TIMER;
  newToolData.FAVICON = toolData.FAVICON;
  newToolData.TIMING = toolData.TIMING;
  newToolData.SOUND = toolData.SOUND;
  newToolData.icons = toolData.icons;
  newToolData.AutoResponder = toolData.AutoResponder;
  newToolData.image = toolData.image;
  newToolData.create = toolData.create;
  newToolData.cta = toolData.cta;
  newToolData.timer = toolData.timer;
  newToolData.layout = toolData.layout;
  newToolData.redirection = toolData.redirection;
  newToolData.template = toolData.template;
  newToolData.media = toolData.media;
  newToolData.nothanks = toolData.nothanks;
  newToolData.number = toolData.number;
  newToolData.status = toolData.status;
  newToolData.fileName = DOMAIN_PATH + id + ".js";
  newToolData.toolData = toolData.toolData;
  newToolData.chattitle = toolData.chattitle;
  newToolData.chats = toolData.chats;
  newToolData.support = toolData.support;
  newToolData.contact = toolData.contact;
  newToolData.initChat = toolData.initChat;
  newToolData.parent_tool_id = toolData.parent_tool_id;
  newToolData.copied = toolData.copied;
  
  newToolData.save((err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      let layout = doc.toolData ? doc.toolData.layout : "";
      const fileScript = Util.createScriptCode(doc.toolId, doc._id, layout);
      res.status(200).json({ success: true, message: "Tool Saved Successfully", script: fileScript });
      if (toolData.toolId == 18) {
        sendBotData(id, doc._id, toolData.chats, toolData.support, toolData.contact, toolData.initChat);
      }
    }
  });
}

function updateTool(userId, docId, toolData, res) {
  if (toolDataVerify(toolData)) {
    res.status(200).json({ success: false, message: "Missing Options" });
    return false;
  }
  if (docId) {
    const updateToolData = new Object();
    updateToolData.TEXT = toolData.TEXT;
    updateToolData.CODE = toolData.CODE;
    updateToolData.items = toolData.items;
    updateToolData.video = toolData.video;
    updateToolData.STYLE = toolData.STYLE;
    updateToolData.TIMER = toolData.TIMER;
    updateToolData.FAVICON = toolData.FAVICON;
    updateToolData.TIMING = toolData.TIMING;
    updateToolData.SOUND = toolData.SOUND;
    updateToolData.icons = toolData.icons;
    updateToolData.AutoResponder = toolData.AutoResponder;
    updateToolData.image = toolData.image;
    updateToolData.create = toolData.create;
    updateToolData.cta = toolData.cta;
    updateToolData.timer = toolData.timer;
    updateToolData.layout = toolData.layout;
    updateToolData.redirection = toolData.redirection;
    updateToolData.template = toolData.template;
    updateToolData.media = toolData.media;
    updateToolData.nothanks = toolData.nothanks;
    updateToolData.number = toolData.number;
    updateToolData.status = toolData.status;
    updateToolData.toolData = toolData.toolData;
    updateToolData.chattitle = toolData.chattitle;
    updateToolData.chats = toolData.chats;
    updateToolData.support = toolData.support;
    updateToolData.contact = toolData.contact;
    updateToolData.initChat = toolData.initChat;
    updateToolData.parent_tool_id = toolData.parent_tool_id;
    updateToolData.copied = toolData.copied;
    // updateToolData.fileName = DOMAIN_PATH + id + ".js";

    Tool.findByIdAndUpdate(docId, updateToolData, (err, doc) => {
      if (err) {
        res.status(200).json({ success: false, message: err });
      } else {
        let layout = doc.toolData ? doc.toolData.layout : "";
        const fileScript = Util.createScriptCode(doc.toolId, doc._id, layout);
        res.status(200).json({ success: true, message: "Tool Saved Successfully", script: fileScript });
      }
    });
    if (toolData.toolId == 18) {
      sendBotData(userId, docId, toolData.chats, toolData.support, toolData.contact, toolData.initChat);
    }
  }
}

app.post("/insert", function (req, res) {
  const toolData = req.body.toolData;
  let userId = req.doc._id;
  if (req.doc.access == 30) {
    userId = req.doc.parent;
  }
  var con = {
    $and: [{ userId: userId }, { title: toolData.toolName }],
  };
  Tool.findOne(con, function (er, to) {
    if (to && !toolData._id) {
      res.status(200).json({ success: false, message: "Tool already exist with same campaign name." });
    } else {
      if (!toolData._id || toolData._id === null) {
        saveTool(userId, toolData, res);
      } else {
        updateTool(userId, toolData._id, toolData, res);
      }
    }
  });
});

app.post("/get", function (req, res) {
  let userId = req.doc._id;
  if (req.doc.access == 30) {
    userId = req.doc.parent;
  }
  const searchData = req.body.searchData;
  const searchStr = searchData.searchStr;
  const filters = searchData.filters || [];
  const sorting = searchData.sorting === 1 ? 1 : -1;
  var start_date = searchData.start_date;
  var end_date = searchData.end_date;
  var orCon = [];
  var andCon = [];
  andCon.push({ userId: userId });
  var con = {};
  if (searchStr != null) {
    orCon.push({ title: new RegExp(searchStr, "i") }, { name: new RegExp(searchStr, "i") }, { toolName: new RegExp(searchStr, "i") });
  }
  if (filters && filters.length) {
    andCon.push(...filters);
  }
  if (start_date && end_date) {
    var start_date = new Date(start_date);
    var end_date = new Date(end_date);
    end_date.setHours(23, 59, 59, 999);
    start_date.setHours(0, 0, 0, 0);
    andCon.push({ createdAt: { $gte: start_date } });
    andCon.push({ createdAt: { $lte: end_date } });
  }
  if (andCon.length) con["$and"] = andCon;
  if (orCon.length) con["$or"] = orCon;
  let skipConditions = { sort: { createdAt: sorting } };
  Tool.find(con, {}, skipConditions, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Found", campaigns: doc });
    }
  });
});

app.post("/getOne/:id", function (req, res) {
  const id = req.params.id;
  Tool.findOne({ _id: id }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Found", data: doc });
    }
  });
});

app.post("/clone/:id", function (req, res) {
  const id = req.params.id;
  Tool.findOne({ _id: id }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      doc.parent_tool_id = id;
      doc.copied = doc.copied ? doc.copied+1 : 1;
      saveTool(req.doc._id, doc, res);
    }
  });
});
app.post("/archive/:id", function (req, res) {
  const id = req.params.id;
  Tool.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      Tool.findByIdAndUpdate(id, { status: !doc.status }, (err2, doc2) => {
        if (err2) {
          res.status(200).json({ success: false, message: err2 });
        } else {
          res.status(200).json({ success: true, message: "Update" });
        }
      });
    } else {
      res.status(200).json({ success: false, message: err });
    }
  });
});

app.post("/purge/:id", function (req, res) {
  const id = req.params.id;
  Tool.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      res.status(200).json({ success: true, message: "Purged" });
    }
  });
});

app.post("/toolNameVerify", function (req, res) {
  const toolData = req.body.toolData;
  var con = {
    $and: [{ userId: req.doc._id }, { title: toolData.toolName }],
  };
  Tool.findOne(con, function (er, to) {
    if (to) {
      res.status(200).json({ success: false, message: "tool already exit with same campaign name" });
    } else {
      res.status(200).json({ success: true, message: "Done" });
    }
  });
});

app.post("/campList", function (req, res) {
  const userId = req.doc._id;
  Tool.find({ userId: userId }, "_id toolId title toolName", function (er, doc) {
    if (er) {
      res.status(200).json({ success: false, message: "No Camp Found" });
    } else {
      res.status(200).json({ success: true, message: "Done", camp: doc });
    }
  });
});

function sendBotData(userId, campId, chats, support, contact, initChat) {
  var options = {
    method: "POST",
    url: "http://127.0.0.1:3002/chatbot/save",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ campId: campId, userId: userId, chats: chats, support: support, contact: contact, initChat: initChat }),
  };
  try {
    request(options, function (error, response) {
      if (error) throw new Error(error);
    });
  } catch (e) {}
}

app.post("/downloadOptin/:id", function (req, res) {
  const id = req.params.id;
  AppData.findOne({ campId: id }, (err, doc) => {
    if (doc) {
      res.status(200).json({ success: true, message: "Saved", data: doc.contact });
    } else {
      res.status(200).json({ success: true, message: "Saved", data: [] });
    }
  });
});

module.exports = app;
