<template>
  <div class="businessRecord">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="businessRecord_main">
      <!--标题-->
      <div class="title">
        <p>商家提现记录</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              @change="getlistData"
              v-model="searchTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="content_header_search">
            <el-input placeholder="商家昵称搜索" v-model="nickNameSearch" @keyup.13.native="getlistData()" clearable @clear="getlistData()">
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
              label="商家昵称"
              align="center"
              width="140"
              show-overflow-tooltip
              prop="nickname">
              <template slot-scope="scope">
                <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="商家工商全称"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="company_name">
              <template slot-scope="scope">
                <span v-if="scope.row.company_name">{{scope.row.company_name}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="提现金额"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="amount">
              <template slot-scope="scope">
                <span v-if="scope.row.amount">{{scope.row.amount}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="实际得到金额"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="true_amount">
              <template slot-scope="scope">
                <span v-if="scope.row.true_amount">{{scope.row.true_amount}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="提现佣金"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="commission">
              <template slot-scope="scope">
                <span v-if="scope.row.commission">{{scope.row.commission}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="提现方式"
              align="center"
              width="100"
              show-overflow-tooltip
              prop="type">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">微信</span>
                <span v-if="scope.row.type == 2">支付宝</span>
                <span v-if="scope.row.type == 3">银行卡</span>
              </template>
            </el-table-column>

            <el-table-column
              label="对方ID"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="user_id">
            </el-table-column>

            <el-table-column
              label="渠道"
              align="center"
              width="100"
              show-overflow-tooltip
              prop="channel">
            </el-table-column>

            <el-table-column
              label="银行账号/Openid"
              align="center"
              show-overflow-tooltip
              width="200"
              prop="openid">
              <template slot-scope="scope">
                <span v-if="scope.row.openid">{{scope.row.openid}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="提现时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="created_at">
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="viewBussinessRecord(scope.row)">查看记录</el-button>
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

    <!--查看记录弹窗-->
    <el-dialog
      width="800px"
      custom-class="viewRecordDialog"
      :visible.sync="viewRecordDialog">
      <span slot="title" class="viewRecordDialog_title"><i class="iconfont icon-lishijilu"></i>查看记录</span>
      <div class="viewRecordDialog_box">
        <el-table
          :data="viewRecord"
          max-height="500"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            align="center"
            show-overflow-tooltip
            width="100"
            label="提现方式">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 1">微信</span>
                <span v-if="scope.row.type == 2">支付宝</span>
                <span v-if="scope.row.type == 3">银行卡</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            align="center"
            show-overflow-tooltip
            label="对方昵称">
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            show-overflow-tooltip
            width="100"
            label="提现金额">
          </el-table-column>
          <el-table-column
            prop="openid"
            align="center"
            show-overflow-tooltip
            label="银行账号/Openid">
            <template slot-scope="scope">
              <span v-if="scope.row.openid">{{scope.row.openid}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            align="center"
            show-overflow-tooltip
            label="提现时间">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="infortotal"
          layout="prev, pager, next"
          :total="infortotal"
          :page-size="pageinforSize"
          @current-change="currentinforChange">
        </el-pagination>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "BusinessRecord",
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
            name: "商家管理",
            urls: "/index/cashManagement/businessWithdraw/BusinessWithdraw",
            icon: "icon-home"
          }, {
            id: 3,
            name: "商家提现记录",
            urls: "/index/cashManagement/businessWithdraw/BusinessRecord",
            icon: "icon-home"
          }
        ],
        searchTime: '',  //
        nickNameSearch: '',  // 昵称搜索

        tableData: [],
        userID:'',
        // 分页
        currentPage: 1, // 当前页
        pageSize: 25, // 每页显示数量
        total: 0, // 数据总条数

        viewRecordDialog: false,  // 查看记录弹窗
        viewRecord: [],
        // 分页
        currentinforPage: 1, // 当前页
        pageinforSize: 5, // 每页显示数量
        infortotal: 0, // 数据总条数
      }
    },
    mounted(){
      this.getlistData();
    },
    methods:{
      getlistData(){
        let params = {
          type:2,
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
      // 分页
      currentChange(p) {
        this.currentPage = p;
        this.getlistData();
      },
      viewBussinessRecord(row){
        console.log(row)
        this.userID = row.uid;
        this.viewRecordDialog = true;
        this.getinforData();
      },
      getinforData(){
        let params = {
          uid:this.userID,
          size:this.pageinforSize,
          page:this.currentinforPage,
        }
        this.HttpClient.get('/admin/withdraw/list',params).then(res =>{
          console.log(res.data)
          if(res.data.code === 200){
            this.viewRecord = res.data.data.data;
            this.infortotal = res.data.data.total;
            console.log(this.viewRecord)
          }
        })
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
  .businessRecord{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .businessRecord_main::-webkit-scrollbar {
      display: none;
    }
    .businessRecord_main {
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

    /*查看记录弹窗*/
    .viewRecordDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 20px;
      }
      .viewRecordDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .viewRecordDialog_box{

      }
    }
  }
</style>
