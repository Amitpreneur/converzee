var express = require("express");
var app = express();
const moment = require("moment");
var passwordHash = require("password-hash");
const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const ClientOAuth2 = require("client-oauth2");

const Util = require("./Util");
const User = require("../models/user");
const License = require("../models/licencekey");
const Link = require("../models/links");
const CustomAR = require("../models/customAutoResponder");
const Tool = require("../models/tool");
const Domain = require("../models/domain")
const Subscriber = require("./subscriber");

const PATH = process.env.HOSTURL;
const state = Date.now();

const OAUTH_URL = 'https://auth.aweber.com/oauth2',
TOKEN_URL = 'https://auth.aweber.com/oauth2/token',
scopes = [
    'account.read',
    'list.read',
    'list.write',
    'subscriber.read',
    'subscriber.write',
    'email.read',
    'email.write',
    'subscriber.read-extended',
    'landing-page.read'
];


const getTotalKeys = function (userId) {
  return new Promise((resolve, reject) => {
    License.find({ userId }, (err, doc) => {
      if (doc) {
        resolve(doc.length);
      } else {
        resolve(0);
      }
    });
  });
};

app.post("/getPermissions", async (req, res) => {
  const id = req.doc._id;
  if (!id) {
    res.status(200).json({ success: false, message: "LOL" });
    return;
  }

  let linkList = await getLinksFromDB();
  User.findById(id, async (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: err });
    } else {
      if (doc) {
        if (doc.access == 30) {
          User.findById({ _id: doc.parent }, async (err2, doc2) => {
            if (err2) {
              res.status(200).json({ success: true, message: "GETTING TOOLS", tools: [], access: 30, isUpgrade1: false, isUpgrade2: false, domainLimit: 5 });
            } else {
              res.status(200).json({
                success: true,
                email: doc.email,
                userName: doc.firstname,
                message: "GETTING TOOLS",
                tools: doc2.allowedTool,
                isUpgrade1: doc2.isUpgrade1,
                isUpgrade2: doc2.isUpgrade2,
                isUpgrade3: doc2.isUpgrade3,
                access: doc.access,
                host: PATH,
                autoResponder: null,
                vipBonus: doc.vipBonus,
                domainLimit: doc.domainLimit,
                isSubuser: doc.isSubuser,
                isDeveloperAccess: doc2.isDeveloperAccess,
                isAdvancedOpt: doc2.isAdvancedOpt,
                parent: doc.parent,
                createdAt: moment(doc.createdAt).format("MMMM DD, YYYY"),
                linkList: linkList
              });
            }
          });
        } else {
          const keys = await getTotalKeys(id);
          res.status(200).json({
            success: true,
            email: doc.email,
            userName: doc.firstname,
            message: "GETTING TOOLS",
            tools: doc.allowedTool,
            isUpgrade1: doc.isUpgrade1,
            isUpgrade2: doc.isUpgrade2,
            isUpgrade3: doc.isUpgrade3,
            keys: keys,
            consumeLicence: doc.consumeLicence,
            totallicence: doc.totallicence,
            access: doc.access,
            host: PATH,
            autoResponder: doc.autoResponder,
            vipBonus: doc.vipBonus,
            domainLimit: doc.domainLimit,
            isSubuser: doc.isSubuser,
            isDeveloperAccess: doc.isDeveloperAccess,
            isAdvancedOpt: doc.isAdvancedOpt,
            createdAt: moment(doc.createdAt).format("MMMM DD, YYYY"), 
            linkList: linkList
          });
        }
      } else {
        res.status(200).json({ success: true, message: "GETTING TOOLS", tools: [], access: 30, isUpgrade1: false, isUpgrade2: false, isUpgrade3: false, domainLimit: 5, linkList: linkList });
      }
    }
  });
});

