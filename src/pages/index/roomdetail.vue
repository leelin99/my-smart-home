<template>
  <view class="content">
    <view class="borderTB relative">
      <text class="absolute" style="left:20px">房间名称</text>
      <text class="right">{{roomName}}</text>
    </view>
    <view class="relative" style="margin-top:10px">
      <text class="absolute" style="left:30px">已有设备</text>
      <text class="icon-jia iconfont right" style="font-size:20px;color:black" @click="isshow=true"></text>
    </view>
    <view class="aui-news-box" style="margin-top:50px">
      <a @tap="tapequip(list)" class="aui-news-item" v-for="(list, i) in lists" :key="i">
        <view class="aui-news-item-hd">
          <img :src="list.image?list.image:'../../static/image/control.png'" alt />
        </view>
        <div class="aui-news-item-bd">
          <h4>{{list.equipName}}</h4>
          <p>{{list.desc}}</p>
        </div>
      </a>
    </view>
    <view class="flexcenter" style="position:fixed;left:0;top:0;height:100vh" v-if="isshow">
      <Popup title="添加设备" @confirm="confirm" @cancel="cancel"></Popup>
    </view>
    <div
      style="color:red;left:50%;transform:translateX(-50%)"
      class="center absolute bottom20"
      @tap="del"
    >删除房间</div>
  </view>
</template>

<script>
let params = {};
import Popup from "../../component/Popup2";
export default {
  components: {
    Popup
  },
  data() {
    return {
      title: "Hello",
      isshow: false,
      roomName: "",
      typelist: ["选项1"],
      lists: [],
      equipInf: {}
    };
  },
  onLoad(option) {
    // let curpage = getCurPage()
    params = option;
  },
  onReady() {
    this.equipList();
    console.log(params, "params");
  },
  methods: {
    //页面跳转
    tapequip(item) {
      console.log(item);
      switch (item.seleVal) {
        case "智能空调":
          uni.navigateTo({
            url: "../controlPage/AirConditioner?roomname="+params.roomname + "&equipName=" + item.equipName,
          });
          break;
          case "智能电灯":
          uni.navigateTo({
            url: "../controlPage/lamp?roomname="+params.roomname + "&equipName=" + item.equipName,
          });
          break;
          case "智能门锁":
          uni.navigateTo({
            url: "../controlPage/door?roomname="+params.roomname + "&equipName=" + item.equipName,
          });
          break;
          case "智能音响":
          uni.navigateTo({
            url: "../controlPage/sound?roomname="+params.roomname + "&equipName=" + item.equipName,
          });
          break;
          case "智能热水器":
          uni.navigateTo({
            url: "../controlPage/Heater?roomname="+params.roomname + "&equipName=" + item.equipName,
          });
          break;
      }
    },
    // 数据删除
    delRoom(param) {
      uni.request({
        url: this.$apis.delRoomApi,
        data: { name: param },
        method: "POST",
        header: {
          "custom-header": "hello" //自定义请求头信息
        },
        success: res => {
          console.log(res.data);
          const pages = getCurrentPages();
          const beforePage = pages[pages.length - 2];
          console.log(beforePage);
          wx.navigateBack({
            success: function() {}
          });
        }
      });
    },
    // 列表添加和更新
    equipList() {
      this.equipInf.name = params.roomname;
      uni.request({
        url: this.$apis.equipApi,
        data: this.equipInf,
        method: "POST",
        header: {
          "custom-header": "hello" //自定义请求头信息
        },
        success: res => {
          console.log(res.data, "res");
          if (res.data.inf) {
            this.lists = res.data.inf;
          }
        }
      });
    },
    del() {
      this.delRoom(params.roomname);
    },
    confirm(e) {
      this.equipInf = e;
      if (e.equipName && e.seleVal != "请选择类别") {
        this.isshow = false;
        this.lists.push(e);
        this.equipList();
      } else {
        if (!e.equipName) {
          wx.showToast({
            title: "请输入设备名",
            icon: "node",
            duration: 2000
          });
        } else if (e.seleVal == "请选择类别") {
          wx.showToast({
            title: "请选择类别",
            icon: "node",
            duration: 2000
          });
        }
      }
    },
    cancel() {
      this.isshow = false;
    }
  }
};
</script>

<style>
@import "../../static/css/style.css";
.borderTB {
  border-top: 1px black solid;
  border-bottom: 1px black solid;
  line-height: 30px;
  height: 30px;
}
</style>

