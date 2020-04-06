<template>
  <div class="hello">
    <div class="prop">
      <div style="border:1px #3DB6A4 solid;padding:5px" align="left" @click="isshow=!isshow">
        <span>{{placeholder}}</span>
        <div align="right" class="arrow" :class="[isshow?arrow1:arrow2]"></div>
      </div>
      <transition name="show">
        <ul class="selected" v-if="isshow">
          <li v-for="item in List" :key="item.id" @click="selected(item)">{{item.value}}</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selected',
  props: {
    msg: String,
    List:{
        type:Array,
        default:[]
    },
     placeholder:{
        type:Array,
        default:"请选择"
    },
  },
  data(){
    return{
      isshow:false,
      arrow1:'arrow1',
      arrow2:'arrow2',
    }
  },
  methods:{
    selected(e){
      this.placeholder = e.value
      this.isshow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
    position: absolute;
}
.prop{
  width: 40vw;
  position: relative;
}
.selected{
  z-index: 9999999;
  background: white;
  border: 1px #E6E6E6 solid;
  position: relative;
  margin: 0;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(133, 87, 87, 0.12);
  height:100px;
  overflow-y: scroll;
}
.selected::-webkit-scrollbar{
  /* background: black; */
  /* border:1px lightgray solid; */
  width: 5px;
  /* border-radius: 20px; */
}
.selected::-webkit-scrollbar-track {
   visibility: hidden;
  }
.selected::-webkit-scrollbar-thumb {
    background: #3DB6A4;
    border-radius:20px
  }
  .arrow{
    border-bottom: 1px gray solid;
    border-left: 1px gray solid;
    width: 8px;
    height: 8px;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
  }
.selected li{
  cursor: pointer;
  padding: 5px 0;
}
.arrow1{
  transform: rotate(135deg);
}
.arrow2{
   transform: rotate(-45deg);
}
.show-enter-active,.show-leave-active{
  transition: all .5s ease;
}
.show-enter,.show-leave-to{
  transform: translateY(10px);
  opacity: 0;
}
</style>
