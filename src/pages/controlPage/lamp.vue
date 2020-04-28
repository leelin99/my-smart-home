<template>
  <view>
    <header class="header" :style="{backgroundColor:switchVal?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="switchVal"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">电灯</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:40px"
      >{{status}}</view>
      <view style="position:absolute;top:60%;left:50%;transform:translateX(-50%);width:100vw">当前模式：{{Lists[2].array[mode]}} 亮度：{{Lists[1].array[lightness]}}</view>
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
      istime: false,
      Name: "",
      status: "关闭中",
      mode: "",
      lightness: 5,
      value: "30分钟",
      visible: true,
      // indicatorStyle: `height: ${Math.round(
      //   uni.getSystemInfoSync().screenWidth / (750 / 100)
      // )}px;width:100vw`,
      switchVal: false,
      blue: "#9999FE",
      gray: "gray",
      temperature: 17,
      Lists: [
        {
          Name: "颜色调节",
          icon: "icon-yanse",
          isclick: 0,
          disabled: true,
          array: ["黄色", "白色", "红色", "青色"]
        },
        {
          Name: "亮度调节",
          icon: "icon-liangdu-",
          isclick: 0,
          disabled: true,
          array: ["10%", "30%", "50%", "70%", "80%", "90%", "100%"]
        },
        {
          Name: "模式调节",
          icon: "icon-iconfontmoshi",
          isclick: 0,
          disabled: true,
          array: ["护眼模式", "普通模式", "睡眠模式"]
        }
      ]
    };
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      if (this.Name == "颜色调节") {
        switch (e.target.value) {
          case 0:
            this.blue = "yellow";
            break;
          case 2:
            this.blue = "red";
            break;
          case 3:
            this.blue = "lightgreen";
            break;
        }
      } else if (this.Name == "亮度调节") {
        this.lightness = e.target.value
      } else {
        this.mode = e.target.value
      }
      this.index = e.target.value;
      this.istime = true;
    },
    changestatus(item) {
      this.Name = item.Name;
      if (item.disabled) {
        item.isclick = true;
      } else {
        item.isclick = !item.isclick;
      }
    },
    changeSwitch(e) {
      this.switchVal = e;
      if (e) {
        this.status = "开启中";
      } else {
        this.status = "关闭中";
      }
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