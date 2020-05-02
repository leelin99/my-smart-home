const express = require("express")
const router = express.Router()
// const roommodel = require("../db/model/roommodel")
const db = require("../mysql/mysql")
const sqlSeach1 ="select * from room where roomName=?"
const sqlSeach2 ="select * from room"
const sqlInsert = "insert into room set?"
/**
 * @api {post} /room/roomlist 房间信息表
 * @apiVersion 0.0.1
 * @apiName 获得房间信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} roomName 房间名字*
 *
 * @apiSuccess {Array} inf 房间列表
 */

router.post("/roomlist",(req,res)=>{
    if(req.body.roomName){
        const {roomName} = req.body
        db.exec(sqlSeach1,[roomName],(err,data,fields) => {
            if(data.length > 0){
                res.send({
                    inf:data,
                    err:0,
                    meg:"房间已存在" 
                })
            }else{
                let roomList = {equipmentNum:0,roomName:roomName}
                db.exec(sqlInsert,roomList,(err,data,fields) => {
                    res.send({
                        inf:data,
                        err:0,
                        meg:"添加成功" 
                    })
                 }) 
            }
        })
    }else{
    db.exec(sqlSeach2,(err,data,fields) => {
            res.send({
                inf:data,
                err:0,
                meg:"返回成功"
            })
        }) 
    }
})
module.exports = router