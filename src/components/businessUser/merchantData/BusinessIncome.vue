<template>
  <div class="businessIncome">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="businessIncome_main">
      <!--标题-->
      <div class="title">
        <p>商家收入流水</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              @change="choseTimeFn"
              v-model="searchTime"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
            <el-input placeholder="商家ID搜索" v-model="merchantIDSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true"
            :default-sort="{prop: 'created_at', order: 'descending'}"
          >
            <el-table-column
              label="商家ID"
              align="center"
              width="90"
              prop="user_id"
              sortable
            ></el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column
              label="登录状态"
              align="center"
              width="100"
              prop="user_status"
              :filters="[{text: '正常', value: 1}, {text: '禁用', value: 3}]"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_status == 1?'正常':scope.row.user_status == 3?'禁用':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="当前余额"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="balance"
            ></el-table-column>

            <el-table-column
              label="收入支出"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="amount"
            ></el-table-column>

            <el-table-column
              label="类型"
              align="center"
              width="120"
              prop="pay_type"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.pay_type === 1">活动</span>
                <span v-if="scope.row.pay_type === 2">商城</span>
                <span v-if="scope.row.pay_type === 3">淘货</span>
                <span v-if="scope.row.pay_type === 4">退款</span>
                <span v-if="scope.row.pay_type === 5">充值</span>
              </template>
            </el-table-column>
            </el-table-column>

            <el-table-column
              label="方式"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="payment"
            >
              <template slot-scope="scope">
                <span>{{scope.row.payment == 1?'微信':scope.row.payment == 2?'支付宝':scope.row.payment == 3?'余额':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="消息内容"
              align="center"
              show-overflow-tooltip
              min-width="350"
              prop="message"
            ></el-table-column>

            <el-table-column
              label="发生时间"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column label="操作" align="center" width="140" class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="viewdialogFn(scope.row)">查看明细</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!--查看明细弹窗-->
    <el-dialog width="450px" custom-class="viewDetailsDialog" :visible.sync="viewDetailsDialog">
      <span slot="title" class="viewDetailsDialog_title">
        <i class="iconfont icon-edit-square"></i>查看明细
      </span>
      <div class="viewDetails_dialog_box">
        <div class="content">
          <p>商家昵称： {{nickname}}</p>
          <p>账户余额： {{count}}</p>
        </div>

        <p>收入明细：</p>
        <div class="content_box">
          <!--支出-->
          <div class="content_list" v-for="(item,index) in viewdialogData" :key="index">
            <span class="content_list_time">{{item.created_at}}</span>
            <div class="main">
              <p class="income spend">
                <span>{{item.message}}</span>
                <span>{{item.amount}}</span>
              </p>
              <p class="balance">
                <span>当前余额</span>
                <span>{{item.balance}}</span>
              </p>
            </div>
          </div>

          <!--收入-->
          <!-- <div class="content_list">
            <span class="content_list_time">2018/12/17 18:13</span>
            <div class="main">
              <p class="income">
                <span>收入</span>
                <span>50</span>
              </p>
              <p class="balance">
                <span>当前余额</span>
                <span>380</span>
              </p>
            </div>
          </div> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDetailsDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "BusinessIncome",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "商家管理",
          urls: "/index/businessUser/BusinessUser",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "商家数据",
          urls: "/index/market/businessUser/merchantData/MerchantData",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "商家收入流水",
          urls: "/index/market/businessUser/merchantData/BusinessIncome",
          icon: "icon-home"
        }
      ],

      searchTime: "", // 选择时间

      nickNameSearch: "", // 昵称搜索
      merchantIDSearch: "", // 商家ID搜索

      tableData: [],

      viewDetailsDialog: false,
      viewdialogData:[],
      nickname:'',
      count:'',
      
      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    getlistData() {
      let params = {
        is_company: true,
        begin: this.searchTime?this.searchTime[0]:'',
        end: this.searchTime?this.searchTime[1]:'',
        nickname: this.nickNameSearch,
        user_id:this.merchantIDSearch,
        user_status: ""
      };
      this.HttpClient.post("/admin/revenues/lists",params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          console.log(this.tableData);
          this.total = res.data.data.total;
        }
      });
    },
    // 选择时间
    choseTimeFn() {
      console.log(this.searchTime);
      this.getlistData()
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    // 登录状态
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    viewdialogFn(row){
      console.log(row)
      this.nickname = row.nickname
      this.count = row.balance
      this.viewDetailsDialog = true
      this.HttpClient.post('/admin/revenues/revenuesDetail',{uid:row.uid}).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.viewdialogData = res.data.data
          console.log(this.viewdialogData)
        }
      })
    }
  }
};
</script>

<style lang="less">
.businessIncome {
  text-align: left;

  .bread {
    margin: 10px;
  }

  .businessIncome_main::-webkit-scrollbar {
    display: none;
  }

  .businessIncome_main {
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
        .el-table::before {
          background: unset;
        }
        .el-table {
          border: none;
          border-left: 1px solid #ebeef5;
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }

        /*收入*/
        .table_income {
          color: #15bafe;
          span {
            margin-right: 2px;
          }
        }
        /*支出*/
        .table_spend {
          color: red;
        }

        /*操作按钮*/
        .mallReview_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .mallReview_btm {
              display: flex;
              align-items: center;
              .el-button {
                border: none;
                background: transparent;
              }
            }
          }
        }

        .el-pagination {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
}

/*更新联系人弹窗*/
.viewDetailsDialog {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .viewDetailsDialog_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
      color: #15bafe;
      font-size: 18px;
    }
  }
  .viewDetails_dialog_box {
    .content {
      display: flex;
      align-items: center;
      p {
        flex: 1;
        display: flex;
        align-items: center;
        height: 30px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #dedede;
      }
    }

    .content_box {
      height: 250px;
      border: 1px solid #dedede;
      margin-top: 5px;
      overflow: auto;
      box-sizing: border-box;
      padding: 5px 15px;

      .content_list:not(:last-child) {
        margin-bottom: 10px;
      }
      .content_list {
        .content_list_time {
          display: block;
          text-align: center;
          margin: 3px 0;
        }
        .main {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .income {
            display: flex;
            align-items: center;
            span {
              margin: 0 5px;
            }
            span:last-child {
              color: #15bafe;
            }
          }
          .spend {
            span:last-child {
              color: red;
            }
          }

          .balance {
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
