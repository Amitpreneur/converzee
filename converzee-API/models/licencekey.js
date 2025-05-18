var mongoose = require("mongoose");
var licenceSchema = new mongoose.Schema({
  userId: String,
  key: mongoose.Types.ObjectId,
  email: String,
  tools: [],
  isActive: { type: Boolean, default: false }
});

mongoose.model("Licence", licenceSchema);
module.exports = mongoose.model("Licence");
