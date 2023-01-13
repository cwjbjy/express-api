var { expressjwt: jwt } = require("express-jwt");

// 验证token是否过期
const jwtAuth = jwt({
  secret: "caowj",
  algorithms: ["HS256"],
  // true自动校验，false表示不校验，走自定义校验
  credentialsRequired: false,
  // 自定义获取token的函数
  getToken: (req) => {
    if (req.headers.Authorization) {
      return req.headers.Authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  },
  // 设置jwt认证白名单
}).unless({ path: ["/", "/api/login", "/api/register"] });

module.exports = jwtAuth;
