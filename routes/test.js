const express = require("express");
const router = express.Router();

//测试接口
router.get("/list", (req, res, next) => {
  res.json({
    list: [
      {
        name: "12",
        id: 1,
      },
      {
        name: "1233",
        id: 2,
      },
    ],
  });
});

module.exports = router;
