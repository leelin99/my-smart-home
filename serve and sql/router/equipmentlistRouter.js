const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");
const sqlSeach1 = "select * from equipment where name = ?";
const sqlSeach2 = "select * from equipment";
const sqlInsert = "insert into equipment set?";
const airSqlInsert = "insert into aircondition set?";
const doorSqlInsert = "insert into door set?";
const soundSqlInsert = "insert into sound set?";
const lampSqlInsert = "insert into lamp set?";
const heaterSqlInsert = "insert into heater set?";
let params1 = {};
// const roommodel = require("../db/model/roommodel")
/**
 * @api {post} /room/equipmentlist 设备信息表
 * @apiVersion 0.0.1
 * @apiName 获得设备信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} equipName 设备名字*
 * @apiParam {String} seleVal 设备种类*
 * @apiParam {String} image 设备图片
 * @apiParam {String} desc 设备描述
 *
 * @apiSuccess {Array} inf 设备信息
 */
router.post("/equipmentlist", (req, res) => {
  if (req.body.equipName && req.body.seleVal) {
    const { name, equipName, seleVal, image, desc } = req.body;
    const params = { name, equipName, seleVal, image, desc };
    db.exec(sqlInsert, params, (err, data, fields) => {
      if (err) {
        res.send({
          mes: "失败",
          inf: err,
          err: -1,
        });
      } else {
        switch (params.seleVal) {
          case "智能空调":
            params1 = {
              name,
              equipName,
              temperature: 20,
              mode: 0,
              sxfeng: 0,
              zyfeng: 0,
              speed: 0,
              clear: 0,
              time: 0,
              heat: 0,
              dry: 0,
              changer: 0,
            };
            db.exec(airSqlInsert, params1, (err1, data, fields) => {
              if (err1) {
                res.send({
                  mes: "失败",
                  inf: err1,
                  err: -2,
                });
              } else {
                res.send({
                  mes: "插入成功",
                  inf: "",
                  err: 0,
                });
              }
            });
            break;
          case "智能门锁":
            params1 = {
              name,
              equipName,
              camera: 0,
              sound: 0,
              password: 123456,
              changer: 0,
            };
            db.exec(doorSqlInsert, params1, (err1, data, fields) => {
              if (err1) {
                res.send({
                  mes: "失败",
                  inf: err1,
                  err: -2,
                });
              } else {
                res.send({
                  mes: "插入成功",
                  inf: "",
                  err: 0,
                });
              }
            });
            break;
          case "智能电灯":
            params1 = {
              name,
              equipName,
              mode: 0,
              status:1,
              lightness: 0,
              color: 0,
              changer: 0,
            };
            db.exec(lampSqlInsert, params1, (err1, data, fields) => {
              if (err1) {
                res.send({
                  mes: "失败",
                  inf: err1,
                  err: -2,
                });
              } else {
                res.send({
                  mes: "插入成功",
                  inf: "",
                  err: 0,
                });
              }
            });
            break;
          case "智能音响":
            params1 = {
              name,
              equipName,
              child: 0,
              mode: 0,
              changer: 0,
              status:1,
              play:1,
              
            };
            db.exec(soundSqlInsert, params1, (err1, data, fields) => {
              if (err1) {
                res.send({
                  mes: "失败",
                  inf: err1,
                  err: -2,
                });
              } else {
                res.send({
                  mes: "插入成功",
                  inf: "",
                  err: 0,
                });
              }
            });
            break;
          case "智能热水器":
            params1 = {
              name,
              equipName,
              temperature: 20,
              ezeng: 0,
              cloud: 0,
              highTem: 0,
              noEletri: 0,
              fastHeat: 0,
              changer: 0,
            };
            db.exec(heaterSqlInsert, params1, (err1, data, fields) => {
              if (err1) {
                res.send({
                  mes: "失败",
                  inf: err1,
                  err: -2,
                });
              } else {
                res.send({
                  mes: "插入成功",
                  inf: "",
                  err: 0,
                });
              }
            });
            break;
        }
      }
    });
  } else {
    const { name } = req.body;
    db.exec(sqlSeach1, [name], (err, data, fields) => {
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
