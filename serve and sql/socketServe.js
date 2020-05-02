const webSocket = require("ws");
const db = require("./mysql/mysql");
const wss = new webSocket.Server({ port: 8081 });
let receiveVal = [];
console.log("开始建立连接...");
wss.on("connection", (client) => {
  client.on("message", (message) => {
    console.log("received: %s", message);
    let check = setInterval(() => {
      db.exec(
        "select * from aircondition where name = ?",
        [message],
        (err, data, fields) => {
          if (err) {
            console.log(err);
          } else {
            let status = 0;
            let JsonData = JSON.parse(JSON.stringify(data))
            if (receiveVal.length == JsonData.length) {
               receiveVal.forEach((item,index)=>{
                  for(let element in item){
                    if(receiveVal[index][element] != JsonData[index][element]){
                      status = 1;
                    }
                  }
                })
            } else {             
              status = 1;
            }
            receiveVal = JsonData
            if (status == 1) {
              client.send(JSON.stringify(data));
            }
          }
        }
      );
    }, 1000);
  });
  client.on("close", () => {
    console.log("关闭服务器");
  });
});
