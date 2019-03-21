<template>
  <!--未登陆回复模态框-->
  <div class="modalBox" v-if="modelDelet">
    <div class="modalBox_title">
      <p><img src="/static/img/logo/logo_block.png" alt=""></p>
      <div class="modelDelet" @click="deleteClick">
        <p></p>
        <p></p>
      </div>
    </div>


    <div class="modalBox_box">
      <span><img src="/static/img/caveat.png" alt=""></span>
      <p>没有登录不能进行回复的!</p>
      <div class="modalBox_box_btm">
        <p @click="deleteClick">取消</p>
        <p @click="RouterLogin">
          马上登录
        </p>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "modalBox",
    props:['status'],
    data(){
      return{
        modelDelet:false
      }
    },
    methods: {
      deleteClick(){
        console.log("21")
        this.modelDelet = false
      },
      RouterLogin(){
        this.$router.push({
          path:'/login'
        })
      }
    },
    watch:{
      status:function(){
        console.log("22")
        this.modelDelet = this.status
      }
    }
  }
</script>

<style src="@/assets/css/modalBox.css"></style>
