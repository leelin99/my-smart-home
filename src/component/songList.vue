<template>
  <view class="forget">
    <uni-popup ref="popup" type="center">
      <view style="padding: 20px;background-color:white">
        <view style="text-align:left;padding-left: 50px;" @tap="close">✖</view>
        <view style="text-align:center;padding:5px" @tap="close">歌曲列表</view>
        <!-- 主体 -->
        <view class="main list">
          <uni-list>
            <uni-list-item
              :title="item.songName"
              :note="item.singer"
              v-for="item in songList"
              :key="item.id"
              @tap="selectSong(item)"
            ></uni-list-item>
          </uni-list>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
var _this;
import wInput from "./watch-login/watch-input.vue"; //input
import wButton from "./watch-login/watch-button.vue"; //button
import uniList from "./uni-list/uni-list.vue";
import uniListItem from "./uni-list-item/uni-list-item.vue";
import uniPopup from "./uni-popup/uni-popup.vue";
export default {
  props: {
    songList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      phoneData: "", //电话
      passData: "", //密码
      verCode: "", //验证码
      isRotate: false //是否加载旋转
    };
  },
  components: {
    wInput,
    wButton,
    uniPopup,
    uniList,
    uniListItem
  },
  mounted() {
    _this = this;
  },
  methods: {
    close() {
      this.$refs.popup.close();
      console.log("close");
    },
    open() {
      this.$refs.popup.open();
      console.log("open");
    },
    selectSong(item){
      this.$refs.popup.close();
      this.$emit("selectSong",item)
    }
  }
};
</script>

<style>
@import url("./watch-login/css/icon.css");
@import url("./css/main.css");
.list {
  width: 100vw;
  height: 50vh;
  overflow-y: scroll;
}
.list::-webkit-scrollbar {
  /* background: black; */
  /* border:1px lightgray solid; */
  width: 5px;
  /* border-radius: 20px; */
}
.list::-webkit-scrollbar-track {
  visibility: hidden;
}
.list::-webkit-scrollbar-thumb {
  background: #3db6a4;
  border-radius: 20px;
}
</style>

