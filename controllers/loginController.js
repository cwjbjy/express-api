const jwt = require("jsonwebtoken");
const utility = require("utility");
const mysql = require("../db/mysql");
const {
  PRIVATE_KEY,
  JWT_EXPIRED,
  CODE_ERROR,
  CODE_SUCCESS,
} = require("../util/constants");
const { resolver } = require("../util");

exports.login = function (req, res, next) {
  const { userName, passWord } = req.body;

  const md5_password = utility.md5(passWord);

  mysql
    .query(
      `SELECT * FROM USER WHERE user_name='${userName}' and password='${md5_password}';`
    )
    .then((data) => {
      let Data = resolver(data);
      if (Data.length !== 0) {
        jwt.sign(
          // payload：签发的 token 里面要包含的一些数据
          { userName },
          // 私钥
          PRIVATE_KEY,
          // 设置过期时间
          { expiresIn: JWT_EXPIRED },
          function (err, token) {
            res.json({
              code: CODE_SUCCESS,
              msg: "登录成功",
              data: {
                token,
                auth:
                  Data[0].authority === "1"
                    ? [
                        "firstItem",
                        "fleet",
                        "fileUp",
                        "pdf",
                        "baseEcharts",
                        "baseTable",
                        "flowChart",
                        "magnifying",
                        "drag",
                        "I18n",
                        "chatRoom",
                        "manage",
                      ]
                    : [
                        "firstItem",
                        "fleet",
                        "fileUp",
                        "pdf",
                        "baseEcharts",
                        "baseTable",
                        "flowChart",
                        "magnifying",
                        "drag",
                        "I18n",
                        "chatRoom",
                      ],
              },
            });
          }
        );
      } else {
        res.status(400).json({
          code: CODE_ERROR,
          msg: "查询结果为空",
        });
      }
    });
};

exports.register = function (req, res, next) {
  const { userName, passWord, authority, createTime, photo } = req.body;
  mysql
    .query(`SELECT * FROM USER WHERE user_name='${userName}';`)
    .then((data) => {
      let Data = resolver(data);
      if (Data.length === 0) {
        mysql
          .query(
            `INSERT INTO USER (user_name,password,authority,createTime,photo) VALUES ('${userName}',MD5('${passWord}'),'${authority}','${createTime}','${photo}');`
          )
          .then(() => {
            res.json({
              code: CODE_SUCCESS,
              msg: "注册成功",
            });
          });
      } else {
        res.status(403).json({
          code: CODE_ERROR,
          msg: "用户名已存在",
        });
      }
    });
};
