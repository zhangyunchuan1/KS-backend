<template>
  <div class="UserAuditManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="UserAuditManagement_main">
      <!--标题-->
      <div class="title">
        <p>后台客服屏蔽</p>
      </div>
      <div class="content">

        <div class="content_add">
          <el-input placeholder="输入新的类别" v-model="addnameValue"></el-input>
          <div class="disableDays">
            <el-input placeholder="禁用天数" type="number" min="0" v-model="disableDays"></el-input>
          </div>
          <el-button type="primary" @click="addNameFn">添加</el-button>
        </div>
        <div class="content_box">
          <div class="box_list" v-for="(item,index) in listData" :key="index">
            <el-input placeholder="修改类别" :readonly="readonly" v-model="item.name" v-if="valindex !== index"></el-input>
            <el-input placeholder="修改类别" v-model="item.name" autofocus v-else></el-input>
            <div class="disableDays" v-if="valindex !== index">
              <el-input
                placeholder="禁用天数"
                :readonly="readonly"
                v-model="item.limit_day"
                type="number"
                min="0"
              ></el-input>
            </div>
            <div class="disableDays" v-else>
              <el-input
                placeholder="禁用天数"
                v-model="item.limit_day"
                autofocus
                type="number"
                min="0"
              ></el-input>
            </div>
            <el-button type="danger" @click="deletenameFn(item)">删除</el-button>
            <el-button type="primary" v-if="valindex !== index" @click="modifyBtm(index)">修改</el-button>
            <el-button type="success" v-else @click="saveNameFn(item)">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "UserAuditManagement",
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
        },
        {
          id: 2,
          name: "页面管理",
          urls: "/index/page/pageManagement/PageManagement",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "审核失败类别管理",
          urls: "/index/page/pageManagement/auditManagement/AuditManagement",
          icon: "icon-home"
        },
        {
          id: 4,
          name: "用户审核管理",
          urls:
            "/index/page/pageManagement/auditManagement/UserAuditManagement",
          icon: "icon-home"
        }
      ],
      valindex: null,
      modify: true,
      readonly: true,
      addnameValue: "", //添加的新类别
      disableDays:null,//禁用天数
      listData: [] //列表数据
    };
  },
  mounted() {
    this.getlistdata();
  },
  methods: {
    getlistdata() {
      let params = {
        type: "users"
      };
      this.HttpClient.post("/admin/webReview/getList", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.listData = res.data.data;
        }
      });
    },
    // 修改
    modifyBtm(index) {
      this.valindex = index;
    },
    // 保存
    saveNameFn(item) {
      console.log(item);
      let params = {
        id: item.id,
        name: item.name,
        limit_day:item.limit_day,
        type: "users"
      };
      this.HttpClient.post("/admin/webReview/edit", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.valindex = null;
          setTimeout(() => {
            this.getlistdata();
          }, 500);
        }
      });
    },
    // 添加
    addNameFn() {
      console.log(this.addnameValue);
      let params = {
        name: this.addnameValue,
        limit_day:this.disableDays,
        type: "users"
      };
      this.HttpClient.post("/admin/webReview/create", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.addnameValue = "";
          this.disableDays = null
          setTimeout(() => {
            this.getlistdata();
          }, 500);
        }
      });
    },
    // 删除
    deletenameFn(item) {
      let params = {
        id: item.id
      };
      this.HttpClient.post("/admin/webReview/destroy", params).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getlistdata();
          }, 500);
        }
      });
    }
  }
};
</script>



<style lang="less">
  .UserAuditManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .UserAuditManagement_main::-webkit-scrollbar {
      display: none;
    }
    .UserAuditManagement_main {
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
        .content_add{
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          .disableDays{
            width: 80px;
            .el-input{
              .el-input__inner{
                padding: 0 10px;
                border-radius: unset;
                border-left: none;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
            }
          }
          .el-input{
            width: unset;
            .el-input__inner{
              border-top-right-radius: unset;
              border-bottom-right-radius: unset;
            }
          }
          .el-button{
            border-top-left-radius: unset;
            border-bottom-left-radius: unset;
          }
        }

        .content_box{
          display: flex;
          flex-wrap: wrap;
          .box_list{
            display: flex;
            align-items: center;
            margin: 0 20px 20px 0;
            .disableDays{
              width: 80px;
              .el-input{
                .el-input__inner{
                  padding: 0 10px;
                  border-radius: unset;
                  border-left: none;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                }
              }
            }
            .el-input{
              width: unset;
              .el-input__inner{
                border-top-right-radius: unset;
                border-bottom-right-radius: unset;
              }
            }
            .el-button{
              border-radius: unset;
              margin: 0;
              padding: 12px;
            }
            .el-button:last-child{
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
        }
      }
    }
  }


</style>
