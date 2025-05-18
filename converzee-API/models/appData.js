var mongoose = require("mongoose");
var AppData = new mongoose.Schema({
  userId: String,
  campId: String,
  campName: String,
  contact: { type: Array, default: [] },
});

mongoose.model("appData", AppData);
module.exports = mongoose.model("appData");
