<template>
  <div class="encyclopediaContents">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="encyclopedia_main">
      <div class="encyclopedia_title">
        <div class="title">支付情况</div>
      </div>

      <div class="mallReview_select">
        <el-radio-group v-model="mallReviewSelect" @change="getOrderList">
          <el-radio border :label="0">全部</el-radio>
          <el-radio
            border
            :label="item.menu_id"
            v-for="item in typeList"
            :key="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
      </div>

      <div class="mallReview_header">
        <div class="mallReview_search">
          <div class="search_date">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getOrderList"
            ></el-date-picker>
          </div>
          <div>
            <el-input
              placeholder="订单ID搜索"
              clearable
              v-model="orderIdSearch"
              class="input-with-select"
              @keyup.13.native="getOrderList"
              @change="getOrderList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </div>
          <div>
            <el-input
              placeholder="用户昵称"
              clearable
              v-model="nickName"
              class="input-with-select"
              @keyup.13.native="getOrderList"
              @change="getOrderList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </div>
          <div>
            <el-input
              placeholder="商家名称搜索"
              clearable
              v-model="merchantName"
              class="input-with-select"
              @keyup.13.native="getOrderList"
              @change="getOrderList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </div>
          <div>
            <el-input
              placeholder="商品名称搜索"
              clearable
              v-model="productName"
              class="input-with-select"
              @keyup.13.native="getOrderList"
              @change="getOrderList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="mallReview_content_box">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column label="订单ID" align="center" width="150" prop="order_no" show-overflow-tooltip sortable></el-table-column>

          <el-table-column label="商品名称" align="center" width="140" show-overflow-tooltip prop="title"></el-table-column>

          <el-table-column label="公司名称" align="center" width="140" show-overflow-tooltip prop="company_name"></el-table-column>

          <el-table-column label="订单时间" align="center" width="180" show-overflow-tooltip sortable prop="created_at"></el-table-column>

          <el-table-column label="用户昵称" align="center" width="150" show-overflow-tooltip prop="nickname">
              <template slot-scope='scope'>
                  <span>
                      {{scope.row.nickname || '无'}}
                  </span>
              </template>
          </el-table-column>

          <el-table-column
            label="支付方式"
            align="center"
            show-overflow-tooltip
            :render-header="renderPayment"
            width="120"
            prop="payment"
          >
            <template
              slot-scope="scope"
            >{{scope.row.payment===1?'微信':scope.row.payment===2?'支付宝':'余额'}}</template>
          </el-table-column>

          <el-table-column
            label="订单状态"
            align="center"
            show-overflow-tooltip
            prop="admin_status"
            :filters="orderStatus"
            :filter-method="filterHandler"
            width="150"
          >
            <template slot-scope="scope">
              <span :class="scope.row.admin_status===1?'start_color ':scope.row.admin_status===2?'end_color':scope.row.admin_status===3?'audit_color':''">{{
              scope.row.admin_status===1?'已退款 ':scope.row.admin_status===2?'已打款':scope.row.admin_status===3?'未打款':'错误状态'
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="单价" align="center" show-overflow-tooltip width="100" prop="price"></el-table-column>

          <el-table-column label="数量" align="center" show-overflow-tooltip width="100" prop="quantity"></el-table-column>

          <el-table-column label="总计" align="center" show-overflow-tooltip width="150" prop="total_price"></el-table-column>

          <el-table-column label="操作"
                align="center"
                min-width="120"
                fixed="right">
            <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="remarkButton(scope.row.order_id)">备注</el-button>
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

    <!--备注弹窗-->
    <el-dialog :visible.sync="RemarksDialog" width="470px" custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title">
        <i class="iconfont icon-edit-square"></i>备注
      </span>
      <div class="RemarksDialog_main">
        <div class="main_content">
          <div class="main_content_list">
            <div class="title">添加备注</div>
            <el-input type="textarea" :rows="4" resize="none" v-model="remark"></el-input>
          </div>

          <div class="main_content_history">
            <div class="title">历史</div>
            <div class="history_box">
              <div class="history_list" v-for="(item,index) in historyRemark" :key="index">
                <p class="userName">
                  {{item.create_name}}
                  <span>{{item.created_at}}</span>
                </p>
                <p class="content">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RemarksDialog = false">关 闭</el-button>
        <el-button type="primary" @click="remarkConfirm">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "PaymentSituation",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "商城",
          urls: "",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "支付情况",
          urls: "/index/mall/mallOrder/payment-situation",
          icon: "icon-home"
        }
      ],
      RemarksDialog: false, // 备注弹窗
      remark: "", // 备注内容
      historyRemark: [], // 历史备注列表

      mallReviewSelect: "", // 板块选择
      orderIdSearch: "", // 订单id搜索
      timeRange: [], // 时间区间
      nickName: "", // 用户昵称
      merchantName: "", // 商家名称
      productName: "", // 商品名称

      payment: [
        { text: "全部", value: "" },
        { text: "微信", value: 1 },
        { text: "支付宝", value: 2 },
        { text: "余额", value: 3 }
      ], // 支付方式列表
      paymentSelect: "", // 支付方式选中值
      orderStatus: [
        { text: "已退款 ", value: 1 },
        { text: "已打款", value: 2 },
        { text: "未打款", value: 3 },
      ], // 订单状态
      orderStatusSelect: "", // 订单状态选中值

      tableData: [], // 订单列表
      typeList: [], // 板块列表
      id: "", // 订单id

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  methods: {
    //获取订单列表
    getOrderList() {
      let parameters = {
        page: this.currentPage,
        size: this.pageSize
      };
      if (this.timeRange) {
        // 订单时间区间
        console.log(this.timeRange);
        parameters.start_time = this.timeRange[0];
        parameters.end_time = this.timeRange[1];
      }
      if (this.orderIdSearch) {
        // 订单id
        parameters.order_id = this.orderIdSearch;
      }
      if (this.nickName) {
        // 用户昵称
        parameters.nickname = this.nickName;
      }
      if (this.merchantName) {
        // 公司名称
        parameters.company_name = this.merchantName;
      }
      if (this.productName) {
        // 商品名称
        parameters.title = this.productName;
      }
      if (this.paymentSelect) {
        parameters.payment = this.paymentSelect;
      }
      if (this.orderStatusSelect) {
        parameters.admin_status = this.orderStatusSelect;
      }
      if (this.mallReviewSelect) {
        parameters.folder = this.mallReviewSelect;
      }
      this.HttpClient.post("/admin/marketOrder/payOrder", parameters).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        }
      );
    },
    //获取板块列表
    getTypeList() {
      this.HttpClient.post("/admin/menu/getList", { menu_type: 1 }).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.typeList = Object.values(res.data.data);
          }
        }
      );
    },
    //获取备注列表
    getMarkList(id) {
      this.HttpClient.post("/admin/remarkLog/lists", { source_id: id }).then(
        res => {
          if (res.data.code === 200) {
            this.historyRemark = res.data.data;
            console.log(this.historyRemark);
          }
        }
      );
    },
    //备注按钮
    remarkButton(id) {
      this.id = id;
      this.RemarksDialog = true;
      this.getMarkList(id);
    },
    //备注弹窗确认按钮
    remarkConfirm() {
      if (this.remark) {
        this.HttpClient.post("/admin/remarkLog/create", {
          content: this.remark,
          source_id: this.id
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.remark = "";
            setTimeout(() => {
              this.getMarkList(this.id);
            }, 500);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },

    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getOrderList();
    },

    /*******表头自定义筛选*******/
    //在渲染表头的时候，会调用此方法，h为createElement的缩写版  添加on.change事件即可
    //支付方式
    renderPayment(h, { column }) {
      return h(
        "el-select",
        {
          // 'v-model':this.headerSelect,
          props: {
            value: "支付方式",
            placeholder: "支付方式"
            // size:'mini'
          },
          on: {
            input: value => {
              console.log(value);
              this.paymentSelect = value;
              this.getOrderList();
            }
          }
        },
        [
          this.payment.map(item => {
            return h("el-option", {
              props: {
                value: item.value,
                label: item.text
              }
            });
          })
        ]
      );
    },
    //订单状态
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  created() {
    this.getOrderList();
    this.getTypeList();
  }
};
</script>

<style lang="less">
.encyclopediaContents {
  text-align: left;
}

.el-table__column-filter-trigger i {
  color: #fff;
  font-size: 18px;
}
.dialog_delete_head_title {
  height: 16px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
}
.encyclopediaContents {
  /*分页*/
  .paging {
    margin: 20px 0;
    text-align: center;
  }
  .bread {
    margin: 10px;
  }
  .encyclopedia_main::-webkit-scrollbar {
    display: none;
  }
  .encyclopedia_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .encyclopedia_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;

      .title {
        font-size: 20px;
        color: #222;
      }
    }

    /*单选框组*/

    .mallReview_select {
      padding-bottom: 20px;
      margin: 20px 40px 20px 40px;
      border-bottom: 1px solid #dedede;

      .el-radio.is-checked {
        background: #15bafe;
        border: none;

        .el-radio__label {
          color: #fff;
        }
      }

      .el-radio {
        padding: 0 20px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        border-radius: unset;

        .el-radio__input {
          display: none;
        }

        .el-radio__label {
          padding: 0;
        }
      }
    }

    /*头部*/

    .mallReview_header {
      box-sizing: border-box;
      padding: 0 40px 30px 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      /*搜索框*/

      .mallReview_search {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        > div {
          margin-right: 30px;
        }

        .el-input-group {
          line-height: normal;
          display: inline-table;
          /*width: 80%;*/
          border-collapse: separate;
          border-spacing: 0;
        }

        .search_date {
          display: inherit;

          .el-date-editor--daterange.el-input,
          .el-date-editor--daterange.el-input__inner,
          .el-date-editor--timerange.el-input,
          .el-date-editor--timerange.el-input__inner {
            width: 200px;
          }
        }
      }
    }

    /*表格*/

    .mallReview_content_box {
      box-sizing: border-box;
      padding: 0 40px;

      .el-table {
        thead {
          color: #fff;

          th,
          tr {
            background-color: #15bafe;

            .el-input--suffix .el-input__inner {
              color: #fff;
              font-weight: 900;
              border: none;
              padding: 0;
              background: #15bafe;
            }

            .el-input__inner::placeholder {
              color: #fff !important;
              font-weight: 900 !important;
            }

            .el-input__inner::-webkit-input-placeholder {
              color: #fff !important;
              font-weight: 900 !important;
            }

            .el-input__inner::-moz-placeholder {
              //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
              color: #fff !important;
              font-weight: 900 !important;
            }

            .el-input__inner:-ms-input-placeholder {
              //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
              color: #fff !important;
              font-weight: 900 !important;
            }

            .el-input__suffix {
              right: -2px;

              .el-select__caret {
                color: #fff;
              }

              .el-input__icon {
                width: 14px;
              }
            }

            .el-select {
              position: relative;
              top: 2px;
            }
          }
        }
      }

      .el-pagination {
        text-align: center;
      }

      /*操作按钮*/

      .mallReview_scope {
        padding: 0;

        .cell {
          line-height: unset;
          .mallReview_btm {
            display: flex;
            align-items: center;
            justify-content: center;

            .el-button {
              border: none;
              background: transparent;
            }
          }
        }
      }
    }
  }

  /*备注弹窗*/
  .RemarksDialog {
    .el-dialog__body {
      padding-top: 0;
    }
    .RemarksDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .RemarksDialog_main {
      .main_content {
        box-sizing: border-box;
        .main_content_list {
          margin-bottom: 20px;
          .title {
            margin-bottom: 10px;
          }
        }
        .main_content_history {
          .title {
            margin-bottom: 10px;
            border-bottom: 1px solid #dedede;
            padding-bottom: 10px;
          }
          .history_box {
            box-sizing: border-box;
            padding: 20px 20px 20px 20px;
            height: 300px;
            overflow: auto;
            border: 1px solid #dedede;
            .history_list:not(:last-child) {
              margin-bottom: 15px;
            }
            .history_list {
              .userName:before {
                content: "";
                width: 5px;
                height: 5px;
                display: inline-block;
                background: #15bafe;
                border-radius: 50%;
                margin-right: 15px;
              }
              .userName {
                margin-bottom: 10px;
                color: #222;
                span {
                  font-size: 12px;
                  color: #15bafe;
                  margin-left: 10px;
                }
              }
              .content {
                font-size: 12px;
                color: #666;
                padding-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
