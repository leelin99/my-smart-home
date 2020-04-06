const express = require("express")
const router = express.Router()
const multer = require("multer")
const formidable = require('formidable')
const roommodel = require("../db/model/roommodel")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
    console.log(file)
    let array = file.originalname.split(".")
    let ext = array[array.length - 1]
    let name = file.fieldname + '-' + Date.now() + parseInt(Math.random()*1000)
      cb(null, `${name}.${ext}`)
    }
  })
   
  let upload = multer({ storage: storage })
  router.post("/upload",upload.single("img"),(req,res) => {
      console.log(req)
      console.log(req.file)
      res.send("上传成功")
  })
module.exports = router