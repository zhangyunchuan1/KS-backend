<template>
    <div class="market">
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: "Market",
    mounted(){
            console.log('fgkfmg  ')
        }
  }
</script>

<style lang="less">
  .market{
    background: #F4F4F4;
    width: 100%;
    display: -webkit-box;
  }
</style>
