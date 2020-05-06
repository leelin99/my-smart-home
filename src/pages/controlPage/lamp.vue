<template>
  <view>
    <header class="header" :style="{backgroundColor:lampInfo.changer?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="lampInfo.changer"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">电灯</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:40px"
      >{{lampInfo.changer?"开启":"关闭"}}</view>
      <view
        style="position:absolute;top:60%;left:50%;transform:translateX(-50%);width:100vw"
      >当前模式：{{Lists[2].array[lampInfo.mode]}} 亮度：{{Lists[1].array[lampInfo.lightness]}}%</view>
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
      istime: false,
      Name: "",
      mode: "",
      visible: true,
      lampInfo: {
        name: "",
        equipName: "",
        mode: 0,
        lightness: 0,
        color: 0,
        status: 0,
        changer: 0
      },
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
          array: [10, 30, 50, 70, 80, 90, 100]
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
  onLoad(option) {
    params = option;
  },
  onReady() {
    this.lampInfo.equipName = params.equipName;
    this.lampInfo.name = params.roomname;
    this.getValue().then(() => {
      this.changeMode();
      switch (this.lampInfo.color) {
        case 0:
          this.blue = "#E09101";
          break;
        case 1:
          this.blue = "#9999FE";
          break;
        case 2:
          this.blue = "red";
          break;
        case 3:
          this.blue = "#33E680";
          break;
      }
    });
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      if (this.Name == "颜色调节") {
        this.lampInfo.color = e.target.value;
        switch (e.target.value) {
          case "0":
            this.blue = "#E09101";
            break;
          case "1":
            this.blue = "#9999FE";
            break;
          case "2":
            this.blue = "red";
            break;
          case "3":
            this.blue = "#33E680";
            break;
        }
      } else if (this.Name == "亮度调节") {
        this.$set(this.lampInfo,'lightness',e.target.value)
      } else {
        console.log("aaa")
        this.lampInfo.mode = e.target.value;
        this.changeMode();
        switch (this.lampInfo.color) {
          case 0:
            this.blue = "#E09101";
            break;
          case 1:
            this.blue = "#9999FE";
            break;
          case 2:
            this.blue = "red";
            break;
          case 3:
            this.blue = "#33E680";
            break;
        }
      }
      this.index = e.target.value;
      this.istime = true;
      this.getValue();
    },
    changestatus(item) {
      this.Name = item.Name;
    },
    changeSwitch(e) {
      this.switchVal = e;
      this.lampInfo.changer = this.switchVal;
      this.getValue();
    },
    getValue() {
      return new Promise((reslove, reject) => {
        uni.request({
          url: this.$apis.lampApi,
          data: this.lampInfo,
          method: "POST",
          header: {
            "custom-header": "hello" //自定义请求头信息
          },
          success: res => {
            console.log(res.data, "res");
            if (res.data.inf && res.data.err != -1) {
              this.lampInfo = res.data.inf[0];
            }
            reslove();
          }
        });
      });
    },
    changeMode() {
      console.log("aaaaa")
      if (this.lampInfo.mode == 0) {
        this.lampInfo.color = 0;
        this.lampInfo.lightness = 3;
      } else if (this.lampInfo.mode == 1) {
        this.lampInfo.color = 1;
        this.lampInfo.lightness = 4;
      } else {
        this.lampInfo.color = 0;
        this.lampInfo.lightness = 0;
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