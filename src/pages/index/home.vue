<template>
  <view class="content">
    <view class="bgimg">
      <view class="mark"></view>
      <img src="../../static/bgimg.jpg" style="width:100vw" />
    </view>
    <view class="home">
      <text style="font-size:$uni-font-size-title;font-weight:blod">{{name}}的家</text>
      <view class="dia">
        <view style="font-size:12px;">
          空气质量:
          {{quality}}
        </view>
        <view class="relative border-bottom">
          <text style="font-size:25px;">{{temperature}}</text>
          <view class="unit">
            <text class="small-text">°C</text>
            <text class="small-text">温度</text>
          </view>
        </view>
        <view class="relative">
          <text style="font-size:25px;">{{wet}}</text>
          <view class="unit">
            <text class="small-text">%</text>
            <text class="small-text">湿度</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottomcontent">
      <text class="margin-left20 margin-top20 fontsize30">房间</text>
      <text class="iconfont icon-jiayi colorblue right" @click="isshow=true"></text>
      <view v-for="(item,i) in roomList" :key="i" class="margin-top20 margin-left20 relative">
        <view>{{item.roomName}}</view>
        <view class="colorgray">{{item.equipmentNum}}个设备</view>
        <view class="border-bottom center"></view>
        <view class="iconfont icon-jiantou1 absolute arrow" @tap="taproom(item)"></view>
      </view>
    </view>
    <view class="flexcenter" style="position:fixed;left:0;top:0;height:100vh" v-if="isshow">
      <Popup title="添加房间" @confirm="confirm" @cancel="cancel"></Popup>
    </view>
  </view>
</template>
<script>
import { uniBadge } from "@dcloudio/uni-ui";
import Popup from "../../component/Popup";
export default {
  components: {
    uniBadge,
    Popup
  },
  data() {
    return {
      title: "Hello",
      name: "李某某",
      quality: "良",
      temperature: "16",
      wet: "89",
      roomList: [],
      isshow: false
    };
  },
  onShow() {
    console.log("sss");
    this.roomlistrequest({
      url: this.$apis.roomlistApi,
      data: {},
      method: "POST",
      success: result => {
        console.log(result);
        this.roomList = [...result.data.inf];
      }
    });
  },
  methods: {
    //房间列表接口请求
    roomlistrequest(req) {
      wx.request({
        url: req.url,
        data: req.data,
        header: { "content-type": "application/json" },
        method: req.method,
        dataType: "json",
        responseType: "text",
        success: req.success,
        fail: req.fail
      });
    },
    // 房间添加
    confirm(data) {
      this.isshow = false;
      if (data) {
        this.roomList.push({ roomName: data, equipmentNum: 0 });
        this.roomlistrequest({
          url: this.$apis.roomlistApi,
          data: { roomName: data },
          method: "POST",
          success: result => {}
        });
      }
    },
    cancel() {
      this.isshow = false;
    },
    // 房间跳转路由
    taproom(e) {
      uni.navigateTo({
        url: "./roomdetail?roomname=" + e.roomName,
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style scoped>
.arrow {
  color: gray;
  right: 30px;
  top: 15px;
  transform: rotate(-90deg);
  font-size: 40rpx;
}
.mark {
  background-color: #000000;
  width: 100vw;
  height: 200px;
  opacity: 0.4;
  position: absolute;
}

.bottomcontent {
  color: white;
  position: relative;
  top: 220px;
  line-height: 30px;
}
.unit {
  position: absolute;
  top: 0;
  left: 40px;
  line-height: 12px;
}
.small-text {
  display: block;
  font-size: 10px;
}
.dia {
  margin-top: 15px;
  line-height: 30px;
}
.content {
  height: 100vh;
  background: #333333;
}
.bgimg {
  top: 0;
  left: 0;
  height: 200px;
  width: 100vw;
  overflow: hidden;
  position: absolute;
}
.home {
  text-align: left;
  margin-left: 20px;
  color: white;
  position: absolute;
  margin-top: 50px;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
