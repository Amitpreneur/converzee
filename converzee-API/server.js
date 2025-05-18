var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var session = require("express-session");
var jwt = require("jsonwebtoken");
const Utility = require("./utility");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();
var MongoStore = require("connect-mongo")(session);
var app = express();
http = require('http').createServer(app),
io = require('socket.io')(http);

//Decode URL and data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Import Router
const gettool = require("./controllers/getTooldata");
const toolHandler = require("./controllers/toolHandler");
const domain = require("./controllers/domain");
const Regi = require("./controllers/register");
const user = require("./controllers/user");
const fileupload = require("./controllers/upload");
const pixel = require("./controllers/pixel");
const clicksAndView = require("./controllers/clickAndViews");
const dashboard = require("./controllers/dashboard");
const campData = require("./controllers/campData");
const jvzoo = require("./controllers/storeJvZoo");
const reseller = require("./controllers/reseller-user");
const access = require("./controllers/access");
const AppData = require("./controllers/appData");
const emailTemplate = require("./controllers/emailsave");
const links = require("./controllers/links");

const User = require("./models/user");
let userId = null;
//-----------DB configuration -----------//

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true,  useCreateIndex: true, useFindAndModify: false,});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error :"));
db.once("open", function () {
  console.log("database connected");
});

//---------------mongo storage configuration --------------------//
app.use(
  session({
    secret: `?tRTZ,1-Rb%S#cpG+Mi@mE9)aBgr,r]1X/tI7zX#m8:)Or0j&0kx22p0V3w]`,
    resave: true,
    saveUninitialized: true,
    cookie: { 
      cookie: { maxAge: 24*60*60*1000 },
      secure: true 
    },
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

//End DB config

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//------------ERROR Handler wrapper--------------//
//?error handler wrapper
/*
  https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
  https://medium.com/tech-buddy/handling-errors-in-express-gracefully-4bf289ddf9a1
*/

wrap = (fn) => (...args) => fn(...args).catch(args[2]);

app.get('/auth/infusionsoft/callback',(req, res) => {
  const { code } = req.query;
  let filtered = "";
    User.findById(userId, async (err, doc) => {
      if(err) {
        res.status(200).json({status: false, message: "Something went wrong"});
      } else {
        let checkAR = doc.autoResponder;
          if(checkAR.length) {
            checkAR.filter( (el, i) => {
              if(el.mailServer === "INFUSION_SOFT") {
                filtered = i;
              }
            })
          }
          
          // get Refresh Token from Infusion soft.
          let params = new URLSearchParams({
            "client_id": checkAR[filtered].clientId,
            "client_secret": checkAR[filtered].clientSecret,
            "code": code,
            "redirect_uri": process.env.DOMAIN_PATH+"/auth/infusionsoft/callback",
            "grant_type": "authorization_code"
          })
        
          let query = params.toString();

          await axios.post(`https://api.infusionsoft.com/token`, query, {
            headers: {
              "Content-type" : "application/x-www-form-urlencoded",
            }
          }).then(result => {
            checkAR[filtered]["refresh_token"] = result.data.refresh_token;
            checkAR[filtered]["isValidate"] = true;
            
            User.findByIdAndUpdate(doc._id, { autoResponder: checkAR }, (err, doc1) => {
              if (doc1) {
                res.status(200).json({status: true, "message": "credentials added"});
              } else {
                res.status(200).json({ status: false, message: "Something went wrong" });
              }
            });
          })
          .catch(error => console.log(error.response.data))
      }
      
    })
	}
);

app.get('/constantContact/callback',(req, res) => {
  const { code } = req.query;
  let filtered = "";
    User.findById(userId, async (err, doc) => {
      if(err) {
        res.status(200).json({status: false, message: "Something went wrong"});
      } else {
        let checkAR = doc.autoResponder;
        if(checkAR.length) {
          checkAR.filter( (el, i) => {
            if(el.mailServer === "CONSTANT_CONTACT") {
              filtered = i;
            }
          })
        }
          
        let params = new URLSearchParams({
          code: code,
          redirect_uri: `${process.env.DOMAIN_PATH}/constantContact/callback`,
          grant_type: "authorization_code"
        })
      
        let query = params.toString();
        let auth = checkAR[filtered].clientId+":"+checkAR[filtered].clientSecret;
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');

        await axios.post(`https://idfed.constantcontact.com/as/token.oauth2?${query}`,{},{
          headers : {
            Authorization : `Basic ${base64data}`
          }
        }).then(result => {
          if(result.data) {
            checkAR[filtered]["refresh_token"] = result.data.refresh_token;
            checkAR[filtered]["isValidate"] = true;

            User.findByIdAndUpdate(doc._id, { autoResponder: checkAR }, (err, doc1) => {
              console.log(doc1);
              if (doc1) {
                res.status(200).json({status: true, "message": "credentials added"});
              } else {
                res.status(200).json({ status: false, message: "Something went wrong" });
              }
            });
          }
        }).catch(err => {
          res.status(401).json({ status: false, message: "Something went wrong", "err":err });
        });
        
      }
      
    })
	}
);

app.get('/aweber/callback', (req, res) => {
  try {
    const { code, state } = req.query;
    let filtered = "";
    
    User.findById(userId, async (err, doc) => {
      if(err) {
        res.status(200).json({status: false, message: "Something went wrong"});
      } else {
        let checkAR = doc.autoResponder;
        if(checkAR.length) {
          checkAR.filter( (el, i) => {
            if(el.mailServer === "AWEBER") {
              filtered = i;
            }
          })
        }
        
        // get Refresh Token from Aweber.
        let params = new URLSearchParams({
          code: code,
          redirect_uri: `${process.env.DOMAIN_PATH}/aweber/callback`,
          grant_type: "authorization_code"
        })
      
        let query = params.toString();
        let auth = checkAR[filtered].clientId+":"+checkAR[filtered].clientSecret;
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');

        await axios.post(`https://auth.aweber.com/oauth2/token?${query}`,{},{
          headers : {
            Authorization : `Basic ${base64data}`
          }
        }).then(result => {
          if(result.data) {
            checkAR[filtered]["refresh_token"] = result.data.refresh_token;
            checkAR[filtered]["isValidate"] = true;
            User.findByIdAndUpdate(userId, { autoResponder: checkAR }, (err, doc1) => {
              if (doc1) {
                res.status(200).json({status: true, "message": "credentials added"});
              } else {
                res.status(200).json({ status: false, message: "Something went wrong" });
              }
            });
          }
        }).catch(err => {
          res.status(401).json({ status: false, message: "Something went wrong", "err":err });
        });
      }
    });
  } catch(e) {
    console.log(e);
  }
});

//Round 2 deploy

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));
  
  app.get("*", async(req, res, next) => {
    res.sendfile(path.join((__dirname = "client/dist/index.html")));
  })
}

