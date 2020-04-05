const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000
app.listen(port,() => {
	console.log(`启动服务器，端口号：${port}`)
})
app.use(cors())