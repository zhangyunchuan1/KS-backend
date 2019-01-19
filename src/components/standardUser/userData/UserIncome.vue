<template>
  <div class="userIncome">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userIncome_main">
      <!--标题-->
      <div class="title">
        <p>用户收支流水</p>
      </div>

      <div class="content">

        <div class="content_message">
          <p>用户余额统计</p>
          <span>{{totalBalance}}</span>
        </div>

        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              v-model="searchTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleChangeTime">
            </el-date-picker>
          </div>

          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch"></el-button>
            </el-input>
            <el-input placeholder="ID搜索" v-model="IDSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleIDSearch"></el-button>
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
              width="90"
              prop="user_id"
              sortable>
            </el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="nickname">
            </el-table-column>

            <el-table-column
              label="登录状态"
              align="center"
              width="100"
              prop="user_status">
              <template slot-scope="scope">
                <span>{{scope.row.user_status == 0?'删除':scope.row.user_status == 1?'正常':scope.row.user_status == 2?'注销':scope.row.user_status == 3?'禁用':scope.row.user_status == 4?'待审核':scope.row.user_status == 5?'驳回':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="当前余额"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="balance"
              sortable>
            </el-table-column>

            <el-table-column
              label="收入支出"
              align="center"
              show-overflow-tooltip
              width="150">
              <template slot-scope="scope">
                <div class="table_income table_spend" v-if="parseFloat(scope.row.amount) < 0">{{scope.row.amount}}</div>
                <div class="table_income" v-if="parseFloat(scope.row.amount) > 0"><span>+</span>{{scope.row.amount}}</div>
              </template>
            </el-table-column>

            <el-table-column
              label="类型"
              align="center"
              width="120"
              prop="type">
              <template slot-scope="scope">
                <span>{{scope.row.user_status == 0?'系统注册':scope.row.user_status == 1?'个人注册':scope.row.user_status == 2?'公司注册':scope.row.user_status == 3?'微信注册':scope.row.user_status == 4?'QQ注册':scope.row.user_status == 5?'微博注册':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="方式"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="pay_type">
            </el-table-column>

            <el-table-column
              label="消息内容"
              align="center"
              min-width="350"
              show-overflow-tooltip
              prop="message">
            </el-table-column>

            <el-table-column
              label="发生时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="created_at"
              sortable>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="140"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="handleSeeDetailed(scope.row)">查看明细</el-button>
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

    <!--查看明细弹窗-->
    <el-dialog
      width="450px"
      custom-class="viewDetailsDialog"
      :visible.sync="viewDetailsDialog">
      <span slot="title" class="viewDetailsDialog_title"><i class="iconfont icon-edit-square"></i>查看明细</span>
      <div class="viewDetails_dialog_box">
        <div class="content">
          <p>用户昵称： {{currentObj.nickname}}</p>
          <p>账户余额： {{currentObj.balance}}</p>
        </div>

        <p>收入明细：</p>
        <div class="content_box">

          
          <div class="content_list" v-for="(item,index) in budgetList" :key="index">
            <span class="content_list_time">{{item.created_at}}</span>
            <!--支出-->
            <div class="main" v-if="parseFloat(item.amount) < 0">
              <p class="income spend">
                <span>支出</span>
                <span>{{item.amount}}</span>
              </p>
              <p class="balance">
                <span>当前余额</span>
                <span>{{item.balance}}</span>
              </p>
            </div>
            <!--收入-->
            <div class="main" v-if="parseFloat(item.amount) > 0">
              <p class="income">
                <span>收入</span>
                <span>{{item.amount}}</span>
              </p>
              <p class="balance">
                <span>当前余额</span>
                <span>{{item.balance}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDetailsDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserIncome",
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
            name: "用户收支流水",
            urls: "/index/standardUser/userData/UserIncome",
            icon: "icon-home"
          }
        ],

        searchTime: ['', ''],  // 选择时间

        nickNameSearch: '',  // 昵称搜索
        IDSearch: '',  // ID搜索

        tableData:[],
        totalBalance:0,  //用户总余额

        viewDetailsDialog: false,   //查看明细
        currentObj:{},  //当前操作对象
        budgetList:[],  //收支明细

        //分页
        total:null,
        currentPage:1,  
      }
    },
    mounted(){
      this.getBudgetList();
    },
    methods:{
      // ID搜索
      handleIDSearch(){
          this.getBudgetList();
      },
      //昵称搜索
      handleNickNameSearch(){
          this.getBudgetList();
      },
      //时间搜索
      handleChangeTime(){
          console.log(this.searchTime);
          this.getBudgetList();
      },
      //打开查看明细弹窗
      handleSeeDetailed(i){
          console.log(i);
          this.currentObj = i;
          this.HttpClient.post('/admin/revenues/revenuesDetail',{
              uid:i.uid
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  this.budgetList = res.data.data;
              }
          })
          this.viewDetailsDialog = true;
      },
      //获取收支流水列表
      getBudgetList(){
          this.HttpClient.post('/admin/revenues/lists',{
              page:this.currentPage,
              size:25,
              is_company:false,
              begin:this.searchTime[0],
              end:this.searchTime[1],
              nickname:this.nickNameSearch,
              user_id:this.IDSearch,
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  this.tableData = res.data.data.data;
                  for(let i in this.tableData){
                      this.totalBalance = this.totalBalance+parseFloat(this.tableData[i].balance);
                  }
              }
          })
      },
      //分页
      currentChange(p){
          this.currentPage = p;
          this.getBudgetList();
      },
    }
  }
</script>

<style lang="less">
  .userIncome{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userIncome_main::-webkit-scrollbar {
      display: none;
    }
    .userIncome_main {
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

        .content_message{
          display: flex;
          align-items: center;
          height: 40px;
          margin-bottom: 30px;
          p{
            height: 100%;
            background: #15bafe;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
          }
          span{
            box-sizing: border-box;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 50px;
            border: 1px solid #dedede;
            margin-left: -1px;
          }
        }

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
          /*收入*/
          .table_income{
            color: #15bafe;
            span{
              margin-right: 2px;
            }
          }
          /*支出*/
          .table_spend{
            color: red;
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
    /*更新联系人弹窗*/
    .viewDetailsDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 0;
      }
      .viewDetailsDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .viewDetails_dialog_box{
        .content{
          display: flex;
          align-items: center;
          p{
            flex: 1;
            display: flex;
            align-items: center;
            height: 30px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #dedede;
          }
        }

        .content_box{
          height: 250px;
          border: 1px solid #dedede;
          margin-top: 5px;
          overflow: auto;
          box-sizing: border-box;
          padding: 5px 15px;

          .content_list:not(:last-child){
            margin-bottom: 10px;
          }
          .content_list{
            .content_list_time{
              display: block;
              text-align: center;
              margin: 3px 0;
            }
            .main{
              display: flex;
              align-items: center;
              justify-content: space-between;

              .income{
                display: flex;
                align-items: center;
                span{
                  margin: 0 5px;
                }
                span:last-child{
                  color: #15bafe;
                }
              }
              .spend{
                span:last-child{
                  color: red;
                }
              }

              .balance{
                span{
                  margin: 0 5px;
                }
              }
            }
          }
        }
      }
    }

  }

</style>
