<template>
  <div class="mia-scroll" id="mia-scroll">
    <div class="mia-scroll-box"  ref="miaScroll" id="test">
      <slot></slot>
    </div>
    <div class="mia-scroll-bar-box" v-if="rate<1">
      <div class="mia-scroll-bar"
        :style="{height:thumbH,top:thumbTop}"
        @mousedown="onmousedown"
        @mouseup="onmouseup"
      ></div>
    </div>
  </div>
</template>
 
<script>
export default {
  data (){
    return {
      boxToTop:'',
      thumb:0,
      maxToTop:'',
      moveTop:null,
      top:0,
      rate:1,
      drag:false,
      up:'',
      down:''
    };
  },
  computed:{
    thumbH(){
      return this.thumb + "px";
    },
    thumbTop(){
      return this.top + "px";
    },
     
  },
  methods:{
    //初始化滚动条高度
    init(){
      var me = this;
      var miaScroll=me.$refs.miaScroll;
      var h_before=miaScroll.clientHeight;//框高度
      var h_after=miaScroll.scrollHeight;//实际内容高度
      var rate= h_before/h_after;
      var thumb=rate<1 ? rate*h_before : 0;
      if(rate<1){
        var thumb=rate*h_before;
        var maxToTop=me.$refs.miaScroll.clientHeight-thumb;
        me.$refs.miaScroll.addEventListener("scroll",me.onscroll);
        window.addEventListener("mouseup",me.onmouseup);
        window.addEventListener("mousemove",me.onmousemove);
      }else{
        var thumb=0;
      }
      me.rate=rate;
      me.thumb=thumb;
      me.maxToTop=maxToTop;
      // console.log(11,miaScroll.clientHeight,miaScroll.scrollHeight);
    },
    //页面滚动
    onscroll(){
      this.top = this.$refs.miaScroll.scrollTop * this.rate; //计算滚动条所在的高度
    },
    //
    onmousedown(){
      this.drag=true;
      this.moveTop = null;
    },
    onmouseup(){
      this.drag=false;
    },
    onmousemove(e){
      if(this.drag){
 
        if(this.moveTop !== null){
            var speed = e.clientY - this.boxToTop -  this.moveTop;
            var top = this.top + speed;
            this.scrollThumb(top);
        }
        this.moveTop = e.clientY-this.boxToTop;
      }
      e.preventDefault();
    },
    scrollThumb(top){
      console.log('top:',top,'maxToTop:',this.maxToTop);
      if(top<0){
        top=0;
      }else if(top>this.maxToTop){
        top=this.maxToTop;
      }
      this.top=top;
      this.$refs.miaScroll.scrollTop=top/this.rate;
    },
  },
  mounted(){
    // me.$refs.vueScroll.addEventListener("scroll",me.onscroll.bind(me));
    this.boxToTop=document.getElementById("mia-scroll").offsetTop;
    this.init();
  },
}
 
</script>
<style lang='less' scoped>
.mia-scroll{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .mia-scroll-box{
    width: calc(100% + 20px);
    height: 90%;
    overflow: auto;
  }
  .mia-scroll-bar-box{
    position: absolute;
    right:0;
    top:0;
    width: 5px;
    height: 100%;
    background: #dfecf7;
    .mia-scroll-bar{
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        border-radius: 10px;
        background: #8ec9f7;
        &:hover{
            background: #5ab2f9;
        }
        &:active{
            background: #259af7;
        }
    }
  }
}
</style>