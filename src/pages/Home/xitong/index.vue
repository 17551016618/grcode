<template>
  <h1 @click="click" @mouseover="move">系统</h1>
</template>
<script>
export default {
  methods:{
    click(){
      console.log(11111);     
    },
    move(){
      console.log(2222);
      
    }
  }
}
</script>