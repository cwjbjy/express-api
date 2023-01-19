//查询用户-用户名，密码
exports.getUser = (userName, md5_password) =>
  `SELECT * FROM USER WHERE user_name='${userName}' and password='${md5_password}';`;

//查询用户-用户名
exports.getUserfromName = (userName) =>
  `SELECT * FROM USER WHERE user_name='${userName}';`;

//查询所有用户
exports.getUsers = `SELECT * FROM USER;`;

//查询用户创建时间
exports.getCreateTime = (user_name) =>
  `SELECT createTime FROM USER WHERE user_name='${user_name}';`;

//查询用户头像信息
exports.getUserImage = (user_name) =>
  `SELECT photo FROM USER WHERE user_name='${user_name}';`;

//新增用户
exports.addUser = (userName, passWord, authority, createTime, photo) =>
  `INSERT INTO USER (user_name,password,authority,createTime,photo) VALUES ('${userName}',MD5('${passWord}'),'${authority}','${createTime}','${photo}');`;

//删除用户
exports.deleteUser = (id) => `DELETE FROM USER WHERE id='${id}';`;

//更新用户
exports.updateUser = (id, user_name, password) =>
  `UPDATE USER SET user_name='${user_name}', password=MD5('${password}') WHERE id=${id};`;

//更新用户头像信息
exports.updateUserImage = (filename, user_name) =>
  `UPDATE USER SET photo='${filename}' WHERE user_name='${user_name}';`;
