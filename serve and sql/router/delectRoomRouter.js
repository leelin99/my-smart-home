const express = require("express")
const router = express.Router()
// const roommodel = require("../db/model/roommodel")
const db = require("../mysql/mysql")
const sqldelect =(name,attribute) => {return `delete from ${name} where ${attribute}=?`}
// const sqldelect2 =(name,attribute) => {return `alter table equipment drop constraint roomName alter table equipment add  constraint  roomName foreign key(name) references room(room) on delete cascade`}
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

router.post("/delRoom",(req,res)=>{
    // 删除房间
    if(req.body.name){
        const {name} = req.body
        db.exec(sqldelect('room','roomName'),[name],(err,data,fields) => {
          if(err){
            res.send({
              mes:"删除失败",
              inf:err,
              err:-1  
            })
          }else{
            res.send({
              mes:"删除成功",
              inf:data,
              err:0,  
            })
          }
        })
    }else if(req.body.id){
				const {id} = req.body
        db.exec(sqldelect('equipment','id'),[id],(err,data,fields) => {
					if(err){
            res.send({
							mes:"删除失败",
							inf:err,
							err:-1  
            })
          }else{
						res.send({
							mes:"删除成功",
							inf:data,
							err:0,  
            })
					}
        }) 
    }
})
module.exports = router