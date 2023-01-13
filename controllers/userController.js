const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");
const { isJSON, resolver } = require("../util");

function getUsers(req, res, next) {
  mysql.query(`SELECT * FROM USER;`).then((data) => {
    res.json({
      code: CODE_SUCCESS,
      data: resolver(data),
    });
  });
}

function getUser(req, res, next) {
  const { user_name } = req.query;
  mysql
    .query(`SELECT createTime FROM USER WHERE user_name='${user_name}';`)
    .then((data) => {
      res.json({
        code: CODE_SUCCESS,
        data: resolver(data),
      });
    });
}

function deleteUser(req, res) {
  const { id } = req.query;
  mysql.query(`DELETE FROM USER WHERE id='${id}';`).then(() => {
    res.json({
      code: CODE_SUCCESS,
      msg: "删除成功",
    });
  });
}

function updateUser(req, res) {
  let newData = req.body;
  if (isJSON(newData)) {
    newData = JSON.parse(newData);
  }
  let { id, user_name, password } = newData;
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
}

function uploadUserImage(req, res) {
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
}

function getUserImage(req, res) {
  const { user_name } = req.query;
  mysql
    .query(`SELECT photo FROM USER WHERE user_name='${user_name}';`)
    .then((data) => {
      res.json({
        code: CODE_SUCCESS,
        data: resolver(data),
      });
    });
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadUserImage,
  getUserImage
};
