const express = require("express");

const moneyController = require("../controllers/moneyController");
const router = express.Router();

router.post("/addData", moneyController.add);

router.get("/getAllData", moneyController.getAll);

module.exports = router;