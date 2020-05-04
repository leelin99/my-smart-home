<template>
  <view>
    <pay-keyboard
      :show_key="show_key"
      @hideFun="hideFun"
      @getPassword="getPassword"
      :pas="password"
    ></pay-keyboard>
    <header class="header" :style="{backgroundColor:doorInfo.changer?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="doorInfo.changer"
        :disabled="!doorInfo.changer"
        @tap="inputPas"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">门锁</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:40px"
      >{{doorInfo.changer?"开启中":"关闭中"}}</view>
      <view
        style="position:absolute;top:50%;left:50%;transform:translateX(-50%)"
      >摄像头:{{Lists[1].isclick?"开启中":"关闭中"}}</view>
      <view
        style="position:absolute;top:60%;left:50%;transform:translateX(-50%)"
      >语音接受:{{Lists[2].isclick?"开启中":"关闭中"}}</view>
    </header>
    <nav class="nav">
      <ul class="flex">
        <li v-for="item of Lists" :key="item" @tap="changestatus(item)">
          <picker
            @change="bindPickerChange"
            :value="index"
            :range="time"
            :disabled="!item.disabled"
            @cancel="canceltime(item)"
          >
            <view class="iconLi">
              <text
                :class="item.icon"
                class="iconfont circle icon"
                :style="{color:item.isclick?blue:gray,borderColor:item.isclick?blue:gray}"
              ></text>
              <text :style="{color:item.isclick?blue:gray}">{{item.Name}}</text>
            </view>
          </picker>
        </li>
      </ul>
    </nav>
  </view>
</template>

<script>
let params = {};
import mSwitch from "../../component/m-switch";
import payKeyboard from "../../component/keyboard";
export default {
  components: {
    mSwitch,
    payKeyboard
  },
  data() {
    return {
      trueFalse: 0, //状态切换标志,0就是关闭转向开启，1就是开启转向关闭
      show_key: false,
      password: "",
      istime: false,
      status: "关闭中",
      camStatus: "关闭中",
      soundStatus: "关闭中",
      index: 0,
      doorInfo: {
        camera: 0,
        sound: 0,
        password: 0,
        name: "",
        equipName: "",
        changer: 0
      },
      visible: true,
      switchVal: false,
      blue: "#00965E",
      gray: "gray",
      Lists: [
        { Name: "密码设置", icon: "icon-mima", isclick: 0 },
        { Name: "语音设置", icon: "icon-yuyin", isclick: 0 },
        { Name: "摄像头", icon: "icon-shexiangtou", isclick: 0 }
      ]
    };
  },
  onLoad(option) {
    params = option;
  },
  onReady() {
    this.doorInfo.equipName = params.equipName;
    this.doorInfo.name = params.roomname;
    this.getValue().then(data => {
      this.changeValue2();
    });
  },
  methods: {
    changeValue1() {
      this.Lists.forEach(item => {
        switch (item.Name) {
          case "语音设置":
            this.doorInfo.sound = item.isclick;
            break;
          case "摄像头":
            this.doorInfo.camera = item.isclick;
            break;
        }
      });
    },
    changeValue2() {
      this.Lists.forEach((item, index) => {
        switch (item.Name) {
          case "语音设置":
            item.isclick = this.doorInfo.sound;
            break;
          case "摄像头":
            item.isclick = this.doorInfo.camera;
            break;
        }
      });
    },
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      this.getValue();
    },
    changestatus(item) {
      if (item.disabled) {
        item.isclick = true;
      } else {
        item.isclick = !item.isclick;
      }
      this.getValue();
    },
    changeSwitch(e) {
      this.switchVal = e;
      this.doorInfo.changer = this.switchVal;
      this.getValue();
      setTimeout(() => {
        this.trueFalse = 0;
      }, 200);
    },
    // 开启密码弹框
    inputPas() {
      if (!this.switchVal && this.trueFalse == 0) {
        this.show_key = true;
      }
    },
    // 关闭密码弹框
    hideFun() {
      this.show_key = false;
    },
    // 获取密码
    getPassword(e) {
      this.password = e.password;
      console.log(this.doorInfo.password);
      if (this.password == this.doorInfo.password) {
        this.switchVal = true;
        this.show_key = false;
        this.password = "";
        this.trueFalse = 1;
        this.doorInfo.changer = this.switchVal;
        this.getValue();
      } else {
        const _this = this;
        uni.showToast({
          title: "密码错误,请重新输入",
          duration: 2000,
          icon: "none",
          success() {
            _this.password = "";
          }
        });
      }
    },
    getValue() {
      return new Promise((reslove, reject) => {
        this.changeValue1();
        uni.request({
          url: this.$apis.doorApi,
          data: this.doorInfo,
          method: "POST",
          header: {
            "custom-header": "hello" //自定义请求头信息
          },
          success: res => {
            console.log(res.data, "res");
            if (res.data.inf && res.data.err != -1) {
              this.doorInfo = res.data.inf[0];
            }
            reslove();
          }
        });
      });
    }
  }
};
</script>

<style>
.header {
  height: 65vh;
  background-color: #00a3f8;
  color: white;
  font-size: 14px;
  position: relative;
  text-align: center;
}
.nav {
  height: 35vh;
  background-color: white;
}
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.icon {
  font-size: 30px;
  padding: 5px;
  margin: 5px 15px;
}
.iconLi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
}
.colorChange-enter-active,
.colorChange-leave-active {
  background-color: #00a3f8;
}
.colorChange-enter,
.colorChange-leave-to {
  background-color: gray;
}
</style>