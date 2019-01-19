<template>
  <div class="messageBox">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "MessageBox"
    }
</script>

<style scoped>
  .messageBox{
    background: #F4F4F4;
    width: 100%;
    display: -webkit-box;
  }
</style>
