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
					<img :src="list.image" alt="">
				</div>
				<div class="aui-news-item-bd">
					<h4>{{list.equipName}}</h4>
					<p>{{list.desc}}</p>
				</div>
			</a>
		</view>
        <view class="flexcenter" style="position:fixed;left:0;top:0;height:100vh" v-if="isshow">
			<Popup 
			title="添加设备"
			@confirm="confirm"
			@cancel="cancel"
			></Popup>
		</view>
		<div style="color:red;left:50%;transform:translateX(-50%)" class="center absolute bottom20">删除房间</div>
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
				lists: [],
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
            confirm(e){
		    	this.isshow = false;
				console.log(e,"e")
				this.lists.push(e)
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

