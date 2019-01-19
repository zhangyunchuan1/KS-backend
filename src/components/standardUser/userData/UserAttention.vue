<template>
  <div class="userAttention">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userAttention_main">
      <!--标题-->
      <div class="title">
        <p>用户关注</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="用户ID"
              align="center"
              width="100"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="220"
              show-overflow-tooltip
              prop="nickname">
            </el-table-column>

            <el-table-column
              label="学徒人数"
              align="center"
              show-overflow-tooltip
              width="140"
              prop="focus"
              sortable>
            </el-table-column>

            <el-table-column
              label="师傅数量"
              align="center"
              show-overflow-tooltip
              width="140"
              prop="follow"
              sortable>
            </el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              width="140"
              prop="status"
              show-overflow-tooltip
              sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">正常</span>
                <span v-if="scope.row.status === 3">禁用</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="280"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="handleSeeApprentice(scope.row)">查看学徒</el-button>
                  <el-button size="medium" type="text" @click="handleSeeMaster(scope.row)">查看师傅</el-button>
                  <el-button size="medium" type="text">用户页面</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="25"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--查看徒弟弹窗-->
    <el-dialog
      width="550px"
      custom-class="viewDialog"
      :visible.sync="viewFansDialog">
      <span slot="title" class="viewDialog_title"><i class="iconfont icon-team"></i>查看徒弟 - {{titleName}}</span>
      <div class="view_dialog_box">
        <el-button v-for="(item,index) in fansLsit" :key="index">{{item.nickname}}</el-button>
      </div>
      <div class="fenye">
        <el-pagination
            v-if="fansTotal"
            layout="prev, pager, next"
            :total="fansTotal"
            :page-size="25"
            @current-change="fansCurrentChange">
      </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewFansDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--查看师傅弹窗-->
    <el-dialog
      width="550px"
      custom-class="viewDialog"
      :visible.sync="viewMasterDialog">
      <span slot="title" class="viewDialog_title"><i class="iconfont icon-team"></i>查看师傅 - {{titleName}}</span>
      <div class="view_dialog_box">
        <div v-for="(item,index) in masterList" :key="index">
            <!--商家-->
            <el-button v-if="item.type === 1" type="primary" class="merchant">{{item.nickname}}</el-button>
            <!--用户-->
            <el-button v-if="item.type === 2" class="user">{{item.nickname}}</el-button>
        </div>
      </div>
      <div class="fenye">
        <el-pagination
            v-if="masterTotal"
            layout="prev, pager, next"
            :total="masterTotal"
            :page-size="25"
            @current-change="masterCurrentChange">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewMasterDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserAttention",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "用户管理",
            urls: "/index/standardUser/StandardUser",
            icon: "icon-home"
          }, {
            id: 2,
            name: "用户数据",
            urls: "/index/standardUser/userData/UserData",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户关注",
            urls: "/index/standardUser/userData/UserAttention",
            icon: "icon-home"
          }
        ],

        nickNameSearch: '',  // 昵称搜索

        tableData: [],

        titleName:'',  //弹窗头部名字

        viewFansDialog: false,  // 查看学徒弹窗
        fansLsit:[],  //学徒

        viewMasterDialog: false,  // 查看师傅弹窗
        masterList:[],  //师傅

        //tab分页
        total:null,
        currentPage:1,  
        //徒弟弹窗分页
        fansTotal:null,
        fansCurrentPage:1,  
        //师傅弹窗分页
        masterTotal:null,
        masterCurrentPage:1,  

      }
    },
    mounted(){
      this.getUserFollowList();
    },
    methods:{
      //打开查看师傅弹窗
      handleSeeMaster(i){
        this.titleName = i.nickname;
        this.getMasterList(i.uid);
        this.viewMasterDialog = true;
      },
      //获取师傅列表
      getMasterList(uid){
        this.HttpClient.post('/admin/follow/lists',{
            page:this.masterCurrentPage,
            size:25,
            uid:uid,
            type:false
        })
        .then(res=>{
            console.log(res);
            this.masterList = res.data.data.data;
            this.masterTotal = res.data.data.total;
        })
      },
      //打开查看徒弟弹框
      handleSeeApprentice(i){
        this.titleName = i.nickname;
        this.getApprenticeList(i.uid);
        this.viewFansDialog = true;
      },
      //获取徒弟列表
      getApprenticeList(uid){
        this.HttpClient.post('/admin/follow/lists',{
            page:this.fansCurrentPage,
            size:25,
            uid:uid,
            type:true
        })
        .then(res=>{
            console.log(res);
            this.fansLsit = res.data.data.data;
            this.fansTotal = res.data.data.total;
        })
      },
      //昵称搜索
      handleNickNameSearch(){
        this.getUserFollowList();
      },
      //获取用户关注列表
      getUserFollowList(){
        this.HttpClient.post('/admin/follow/userLists',{
            size:25,
            page:this.currentPage,
            nickname:this.nickNameSearch
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.tableData = res.data.data.data;
                this.total = res.data.data.total;
                this.nickNameSearch = '';
            }
        })
      },
      //TAB分页
      currentChange(p){
          this.currentPage = p;
          this.getUserFollowList();
      },
      //徒弟弹窗分页
      fansCurrentChange(p){
          this.fansCurrentPage = p;
          this.getApprenticeList();
      },
      //师傅弹窗分页
      masterCurrentChange(p){
          this.masterCurrentPage = p;
          this.getMasterList();
      },
    },
  }
</script>

<style lang="less">
  .userAttention {
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userAttention_main::-webkit-scrollbar {
      display: none;
    }
    .userAttention_main {
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
        .content_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .content_header_search {
            display: flex;
            align-items: center;
            .input-with-select {
              margin-right: 20px;
            }
          }
        }

        /*表格*/
        .content_table {
          margin-top: 30px;
          box-sizing: border-box;
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before{
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .table_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .scope_btm {
                display: flex;
                align-items: center;
                justify-content: space-around;
                .el-button{
                  border: none;
                  background: transparent;
                }
              }
            }
          }

          .el-pagination{
            text-align: center;
            margin-top: 20px;
          }
        }

      }
    }

    /*查看弹窗*/
    .viewDialog{

      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 0;
        .fenye{
          text-align:center;
        }
      }
      .viewDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .view_dialog_box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-height: 300px;
        overflow: auto;
        .el-button{
          margin: 5px;
        }
      }
    }

  }
</style>
