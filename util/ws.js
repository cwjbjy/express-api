const WebSocket = require("ws");

const wss = new WebSocket.WebSocketServer({ port: 4001 });

//广播
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

//心跳
// function heartbeat() {
//   this.isAlive = true;
// }

// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();

//     ws.isAlive = false;
//     ws.ping();
//   });
// }, 30000);

//每一次连接都会生成一个新的wss实例
wss.on("connection", function connection(ws, req) {
  ws.on("message", function message(message) {
    var data = JSON.parse(message);
    switch (data.type) {
      case "setName":
        ws.nickName = data.name;
        ws.nickImage = data.image;
        broadcast({
          name: "系统提示：",
          text: ws.nickName + "加入了房间",
        });
        break;
      case "chat":
        broadcast({
          name: ws.nickName,
          text: data.text,
          image: ws.nickImage,
        });
        break;
      case "close":
        broadcast({
          name: "系统提示：",
          text: ws.nickName + "离开了房间",
        });
      case "heart":
        broadcast({
          name: "heart",
          text: data.text,
        });
      default:
        break;
    }
  });
//   ws.on("pong", heartbeat);
});

wss.on("close", function close() {
  console.log("连接关闭");
  clearInterval(interval);
});

module.exports = wss;
