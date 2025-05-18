var mongoose = require("mongoose");
var ImageOptiSchema = new mongoose.Schema({
  userId: String,
  fileName: String
});

mongoose.model("ImageOpti", ImageOptiSchema);
module.exports = mongoose.model("ImageOpti");
