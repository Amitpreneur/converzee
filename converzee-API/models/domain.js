var mongoose = require("mongoose");
var DomainSchema = new mongoose.Schema({
  userId: String,
  domains: []
});

mongoose.model("Domain", DomainSchema);
module.exports = mongoose.model("Domain");
