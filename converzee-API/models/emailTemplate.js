var mongoose = require("mongoose");
var EmailTemmplateSchema = new mongoose.Schema({
  userId: String,
  campName: { type: String, default: "" },
  template: {},
});

mongoose.model("EmailTemplate", EmailTemmplateSchema);
module.exports = mongoose.model("EmailTemplate");
