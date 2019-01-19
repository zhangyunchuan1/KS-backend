<template>
  <div class="userEcology">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userEcology_main">
      <!--标题-->
      <div class="title">
        <p>用户生态</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
            @change="timeSearchFn"
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
              <el-button slot="append" icon="el-icon-search" @click="getuserlistFn"></el-button>
            </el-input>
            <el-input placeholder="商家ID搜索" v-model="merchantIDSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getuserlistFn"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="商家ID" align="center" width="90" prop="id"></el-table-column>

            <el-table-column label="商家昵称" align="center" show-overflow-tooltip prop="nickname"></el-table-column>

            <el-table-column
              label="燃料"
              align="center"
              show-overflow-tooltip
              width="90"
              prop="fuel"
              sortable
            ></el-table-column>

            <el-table-column
              label="被赞次数"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="like_total"
              sortable
            ></el-table-column>

            <el-table-column
              label="上传数量"
              align="center"
              width="120"
              prop="upload_total"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="总浏览量"
              align="center"
              width="120"
              prop="view_total"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="商城/淘货好评率"
              align="center"
              width="160"
              prop="goods_applause_rate"
              sortable
            ></el-table-column>

            <el-table-column
              label="活动好评率"
              align="center"
              width="120"
              prop="active_applause_rate"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="服务好评率"
              align="center"
              width="120"
              prop="service_applause_rate"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="活跃度"
              align="center"
              width="90"
              prop="activity_rate"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="上传完整度"
              align="center"
              width="120"
              prop="upload_integrity_rate"
              sortable
            ></el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column
              label="登录状态"
              :filters="[{text: '删除', value: 0}, {text: '正常', value: 1}, {text: '注销', value: 2}, {text: '禁用', value: 3}, {text: '待审核', value: 4}, {text: '驳回', value: 5}]"
              :filter-method="filterHandler"
              align="center"
              width="100"
              prop="status"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">删除</span>
                <span v-if="scope.row.status === 1">正常</span>
                <span v-if="scope.row.status === 2">注销</span>
                <span v-if="scope.row.status === 3">禁用</span>
                <span v-if="scope.row.status === 4">待审核</span>
                <span v-if="scope.row.status === 5">驳回</span>
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
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "UserEcology",
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
          name: "用户生态",
          urls: "/index/market/businessUser/merchantData/UserEcology",
          icon: "icon-home"
        }
      ],

      searchTime: "", // 选择时间

      nickNameSearch: "", // 昵称搜索
      merchantIDSearch: "", // 商家ID搜索

      tableData: [],

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getuserlistFn();
  },
  methods: {
    // 获取用户生态列表
    getuserlistFn() {
      let params = {
        time_start: this.searchTime?this.searchTime[0]:'',
        time_end: this.searchTime?this.searchTime[1]:'',
        id: this.merchantIDSearch,
        nickname: this.nickNameSearch,
        status: "",
        page_size:this.pageSize,
        page:this.currentPage,
        goods_applause_rate: '-1'
      };
      this.HttpClient.post("/admin/business/ecology", params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
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
    // 时间筛选
    timeSearchFn(){
      console.log(this.searchTime)
      this.getuserlistFn()
    },
  }
};
</script>

<style lang="less">
.userEcology {
  text-align: left;

  .bread {
    margin: 10px;
  }

  .userEcology_main::-webkit-scrollbar {
    display: none;
  }

  .userEcology_main {
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
</style>
