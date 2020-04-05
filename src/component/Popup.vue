<template>
    <view class="content">
				<view class="mark"></view>
				<view class="modal">
					 <view class="title textcenter" style="color:black;padding:10px">{{title}}</view>
       				<view class="main">
       				     <label style="width:20vw">房间名</label>
       				     <input confirmtype="text" placeholder="请输入用房间名" v-model="value">
       				</view>      
       			<view class="comfirm"> 
            	<view class="inline-block textcenter colorblue" style="width:34vw;" @click="confirm()">确定</view>
            	<view class="inline-block textcenter colorgray" style="width:35vw;" @click="cancel()">取消</view>  
       		</view>  
				</view>
    </view>
</template>

<script>
export default {
    props:{
        title:{
            default:"题目",
        }
    },
    data(){
        return{
            isshow:false,
            isconfirm:false,
            value:"",
        }
    },
    methods:{
        confirm(){
            this.$emit("confirm",this.value)
        },
         cancel(){
            this.$emit("cancel")
        },
    }
}
</script>

<style>
		.mark{
			background-color:#000000;
			width:100vw;
			height:100vh;
			opacity: 0.4;
			position:fixed;
			z-index: 999;
			left:0px;
			top:0px;
		}
		.modal{
			z-index: 9999;
			position: relative;
			background-color: white;
			border-radius:10px ;
			width:70vw;
			display: flex;
       flex-direction: column;
		}
    .main{
        /* text-align: left; */
				padding:20px;
				display: flex;
        flex-direction: row;
        /* justify-content: center;
				align-items: center; */
        /* justify-content:space-between; */
		}
		.comfirm{
			margin-bottom:10px
		}
</style>