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
			<a href="javascript:;" class="aui-news-item" v-for="(list, i) in lists" :key="i">
				<div class="aui-news-item-hd">
					<img :src="list.img" alt="">
				</div>
				<div class="aui-news-item-bd">
					<h4>{{list.tit1}}</h4>
					<p>{{list.tit2}}</p>
				</div>
				<span class="aui-news-item-fr">{{list.time}}</span>
			</a>
		</view>
        <view class="flexcenter" style="position:fixed;left:0;top:0;height:100vh" v-if="isshow">
			<Popup 
			title="添加设备"
			@confirm="confirm"
			@cancel="cancel"
			></Popup>
		</view>
	</view>
</template>

<script>
    let params = {}
    import Popup from "../../component/Popup2"
	export default {
        components:{
            Popup,
        },
		data() {
			return {
                title: 'Hello',
                isshow:false,
                roomName:"",
                typelist:['选项1'],
				lists: [
					{
						"tit1": "服务通知",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "08:48",
						"img": '../../static/icon-item-001.png'
					},
					{
						"tit1": "优惠促销",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "08:48",
						"img": '../../static/icon-item-002.png'
					},
					{
						"tit1": "账户通知",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "昨天",
						"img": '../../static/icon-item-003.png'
					},
					{
						"tit1": "互动问答",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "星期六",
						"img": '../../static/icon-item-004.png'
					},
					{
						"tit1": "物流助手",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "星期六",
						"img": '../../static/icon-item-005.png'
					},
				],
			}
		},
		onLoad(option) {
            // let curpage = getCurPage()
            params = option
        },
        onReady(){
            this.roomName = params.roomname
            console.log(params)
        },
		methods: {
            confirm(data){
		    	this.isshow = false;
		    	// if(data){
		    	// 	this.roomList.push({'roomName':data,'equipmentNum':0})
		    	// 	this.roomlistrequest({
		    	// 		url:this.$apis.roomlistApi,
		    	// 		data:{'roomName':data},
		    	// 		method:"POST",
		    	// 		success:(result)=>{},
		    	// 	})	
		    	// }
		    },
		    cancel(){
		    	this.isshow = false;
		    },
		}
	}
</script>

<style>
    @import '../../static/css/style.css';
    .borderTB{
        border-top:1px black solid ;
        border-bottom:1px black solid;
        line-height: 30px;
        height:30px
    }
</style>

