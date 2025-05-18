var mongoose = require("mongoose");
var CampaignSchema = new mongoose.Schema(
  {
    element_name: String,
    element_data: Object,
    element_type: String,
    element_domid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    clicks: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    element_status: Number,
    contains: {
      type: [String]
    },
    exact: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

mongoose.model("Campaign", CampaignSchema);
module.exports = mongoose.model("Campaign");
