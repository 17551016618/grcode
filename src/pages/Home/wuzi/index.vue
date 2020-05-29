<template>
  <div>
    <h1>单选按钮测试</h1>
    <input type="radio" :checked="picked"  @click="change"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      picked: false
    };
  },
  methods: {
    change() {
      this.picked = !this.picked;
      console.log(this.picked);
      
    }
  }
};
</script>