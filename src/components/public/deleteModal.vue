<template>
<!--
  <div class="modalBox" v-if="modelDelete">
    <div class="modalBox_title">
      <p><img src="/static/img/logo/logo_block.png" alt=""></p>
      <div class="modelDelete" @click="cancelClick">
        <p></p>
        <p></p>
      </div>
    </div>
    <div class="modalBox_box">
      <span><img src="/static/img/caveat.png" alt=""></span>
      <p>确定要删除吗？</p>
      <div class="modalBox_box_btm">
        <p @click="cancelClick">取消</p>
        <p @click="deleteClick">确定</p>
      </div>
    </div>
    
  </div>
-->
  <el-dialog
    align="center"
    custom-class="modelDelete"
    :show-close=false
    :visible.sync="modelDelete">
    <span slot="title" class="title">
      <img class="logo" src="/static/img/logo/gradient_logo.png" alt="">
      <span @click="cancelClick" class="clone_btm"></span>
    </span>
    <div class="modelDelete_box">
      <div class="icon"><img src="/static/img/icon/waning.png" alt=""></div>
      <div class="message">确定要删除吗？</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="deleteClick">确 定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
  export default {
    name: "modalBox",
    data(){
      return{
        isSingle: true,//是否单个删除
        modelDelete: false//是否显示
      }
    },
    methods: {
      cancelClick(){
        // console.log(11111)
        this.modelDelete=false
      },
      deleteClick(){
          this.$emit('confirm',this.isSingle);
        this.modelDelete=false
      }
    },
  }
</script>

<style lang="less">
  .el-dialog__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modelDelete{
    width:480px;
    height:300px;
    background:rgba(255,255,255,1);
    border-radius: unset;
    margin-top: 0 !important;
    .title{
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
        width: 48px;
      }
      .clone_btm{
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: url("/static/img/icon/login_clone.png");
        background-size: contain;
        &:hover{
          background: url("/static/img/icon/login_clone_hover.png");
          background-size: contain;
        }
      }
    }

    .el-dialog__body{
      padding: 10px 20px 20px;
    }
    .modelDelete_box{
      .icon{
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }
      .message{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#323333;
      }
    }
    .el-dialog__footer{
      text-align: center;
      .el-button{
        width:100px;
        height:32px;
        border-radius: unset;
        font-size: 14px;
        padding: 0;
      }
      .el-button--default{
        border:1px solid rgba(225,227,230,1);
        color: #969899;
        &:hover{
          background:linear-gradient(90deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
          color: #fff;
          border-color: #fff;
        }
      }
      .el-button--primary{
        background:linear-gradient(90deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
        color: #fff;
        border: none;
        &:hover{
          background:linear-gradient(90deg,#018f99 0%,#0e5e99 100%);
        }
      }
    }
  }
</style>
