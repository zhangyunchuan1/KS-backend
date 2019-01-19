<template>
  <el-dialog
    width="470px"
    custom-class="deleteDialog"
    :visible.sync="deleteDialog"
    center>
    <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
    <div class="deleteDialog_box">
      <i class="iconfont icon-warning-circle"></i>
      <p>确定删除吗？</p>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteConfirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
    export default {
      name: "modalDelete",
      data(){
        return{
          deleteDialog: false,
        }
      },
      methods:{
        deleteConfirm(){
            this.deleteDialog=false;
            this.$emit('doDelete',true)
        }
      }
    }
</script>

<style lang="less">
  .deleteDialog{
    .deleteDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
</style>
