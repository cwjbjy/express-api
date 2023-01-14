const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");

function getUserInfo(req, res) {
  const params = JSON.parse(req.query.data);
  const { vs, deviceType, url, referer, localTime, delay } = params;
  mysql
    .query(
      `INSERT INTO TRACK (vsManage,deviceType,currentUrl,refererUrl,userTime,delayTime) VALUES ('${vs}','${deviceType}','${url}','${referer}','${localTime}','${delay}');`
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    });
}

function trackWeb(req, res) {
  const params = JSON.parse(req.body);
  const { browserType: deviceType, appName: vs } = params.baseInfo;
  const { url, referer, triggerTime: localTime, delay } = params.eventInfo[0];
  mysql
    .query(
      `INSERT INTO VUEUSER (vsManage,deviceType,currentUrl,refererUrl,userTime,delayTime) VALUES ('${vs}','${deviceType}','${url}','${referer}','${localTime}','${delay}');`
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    });
}

module.exports = {
  getUserInfo,
  trackWeb,
};
