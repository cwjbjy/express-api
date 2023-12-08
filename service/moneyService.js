exports.add = (dataName, dataDate, dataNum, dataMoney, atomMoney,username) =>
  `INSERT INTO MONEY (dataName,dataDate,dataNum,dataMoney,atomMoney,username) VALUES ('${dataName}','${dataDate}','${dataNum}','${dataMoney}','${atomMoney}','${username}');`;

exports.getData = `SELECT * FROM MONEY ORDER BY dataDate DESC;`;

exports.earnings = (date) =>
  `SELECT * FROM MONEY  
  WHERE STR_TO_DATE(dataDate, '%Y-%m-%d') >= CURDATE() - INTERVAL 1 ${date}  
  ORDER BY STR_TO_DATE(dataDate, '%Y-%m-%d') DESC;`;

exports.getFinancialUser = (userName) =>
  `SELECT * FROM MONEY WHERE userName='${userName}';`;
