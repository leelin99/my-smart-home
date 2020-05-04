const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from heater where name = ? and equipName=?";
const sqlUpdate = "update heater set ? where name = ? and equipName=?";
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/airCondition 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} name 房间名*
 * @apiParam {int}  temperature  温度设置
 * @apiParam {int} ezeng e+增容
 * @apiParam {int} cloud 云管家*
 * @apiParam {int} highTem 高温抑菌
 * @apiParam {int} noEletri 无电洗
 * @apiParam {int} time 定时
 * @apiParam {int} fastHeat 半胆速热
 * @apiParam {int} changer 开关
 *
 *
 *
 * @apiSuccess {Array} inf 热水器信息
 */
router.post("/heater", (req, res) => {
  if (req.body.equipName && req.body.temperature) {
    const {
      name,
      equipName,
      temperature,
      ezeng,
      cloud,
      highTem,
      noEletri,
      week,
      startTime,
      endTime,
      fastHeat,
      changer,
    } = req.body;
    const params = {
      temperature,
      ezeng,
      cloud,
      highTem,
      noEletri,
      week,
      startTime,
      endTime,
      fastHeat,
      changer,
    };
    db.exec(sqlUpdate, [params, name, equipName], (err, data, fields) => {
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