app.post("/developerAccess", (req, res) => {
  const { email, userName } = req.body.userData;
  if (!email && !userName) {
    res.status(200).json({ success: false, message: "InValid data " });
    return;
  }
  User.find({ parent: req.doc._id }, (doc, err) => {
    if (doc && doc.length > 4) {
      res.status(200).json({ success: false, message: "you Reach Maximum Developer access limit" });
    } else {
      const password = Util.randomPassword();
      const newUser = new User();
      newUser.firstname = userName;
      newUser.email = email;
      newUser.password = passwordHash.generate(password);
      newUser.access = 30;
      newUser.isActive = true;
      newUser.createdBy = req.doc._id;
      newUser.parent = req.doc._id;
      newUser.save((err1, doc1) => {
        if (!err1) {
          let msg = "Your Developer Account Has been created Email : " + email + "\n\n Password : " + password + "\n\n";
          let subject = "Account Access";
          Util.sendMail(email, msg, subject);
          res.status(200).json({ success: true, message: "Account Has been created Email has been\n sent to repective email address" });
        } else {
          res.status(200).json({ success: false, message: "Account Already Added" });
        }
      });
    }
  });
});

app.post("/getAccountInfo", (req, res) => {
  const UID = req.doc._id;
  User.find({ parent: UID }, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: "Error while getting info" });
    } else {
      const users = [];
      doc.forEach((e) => {
        users.push({ _id: e._id, name: e.firstname, email: e.email });
      });
      res.status(200).json({ success: true, users });
    }
  });
});

app.post("/deleteDeveloper", (req, res) => {
  const { id } = req.body.userData;
  User.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: "No Info for user" });
    } else {
      res.status(200).json({ success: true, message: "Done" });
    }
  });
});

app.post("/deleteUserData", (req, res) => {
  const { id } = req.body.userData;
 
  fs.unlinkSync(`./client/dist/code/${id}.js`);
  Tool.deleteMany({userId: id},(err, doc) => {
    if(err){
      res.status(200).json({ success: false, message: "Campaigns not found."})
    } else {
      Domain.deleteMany({userId: id}, (err1, doc1) => {
        if(err1) {
          res.status(200).json({ success: false, message: "Domain not found."})
        } else {
          User.findByIdAndDelete(id, (err2, doc3) => {
            if (err) {
              res.status(200).json({ success: false, message: "No Info for user" });
            } else {
              res.status(200).json({ success: true, message: "Done" });
            }
          });
        }
      })
    }
  });
});

app.post("/changePassword", (req, res) => {
  const id = req.doc._id;
  const data = req.body.userData;
  const currentPassword = data.currentPassword;
  const newPassword = data.newPassword;
  User.findById(id, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: "No Info for user" });
    } else {
      const oldPassword = doc.password;
      if (passwordHash.verify(currentPassword, oldPassword)) {
        User.findByIdAndUpdate(id, { password: passwordHash.generate(newPassword) }, (err, doc) => {
          if (err) {
            res.status(200).json({ success: false, message: "Something Went Wrong" });
          } else {
            res.status(200).json({ success: true, message: "SuccessFully Change Password" });
          }
        });
      } else {
        res.status(200).json({ success: false, message: "Current Password Mismatch" });
      }
    }
  });
});

app.post("/getAllAutoResponder", (req, res) => {
    const id = req.doc._id;

    User.findById(id, async(err, doc) => {
      if(err) {
        res.status(200).json({ success: false, message: "User not found." });
      } else {
        if(doc.customAR.length>0) {
          let CustomARData = await CustomAR.find({ "targetRequest" : id });
          res.status(200).json({ success: true, autoResponder: doc.autoResponder ? doc.autoResponder : [], displayData: CustomARData });
        } else {
          res.status(200).json({ success: true, autoResponder: doc.autoResponder ? doc.autoResponder : [], displayData: [] });
        }
      }
    })
})

