<template>
  <div class="businessCentre">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="businessCentre_main">
      <!--标题-->
      <div class="title">
        <p>商家页面提示</p>
      </div>
      <div class="content">
        <div class="plate_select">
          <p>板块选择</p>
          <el-radio-group v-model="plateRadio" @change="handleChangePlate">
            <el-radio border v-for="(item,index) in tipsPlateList" :label="index" :key="index" @change="handleSelect(item)">{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="buyerEquity_box">
          <p>商家页面提示：</p>
          <el-input
            type="textarea"
            :rows="7"
            :readonly="readonly"
            :autosize="{ minRows: 5}"
            placeholder="输入页面提示"
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
    name: "BusinessCentre",
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
            name: "商家页面提示",
            urls: "/index/page/businessCentre/BusinessCentre",
            icon: "icon-home"
          }
        ],

        plateRadio:0,

        readonly: true,  // 输入框是否可修改
        modify: true,  // 修改/保存按钮
        textareaModify: false,  // 输入框默认选中
        textarea: '',

        cancel: false,  // 取消按钮
        tipsPlateList:[],  
       
        currentObj: {},  //修改提示对象
      }
    },
    mounted(){
      this.getTipsPlateList();
    },
    methods:{
      //选择板块
      handleSelect(i){
        this.textarea = i.content;
        this.currentObj = i;
      },
      //切换板块
      handleChangePlate(){
        console.log(this.plateRadio); 
      },
      //获取商家提示板块
      getTipsPlateList(){
        this.HttpClient.post('/admin/tips/getlists',{
          type:'business_center'
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.tipsPlateList = res.data.data;
                this.textarea = this.tipsPlateList[this.plateRadio].content;
                this.currentObj = this.tipsPlateList[this.plateRadio];
            }
        })
      },
      //修改保存
      modifyBtm(){
          if(this.readonly === true){
            this.readonly = false;
            this.modify = false;
            this.cancel = true;
            this.$refs.modifyInput.focus();
          } else {
            this.HttpClient.post('/admin/tips/edit',{
              id:this.currentObj.id,
              type:'business_center',
              name:this.currentObj.name,
              content:this.textarea,
            })
            .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  this.$message.success(res.data.msg);
                  setTimeout(() => {
                      this.getTipsPlateList();
                  }, 500);
                  this.readonly = true;
                  this.modify = true;
                  this.cancel = false;
              }
            })
            
          }
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
  .businessCentre{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .businessCentre_main::-webkit-scrollbar {
      display: none;
    }
    .businessCentre_main {
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
            width: 400px;
          }
        }
        .buyerEquity_btm{
          display: flex;
          justify-content: flex-end;
          width: 400px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
