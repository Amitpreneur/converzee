const express = require("express");
const router = express.Router();

const Tools = require("../controllers/generalTools");

router.get("/test", wrap(Tools.codeinfo));

router.get("/", wrap(Tools.landingpage));
router.post("/login", wrap(Tools.login));
router.get("/login", wrap(Tools.loginget));
router.post("/register", wrap(Tools.register));
router.use(wrap(Tools.auth));
router.get("/centraltimer", wrap(Tools.centralTimer));
router.get("/sporadictimer", wrap(Tools.sporadictimer));
router.get("/urgencytimer", wrap(Tools.urgencytimer2));

router.get("/georedirect", wrap(Tools.georedirect));
router.get("/mobilevibration", wrap(Tools.mobiledetect));
router.get("/breakeven", wrap(Tools.breakeven));
router.get("/hellobar", wrap(Tools.hellobar));
router.get("/backbuttonredirect", wrap(Tools.backbutton));
router.get("/dynamicelements", wrap(Tools.dynamic));
router.get("/videopopup", wrap(Tools.video));
router.get("/imagepopup", wrap(Tools.image));

//-----------------------advanced tools----------------//
router.post("/tabmessaging", wrap(Tools.tabmessaging));

router.get("/logout", wrap(Tools.logout));
module.exports = router;
