const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from songs";
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/airCondition 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {varchar} url 歌曲地址
 * @apiParam {varchar} img 图片地址
 * @apiParam {varchar} songName 歌名*
 *  @apiParam {varchar} singer 歌手*
 *
 * @apiSuccess {Array} inf 音响信息
 */
router.post("/songs", (req, res) => {
    db.exec(sqlSeach1,(err, data, fields) => {
      if (err) {
        res.send({
          mes: "查询失败",
          inf: err,
          err: -1,
        });
      } else {
        res.send({
          mes: "返回成功",
          inf: data,
          err: 0,
        });
      }
    });
  })
module.exports = router;
