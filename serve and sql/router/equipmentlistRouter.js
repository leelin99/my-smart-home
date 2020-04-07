const express = require("express")
const router = express.Router()
const equipmentModel = require("../db/model/equipmentModel")
/**
 * @api {post} /room/equipmentlist 设备信息表
  * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} seleVal 设备种类*
 * @apiParam {String} iamge 设备图片
 * @apiParam {String} desc 设备描述
 *
 * @apiSuccess {Array} inf 设备信息
 */
router.post("/equipmentlist",(req,res)=>{
    console.log(req.body)
    if(req.body.equipName && req.body.seleVal){
        const {equipName,seleVal,iamge,desc} = req.body
        equipmentModel.find({equipName})
        .then(data => {
            if(data.length > 0){
                res.send({
                    inf:data,
                    err:0,
                    meg:"设备已存在" 
                })
            }else{
                equipmentModel.insertMany({equipName,seleVal,iamge,desc})
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
    equipmentModel.find()
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