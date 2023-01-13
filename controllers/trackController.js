const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");

function trackWeb(req, res) {
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

module.exports = {
  trackWeb,
};
