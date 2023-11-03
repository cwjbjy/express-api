var { expressjwt: jwt } = require("express-jwt");
const { PRIVATE_KEY } = require("./constants");
// 验证token是否过期
const jwtAuth = jwt({
  secret: PRIVATE_KEY, //密匙
  algorithms: ["HS256"], //签名算法
  // 设置jwt认证白名单
}).unless({
  path: ["/api/login", "/api/register", '/api/track'],
});

module.exports = jwtAuth;
