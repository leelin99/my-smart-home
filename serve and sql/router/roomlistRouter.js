const express = require("express")
const router = express.Router()
const roommodel = require("../db/model/roommodel")
router.post("/roomlist",(req,res)=>{
    console.log(req.body.roomName)
    if(req.body.roomName){
        const {roomName} = req.body
        roommodel.find({roomName})
        .then(data => {
            if(data.length > 0){
                res.send({
                    inf:data,
                    err:0,
                    meg:"房间已存在" 
                })
            }else{
                roommodel.insertMany({roomName,equipmentNum:0})
                .then(data => {
                    res.send({
                        inf:data,
                        err:0,
                        meg:"添加成功" 
                    })
                 }) 
                 .catch(err => {
                    res.send({
                        inf:err,
                        err:0,
                        meg:"添加失败" 
                    })
                 })
            }
        })
    }else{
    roommodel.find()
        .then(data => {
            res.send({
                inf:data,
                err:0,
                meg:"返回成功"
            })
        })
        .catch( err => {
            res.send({
                inf:"",
                err:0,
                meg:err
            })
        })    
    }
})
module.exports = router