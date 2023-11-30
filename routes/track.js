const express = require("express");
const trackController = require("../controllers/trackController");
const router = express.Router();

//收集用户信息

router.post("/track", trackController.track);

router.post("/trackweb", trackController.trackWeb);

module.exports = router;
