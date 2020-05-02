<template>
  <view name="KXDateTime">
    <uni-popup ref="popup" type="bottom">
      <view class="but">
        <text @click="close">取消</text>
        <text>{{title}}</text>
        <text @click="ok">确定</text>
      </view>
      <picker-view
        v-if="visible"
        :indicator-style="indicatorStyle"
        :value="value"
        @change="bindChange"
      >
        <picker-view-column>
          <view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
        </picker-view-column>
        <picker-view-column>
          <view class="item" v-for="(item,index) in mins" :key="index">{{item}}分</view>
        </picker-view-column>
      </picker-view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "../uni-popup/uni-popup.vue";
export default {
  name: "KXDateTime",
  components: {
    uniPopup
  },
  props: {
    data: "",
    start: "",
    end: ""
  },
  data() {
    const date = new Date();
    const years = [];
    const year = date.getFullYear();
    const months = [];
    const month = date.getMonth() + 1;
    const days = [];
    const day = date.getDate();
    const hours = [];
    const hour = date.getHours();
    const mins = [];
    const min = date.getMinutes();
    let start;
    if (this.start) {
      start = new Date(this.start);
    } else {
      start = new Date(0);
    }
    let starty = start.getFullYear(); //开始年份
    let end;
    if (this.end) {
      end = new Date(this.end);
    } else {
      end = new Date();
    }
    let endy = end.getFullYear(); //终止年份
    for (let i = starty; i <= endy; i++) {
      years.push(i);
    }
    return {
		startTime:"",
		endTime:"",
      title: "开始时间",
      years,
      year,
      months,
      month,
      days,
      day,
      hours,
      hour,
      mins,
      min,
      value: [9999, 12, 31, 24, 60],
      valueStr: "",
      visible: true,
      strYMDHM: "",
      indicatorStyle: `height: 80rpx;`
    };
  },
  methods: {
    open() {
      let start;
      if (this.start) {
        start = this.start.replace(/-/g, "/");
        start = new Date(start);
      } else {
        start = new Date(0);
      }
      let starty = start.getFullYear(); //开始年份
      let end;
      if (this.end) {
        end = this.end.replace(/-/g, "/");
        end = new Date(end);
      } else {
        end = new Date();
      }
      if (start > end) {
        uni.showToast({
          title: "时间范围错误！",
          icon: "none",
          duration: 2000
        });
        return false;
      }

      this.$forceUpdate();
      if (this.valueStr) {
        this.value = JSON.parse(this.valueStr);
        setTimeout(this.amend, 100);
        this.$refs.popup.open();
      } else {
        setTimeout(this.amend, 100);
        this.$refs.popup.open();
      }
    },
    close() {
      this.$refs.popup.close();
    },
    ok() {
      if (this.title == "开始时间") {
        let hour = this.hour < 10 ? "0" + this.hour : this.hour,
		  min = this.min < 10 ? "0" + this.min : this.min;
        this.startTime = hour + ":" + min;
        this.title = "结束时间";
        this.$refs.popup.close();
        setTimeout(() => {
          this.$refs.popup.open();
        }, 200);
      } else {
        let hour = this.hour < 10 ? "0" + this.hour : this.hour,
          min = this.min < 10 ? "0" + this.min : this.min;
        this.endTime = hour + ":" + min;
        this.title = "开始时间";
        this.$refs.popup.close();
        this.$emit("rundata", { startTime:this.startTime, endTime:this.endTime });
      }
    },
    bindChange: function(e) {
	  let val = e.detail.value;
	  console.log(val)
      this.valueStr = JSON.stringify(val);
      this.hour = this.hours[val[0]];
      this.min = this.mins[val[1]];
    },
    //数据校正
    amend() {
      if (this.valueStr) {
        let val = JSON.parse(this.valueStr);
        this.hour = this.hours[val[0]];
        this.min = this.mins[val[1]];
      }
      let start;
      if (this.start) {
        start = new Date(this.start);
      } else {
        start = new Date(0);
      }
      let starty = start.getFullYear(); //开始年份
      let startm = start.getMonth() + 1; //开始月份
      let startd = start.getDate(); //开始天
      let starth = start.getHours(); //开始小时
      let startmin = start.getMinutes(); //开始分钟
      let end;
      if (this.end) {
        end = new Date(this.end);
      } else {
        end = new Date();
      }
      let endy = end.getFullYear(); //终止年份
      let endm = end.getMonth() + 1; //终止月份
      let endd = end.getDate(); //终止天
      let endh = end.getHours(); //终止小时
      let endmin = end.getMinutes(); //终止分钟
      //如果选择起始年份
      let years = [],
        months = [],
        days = [],
        hours = [],
        mins = [];
      let month31 = [1, 3, 5, 7, 8, 10, 12],
        month30 = [4, 6, 9, 11];
      let daysNum;
      for (let i = starty; i <= endy; i++) {
        years.push(i);
      }
      if (month31.indexOf(this.month) > -1) {
        daysNum = 31;
      } else if (month30.indexOf(this.month) > -1) {
        daysNum = 30;
      } else {
        if (this.year % 4 == 0) {
          daysNum = 29;
        } else {
          daysNum = 28;
        }
      }
      //当数值异常是设施默认
      if (!this.year) {
        this.year = endy;
      }
      if (!this.month) {
        this.month = endm;
      }
      if (!this.day) {
        this.day = endd;
      }
      if (!this.hour && this.hour !== 0) {
        this.hour = endh;
      }
      if (!this.min && this.min !== 0) {
        this.min = endm;
      }
      //判断年份是在起始年
      if (this.year == starty) {
        //判断起始年份和终止年份是否相等
        if (starty == endy) {
          //如果等，那么月份取两者中间
          for (let i = startm; i <= endm; i++) {
            months.push(i);
          }
          //判断月份是在起始月
          if (this.month == startm) {
            //判断起始月和终止月是否相等
            if (startm == endm) {
              //如果等，那么天数取两者中间
              for (let i = startd; i <= endd; i++) {
                days.push(i);
              }
              //判断日是在起始日
              if (this.day == startd) {
                //判断起始ri和终止日是否相等
                if (startd == endd) {
                  //如果等，那么小时取两者中间
                  for (let i = starth; i <= endh; i++) {
                    hours.push(i);
                  }
                  //判断小时是在起始小时
                  if (this.hour == starth) {
                    //判断起始和终止是否相等
                    if (starth == endh) {
                      //如果等，那么分钟取两者中间
                      for (let i = startmin; i <= endmin; i++) {
                        mins.push(i);
                      }
                    } else {
                      //如果不等，到59
                      for (let i = startmin; i <= 59; i++) {
                        mins.push(i);
                      }
                    }
                  } else {
                    //判断小时是否在截止小时
                    if (this.hour == endh) {
                      //终止小时取到截止分钟
                      for (let i = 0; i <= endmin; i++) {
                        mins.push(i);
                      }
                    }
                  }
                } else {
                  //如果不等，到23小时
                  for (let i = starth; i <= 23; i++) {
                    hours.push(i);
                  }
                  //判断小时是在起始小时
                  if (this.hour == starth) {
                    for (let i = startmin; i <= 59; i++) {
                      mins.push(i);
                    }
                  }
                }
              } else {
                //判断日是否在截止日
                if (this.day == endd) {
                  //终止日取到截止小时
                  for (let i = 0; i <= endh; i++) {
                    hours.push(i);
                  }
                  //判断小时是否在截止小时
                  if (this.hour == endh) {
                    //终止小时取到截止分钟
                    for (let i = 0; i <= endmin; i++) {
                      mins.push(i);
                    }
                  }
                }
              }
            } else {
              //如果不等，
              for (let i = startd; i <= daysNum; i++) {
                days.push(i);
              }
              if (this.day == startd) {
                for (let i = starth; i <= 23; i++) {
                  hours.push(i);
                }
                //判断小时是在起始小时
                if (this.hour == starth) {
                  for (let i = startmin; i <= 59; i++) {
                    mins.push(i);
                  }
                }
              }
            }
          } else {
            //判断月份是在终止月
            if (this.month == endm) {
              //终止月取到截止天
              for (let i = 1; i <= endd; i++) {
                days.push(i);
              }
              //判断日是否在截止日
              if (this.day == endd) {
                //终止日取到截止小时
                for (let i = 0; i <= endh; i++) {
                  hours.push(i);
                }
                //判断小时是否在截止小时
                if (this.hour == endh) {
                  //终止小时取到截止分钟
                  for (let i = 0; i <= endmin; i++) {
                    mins.push(i);
                  }
                }
              }
            }
          }
        } else {
          //如果不等，去开始到12月份
          for (let i = startm; i <= 12; i++) {
            months.push(i);
          }
          //判断月份是在起始月
          if (this.month == startm) {
            //是，取天数之后
            for (let i = startd; i <= daysNum; i++) {
              days.push(i);
            }
            //判断日是在起始日
            if (this.day == startd) {
              //是，qu起始小时之后
              for (let i = starth; i <= 23; i++) {
                hours.push(i);
              }
              //判断小时是在起始小时
              if (this.hour == starth) {
                //是，qu起始分钟之后
                for (let i = startmin; i <= 59; i++) {
                  mins.push(i);
                }
              }
            }
          }
        }
      } else if (this.year == endy) {
        //年份中终止年
        //月份取到终止月
        for (let i = 1; i <= endm; i++) {
          months.push(i);
        }
        //判断月份是在终止月
        if (this.month == endm) {
          //终止月取到截止天
          for (let i = 1; i <= endd; i++) {
            days.push(i);
          }
          //判断日是否在截止日
          if (this.day == endd) {
            //终止日取到截止小时
            for (let i = 0; i <= endh; i++) {
              hours.push(i);
            }
            //判断小时是否在截止小时
            if (this.hour == endh) {
              //终止小时取到截止分钟
              for (let i = 0; i <= endmin; i++) {
                mins.push(i);
              }
            }
          }
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          months.push(i);
        }
        for (let i = 1; i <= daysNum; i++) {
          days.push(i);
        }
        for (let i = 0; i <= 23; i++) {
          hours.push(i);
        }
        for (let i = 0; i <= 59; i++) {
          mins.push(i);
        }
      }
      if (months.length == 0) {
        for (let i = 1; i <= 12; i++) {
          months.push(i);
        }
      }
      if (days.length == 0) {
        for (let i = 1; i <= daysNum; i++) {
          days.push(i);
        }
      }
      if (hours.length == 0) {
        for (let i = 0; i <= 23; i++) {
          hours.push(i);
        }
      }
      if (mins.length == 0) {
        for (let i = 0; i <= 59; i++) {
          mins.push(i);
        }
      }
      this.years = years;
      this.months = months;
      this.days = days;
      this.hours = hours;
      this.mins = mins;
      this.$forceUpdate();
    }
  },
  watch: {
    year() {
      this.amend();
    },
    month() {
      this.amend();
    },
    day() {
      this.amend();
    },
    hour() {
      this.amend();
    },
    min() {
      this.amend();
    },
    years(n, m) {
      if (n.toString() != m.toString()) {
        this.amend();
      }
    },
    months(n, m) {
      if (n.toString() != m.toString()) {
        this.amend();
      }
    },
    days(n, m) {
      if (n.toString() != m.toString()) {
        this.amend();
      }
    },
    hours(n, m) {
      if (n.toString() != m.toString()) {
        this.amend();
      }
    },
    mins(n, m) {
      if (n.toString() != m.toString()) {
        this.amend();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
text {
  display: inline-block;
  color: $uni-text-color-grey;
}

.but {
  background: #fff;
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 30rpx;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text:nth-child(2) {
    color: black;
  }
  text:last-child {
    color: $uni-color-primary;
  }
}
picker-view {
  width: 100%;
  background: #fff;
  height: 600rpx;
  text-align: center;
}
</style>
