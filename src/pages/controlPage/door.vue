<template>
  <view>
    <header class="header" :style="{backgroundColor:switchVal?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="switchVal"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">门锁</view>
      <view style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:40px">{{status}}</view>
      <view style="position:absolute;top:50%;left:50%;transform:translateX(-50%)">摄像头:{{camStatus}}</view>
            <view style="position:absolute;top:60%;left:50%;transform:translateX(-50%)">语音接受:{{soundStatus}}</view>
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
            <view  class="iconLi">
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
      istime:false,
      status:"关闭中",
      camStatus:"关闭中",
      soundStatus:"关闭中",
      index: 0,
      value: "30分钟",
      time: [
        "30分钟",
        "1小时",
        "2小时",
        "3小时",
        "4小时",
        "5小时",
        "6小时",
        "7小时",
        "8小时"
      ],
      visible: true,
      // indicatorStyle: `height: ${Math.round(
      //   uni.getSystemInfoSync().screenWidth / (750 / 100)
      // )}px;width:100vw`,
      switchVal: false,
      blue: "#00965E",
      gray: "gray",
      Lists: [
        { Name: "密码设置", icon: "icon-mima", isclick: 0 },
        { Name: "语音设置", icon: "icon-shexiangtou", isclick: 0 },
        { Name: "摄像头", icon: "icon-yuyin", isclick: 0 },
      ]
    };
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
			this.index = e.target.value;
			this.istime = true;
    },
    changestatus(item) {
			if(item.disabled){
				item.isclick = true
			}else{
				item.isclick = !item.isclick;
			}
    },
    changeSwitch(e) {
      this.switchVal = e;
		},
		canceltime(item){
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