const express = require("express");
const userController = require("../controllers/userController");
const upload = require("../util/upload");

const router = express.Router();

//查所有用户
router.get("/user", userController.getUsers);

//查单条用户
router.get("/getUser", userController.getUser);

//删除普通用户
router.delete("/deleteUser", userController.deleteUser);

//修改用户信息
router.put("/updateUser", userController.updateUser);

//更改用户头像
router.post("/uploadImage", upload, userController.uploadUserImage);

//获取用户头像
router.get("/getImage", userController.getUserImage);

module.exports = router;
