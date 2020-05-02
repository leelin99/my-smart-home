const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from aircondition where name = ? and equipName=?";
const sqlSeach2 = "select * from aircondition";
const sqlUpdate = "update aircondition set ? where name = ? and equipName=?";
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/airCondition 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} name 房间名*
 * @apiParam {int} temperature 温度
 * @apiParam {int} mode 模式
 * @apiParam {int} sxfeng 上下风*
 * @apiParam {int} zyfeng 左右风
 * @apiParam {int} speed 风速
 * @apiParam {int} sxfeng 上下风*
 * @apiParam {int} zyfeng 左右风
 * @apiParam {int} dry 干燥
 * @apiParam {int} clear 清洁*
 * @apiParam {int} time 定时
 * @apiParam {int} heat 电辅热
 *  @apiParam {int} changer 开关
 *
 * @apiSuccess {Array} inf 遥控信息
 */
router.post("/airCondition", (req, res) => {
  if (req.body.equipName && req.body.temperature) {
    const {
      name,
      equipName,
      temperature,
      mode,
      sxfeng,
      zyfeng,
      speed,
      clear,
      time,
      heat,
      dry,
      changer,
    } = req.body;
    const params = {
      temperature,
      mode,
      sxfeng,
      zyfeng,
      speed,
      clear,
      time,
      heat,
      dry,
      changer
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
