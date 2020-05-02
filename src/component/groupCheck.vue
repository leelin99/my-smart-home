<template>
  <view>
    <uni-popup ref="popup" type="center">
      <checkbox-group @change="checkboxChange" class="checkgroup">
        <label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
          <view>
            <checkbox :value="item.value" :checked="item.checked" />
          </view>
          <view>{{item.name}}</view>
        </label>
      </checkbox-group>
      <view class="comfirm">
        <text @tap="cancel">取消</text>
        <text @tap="comfirm">确定</text>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "./uni-popup/uni-popup.vue";
export default {
  props: {},
  components: {
    uniPopup
  },
  data() {
    return {
      isShow: true,
      value: "",
      items: [
        {
          value: "1",
          name: "周一"
        },
        {
          value: "2",
          name: "周二"
        },
        {
          value: "3",
          name: "周三"
        },
        {
          value: "4",
          name: "周四"
        },
        {
          value: "5",
          name: "周五"
        },
        {
          value: "6",
          name: "周六"
        },
        {
          value: "0",
          name: "周日"
        }
      ]
    };
  },
  methods: {
    open() {
      this.$refs.popup.open();
    },
    cancel() {
      this.$refs.popup.close();
    },
    comfirm() {
      this.$refs.popup.close();
      this.$emit("getValue", this.value);
    },
    checkboxChange: function(e) {
      console.log(e.detail.value, "e.detail.value");
      var items = this.items,
        values = e.detail.value;
      this.value = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i];
        if (values.includes(item.value)) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped >
.checkgroup {
  background: white;
  padding: 10px;
  width: 70vw;
}
.viewCen {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  z-index: 9999;
}
.uni-list {
  background-color: white;
  padding: 10px;
}
.uni-list-cell {
  justify-content: flex-start;
  flex-direction: row;
  display: flex;
  height: 35px;
  border-bottom: 1px lightgray solid;
  margin: 10px 10px;
}
.comfirm {
  display: flex;
  justify-content: space-between;
  padding: 20px 60px;
  background-color: white;
  text:last-child {
    color: $uni-color-primary;
  }
}
</style>