app.post("/configMail", function (req, res) {
  const data = req.body.userData;
  const id = req.doc._id; var filtered = null;
  User.findById(id, async(err, doc) => {
    if(doc) {
      let checkAR = (doc.autoResponder) ? doc.autoResponder : [];
      if(checkAR.length) {
        checkAR.filter( (el, i) => {
          if(el.mailServer === data.mailServer) {
            filtered = i;
          }
        })

        if(filtered) {
          Object.keys(data).map(keys => {
            if(keys !== "mailServer") {
              checkAR[filtered][keys] = data[keys];
            }
          }) 
        } 
      } else {
        checkAR.push(data);
      }

      if( data.mailServer == "AWEBER" || data.mailServer == "INFUSION_SOFT" || data.mailServer == "CONSTANT_CONTACT") {
        if(filtered){
          checkAR[filtered]["isValidate"] = true;
        } else {
          data["isValidate"] = true;
          checkAR.push(data);
        }
        User.findByIdAndUpdate(doc._id, { autoResponder: checkAR }, (err, doc1) => {
          if (doc1) {
            res.status(200).json({ success: true, message: "Autoresponder connected successfully." });
            Util.sendGetRequest("appData/clearCache");
          } else {
            res.status(200).json({ success: false, message: "Something went wrong" });
          }
        });
      } else {
        let response = await Subscriber(data, "getList", data.mailServer );
        if(response) {
          if(response.lists) {
            if(filtered){
              checkAR[filtered]["isValidate"] = true;
            } else {
              data["isValidate"] = true;
              checkAR.push(data);
            }
            User.findByIdAndUpdate(doc._id, { autoResponder: checkAR }, (err, doc1) => {
              if (doc1) {
                res.status(200).json({ success: true, message: "Autoresponder connected successfully." });
                Util.sendGetRequest("appData/clearCache");
              } else {
                res.status(200).json({ success: false, message: "Something went wrong" });
              }
            });
          } else {
            res.status(200).json({ success: false, message: response.error });
          }
        }
      }
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  });
});

app.post("/saveListId", (req, res) => {
  const data = req.body.userData;
  const id = req.doc._id;
  
  User.findById(id, (err, doc) => {
    for(let i=0; i<doc.autoResponder.length; i++) {
      if(doc.autoResponder[i].mailServer === data.mailServer) {
        doc.autoResponder[i]["uid"] = data.uid;
      }
    }
    
    User.findByIdAndUpdate(doc._id, { autoResponder: doc.autoResponder }, (err, doc1) => {
      if (doc1) {
        res.status(200).json({ success: true, message: "Successfully Update" });
        Util.sendGetRequest("appData/clearCache");
      } else {
        res.status(200).json({ success: false, message: "Something went wrong" });
      }
    });
  });
  
});

app.post("/getListFromAutoresponder", async (req,res) => {
  try {
    const id = req.doc._id;
    const { action, responder } = req.body;
    let apiJson = {};

    User.findById(id, async (err, doc) => {
      if(err) {
        res.status(200).json({success:false, message: "User not found"});
      } else {
        let ar = doc.autoResponder;
        ar.forEach((el) => {
          if(el.mailServer === responder) {
            apiJson = el;
          }
        });
        apiJson["userId"] = id;
        let response = await Subscriber(apiJson, action, responder );
        if(response) {
          if(response.lists) {
            res.status(200).json({success: true, "lists": response.lists});
          } else {
            res.status(200).json({ success: false, message: response.error });
          }
        }
      }
    })
  } catch (err) {
    res.status(200).json({ success: false, message: "Something went wrong", error: err});
  }
});

app.post("/aweber/authorize", async(req, res) => {
  const { clientId, clientSecret, mailServer } = req.body;
  const aweberAuth = new ClientOAuth2({
    clientId, clientSecret,
    accessTokenUri:TOKEN_URL,
    authorizationUri:`${OAUTH_URL}/authorize`,
    redirectUri:`${process.env.DOMAIN_PATH}/aweber/callback`,
    scopes
  });

  const data = {
    "mailServer": mailServer,
    "clientId": clientId,
    "clientSecret": clientSecret
  }; 
  let getResponse = await updateAutoResponder(data, req.doc._id);
  if(getResponse) {
    const authorizationUrl = aweberAuth.code.getUri({state});
    if(authorizationUrl) {
      res.status(200).json({status:true, "url":authorizationUrl});
    } else {
      res.status(200).json({status:false});
    }
  } else {
    res.status(200).json({ success: false, message: "Something went wrong" });
  }
  
});

app.post("/autoresponder/authorize", async(req, res) => {
  const { clientId, clientSecret, mailServer } = req.body;
  const data = {
    "mailServer": mailServer,
    "clientId": clientId,
    "clientSecret": clientSecret
  }; 

  let getResponse = await updateAutoResponder(data, req.doc._id);
  if(getResponse) {
      res.status(200).json({status:true, "message":"Credentials added."});
  } else {
    res.status(200).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/add-custom-ar-form", async(req, res) => {
  const { name, formData } = req.body;
  const id = req.doc._id;

  const newForm = new CustomAR();
  newForm.name = name;
  newForm.formData = formData;
  newForm.targetRequest = id;

  newForm.save((err, doc) => {
    if (!err) {
      User.findById(id, async(err, doc1) => {
        if(doc1) {
          doc1.customAR.push(doc._id);
          User.findByIdAndUpdate(doc1._id, { customAR: doc1.customAR }, (err1, doc1) => {
            if (doc1) {
              res.status(200).json({ success: true, message: "Form added successfully." });
            } else {
              res.status(200).json({ success: false, message: "Something went wrong" });
            }
          });
        } 
      });
    } else {
      res.status(200).json({ success: false, message: "Form not added" });
    }
  });
   
});

app.post("/edit-custom-ar-form", async(req, res) => {
  const { name, formData, id } = req.body;
  
  CustomAR.findByIdAndUpdate(id, { name, formData }, (err, doc) => {
    if (doc) {
      res.status(200).json({ success: true, message: "Form added successfully." });
    } else {
      res.status(200).json({ success: false, message: "Something went wrong" });
    }
  });
});

app.post("/delete-custom-ar-form", async(req, res) => {
  const { id } = req.body.userData;

  CustomAR.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.status(200).json({ success: false, message: "No Info for Form" });
    } else {
      User.findById(req.doc._id, async(err1, doc1) => {
        if(doc1) {
          let ctAR = doc1.customAR.filter(ar => {
            return ar != id
          })
          User.findByIdAndUpdate(doc1._id, { customAR: ctAR }, (err2, doc1) => {
            if (doc1) {
              res.status(200).json({ success: true, message: "Form remove successfully." });
            } else {
              res.status(200).json({ success: false, message: "Something went wrong" });
            }
          });
        } 
      });
    }
  });
});

