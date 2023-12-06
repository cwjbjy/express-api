exports.add = (dataName, dataDate, dataNum, dataMoney, atomMoney) =>
  `INSERT INTO MONEY (dataName,dataDate,dataNum,dataMoney,atomMoney) VALUES ('${dataName}','${dataDate}','${dataNum}','${dataMoney}','${atomMoney}');`;

exports.getData = `SELECT * FROM MONEY ORDER BY dataDate DESC;`;
