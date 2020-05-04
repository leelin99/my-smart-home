<template>
  <view>
    <header class="header" :style="{backgroundColor:soundInfo.changer?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="soundInfo.changer"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">音响</view>
      <view
        style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:20px"
      >当前模式：{{Lists[0].isclick?"儿童模式":Lists[2].array[soundInfo.mode]}}</view>
      <view
        style="position:absolute;top:40%;left:50%;transform:translateX(-50%);width:100vw"
      >曲名:{{soundInfo.songName?soundInfo.songName:""}}</view>
      <view
        style="position:absolute;top:50%;left:50%;transform:translateX(-50%);width:100vw"
      >歌手：{{soundInfo.singer?soundInfo.singer:""}}</view>
      <view
        style="position:absolute;top:60%;left:50%;transform:translateX(-50%);width:100vw"
      >描述：{{soundInfo.desc?soundInfo.singer:""}}</view>
      <view style="position:absolute;top:70%;left:50%;transform:translateX(-50%)">
        <text
          style="font-size:50px;margin-right:20px"
          @tap="before"
          class="iconfont icon-shangyishou"
        ></text>
        <text
          style="font-size:50px"
          @tap="isStop=!isStop"
          :class="isStop?'icon-zanting':'icon-icon_play'"
          class="iconfont"
        ></text>
        <text style="font-size:50px;margin-left:20px" class="iconfont icon-kuaijin" @tap="next"></text>
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
      curMusic: "曲名",
      singer: "歌手",
      desc: "描述",
      istime: false,
      curMode: "播放音乐",
      index: 0,
      visible: true,
      soundInfo: {
        name:"",
        equipName:"",
        child: 0,
        songName: "",
        mode:0,
        changer: 0,
        status:0,
      },
      switchVal: false,
      blue: "#009495",
      gray: "gray",
      isStop: true,
      Lists: [
        { Name: "儿童模式", icon: "icon-ertong", isclick: 0 },
        { Name: "歌曲曲目", icon: "icon-huanyuangequxinxi", isclick: 0 },
        {
          Name: "模式选取",
          icon: "icon-iconfontmoshi",
          isclick: 0,
          disabled: true,
          array: ["播放音乐", "收音机", "智能助手"]
        },
        { Name: "有声读物", icon: "icon-yinleduwu", isclick: 0 }
      ]
    };
  },
  onLoad(option) {
    params = option;
  },
  onReady() {
    this.soundInfo.equipName = params.equipName;
    this.soundInfo.name = params.roomname;
    this.getValue().then(data => {
      this.changeValue2();
    });
  },
  methods: {
    changeValue1() {
      this.Lists.forEach(item => {
        switch (item.Name) {
          case "儿童模式":
            this.soundInfo.child = item.isclick;
            break;
        }
      });
    },
    changeValue2() {
      this.Lists.forEach((item, index) => {
        switch (item.Name) {
          case "儿童模式":
            item.isclick = this.soundInfo.child;
            break;
        }
      });
    },
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      this.index = e.target.value;
      this.soundInfo.mode = e.target.value
      this.istime = true;
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
      this.soundInfo.changer = this.switchVal;
      this.getValue();
    },
    canceltime(item) {
      item.isclick = 0;
      this.istime = false;
    },
    getValue() {
      return new Promise((reslove, reject) => {
        this.changeValue1();
        uni.request({
          url: this.$apis.soundApi,
          data: this.soundInfo,
          method: "POST",
          header: {
            "custom-header": "hello" //自定义请求头信息
          },
          success: res => {
            console.log(res.data, "res");
            if (res.data.inf && res.data.err != -1) {
              this.soundInfo = res.data.inf[0];
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