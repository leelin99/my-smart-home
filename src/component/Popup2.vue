<template>
    <view class="content">
	  	<view class="mark"></view>
			<view class="modal">
				<view class="title textcenter" style="color:black;padding:10px">{{title}}</view>
    	  <view class="main">
    	  	<label style="width:20vw">设备名</label>
    	  	<input confirmtype="text" placeholder="请输入设备名" v-model="transvalue.equipName ">
    	  </view>   
				<view class="main">
    	  	<label style="width:20vw">选择类别</label>
    	  	<selected :List="typelist" @getval="getval">{{transvalue.seleVal}}</selected>
    	  </view>  
				<view class="main">
    	  	<label style="width:20vw">描述</label>
    	  	<input confirmtype="text" placeholder="请输入描述" v-model="transvalue.desc">
    	  </view>   
				<view class="main">
    	  	<label style="width:20vw">图片添加</label>
    	  	<image style="width:60px;height:60px" :src="transvalue.image" @tap="uploadimg"></image>
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
		transvalue:{
			seleVal:"请选择类别",
			image:"../static/image/addimg.png",
			desc:"",
			equipName:"",
		},
		typelist:[
        {value:"智能空调",id:1},
        {value:"智能电灯",id:2},
        {value:"智能门锁",id:3},
        {value:"智能音响",id:4},
        {value:"智能热水器",id:5},
      ],
		type:"请选择类别"
      }
		},
    methods:{
		getval(e){
		console.log(e)
		this.transvalue.seleVal = e.value
		},
    confirm(){
		if(this.transvalue.image === "../static/image/addimg.png"){
			this.transvalue.image = ""
		}
        this.$emit("confirm",this.transvalue)
    },
     cancel(){
        this.$emit("cancel")
		},
		uploadimg(){
			uni.chooseImage({
				success: (chooseImageRes) => {
					console.log(chooseImageRes)
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: this.$apis.uploadApi,
						filePath: tempFilePaths[0],
						name: 'img',
						// formData: {
						// 	'img': 'test'
						// },
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data,"success");
							let imgpath = uploadFileRes.data
							let getimgpath = imgpath.split("\\").join("/")
							console.log(getimgpath)
							this.transvalue.image = this.$basepath + "/" + getimgpath
						},
						fail:(err)=>{
							console.log(err,"err")
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