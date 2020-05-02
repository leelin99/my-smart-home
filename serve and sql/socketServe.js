const webSocket = require("ws");
const db = require("./mysql/mysql");
const wss = new webSocket.Server({ port: 8081 });
console.log("开始建立连接...");
wss.on("connection", (client) => {
  client.on("message", (message) => {
    console.log("received: %s", message);
    db.exec(
      "select * from aircondition where name = ?",
      [message],
      (err, data, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.parse(JSON.stringify(data)),"data");
          client.send(JSON.stringify(data));
        }
      }
    );
  });
});