//Route Operations...
// app.get("/", (req, res) => {
//   res.send("Root route of server");
// });

var mainRouter = require("./routes/mainRouter");
app.use("/gettool", gettool);
app.use("/jvzoo", jvzoo);
app.use("/register", Regi);
app.use("/user", user);
app.use("/upload", fileupload);
app.use("/cv", clicksAndView);
app.use("/AppData", AppData);
app.use("/campData", campData);
app.use("/links", links);
app.use(function (req, res, next) {
  // To accept cross domain listing
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization, x-access-token");
  //check header or url parameters or post parameters for token.
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token
  if (token) {
    // verifies the scret and checks expirationheight: 90px;
    jwt.verify(token, Utility.tokkenKey, function (err, decoded) {
      if (err) {
        return res.status(205).json({ success: false, message: "Fail to authenticate token." });
      } else {
        // if everything is good, save to request for use in other routes
        var decoded = jwt.decode(token, { complete: true });
        req.doc = decoded.payload; userId = req.doc._id;
        console.log(new Date(decoded.payload.exp * 1000));
        var payLoadNew = {
          _id: req.doc._id,
          name: req.doc.firstname,
          phone: req.doc.phone,
          access: req.doc.access,
        };
        var tokenNew = jwt.sign(payLoadNew, Utility.tokkenKey, {
          expiresIn: "24h", // expires in 1 Day
        });
        res.set("token", tokenNew);
        res.set("access", req.doc.access);
        next();
      }
    });
  } else {
    return res.status(205).json({
      success: false,
      message: "No token provided.",
    });
  }
  // ------- ROUTE MIDDLEWARE END  ----//
});
app.use("/tool", toolHandler);
app.use("/domain", domain);
app.use("/pixel", pixel);
app.use("/dashboard", dashboard);
app.use("/reseller", reseller);
app.use("/access", access);
app.use("/email", emailTemplate);
app.use("/", mainRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Start Server....

const PORT = process.env.PORT || "3001";
// app.listen(PORT, () => {
//   console.log(`server started on ${PORT}`);
// });
http.listen(PORT, ()=>{
  console.log(`server started on ${PORT}`)
});
