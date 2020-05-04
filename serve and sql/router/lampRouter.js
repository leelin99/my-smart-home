const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from lamp where name = ? and equipName=?";
const sqlUpdate = "update lamp set ? where name = ? and equipName=?";
let status = 0;
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/airCondition 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} name 房间名*
 * @apiParam {int} mode 模式
 * @apiParam {int} lightness 亮度
 * @apiParam {int} color 颜色*
 *  @apiParam {int} changer 开关
 *
 * @apiSuccess {Array} inf 电灯信息
 */
router.post("/lamp", (req, res) => {
  console.log(req.body.status)
  if (req.body.status) {
    const {
      name,
      equipName,
      mode,
      lightness,
      color,
      changer,
    } = req.body;
    const params = {
      mode,
      lightness,
      color,
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
