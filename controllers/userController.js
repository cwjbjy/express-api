const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");
const { resolver } = require("../util");

exports.getUsers = function (req, res, next) {
  mysql.query(`SELECT * FROM USER;`).then((data) => {
    res.json({
      code: CODE_SUCCESS,
      data: resolver(data),
    });
  });
};

exports.getUser = function (req, res, next) {
  const { user_name } = req.query;
  mysql
    .query(`SELECT createTime FROM USER WHERE user_name='${user_name}';`)
    .then((data) => {
      res.json({
        code: CODE_SUCCESS,
        data: resolver(data),
      });
    });
};

exports.deleteUser = function (req, res) {
  const { id } = req.query;
  mysql.query(`DELETE FROM USER WHERE id='${id}';`).then(() => {
    res.json({
      code: CODE_SUCCESS,
      msg: "删除成功",
    });
  });
};

exports.updateUser = function (req, res) {
  const { id, user_name, password } = req.body;
  mysql
    .query(
      `UPDATE USER SET user_name='${user_name}', password=MD5('${password}') WHERE id=${id};`
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
        msg: "修改成功",
      });
    });
};

exports.uploadUserImage = function (req, res) {
  const { user_name } = req.body;
  const { filename } = req.file; //文件已存储到本地，文件信息在req.file中
  mysql
    .query(
      `UPDATE USER SET photo='${filename}' WHERE user_name='${user_name}';`
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
        msg: "上传成功",
      });
    });
};

exports.getUserImage = function (req, res) {
  const { user_name } = req.query;
  mysql
    .query(`SELECT photo FROM USER WHERE user_name='${user_name}';`)
    .then((data) => {
      res.json({
        code: CODE_SUCCESS,
        data: resolver(data),
      });
    });
};
