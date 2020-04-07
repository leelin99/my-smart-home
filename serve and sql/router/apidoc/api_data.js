define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "C:\\Users\\Administrator\\Desktop\\congratulate\\my-smart-home\\serve and sql\\router\\apidoc\\main.js",
    "groupTitle": "C:\\Users\\Administrator\\Desktop\\congratulate\\my-smart-home\\serve and sql\\router\\apidoc\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/room/upload",
    "title": "图片上传",
    "version": "0.0.1",
    "name": "上传图片",
    "group": "房间信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "img",
            "description": "<p>上传图片*</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>图片地址</p>"
          }
        ]
      }
    },
    "filename": "./uploadRouter.js",
    "groupTitle": "房间信息"
  },
  {
    "type": "post",
    "url": "/room/roomlist",
    "title": "房间信息表",
    "version": "0.0.1",
    "name": "获得房间信息",
    "group": "房间信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomName",
            "description": "<p>房间名字*</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "inf",
            "description": "<p>房间列表</p>"
          }
        ]
      }
    },
    "filename": "./roomlistRouter.js",
    "groupTitle": "房间信息"
  },
  {
    "type": "post",
    "url": "/room/equipmentlist",
    "title": "设备信息表",
    "version": "0.0.1",
    "name": "获得设备信息",
    "group": "房间信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "equipName",
            "description": "<p>设备名字*</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seleVal",
            "description": "<p>设备种类*</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iamge",
            "description": "<p>设备图片</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>设备描述</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "inf",
            "description": "<p>设备信息</p>"
          }
        ]
      }
    },
    "filename": "./equipmentlistRouter.js",
    "groupTitle": "房间信息"
  }
] });
