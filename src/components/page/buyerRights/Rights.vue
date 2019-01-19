<template>
  <div class="rights">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="rights_main">
      <!--标题-->
      <div class="title">
        <p>权益</p>
      </div>

      <div class="content">
        <div class="plate_select">
          <p>板块选择</p>
          <el-radio-group v-model="plateRadio" @change="changePlate">
            <el-radio border :label="item.tid" v-for="(item,index) in typeData" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="buyerEquity_box">
          <p>买家权益：</p>
          <el-input
            type="textarea"
            :rows="7"
            :readonly="readonly"
            :autosize="{ minRows: 5}"
            placeholder="输入买家权益"
            ref="modifyInput"
            v-model="textarea">
          </el-input>
        </div>

        <div class="buyerEquity_btm">
          <el-button @click="cancelBtm" v-if="cancel">取 消</el-button>
          <el-button type="primary" @click="modifyBtm" v-if="modify">修 改</el-button>
          <el-button type="success" @click="modifyBtm" v-else>保 存</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "Rights",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "页面",
            urls: "/index/page/Page",
            icon: "icon-home"
          }, {
            id: 2,
            name: "售后权益",
            urls: "/index/page/buyerRights/BuyerRights",
            icon: "icon-home"
          }, {
            id: 3,
            name: "权益",
            urls: "/index/page/buyerRights/Rights",
            icon: "icon-home"
          }
        ],

        plateRadio: 0,//选择的板块tid
        typeData:[{name:'商城',tid:0},{name:'淘货',tid:1},{name:'服务',tid:2},{name:'活动',tid:3}],//售后权益板块选择列表

        readonly: true,  // input框是否可修改
        modify: true,  // 修改/保存按钮
        textareaModify: false,  // 输入框默认选中
        textarea: '',
        textData:{},
        

        cancel: false,  // 取消按钮

      }
    },
    mounted(){
      this.getcontent()
    },
    methods:{
      getcontent(){
        this.HttpClient.post('/admin/saleRights/getList',{type:this.plateRadio}).then(res => {
          if(res.data.code == 200){
          console.log(res.data.data)
          this.textData = res.data.data[0]
            this.textarea = res.data.data[0].content
          }
        })
      },
      // 修改
      modifyBtm(){
        if(this.readonly === true){
          this.readonly = false;
          this.modify = false;
          this.cancel = true;
          this.$refs.modifyInput.focus();          
        } else {
          this.readonly = true;
          this.modify = true;
          this.cancel = false;
          let params = {
            id:this.textData.id,
            name:this.textData.name,
            content:this.textarea,
            type:this.plateRadio
          }
          this.HttpClient.post('/admin/saleRights/edit',params).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.msg)
            }
          })
        }
      },
      // 板块选择
      changePlate(){
        this.getcontent()
      },

      cancelBtm(){
        this.readonly = true;
        this.modify = true;
        this.cancel = false;
      },
    }

  }
</script>

<style lang="less">
  .rights{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .rights_main::-webkit-scrollbar {
      display: none;
    }
    .rights_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        font-size: 20px;
        color: #222;
      }

      .content {
        box-sizing: border-box;
        padding: 30px 40px;

        .plate_select{
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          p{
            margin-right: 20px;
          }
          .el-radio-group{
            display: flex;
            align-items: center;
            .el-radio{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 40px;
              padding: 0 20px;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
            .el-radio.is-checked{
              background: #15bafe;
              border-color: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
          }

        }

        .buyerEquity_box{
          p{
            margin-bottom: 10px;
          }
          .el-textarea{
            width: 600px;
          }
        }

        .buyerEquity_btm{
          display: flex;
          justify-content: flex-end;
          width: 600px;
          margin-top: 10px;
        }

      }
    }
  }
</style>
