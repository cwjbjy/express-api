const { Server } = require("socket.io");

// 1.实例化
const io = new Server();

//2. 监听连接
io.on("connection", (socket) => {
  // 3.监听消息
  socket.on("message", (data) => {
    console.log("id", socket.id);
    //包括自身进行事件广播
    io.emit("message", {
      name: socket.data.userName,
      text: data.text,
      image: socket.data.userImage,
    });
  });

  // 进入房间
  socket.on("addUser", (data) => {
    socket.data.userName = data.name;
    socket.data.userImage = data.image;
    io.emit("message", {
      name: "系统提示：",
      text: data.name + "加入了房间",
    });
  });

  //离开房间
  socket.on("removeUser", () => {
    socket.broadcast.emit("message", {
      name: "系统提示：",
      text: socket.data.userName + "离开了房间",
    });
  });

  socket.on("disconnect", (reason) => {
    console.log('断开连接',reason)
  });
});

//4.监听端口
io.listen(3999);

module.exports = io;
