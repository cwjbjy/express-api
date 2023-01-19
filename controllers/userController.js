const dayjs = require("dayjs");
const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");
const { resolver } = require("../util");
const userService = require("../service/userService");

exports.getUsers = function (req, res) {
  mysql.query(userService.getUsers).then((data) => {
    res.json({
      code: CODE_SUCCESS,
      data: resolver(data).map((item) =>
        Object.assign(item, {
          createTime: dayjs(item.createTime).format("YYYY-MM-DD"),
        })
      ),
    });
  });
};

exports.getUser = function (req, res) {
  const { user_name } = req.query;
  mysql.query(userService.getCreateTime(user_name)).then((data) => {
    res.json({
      code: CODE_SUCCESS,
      data: dayjs(resolver(data)[0].createTime).format("YYYY-MM-DD"),
    });
  });
};

exports.deleteUser = function (req, res) {
  const { id } = req.query;
  mysql.query(userService.deleteUser(id)).then(() => {
    res.json({
      code: CODE_SUCCESS,
      msg: "删除成功",
    });
  });
};

exports.updateUser = function (req, res) {
  const { id, user_name, password } = req.body;
  mysql.query(userService.updateUser(id, user_name, password)).then(() => {
    res.json({
      code: CODE_SUCCESS,
      msg: "修改成功",
    });
  });
};

exports.uploadUserImage = function (req, res) {
  const { user_name } = req.body;
  const { filename } = req.file; //文件已存储到本地，文件信息在req.file中
  mysql.query(userService.updateUserImage(filename, user_name)).then(() => {
    res.json({
      code: CODE_SUCCESS,
      msg: "上传成功",
    });
  });
};

exports.getUserImage = function (req, res) {
  const { user_name } = req.query;
  mysql.query(userService.getUserImage(user_name)).then((data) => {
    res.json({
      code: CODE_SUCCESS,
      data: resolver(data),
    });
  });
};
