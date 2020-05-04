const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from sound where name = ? and equipName=?";
const sqlUpdate = "update sound set ? where name = ? and equipName=?";
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/airCondition 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} name 房间名*
 * @apiParam {int} child 是否是儿童模式
 * @apiParam {int} mode 模式
 * @apiParam {int} songName 歌名*
 *  @apiParam {int} changer 开关
 *
 * @apiSuccess {Array} inf 音响信息
 */
router.post("/sound", (req, res) => {
  if (req.body.status) {
    const {
      name,
      equipName,
      child,
      mode,
      songName,
      changer,
    } = req.body;
    const params = {
      child,
      mode,
      songName,
      changer,
    };
    db.exec(sqlUpdate, [params,name,equipName], (err, data, fields) => {
      if (err) {
        res.send({
          mes: "失败",
          inf: err,
          err: -1,
        });
      } else {
        res.send({
          mes: "修改成功",
          inf: "",
          err: 0,
        });
      }
    });
  } else {
    const { name, equipName } = req.body;
    db.exec(sqlSeach1, [name, equipName], (err, data, fields) => {
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
  }
});
module.exports = router;
