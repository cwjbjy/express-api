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
