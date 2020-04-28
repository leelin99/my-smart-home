<template>
  <view>
    <header class="header" :style="{backgroundColor:switchVal?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="switchVal"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">空调</view>
      <view style="position:absolute;top:15%;left:50%;transform:translateX(-50%)">室外：30°C 室内：25°C</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:85px"
      >{{temperature}}°</view>
      <view
        style="position:absolute;top:60%;left:50%;transform:translateX(-50%);width: 100vw"
      >{{Lists[0].array[index0]}} 风向：{{Lists[1].isclick?"上下风":Lists[2].isclick?"左右风":"自动风"}} 风速：{{Lists[3].array[index1]}}</view>
      <view
        style="position:absolute;top:65%;left:50%;transform:translateX(-50%)"
        v-show="istime"
      >定时:{{Lists[5].array[index2]}}关闭</view>
      <view style="position:absolute;top:70%;left:50%;transform:translateX(-50%)">
        <text style="font-size:80px;margin-right:20px" @tap="temperature++">+</text>
        <text style="font-size:80px;margin-left:20px" @tap="temperature--">-</text>
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
import mSwitch from "../../component/m-switch";
export default {
  components: {
    mSwitch
  },
  data() {
    return {
      Name:"g",
      istime: false,
      index0: 0, //判断模式的参数
      index1: 0, //判断风速的参数
      index2: 0, //判断定时的参数
      value: "30分钟",
      visible: true,
      switchVal: false,
      blue: "#00A3F8",
      gray: "gray",
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
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      // 判断是哪种pick
      if(this.Name == "模式"){
        this.index0 = e.target.value;
      }else if(this.Name == "定时"){
        this.index2 = e.target.value;
        this.istime = true;
      }else{
         this.index1 = e.target.value;
      }
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
          this.Lists[2].isclick = 0;
        }
      } else if (item.Name == "左右风") {
        if (item.isclick) {
          this.Lists[1].isclick = 0;
        }
      }
    },
    changeSwitch(e) {
      this.switchVal = e;
    },
    canceltime(item) {
      item.isclick = 0;
      this.istime = false;
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