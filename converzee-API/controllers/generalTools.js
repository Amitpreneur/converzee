const User = require("../models/user");
// const renderPath = path.join(appRoot,'')
const bcrypt = require("bcryptjs");
const lib = require("./lib");
const Campaigns = require("../models/campaign");
module.exports = {
  auth: async (req, res, next) => {
    let user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/login");
    } else {
      req.user = user;
      next();
    }
  },

  landingpage: async (req, res, next) => {
    // return res.render("index");
    return res.redirect("urgencytimer");
  },

  loginget: async (req, res, next) => {
    return res.render("login");
  },

  login: async (req, res, next) => {
    let user = await User.findOne({
      email: req.body.email.trim().toLowerCase(),
    });

    if (!user) {
      res.send({
        type: "failed",
      });
    } else {
      let match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.userId = user._id;
        
        // function to check if used if exists
        if (!lib.ifcodeexists(user._id, next)) {
          console.log("library doesnt exists, gotta create one");

          lib.createfile(user._id, req.headers.host, next);
        } else {
          console.log("library exists, chill");
        }
        res.send({
          type: "success",
        });
      } else {
        res.send({
          type: "failed",
        });
      }
    }
  },

  register: async (req, res, next) => {
    let user = await User.findOne({
      email: req.body.email.trim().toLowerCase(),
    });
    if (user) {
      return res.send({ type: "failed", message: "user already exists" });
    } else if (req.body.key != "123456789") {
      return res.send({ type: "failed", message: "invalied key" });
    } else {
      let hashedPassword = bcrypt.hashSync(req.body.password, 8);
      await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      return res.send({
        type: "success",
        message: "Account created successfully.",
      });
    }
  },
  sporadictimer: async (req, res, next) => {
    return res.render("sporiadic_timer");
  },

  urgencytimer: async (req, res, next) => {
    return res.render("urgency_timer");
  },

  urgencytimer2: async (req, res, next) => {
    return res.render("urgency_timer2");
  },

  georedirect: async (req, res, next) => {
    return res.render("geo_redirection");
  },

  mobiledetect: async (req, res, next) => {
    return res.render("mobiledetect");
  },

  breakeven: async (req, res, next) => {
    return res.render("breakeven");
  },

  hellobar: async (req, res, next) => {
    return res.render("hellobar");
  },

  backbutton: async (req, res, next) => {
    return res.render("backbutton");
  },

  dynamic: async (req, res, next) => {
    return res.render("dynamic");
  },
  video: async (req, res, next) => {
    return res.render("video");
  },
  image: async (req, res, next) => {
    return res.render("image");
  },

  codeinfo: async (req, res, next) => {
    data = {
      campaigns: {
        "5d77d074ad367b24468b4ff1": {
          element_name: "tab messaging text",
          element_data: {
            messages: [{ icon: "", text: "You have new offer" }],
            timeBeforeFirst: "2",
            frequency: "4",
            sound: "1",
          },
          element_type: "tab_message",
          element_domid: { $id: "5ba6895aad367be15c8b45f4" },
          element_displayurl: [{ type: "CONTAINS", data: "localhost " }],
          element_created: "2019-09-10 04:33:56",
          element_status: 1,
          _id: { $id: "5d77d074ad367b24468b4ff1" },
          id: "5d77d074ad367b24468b4ff1",
        },
      },
      popup_conditions: {
        contains: [{ campid: "5d77d074ad367b24468b4ff1", check: "" }],
        exact: [
          {
            campid: "5c7b9e52ad367bdc638b4af0",
            check: "http://affkitdemo.com/",
          },
        ],
      },
    };

    res.send(data);
  },

  tabmessaging: async (req, res, next) => {
    await Campaigns.create({
      element_name: req.body.element_name,
    });
  },
  logout: async (req, res, next) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  },
};
