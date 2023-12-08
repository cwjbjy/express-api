exports.add = (dataName, dataDate, dataNum, dataMoney, atomMoney) =>
  `INSERT INTO MONEY (dataName,dataDate,dataNum,dataMoney,atomMoney) VALUES ('${dataName}','${dataDate}','${dataNum}','${dataMoney}','${atomMoney}');`;

exports.getData = `SELECT * FROM MONEY ORDER BY dataDate DESC;`;

exports.earnings = (date) =>
  `SELECT * FROM MONEY  
  WHERE STR_TO_DATE(dataDate, '%Y-%m-%d') >= CURDATE() - INTERVAL 1 ${date}  
  ORDER BY STR_TO_DATE(dataDate, '%Y-%m-%d') DESC;`;
