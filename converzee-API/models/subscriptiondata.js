var mongoose = require("mongoose");
var campDataSchema = new mongoose.Schema({
  campid: String,
  data: []
});

mongoose.model("campData", campDataSchema);
module.exports = mongoose.model("campData");
