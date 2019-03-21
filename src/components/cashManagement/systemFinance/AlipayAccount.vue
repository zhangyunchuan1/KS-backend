<template>
  <div class="alipayAccount">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="alipayAccount_main">
      <!--标题-->
      <div class="title">
        <p>支付宝账号</p>
      </div>
      <div class="content">
        <div class="content_message">
          <p>公司支付宝余额</p>
          <p v-if="amountNum">{{amountNum}}</p>
          <p v-else class="sortout_color">暂无</p>
        </div>

        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              @change="changeTimeFn"
              v-model="searchTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-select v-model="typeValue" clearable placeholder="请选择" @change="changeTypeFn">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="content_header_search">
            <el-input placeholder="用户昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistdata"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="160"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column
              label="用户类型"
              align="center"
              show-overflow-tooltip
              width="140"
              prop="user_type"
              :filters="[{text: '个人注册', value: 1}, {text: '公司注册', value: 2}, {text: '普通商家', value: 3}]"
              :filter-method="filterTypeHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_type == 1?'个人注册':scope.row.user_type == 2?'公司注册':scope.row.user_type == 3?'普通商家':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="支付宝ID"
              align="center"
              show-overflow-tooltip
              width="200"
              prop="pay_id"
            ></el-table-column>

            <el-table-column
              label="交易金额"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="amount"
            ></el-table-column>

            <el-table-column label="实际金额" align="center" show-overflow-tooltip width="120">
              <template slot-scope="scope">
                <span>{{scope.row.amount+scope.row.poundage}}</span>
              </template>
            </el-table-column>

            <el-table-column label="类型" align="center" show-overflow-tooltip width="100">
              <template slot-scope="scope">
                <span>{{scope.row.amount >= 0?'收入':'支出'}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="方式"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="pay_type"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.pay_type === 1">活动</span>
                <span v-if="scope.row.pay_type === 2">商城</span>
                <span v-if="scope.row.pay_type === 3">淘货</span>
                <span v-if="scope.row.pay_type === null" class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column label="事件内容" align="center" show-overflow-tooltip prop="message"></el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
            ></el-table-column>
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
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "AlipayAccount",
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
        },
        {
          id: 2,
          name: "系统账户",
          urls: "/index/cashManagement/systemFinance/SystemFinance",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "支付宝账号",
          urls: "/index/cashManagement/systemFinance/AlipayAccount",
          icon: "icon-home"
        }
      ],

      searchTime: "",
      nickNameSearch: "",
      options: [{ value:null, label: "全部" },{ value: 1, label: "收入" },{ value: 2, label: "支出" }],
      typeValue: "", //收入支出value
      amountNum:null,//余额

      tableData: [],
      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistdata();
  },
  methods: {
    getlistdata() {
      let params = {
        payment: 2,
        begin: this.searchTime ? this.searchTime[0] : "",
        end: this.searchTime ? this.searchTime[1] : "",
        nickname: this.nickNameSearch,
        page: this.currentPage,
        page_size: this.pageSize
      };
      // this.typeValue == ''?params.pay_amount_type = this.typeValue:'' 
      this.HttpClient.post("/admin/revenues/paylists", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.amountNum = res.data.data.amount
          this.tableData = res.data.data.lists.data;
          this.total = res.data.data.lists.total;
        }
      });
    },
    // 类型选择
    changeTypeFn() {
      console.log(this.typeValue);
        let params = {
          payment: 2,
          page: this.currentPage,
          page_size: this.pageSize,
          begin: this.searchTime ? this.searchTime[0] : "",
          end: this.searchTime ? this.searchTime[1] : "",
          nickname: this.nickNameSearch,
          pay_amount_type: this.typeValue
        };
        this.HttpClient.post("/admin/revenues/paylists", params).then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.tableData = res.data.data.lists.data;
            this.total = res.data.data.total;
          }
        });
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    // 时间区间搜索
    changeTimeFn() {
      console.log(this.searchTime);
      this.getlistdata();
    },
    // 用户类型选择
    filterTypeHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style lang="less">
.alipayAccount {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .alipayAccount_main::-webkit-scrollbar {
    display: none;
  }
  .alipayAccount_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .el-icon-arrow-down:before {
      color: #fff;
    }
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

      .content_message {
        display: flex;
        align-items: center;
        height: 40px;
        margin-bottom: 30px;
        p {
          height: 100%;
          padding: 0 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p:nth-child(1) {
          background: #15bafe;
          color: #fff;
        }
        p:last-child {
          border: 1px solid #dedede;
          margin-left: -1px;
          box-sizing: border-box;
          padding: 0 40px;
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
        /*操作按钮*/
        .table_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .scope_btm {
              display: flex;
              align-items: center;
              justify-content: space-around;
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
</style>
