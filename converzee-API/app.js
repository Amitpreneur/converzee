var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var session = require("express-session");
var helmet = require("helmet");
var jwt = require("jsonwebtoken");
const Utility = require("./utility");
var MongoStore = require("connect-mongo")(session);
var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Import Router
const toolHandler = require("./controllers/toolHandler");
const Regi = require("./controllers/register");
const user = require("./controllers/user");
const fileupload = require("./controllers/upload");
// const imageOpti = require("./controllers/imageOpti");
const reseller = require("./controllers/reseller-user");
//

//-----------DB configuration -----------//

var Mongo_options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
};

// mongoose.connect(
//   // "mongodb://admin:affkit1@ds163867.mlab.com:63867/affkit",
//   "mongodb://127.0.0.1:27017/affkit",
//   Mongo_options, 
//   { 
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useUnifiedTopology:true
//   }
// );

// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error :"));
// db.once("open", function() {
//   console.log("database connected");
// });

// console.log("db :", db);

mongoose.connect('mongodb://127.0.0.1:27017/affkit',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
// mongoose.connect('mongodb://localhost:27017/pixeltalk',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
  console.log('Database connection successfull.')
}).catch(err=>{
  console.log('Database connection error - '+err)
});


//---------------mongo storage configuration --------------------//
app.use(
  session({
    secret: `?tRTZ,1-Rb%S#cpG+Mi@mE9)aBgr,r]1X/tI7zX#m8:)Or0j&0kx22p0V3w]`,
    resave: true,
    saveUninitialized: false,
    // store: new MongoStore({
    //   mongooseConnection: db
    // })
  })
);

app.use(cors());

//------------ERROR Handler wrapper--------------//
//?error handler wrapper
/*
  https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
  https://medium.com/tech-buddy/handling-errors-in-express-gracefully-4bf289ddf9a1
*/
wrap = fn => (...args) => fn(...args).catch(args[2]);

//---routes---//

//Round 2 deploy

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  // app.get("*", (req, res) => {
  //   res.sendfile(path.join((__dirname = "client/build/index.html")));
  // });
}

//Route Operations...
app.get("/", (req, res) => {
  res.send("Root route of server");
});

//var mainRouter = require("./routes/mainRouter");
app.use("/register", Regi);
app.use("/user", user);
app.use("/upload", fileupload);
// app.use("/imageOpti", imageOpti);
app.use(function(req, res, next) {
  // To accept cross domain listing
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization, x-access-token");
  //check header or url parameters or post parameters for token.
  var token = req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies the scret and checks expirationheight: 90px;
    jwt.verify(token, Utility.tokkenKey, function(err, decoded) {
      if (err) {
        return res.status(205).json({ success: false, message: "Fail to authenticate token." });
      } else {
        // if everything is good, save to request for use in other routes
        var decoded = jwt.decode(token, { complete: true });
        req.doc = decoded.payload;
        var payLoadNew = {
          _id: req.doc._id,
          name: req.doc.firstname,
          phone: req.doc.phone
        };
        var tokenNew = jwt.sign(payLoadNew, Utility.tokkenKey, {
          expiresIn: "30m" // expires in 1 Day
        });
        res.set("token", tokenNew);
        res.set("access", req.doc.access);
        next();
      }
    });
  } else {
    return res.status(205).json({
      success: false,
      message: "No token provided."
    });
  }
  // ------- ROUTE MIDDLEWARE END  ----//
});
app.use("/tool", toolHandler);
app.use("/reseller", reseller);
//app.use("/", mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
