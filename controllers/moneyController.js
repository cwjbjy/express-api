const mysql = require("../db/mysql");
const moneyService = require("../service/moneyService");
const { resolver } = require("../util");
const { CODE_SUCCESS } = require("../util/constants");

exports.add = function addData(req, res) {
  const { dataName,dataDate,dataNum,dataMoney,atomMoney } = req.body;
  mysql
    .query(moneyService.add(dataName,dataDate,dataNum,dataMoney,atomMoney))
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    })
    .catch((err) => {});
};

exports.getAll = function getData(req, res) {
  mysql
    .query(moneyService.getData)
    .then((data) => {
      res.json({
        code: CODE_SUCCESS,
        data: resolver(data),
      });
    })
    .catch((err) => {});
};
