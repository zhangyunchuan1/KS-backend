<template>
    <div class="question">
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Question"
    }
</script>

<style lang="less">
  .question{
    background: #F4F4F4;
    width: 100%;
    display: -webkit-box;
  }
</style>
