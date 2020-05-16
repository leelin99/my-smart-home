<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <view class="header">
        <!-- <image :src="logoImage"></image> -->
      </view>
      <!-- 主体表单 -->
      <view class="main">
        <wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
        <wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
      </view>
      <wButton text="登 录" :rotate="isRotate" @click.native="startLogin()" class="wbutton"></wButton>

      <!-- 其他登录 -->
      <view class="other_login cuIcon">
        <view class="login_icon">
          <view class="cuIcon-weixin" @tap="login_weixin"></view>
        </view>
        <view class="login_icon">
          <view class="cuIcon-weibo" @tap="login_weibo"></view>
        </view>
        <view class="login_icon">
          <view class="cuIcon-github" @tap="login_github"></view>
        </view>
      </view>

      <!-- 底部信息 -->
      <view class="footer">
        <navigator url="forget" open-type="navigate">找回密码</navigator>
        <text>|</text>
        <navigator url="register" open-type="navigate">注册账号</navigator>
      </view>
    </view>
  </view>
</template>

<script>
var _this;
import wInput from "../../component/watch-login/watch-input.vue"; //input
import wButton from "../../component/watch-login/watch-button.vue"; //button
// import smartHome from "./smartHome.png"
export default {
  data() {
    return {
      //logo图片 base64
      // logoImage: smartHome,
      phoneData: "", //用户/电话
      passData: "", //密码
      isRotate: false //是否加载旋转
    };
  },
  components: {
    wInput,
    wButton
  },
  mounted() {
    _this = this;
    this.isLogin();
  },
  methods: {
    isLogin() {
      try {
        const value = uni.getStorageSync("setUserData");
        if (value) {
          //有登录信息
          console.log(value, "value");
          uni.switchTab({
            url: "../user/user",
            success: res => {
              console.log(res);
              _this.isRotate = false;
            }
          });
        }
      } catch (e) {
        // error
      }
    },
    startLogin() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "用户名不能为空"
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确"
        });
        return;
      }
      _this.isRotate = true;
      uni.showLoading({
        title: "登录中"
      });
      this.getLogin(this.phoneData, this.passData)
        .then(res => {
          console.log(res);
          if (res.data.err == 0) {
            let userdata = {
              userName: res.data.inf[0].userName,
              password: res.data.inf[0].password
            };
            try {
              uni.setStorageSync("setUserData", userdata); //存入缓存
            } catch (e) {
              // error
            }
            uni.showToast({
              icon: "success",
              position: "bottom",
              title: "登录成功"
            });
            uni.switchTab({
              url: "../user/user",
              success: res => {
                console.log(res);
                _this.isRotate = false;
              }
            });
          } else {
            _this.passData = "";
            _this.isRotate = false;
            uni.showToast({
              icon: "none",
              duration: 2000,
              position: "bottom",
              title: "账号或密码错误"
            });
          }
          uni.hideLoading();
        })
        .catch(err => {
          uni.hideLoading();
        });
    },
    login_weixin() {
      //微信登录
      uni.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    },
    login_weibo() {
      //微博登录
      uni.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    },
    login_github() {
      //github登录
      uni.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    },
    getLogin(userName, password) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: this.$apis.loginApi,
          data: { userName, password },
          method: "POST",
          header: {
            "custom-header": "hello" //自定义请求头信息
          },
          success: res => {
            resolve(res);
          }
        });
      });
    }
  }
};
</script>

<style>
@import url("../../component/watch-login/css/icon.css");
@import url("./css/main.css");
</style>
