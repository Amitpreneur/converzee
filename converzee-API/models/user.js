var mongoose = require("mongoose");

//Access
// 100: SuperAdmin
// 80:  Admin With licence
// 50:  NormalUser

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: String,
    lastname: String,

    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    allowedTool: { type: Array, default: [] },
    domainLimit: { type: Number, default: 5 },
    access: { type: Number, default: 50 },
    isActive: { type: Boolean, default: false },
    isSubuser: { type: Boolean, default: false },
    isDeveloperAccess: { type: Boolean, default: false },
    isAdvancedOpt: { type: Boolean, default: false },
    totallicence: { type: Number, default: 0 },
    oto2Limit: { type: Number, default: 3 },
    oto2Remain: { type: Number, default: 0 },
    oto3Product: { type: Number, default: 0 },
    consumeLicence: { type: Number, default: 0 },
    createdBy: { type: mongoose.Types.ObjectId },
    otp: { type: String, default: null },
    isUpgrade1: { type: Boolean, default: false },
    isUpgrade2: { type: Boolean, default: false },
    isUpgrade3: { type: Boolean, default: false },
    parent: { type: mongoose.Types.ObjectId, default: null },
    autoResponder: { type: Array, default: null },
    vipBonus: { type: Boolean, default: false },
    customAR: [{ 
      type: mongoose.Types.ObjectId, 
      ref: "custom_autoresponder"
  }],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

mongoose.model("User", UserSchema);
module.exports = mongoose.model("User");
