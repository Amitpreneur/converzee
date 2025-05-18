var mongoose = require("mongoose");
var formSchema = new mongoose.Schema({
    name: String,
    formData: String,
    targetRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

mongoose.model("custom_autoresponder", formSchema);
module.exports = mongoose.model("custom_autoresponder");
