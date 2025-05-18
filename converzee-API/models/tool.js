var mongoose = require("mongoose");
var ToolSchema = new mongoose.Schema(
  {
    name: String,
    userId: String,
    toolId: Number,
    status: Boolean,
    title: String,
    toolName: String,
    script: "",
    fileName: "",
    toolData: {},
    TEXT: {},
    CODE: {},
    items: {},
    video: {},
    STYLE: {},
    TIMER: {},
    FAVICON: {},
    TIMING: {},
    SOUND: {},
    AutoResponder: {},
    image: {},
    create: {},
    cta: {},
    timer: {},
    layout: {},
    redirection: {},
    template: {},
    media: {},
    nothanks: {},
    number: {},
    icons: {},
    element_domid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    clicks: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    chattitle: { type: String, default: "" },
    chats: { type: Array, default: [] },
    support: { type: String, default: "" },
    contact: { type: String, default: "" },
    initChat: { type: Array, default: [] },
    parent_tool_id: { type: mongoose.Types.ObjectId, default: null },
    copied: { type: Number, default: null }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

mongoose.model("Tool", ToolSchema);
module.exports = mongoose.model("Tool");
