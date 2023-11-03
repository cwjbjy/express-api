exports.addTrackWeb = (vs, deviceType, url, referrer, localTime, delay) =>
  `INSERT INTO TRACK (vsManage,deviceType,currentUrl,refererUrl,userTime,delayTime) VALUES ('${vs}','${deviceType}','${url}','${referrer}','${localTime}','${delay}');`;
