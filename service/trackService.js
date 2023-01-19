exports.addUserInfo = (vs, deviceType, url, referer, localTime, delay) =>
  `INSERT INTO TRACK (vsManage,deviceType,currentUrl,refererUrl,userTime,delayTime) VALUES ('${vs}','${deviceType}','${url}','${referer}','${localTime}','${delay}');`;

exports.addTrackWeb = (vs, deviceType, url, referer, localTime, delay) =>
  `INSERT INTO VUEUSER (vsManage,deviceType,currentUrl,refererUrl,userTime,delayTime) VALUES ('${vs}','${deviceType}','${url}','${referer}','${localTime}','${delay}');`;
