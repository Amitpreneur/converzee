var mongoose = require("mongoose");
var JvZooSchema = new mongoose.Schema(
  {
    ccustemail: {
      type: String,
    },
    pid: String,
    jvZooData: {},
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

mongoose.model("JvZoo", JvZooSchema);
module.exports = mongoose.model("JvZoo");
