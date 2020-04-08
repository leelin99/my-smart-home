<template>
  <view class="min-switch">
    <switch
      :checked="value"
      @change="change"
      :disabled="disabled"
      :color="color"
      style="transform: scale(0.7,0.7)"
    />
  </view>
</template>

<script>
export default {
	name:"min-switch",
  props: {
    desc: {
      type: String,
      default: '123213'
    },
    value: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#6CD56C'
    }
  },
  methods: {
    change (e) {
      // console.log(e.detail.value)
      this.$emit('change', e.detail.value)
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-switch {
  height: 80rpx;
  font-size: 28rpx;
  margin: 0 20rpx;
  padding: 20rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5rpx;
  .text{
    padding-left: 20rpx
  }
}
</style>
