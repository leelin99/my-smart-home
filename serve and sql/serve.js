const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const db = require("./db/connect")
const port = 3000
const roomrouter = require("./router/roomlistRouter")
const uploadRouter = require("./router/uploadRouter")
const roommodel = require("./db/model/roommodel")
app.listen(port,() => {
	console.log(`启动服务器，端口号：${port}`)
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
App.
app.use("/room",roomrouter)
app.use("/room",uploadRouter)