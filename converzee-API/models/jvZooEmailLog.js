var mongoose = require("mongoose");
var JvZooEmailLogSchema = new mongoose.Schema(
  {
    ccustemail: {
      type: String,
    },
    pid: String,
    password: String,
    name: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

mongoose.model("JvZooEmailLog", JvZooEmailLogSchema);
module.exports = mongoose.model("JvZooEmailLog");
