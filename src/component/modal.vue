<template>
    <view class="app-modal">
        <view class="app-modal__container">
            <view class="app-modal__container__header" v-if="title">
				<text class="app-modal__container__header__text">{{title}}</text>
			</view>
            <view class="app-modal__container__content">
				<text class="app-modal__container__content__text" :style="{textAlign: align}">{{content}}</text>
            </view>
            <view class="app-modal__container__footer">
                <view v-if="showCancel" style="width: 315rpx" class="app-modal__container__footer-left" hover-class="app-modal__container__footer-hover" :hover-start-time="20" :hover-stay-time="70" @click="clickLeft" >
                    <text class="app-modal__container__footer-left__text" :style="{color:cancelColor}">{{cancelText}}</text>
                </view>
                <view :style="{width: showCancel?'315rpx':'630rpx'}" class="app-modal__container__footer-right" hover-class="app-modal__container__footer-hover" :hover-start-time="20" :hover-stay-time="70" @click="clickRight"  >
                    <text class="app-modal__container__footer-right__text" :style="{color:confirmColor}">{{confirmText}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				title: "提示",
				content: "", 
				align: "center", // 对齐方式 left/center/right
				cancelText: "取消", // 取消按钮的文字
				cancelColor: "#8F8F8F", // 取消按钮颜色
				confirmText: "确定", // 确认按钮颜色
				confirmColor: "#FFAD15", // 确认按钮颜色 
				showCancel: true, // 是否显示取消按钮，默认为 true
			};
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;  
			}  
			return true;  
		},
		onLoad(options) {
			if (options.showCancel) {
				options.showCancel = JSON.parse(options.showCancel)
			}
			Object.assign(this.$data, options)
		},
		methods: {
			clickLeft() {
				uni.$emit('AppModalCancel')
				this.closeModal();
			},
			clickRight() {
				uni.$emit('AppModalConfirm')
				this.closeModal();
			},
			closeModal() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	// nvue页面只支持flex布局
	.app-modal {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		
		&__container {
			width: 630rpx;
			border-radius: 24rpx;
			background-color: #fff;
			overflow: hidden;
			
			&__header {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;
				height: 90rpx;
				&__text {
					font-size: 32rpx;  
					color: #262626;
				}
			}
			
			&__content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;
				
				padding: 0 30rpx 30rpx 30rpx;
				&__text {
					font-size: 30rpx;
					color: #262626;
					line-height: 50rpx;
				}
			}
			
			&__footer {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;
				flex-direction: row;
				height: 88rpx;
				
				&-left {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;
					
					border-top-width: 1rpx;
					border-right-width: 1rpx;
					border-color: #E6E6E6;
					border-style: solid;
					border-bottom-left-radius: 24rpx;
					padding: 22rpx;
					
					&__text{
						font-size: 34rpx;
					}
				}
				
				&-right {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;
					
					border-top-width: 1rpx;
					border-right-width: 1rpx;
					border-color: #E6E6E6;
					border-style: solid;
					border-bottom-right-radius: 24rpx;
					padding: 22rpx;
					
					&__text{
						font-size: 34rpx;
					}
				}
				
				&-hover {
				    background-color: #f1f1f1;
				}
				
			}
		}
		
	}
</style>
