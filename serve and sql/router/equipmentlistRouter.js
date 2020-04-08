const express = require("express")
const router = express.Router()
const roommodel = require("../db/model/roommodel")
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
    if(req.body.equipName && req.body.seleVal){
        const {_id,equipName,seleVal,image,desc} = req.body
        console.log(_id)
        let children = [{equipName,seleVal,image,desc}]
        roommodel.updateone({_id},children)
    }
})
module.exports = router