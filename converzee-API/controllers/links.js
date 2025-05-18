var express = require("express");
var app = express();
const Link = require("../models/links");

app.post("/get-links", (req, res) => {
    Link.find({}, function (err, doc) {
        if (err) {
            res.status(200).json({ success: false, message: "Something Went Wrong" });
        } else {
            if (doc) {
                res.status(200).json({ success: true, message: "Found", links: doc });
            } else {
                res.status(200).json({ success: true, message: "Found", links: null });
            }
        }
    });
});

app.post("/add-links", (req, res) => {
    const { state } = req.body;
    const keys = Object.keys(state);
    keys.forEach((key, i) => {
        Link.find({ name: key }, (err1, doc1) => {
            if(!doc1.length) {
                Link.create({name: key, url: state[key]}, (err, doc) => {
                    if( i == (keys.length-1)) {
                        if(err) {
                            res.status(200).json({ success: false, message: "Something Went Wrong" });
                        } else {
                            res.status(200).json({ success: true, message: "Links added successfully", data: doc });
                        }
                    }
                });
            } else {
                if( i == (keys.length-1)) {
                    res.status(200).json({ success: false, message: "Links already added.....Please use edit action for update." });
                }
            }
        });
    });
});

app.post("/update-links", function (req, res) {
    const userData = req.body.userData;
    if (!userData.linkId) {
        res.status(200).json({ success: false, message: "Missing Id" });
    } else {
        const updatedObj = { url: userData.url };
        Link.findByIdAndUpdate(userData.linkId, updatedObj, (err, doc) => {
            if (err) {
            res.status(200).json({ success: false, message: "Error" });
            } else {
            res.status(200).json({ success: true, message: "Successfully Updated" });
            }
        });
    }
});



module.exports = app;
