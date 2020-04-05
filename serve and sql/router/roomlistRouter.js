const express = require("express")
const router = express.Router()
router.post("/roomlist",(req,res)=>{
    res.send({
        inf:"",
        err:0,
        meg:"返回成功"
    })
})
module.exports = router