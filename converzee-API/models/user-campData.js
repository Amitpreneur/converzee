var mongoose = require("mongoose");
function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + today.getFullYear();
}
var UserCampSchema = new mongoose.Schema({
  userId: String,
  clicks: { type: Array, default: [{ date: getTodayDate(), click: 0 }] },
  views: { type: Array, default: [{ date: getTodayDate(), view: 0 }] },
});

mongoose.model("CampSchema", UserCampSchema);
module.exports = mongoose.model("CampSchema");
