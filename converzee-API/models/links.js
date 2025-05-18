var mongoose = require("mongoose");
var LinksSchema = new mongoose.Schema({
  name: String,
  url: String
});

mongoose.model("Links", LinksSchema);
module.exports = mongoose.model("Links");
