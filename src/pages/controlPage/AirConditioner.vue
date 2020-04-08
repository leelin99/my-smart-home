<template>
    <view>
       <header class="header" :style="{backgroundColor:switchVal?blue:gray}">
				 	 <mSwitch style="position:absolute;top:10%;right:2%;" :value="switchVal" @change="changeSwitch"></mSwitch>
				 	 <view style="position:absolute;top:10%;left:50%;transform:translateX(-50%)">空调</view>
					 <view style="position:absolute;top:15%;left:50%;transform:translateX(-50%)">室外 室内</view>
					 <view style="position:absolute;top:30%;left:50%;transform:translateX(-45%);font-size:85px">{{temperature}}°</view>
					 <view style="position:absolute;top:60%;left:50%;transform:translateX(-50%)">制冷运行风速自动风</view>
					 <view style="position:absolute;top:70%;left:50%;transform:translateX(-50%)">
						 <text style="font-size:80px" @tap="temperature++">+</text>
						 <text style="font-size:80px" @tap="temperature--">－</text>
						 </view>
				</header> 
       <nav class="nav">
           <ul class="flex">
               <li v-for="item of Lists" :key="item" class="iconLi" @tap="changestatus(item)">
								 <text :class="item.icon" class="iconfont circle icon" :style="{color:item.isclick?blue:gray,borderColor:item.isclick?blue:gray}"></text>
								 <text :style="{color:item.isclick?blue:gray}">{{item.Name}}</text>
								</li>
           </ul>
       </nav>
    </view>
</template>

<script>
import mSwitch from "../../component/m-switch"
export default {
		components:{
			mSwitch
		},
    data(){
      return{
				switchVal:false,
				blue:'#00A3F8',
				gray:"gray",
				temperature:17,
        Lists:[
					{Name:"模式",icon:"icon-moshiqiehuan",isclick:0},
					{Name:"上下风",icon:"icon-feng",isclick:0},
					{Name:"风速",icon:"icon-wind-speed-high",isclick:0},
					{Name:"左右风",icon:"icon-air-movement",isclick:0},
					{Name:"净化",icon:"icon-jinghua",isclick:0},
					{Name:"定时",icon:"icon-timer",isclick:0},
					{Name:"电辅热",icon:"icon-re",isclick:0},
					{Name:"干燥",icon:"icon-ganzao",isclick:0},
				]  
      }
		},
		methods:{
			changestatus(item){
				item.isclick = !item.isclick;
			},
			changeSwitch(e){
				this.switchVal = e
			}
		}
}
</script>

<style>
    .header{
        height: 65vh;
        background-color:#00A3F8;  
				color:white;
				font-size: 14px;   
				position: relative;  
				text-align: center;
    }
    .nav{
        height: 35vh;
        background-color:white;
    }
		.flex{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center
		}
		.icon{
			font-size: 30px;
			padding:5px;
			margin:5px 15px;
		}
		.iconLi{
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin:12px 0px;
		}
		.colorChange-enter-active,.colorChange-leave-active{
		  background-color: #00A3F8;
		}
		.colorChange-enter,.colorChange-leave-to{
		  background-color: gray;
		}
</style>