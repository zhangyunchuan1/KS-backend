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
              @change="changeTimeFn"
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
            <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column label="用户昵称" align="center" show-overflow-tooltip prop="nickname"></el-table-column>

            <el-table-column
              label="电量"
              align="center"
              show-overflow-tooltip
              width="90"
              prop="electric"
              sortable
            ></el-table-column>

            <el-table-column
              label="用户信誉"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="score"
              sortable
            ></el-table-column>

            <el-table-column
              label="被关注次数"
              align="center"
              width="120"
              prop="focus"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="文章总数"
              align="center"
              width="120"
              prop="article_total"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="视频总数"
              align="center"
              width="160"
              prop="video_total"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="百科总数"
              align="center"
              width="120"
              prop="encyc_total"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="回答总数"
              align="center"
              width="120"
              prop="answers"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="问题总数"
              align="center"
              width="120"
              prop="question"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="余额"
              align="center"
              width="120"
              prop="balance"
              show-overflow-tooltip
              sortable
            ></el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              width="180"
              show-overflow-tooltip
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column
              label="登录状态"
              align="center"
              width="100"
              :filters="[{text: '正常', value: 1}, {text: '禁用', value: 3}]"
              :filter-method="filterHandler"
              prop="login_status"
            >
              <template slot-scope="scope">
                <span>{{scope.row.login_status == 1?'正常':'禁用'}}</span>
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
          name: "用户管理",
          urls: "/index/standardUser/StandardUser",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "用户数据",
          urls: "/index/standardUser/userData/UserData",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "用户生态管理",
          urls: "/index/standardUser/userData/UserEcology",
          icon: "icon-home"
        }
      ],

      searchTime: "", // 选择时间

      nickNameSearch: "", // 昵称搜索
      userNameSearch: "", // 用户名搜索

      tableData: [],

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
        start_time: this.searchTime ? this.searchTime[0] : "",
        end_time: this.searchTime ? this.searchTime[1] : "",
        user_name: this.userNameSearch,
        nickname: this.nickNameSearch,
        size:this.pageSize,
        page:this.currentPage
      };
      this.HttpClient.post("/admin/users/analysisLists", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 时间区间搜索
    changeTimeFn() {
      console.log(this.searchTime);
      this.getlistData();
    },
    // 登录状态
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
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
    .el-icon-arrow-down:before{
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

        .el-pagination {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
