const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");
const trackService = require("../service/trackService");

exports.getUserInfo = function (req, res) {
  const params = JSON.parse(req.query.data);
  const { vs, deviceType, url, referer, localTime, delay } = params;
  mysql
    .query(
      trackService.addUserInfo(vs, deviceType, url, referer, localTime, delay)
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    });
};

exports.trackWeb = function trackWeb(req, res) {
  const params = JSON.parse(req.body);
  const { browserType: deviceType, appName: vs } = params.baseInfo;
  const { url, referer, triggerTime: localTime, delay } = params.eventInfo[0];
  mysql
    .query(
      trackService.addTrackWeb(vs, deviceType, url, referer, localTime, delay)
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    });
};
