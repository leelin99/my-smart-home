const express = require("express")
const router = express.Router()
const multer = require("multer")
const formidable = require('formidable')
const roommodel = require("../db/model/roommodel")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image')
    },
    filename: function (req, file, cb) {
    console.log(file,"file")
    let array = file.originalname.split(".")
    let ext = array[array.length - 1]
    let name = file.fieldname + '-' + Date.now() + parseInt(Math.random()*1000)
      cb(null, `${name}.${ext}`)
    }
  })
   
  let upload = multer({ storage: storage })
  router.post("/upload",upload.single("img"),(req,res) => {
      console.log(req.file,"req")
      res.send(req.file.path)
  })
module.exports = router