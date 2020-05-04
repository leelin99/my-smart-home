<template>
  <view>
    <group-check @getValue="getValue" ref="groupCheck"></group-check>
    <KXDateTime :data="date" :end="enddate" :start="startdate" @rundata="kxdatetime" ref="DateTime"></KXDateTime>
    <header class="header" :style="{backgroundColor:switchVal?blue:gray}">
      <mSwitch
        style="position:absolute;top:10%;right:2%;"
        :value="switchVal"
        @change="changeSwitch"
      ></mSwitch>
      <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">热水器</view>
      <view
        style="position:absolute;top:20%;left:50%;transform:translateX(-45%);font-size:85px"
      >{{temperature}}°</view>
      <view style="position:absolute;top:50%;left:50%;transform:translateX(-50%)">设置温度：{{status}}</view>
      <view
        style="position:absolute;top:55%;left:50%;transform:translateX(-50%)"
      >实际温度:{{actTemp}}° 热水量:{{waterNum}}%</view>
      <view
        style="position:absolute;top:65%;left:50%;transform:translateX(-50%);width:100vw"
        v-show="istime"
      >
        定时:{{week?week:"今天"}}
        <br />
        {{startTime + "~" + endTime}}
      </view>
      <view style="position:absolute;top:70%;left:50%;transform:translateX(-50%)">
        <text style="font-size:80px;margin-right:20px" @tap="temperature-=5">-</text>
        <text style="font-size:80px;margin-left:20px" @tap="temperature+=5">+</text>
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
import KXDateTime from "../../component/kx-datetime/kx-datetime.vue";
import groupCheck from "../../component/groupCheck.vue";
export default {
  components: {
    mSwitch,
    KXDateTime,
    groupCheck
  },
  data() {
    return {
      isShow: false,
      weeks: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      startTime: "",
      endTime: "",
      week: "",
      status: "加热中",
      actTemp: "75",
      waterNum: "100",
      istime: false,
      index: 0,
      visible: true,
      switchVal: false,
      blue: "#FF6666",
      gray: "gray",
      temperature: 20,
      Lists: [
        { Name: "e+增容", icon: "icon-fenyuzengrong", isclick: 0 },
        { Name: "云管家", icon: "icon-yunguanjia", isclick: 0 },
        { Name: "高温抑菌", icon: "icon-yijun", isclick: 0 },
        { Name: "无电洗", icon: "icon-meidian", isclick: 0 },
        {
          Name: "预约",
          icon: "icon-yuyue",
          isclick: 0,
          disabled: true,
          array: ["选择星期,默认不重复", "选择开始结束时间"]
        },
        { Name: "半胆速热", icon: "icon-redu", isclick: 0 }
      ]
    };
  },
  methods: {
    getValue(e) {
      this.week = "";
      for (let i = 0; i < this.weeks.length; i++) {
        if (e.includes(i.toString())) {
          this.week += this.weeks[i] + "  ";
        }
      }
      console.log(e, this.week, "this.week");
    },
    kxdatetime(e) {
      console.log(e, "kxdatetime");
      this.startTime = e.startTime;
      this.endTime = e.endTime;
      this.istime = true;
      // this.date = e;
    },
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      this.index = e.target.value;
      if (this.index == 1) {
        console.log(this.$refs.DateTime);
        this.$refs.DateTime.open();
      } else {
        this.$refs.groupCheck.open();
      }
    },
    changestatus(item) {
      if (item.disabled) {
        item.isclick = true;
      } else {
        item.isclick = !item.isclick;
      }
    },
    changeSwitch(e) {
      this.switchVal = e;
    },
    canceltime(item) {
      item.isclick = 0;
      this.istime = false;
    },
    selectTimeEvent(e) {
      console.log(e);
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