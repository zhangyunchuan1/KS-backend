<template>
  <div class="coolCircle">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "CoolCircle"
  }
</script>

<style scoped>
  .coolCircle{
    background: #F4F4F4;
    width: 100%;
    display: -webkit-box;
  }
</style>
