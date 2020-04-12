const express = require("express")
const router = express.Router()
const multer = require("multer")
const formidable = require('formidable')
/**
 * @api {post} /room/upload 图片上传
* @apiVersion 0.0.1
 * @apiName 上传图片
 * @apiGroup 房间信息
 *
 * @apiParam {Object} img 上传图片*
 *
 * @apiSuccess {String} data 图片地址
 */
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image')
    },
    filename: function (req, file, cb) {
    let array = file.originalname.split(".")
    let ext = array[array.length - 1]
    let name = file.fieldname + '-' + Date.now() + parseInt(Math.random()*1000)
      cb(null, `${name}.${ext}`)
    }
  })
   
  let upload = multer({ storage: storage })
  router.post("/upload",upload.single("img"),(req,res) => {
      res.send(req.file.path)
  })
module.exports = router