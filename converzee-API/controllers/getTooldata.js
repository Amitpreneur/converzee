const express = require("express");
const moment = require("moment");
var random = require('random-name');
const place = require("random-places");

const app = express();
const User = require("../models/user");
const AppData = require("../models/appData");
const Tools = require("../models/tool");
const ToolUtil = require("./ToolUtil");
const Domain = require("../models/domain");
const getItem = require("../template");

function createObject(tools, domains) {
  const data = {
    campaigns: new Map(),
    popup_conditions: {
      contains: [],
      exact: [],
    },
    exclude_conditions: {
      contains: [],
      exact: [],
    },
    websites: [],
  };
  addcampaigns(data, tools);
  ToolUtil.getDomains(data, domains);
  return data;
  //   return {
  //     campaigns: {
  //       "5d41a909ad367bdb2e8b49cd": {
  //         element_name: "Botstar",
  //         element_data: { messages: [{ icon: "", text: "Hey \ud83d\udc4b, Don't Miss Out" }], timeBeforeFirst: "2", frequency: "3", sound: "1" },
  //         element_type: "tab_message",
  //         element_domid: { $id: "5ba6895aad367be15c8b45f4" },
  //         element_displayurl: [{ type: "CONTAINS", data: "localhost" }, { type: "CONTAINS", data: "http://localhost/scripttest/" }, { type: "CONTAINS", data: "http://localhost/scripttest/" }],
  //         element_updated: "2019-07-31 02:48:37",
  //         id: "5d41a909ad367bdb2e8b49cd"
  //       }
  //     },
  //     popup_conditions: {
  //       contains: [
  //         { campid: "5d41a909ad367bdb2e8b49cd", check: "localhost" },
  //         { campid: "5ba6941dad367bb6568b4630", check: "getviraleze.com" },
  //         { campid: "5ba6988fad367be15c8b45f8", check: "getviraleze.com/pro" },
  //         { campid: "5ba7686ead367bb6568b4646", check: "getviraleze.com/extreme" },
  //         { campid: "5ba7e037ad367bb5568b4634", check: "getviraleze.com/proa" },
  //         { campid: "5ba7e037ad367bb5568b4634", check: "getviraleze.com/secret" },
  //         { campid: "5ba7e037ad367bb5568b4634", check: "getviraleze.com/secret1" }
  //       ]
  //     }
  //   };
}

app.post("/getUserData/:id", function (req, res) {
  const id = req.params.id;
  if (id) {
    Tools.find({ userId: id, status: true }, (err, tool) => {
      Domain.findOne({ userId: id }, (err2, domains) => {
        if (domains) {
          const data = createObject(tool, domains);
          res.status(200).json({ success: true, message: "Got Data", data: data });
        } else {
          res.status(200).json({ success: false, message: "Domain not found." });
        }
      });
    });
  } else {
    res.status(200).json({ success: false, message: "Invalid ID" });
  }
});

function addcampaigns(data, tools) {
  const popup_conditions = new Object();
  Object.assign(popup_conditions, { contains: new Array(), exact: new Array() });
  const exclude_conditions = new Object();
  Object.assign(exclude_conditions, { contains: new Array(), exact: new Array() });
  tools.map(function (tool, index) {
    if (tool) {
      const id = tool._id;
      const newObject = {
        element_name: tool.title,
        element_data: ToolUtil.getToolData(tool),
        element_type: ToolUtil.getToolElementName(tool.toolId),
        element_domid: { $id: tool.element_domid },
        element_displayurl: ToolUtil.getCODE(tool.CODE),
        element_updated: tool.updatedAt,
        id: tool._id,
      };
      data.campaigns[id] = newObject;
      ToolUtil.getAllInclude(tool.CODE, popup_conditions, id);
      ToolUtil.getAllExclude(tool.CODE, exclude_conditions, id);
    }
  });
  data.popup_conditions = popup_conditions;
}

app.post("/tempates/:typ", function (req, res) {
  const typ = req.params.typ;
  const objs = getItem(typ);
  res.status(200).json({ success: true, message: "GOT DATA", data: objs });
});

async function getLatestUser() {
  return new Promise(async(resolve, reject) => {
    let ramdomData = {
      "name" : random(),
      "place" : getRandomPlace()
    }
    resolve(ramdomData);
  });
} 

io.on('connection', async (socket) => {
  console.log('New client connected');
  
  // handling the output request.
  socket.on('send_hours', async function(){
    socket.emit('get_user_data',{ data : await getLatestUser()}); 
  });
});

module.exports = app;
