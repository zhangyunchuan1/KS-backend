<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
        reload:this.reload
    }
  },
  data(){
    return {
        isRouterAlive:true
    }
  },
  methods:{
    reload(){
        this.isRouterAlive=false;
        this.$nextTick(()=>{
            this.isRouterAlive=true;
            console.log('页面刷新了');
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
  /*弹出框基础样式*/
  .el-dialog__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-dialog{
    margin: 0 !important;
  }
</style>
