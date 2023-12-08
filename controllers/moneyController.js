const mysql = require("../db/mysql");
const moneyService = require("../service/moneyService");
const { resolver } = require("../util");
const { CODE_SUCCESS,CODE_ERROR } = require("../util/constants");

exports.add = function addData(req, res) {
  const { dataName, dataDate, dataNum, dataMoney, atomMoney,username } = req.body;
  mysql
    .query(moneyService.add(dataName, dataDate, dataNum, dataMoney, atomMoney,username))
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

exports.getEarnings = function getEarnings(req, res) {
  const { date } = req.query;
  if (date) {
    mysql
      .query(moneyService.earnings(date))
      .then((data) => {
        res.json({
          code: CODE_SUCCESS,
          data: resolver(data),
        });
      })
      .catch((err) => {});
  } else {
    mysql
      .query(moneyService.getData)
      .then((data) => {
        res.json({
          code: CODE_SUCCESS,
          data: resolver(data),
        });
      })
      .catch((err) => {});
  }
};

exports.financialLogin = function financialLogin(req, res) {
  const { username } = req.query;
  mysql.query(moneyService.getFinancialUser(username)).then((data) => {
    let Data = resolver(data);
    if (Data.length !== 0) {
      res.json({
        code: CODE_SUCCESS,
        msg: "登录成功",
      });
    } else {
      res.status(400).json({
        code: CODE_ERROR,
        msg: "查询结果为空",
      });
    }
  });
};
