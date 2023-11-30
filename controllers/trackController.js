const mysql = require("../db/mysql");
const { CODE_SUCCESS } = require("../util/constants");
const trackService = require("../service/trackService");

exports.track = function track(req, res) {
  const params = JSON.parse(req.body);
  if (Array.isArray(params) && params.length > 0) {
    let count = 0;
    const loop = () => {
      const item = params[count];
      count++;
      if (!item) {
        res.json({
          code: CODE_SUCCESS,
        });
        return;
      }
      const {
        userData: { vs },
        device: { browser },
        url,
        referrer,
        date,
        duration,
      } = item;
      mysql
        .query(
          trackService.addTrackWeb(vs, browser, url, referrer, date, duration)
        )
        .then(() => {
          loop();
        });
    };
    loop();
  } else {
    res.json({
      msg: "参数需数组形式",
    });
  }
};

exports.trackWeb = function trackWeb(req, res) {
  const params = JSON.parse(req.body);
  const { browserType: deviceType, appName: vs } = params.baseInfo;
  const { url, referer, triggerTime: localTime, delay } = params.eventInfo[0];
  mysql
    .query(
      trackService.addTrackVue(vs, deviceType, url, referer, localTime, delay)
    )
    .then(() => {
      res.json({
        code: CODE_SUCCESS,
      });
    });
};
