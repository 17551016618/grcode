<template>
  <div id="app">
    <VueDragResize :w="500" :h="200" v-on:resizing="resize" v-on:dragging="resize" v-if="chuxian">
      <div class="box" :style="{width: + vw+ 'px',height:+vh+'px'}">
        <img src="../../../assets/img/pic.png" />
      </div>
      <button @click="notshow">anniu</button>
    </VueDragResize>
    <button @click="show">anniu</button>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  components: {
    VueDragResize
  },
  methods:{
      show(){
        this.chuxian=true
      },
      notshow(){
        this.chuxian=false
      }
  },
  data() {
    return {
      vw: 0,
      vh: 0,
      top: 0,
      left: 0,
      chuxian:false
    };
  },
  created() {
    this.vw = 200 + "px";
    this.vh = 200 + "px";
  },

  //缩小
  resize(newRect) {
    this.vw = newRect.width;
    this.vh = newRect.height;
    this.top = newRect.top;
    this.left = newRect.left;
  }
};
</script>
<style lang="less" scoped>
.box{
  background-color: red;
  height: 100%;
}
</style>
 