app.post("/disconnect-ar", async(req, res) => {
  const { userData } = req.body;
  let respData;

  User.findById(req.doc._id, async(err, doc) => {
    if(doc) {
      let checkAR = (doc.autoResponder) ? doc.autoResponder : [];
      if(checkAR.length) {
        respData = checkAR.filter( (el, i) => {
          return el.mailServer !== userData.mailServer
        })
        if(respData) {
          User.findByIdAndUpdate(doc._id, { autoResponder: respData }, (err, doc1) => {
            if (doc1) {
              res.status(200).json({ success: true, message: "Autoresponder disconnected successfully." });
              Util.sendGetRequest("appData/clearCache");
            } else {
              res.status(200).json({ success: false, message: "Something went wrong" });
            }
          });
        }
      }
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  });
});

async function updateAutoResponder(data, userId) {
  let filtered = "";
  return new Promise((resolve, reject) => {
    User.findById(userId, (err1, doc) => {
      let checkAR = doc.autoResponder ? doc.autoResponder : [];
      if(checkAR.length) {
        checkAR.filter( (el, i) => {
          if(el.mailServer === data.mailServer) {
            filtered = i;
          }
        })
  
        if(filtered !== "") {
          Object.keys(data).map(keys => {
            if(keys !== "mailServer") {
              checkAR[filtered][keys] = data[keys];
            }
          }) 
        } else {
          checkAR.push(data);
        }
      } else {
        checkAR.push(data);
      }
      User.findByIdAndUpdate(doc._id, { autoResponder: checkAR }, (err, doc1) => {
        if (doc1) {
          resolve(doc1);
        } else {
          reject(err);
        }
      });
    });

  })
}

async function getLinksFromDB() {
  return new Promise((resolve, reject) => {
    let obj = {};
    Link.find({}, function (err, doc) {
      if (err) {
          reject(err);
      } else {
        for(let i=0; i<doc.length; i++){
          obj[doc[i].name] = doc[i].url;
        }  
        resolve(obj);
      }
  })
});
}

module.exports = app;

