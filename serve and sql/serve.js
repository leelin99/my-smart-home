const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const axios = require("axios")
const path = require("path")
const port = 3000
const roomRouter = require("./router/roomlistRouter")
const equipmentRouter = require("./router/equipmentlistRouter")
const uploadRouter = require("./router/uploadRouter")
const delectRoomRouter = require("./router/delectRoomRouter")
const airConRouter = require("./router/airConRouter")
app.listen(port,() => {
	console.log(`启动服务器，端口号：${port}`)
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/room",roomRouter)
app.use("/room",uploadRouter)
app.use("/room",equipmentRouter)
app.use("/room",delectRoomRouter)
app.use("/room",airConRouter)
app.get("/weather",(req,res)=>{
	const {num} = req.query
	axios.get(`http://www.weather.com.cn/data/sk/${num}.html`)
	.then(success => {
		res.send({
			inf:success.data,
			err:0	
		})
	})
	.catch(err=>{
		console.log(err)
	})
})