const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");

const userList = [];

function trackWeb(req, res) {
  const { data } = req.body;
  userList.push(JSON.stringify(data));
  console.log(userList);
  res.json({
    code: CODE_SUCCESS,
  });
}

module.exports = {
  trackWeb,
};
