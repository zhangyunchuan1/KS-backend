<template>
  <div class="cashWithdrawalRecord">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="cashWithdrawalRecord_main">
      <!--标题-->
      <div class="title">
        <p>用户提现记录</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              @change="changeTimedata"
              v-model="searchTime"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" @keyup.13.native="getlistData()" clearable @clear="getlistData()">
                <el-button slot="append" icon="el-icon-search" @click="getlistData()"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="ID"
              align="center"
              width="90"
              prop="id"
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
              label="提现金额"
              align="center"
              width="140"
              show-overflow-tooltip
              prop="amount"
              sortable>
            </el-table-column>

            <el-table-column
              label="提现方式"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="type">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">微信</span>
                <span v-if="scope.row.type == 2">支付宝</span>
                <span v-if="scope.row.type == 3">银行卡</span>
              </template>
            </el-table-column>

            <el-table-column
              label="第三方ID"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="payee_account">
              <template slot-scope='scope'>
                <span v-if="scope.row.payee_account">{{scope.row.payee_account}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="姓名"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="name">
              <template slot-scope='scope'>
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="提现时间"
              align="center"
              show-overflow-tooltip
              width="180"
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
                  <el-button size="medium" type="text" @click="cashWithdrawalWrite(scope.row)">提现记录</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--提现记录弹窗-->
    <el-dialog
      width="500px"
      custom-class="withdrawalsRecordDialog"
      :visible.sync="withdrawalsRecordDialog">
      <span slot="title" class="withdrawalsRecordDialog_title"><i class="iconfont icon-tixian"></i>提现记录</span>
      <div class="withdrawalsRecord_dialog_box">
        <div class="box_list" v-for="(item,index) in inforData" :key="index">
          <span class="time">{{item.created_at}}</span>
          <p class="list_main">
            <span>{{item.type == 1?'微信':item.type == 2?'支付宝':item.type == 3?'银行卡':'暂无'}}</span>  
            <span>{{item.name || '暂无'}}</span>
            <span>{{item.payee_account || '暂无'}}</span>
            <span>{{item.amount || '暂无'}}</span>
          </p>

        </div>
      </div>
      <el-pagination
            v-if="infortotal"
            layout="prev, pager, next"
            :total="infortotal"
            :page-size="pageinforSize"
            @current-change="currentinforChange">
          </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withdrawalsRecordDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "CashWithdrawalRecord",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "现金管理",
            urls: "/index/cashManagement/CashManagement",
            icon: "icon-home"
          }, {
            id: 2,
            name: "用户管理",
            urls: "/index/cashManagement/userManagement/UserManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户提现记录",
            urls: "/index/cashManagement/userManagement/UserIncome",
            icon: "icon-home"
          }
        ],

        searchTime: '',  // 选择时间
        nickNameSearch: '',  // 昵称搜索

        inforData:[],
        tableData:[],
        userID:"",

        withdrawalsRecordDialog: false,  // 提现记录

      // 分页
      currentinforPage: 1, // 当前页
      pageinforSize: 10, // 每页显示数量
      infortotal: 0, // 数据总条数

        // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
      }
    },
    mounted(){
      this.getlistData()
    },
    methods:{
      // 时间变化
      changeTimedata(){
        console.log(this.searchTime)
        this.getlistData();
      },
      getlistData(){
        let params = {
          type:1,
          size:this.pageSize,
          page:this.currentPage,
          nickname:this.nickNameSearch,
          // bank_type:'',
          start_time:this.searchTime?this.searchTime[0]:'',
          end_time:this.searchTime?this.searchTime[1]:'',
        }
        this.HttpClient.get('/admin/withdraw/list',params).then(res => {
          console.log(res.data)
          if(res.data.code == 200){
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }else{
            this.tableData = [];
            this.$message.success(res.data.msg)
          }
        })
      },
      // 点击提现记录
      cashWithdrawalWrite(row){
        // console.log(row)
        this.userID = row.uid;
        this.withdrawalsRecordDialog = true;
        this.getinforData();
      },
      getinforData(){
        let params = {
          uid:this.userID,
          size:this.pageinforSize,
          page:this.currentinforPage,
        }
        this.HttpClient.get('/admin/withdraw/list',params).then(res =>{
          // console.log(res.data)
          if(res.data.code === 200){
            this.inforData = res.data.data.data;
            this.infortotal = res.data.data.total;
            console.log(this.inforData)
          }
        })
      },
      // 分页
      currentChange(p) {
        this.currentPage = p;
        this.getlistData();
      },
      // 分页
      currentinforChange(p) {
        this.currentinforPage = p;
        this.getinforData();
      },
    }
  }
</script>

<style lang="less">
  .cashWithdrawalRecord{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .cashWithdrawalRecord_main::-webkit-scrollbar {
      display: none;
    }
    .cashWithdrawalRecord_main {
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
          .content_header_search {
            display: flex;
            align-items: center;
            margin-left: 15px;
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

    /*提现记录弹窗*/
    .withdrawalsRecordDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
        padding-right: 0;
      }
      .withdrawalsRecordDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .withdrawalsRecord_dialog_box{
        max-height: 400px;
        overflow: auto;
        padding-right: 20px;
        .box_list:not(:last-child){
          margin-bottom: 20px;
        }
        .box_list{
          .time{
            display: inline-block;
            text-align: center;
            margin-bottom: 5px;
            width: 100%;
            font-size: 12px;
            color: #999;
          }
          .list_main{
            display: flex;
            align-items: center;
            justify-content: space-around;
            box-sizing: border-box;
            padding: 3px 10px;
            border: 1px solid #dedede;
            span{
              display: flex;
              justify-content: center;
              align-content: center;
              flex: 1;
              padding: 0 10px;
              border-right: 1px solid #dedede;
            }
            span:last-child{
              border-right: none;
            }
          }
        }
      }
    }

  }
</style>
