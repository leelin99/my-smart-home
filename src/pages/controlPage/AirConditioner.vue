<template>
  <view>
    <header class="header" :style="{backgroundColor:airConInfo.changer?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="airConInfo.changer"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">空调</view>
      <view style="position:absolute;top:15%;left:50%;transform:translateX(-50%)">室外：30°C 室内：25°C</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:85px"
      >{{airConInfo.temperature}}°</view>
      <view
        style="position:absolute;top:60%;left:50%;transform:translateX(-50%);width: 100vw"
      >{{Lists[0].array[airConInfo.mode]}} 风向：{{Lists[1].isclick?"上下风":Lists[2].isclick?"左右风":"自动风"}} 风速：{{Lists[3].array[airConInfo.speed]}}</view>
      <view
        style="position:absolute;top:65%;left:50%;transform:translateX(-50%)"
        v-show="airConInfo.time==null"
      >定时:{{Lists[5].array[airConInfo.time]}}关闭</view>
      <view style="position:absolute;top:70%;left:50%;transform:translateX(-50%)">
        <text style="font-size:80px;margin-right:20px" @tap="airConInfo.temperature++;getValue()">+</text>
        <text style="font-size:80px;margin-left:20px" @tap="airConInfo.temperature--;getValue()">-</text>
      </view>
    </header>
    <nav class="nav">
      <ul class="flex">
        <li v-for="item of Lists" :key="item" @tap="changestatus(item)">
          <picker
            @change="bindPickerChange"
            :value="index"
            :range="item.array"
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
export default {
  components: {
    mSwitch
  },
  data() {
    return {
      Name: "g",
      istime: false,
      value: "30分钟",
      visible: true,
      blue: "#00A3F8",
      gray: "gray",
      airConInfo: {
        temperature: 0,
        mode: 0,
        sxfeng: 0,
        zyfeng: 0,
        speed: 0,
        clear: 0,
        time: 0,
        heat: 0,
        dry: 0,
        name: "",
        equipName: "",
        changer: 0
      },
      temperature: 17,
      Lists: [
        {
          Name: "模式",
          icon: "icon-moshiqiehuan",
          isclick: 0,
          disabled: true,
          array: ["制冷模式", "制热模式", "通风模式"]
        },
        { Name: "上下风", icon: "icon-feng", isclick: 0 },
        { Name: "左右风", icon: "icon-air-movement", isclick: 0 },
        {
          Name: "风速",
          icon: "icon-wind-speed-high",
          isclick: 0,
          disabled: true,
          array: ["小", "中", "大"]
        },
        { Name: "净化", icon: "icon-jinghua", isclick: 0 },
        {
          Name: "定时",
          icon: "icon-timer",
          isclick: 0,
          disabled: true,
          array: [
            "30分钟",
            "1小时",
            "2小时",
            "3小时",
            "4小时",
            "5小时",
            "6小时",
            "7小时",
            "8小时"
          ]
        },
        { Name: "电辅热", icon: "icon-re", isclick: 0 },
        { Name: "干燥", icon: "icon-ganzao", isclick: 0 }
      ]
    };
  },
  onLoad(option) {
    params = option;
  },
  onReady() {
    this.airConInfo.equipName = params.equipName;
    this.airConInfo.name = params.roomname;
    console.log(this.getValue());
    this.getValue().then(data => {
      this.changeValue2()
    });
  },
  methods: {
    changeValue1() {
      this.Lists.forEach(item => {
        switch (item.Name) {
          case "上下风":
            this.airConInfo.sxfeng = item.isclick;
            break;
          case "左右风":
            this.airConInfo.zyfeng = item.isclick;
            break;
          case "净化":
            this.airConInfo.clear = item.isclick;
            break;
          case "电辅热":
            this.airConInfo.heat = item.isclick;
            break;
          case "干燥":
            this.airConInfo.dry = item.isclick;
            break;
        }
      });
    },
    changeValue2() {
      this.Lists.forEach((item, index) => {
        switch (item.Name) {
          case "上下风":
            item.isclick = this.airConInfo.sxfeng;
            break;
          case "左右风":
            item.isclick = this.airConInfo.zyfeng;
            break;
          case "净化":
            item.isclick = this.airConInfo.clear;
            break;
          case "电辅热":
            item.isclick = this.airConInfo.heat;
            break;
          case "干燥":
            item.isclick = this.airConInfo.dry;
            break;
        }
      });
    },
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      // 判断是哪种pick
      if (this.Name == "模式") {
        this.airConInfo.mode = e.target.value;
      } else if (this.Name == "定时") {
        this.airConInfo.time = e.target.value;
        this.istime = true;
      } else {
        this.airConInfo.speed = e.target.value;
      }
      this.getValue()
    },
    changestatus(item) {
      this.Name = item.Name;
      if (item.disabled) {
        item.isclick = true;
      } else {
        item.isclick = !item.isclick;
      }
      // 上下风和左右风做一个互斥
      if (item.Name == "上下风") {
        if (item.isclick) {
          this.Lists[2].isclick = 0
          this.airConInfo.zyfeng = 0;
        }
      } else if (item.Name == "左右风") {
        if (item.isclick) {
          this.Lists[1].isclick = 0
          this.airConInfo.sxfeng = 0;
        }
      }
      this.getValue();
    },
    changeSwitch(e) {
      this.airConInfo.changer = e;
      this.getValue()
      console.log(e);
    },
    canceltime(item) {
      item.isclick = 0;
      this.istime = false;
    },
    getValue() {
      return new Promise((reslove, reject) => {
        this.changeValue1();
        uni.request({
          url: this.$apis.airConditionApi,
          data: this.airConInfo,
          method: "POST",
          header: {
            "custom-header": "hello" //自定义请求头信息
          },
          success: res => {
            console.log(res.data, "res");
            if (res.data.inf && res.data.err != -1) {
              this.airConInfo = res.data.inf[0];
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