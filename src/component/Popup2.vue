<template>
    <view class="content">
	  	<view class="mark"></view>
			<view class="modal">
				<view class="title textcenter" style="color:black;padding:10px">{{title}}</view>
    	  <view class="main">
    	  	<label style="width:20vw">设备名</label>
    	  	<input confirmtype="text" placeholder="请输入设备名" v-model="value">
    	  </view>   
				<view class="main">
    	  	<label style="width:20vw">选择类别</label>
    	  	<selected :List="typelist" palceholder="请选择类别"></selected>
    	  </view>  
				<view class="main">
    	  	<label style="width:20vw">描述</label>
    	  	<input confirmtype="text" placeholder="请输入描述" v-model="desc">
    	  </view>   
				<view class="main">
    	  	<label style="width:20vw">图片添加</label>
    	  	<text class="icon-tianjiatupian iconfont" style="font-size:60px" @tap="uploadimg"></text>
    	  </view>  
    	  <view class="comfirm"> 
    	  	<view class="inline-block textcenter colorblue" style="width:34vw;" @click="confirm()">确定</view>
    	  	<view class="inline-block textcenter colorgray" style="width:35vw;" @click="cancel()">取消</view>  
    		</view>  
	 		</view>
    </view>
</template>

<script>
import selected from "./selected"
export default {
	components:{
		selected
	},
    props:{
      title:{
			default:"题目",
    }
    },
    data(){
    	return{
      	isshow:false,
				isconfirm:false,
				desc:'',
				value:"",
				typelist:[
        {value:"选项一",id:1},
        {value:"选项二",id:2},
        {value:"选项三",id:3},
        {value:"选项四",id:4},
        {value:"选项五",id:5},
      ],
				type:"请选择类别"
      }
    },
    methods:{
        confirm(){
            this.$emit("confirm",this.value)
        },
         cancel(){
            this.$emit("cancel")
				},
				uploadimg(){
					uni.chooseImage({
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							uni.uploadFile({
								url: 'http://localhost:3000/room/upload', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes.data);
								}
							});
						}
					});
				}
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
			padding:15px 20px;
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