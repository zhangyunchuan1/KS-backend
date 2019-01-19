<template>
  <div class="coolCircleReviewManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="coolCircleReviewManagement_main">
      <!--标题-->
      <div class="title">
        <p>酷圈评论管理</p>
      </div>

      <div class="content">
        <div class="content_header">
          <p>板块选择</p>
          <el-radio-group v-model="plateRadio" @change="getlistData">
            <el-radio
              border
              label=""
            >全部</el-radio>
            <el-radio
              border
              :label="item.menu_id"
              v-for="(item,index) in typeData"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="content_header_search">
          <el-input placeholder="酷圈ID搜索" v-model="idSearch" clearable @change="getlistData" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
          </el-input>
          <el-input placeholder="用户昵称搜索" v-model="userNameSearch" @change="getlistData" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
          </el-input>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="酷圈评论ID" align="center" width="150" prop="id" sortable></el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column
              label="用户类型"
              align="center"
              width="120"
              show-overflow-tooltip
              :filters="[{text: '个人注册', value: 1}, {text: '公司注册', value: 2}, {text: '普通商家', value: 3}]"
              :filter-method="filterHandler"
              prop="user_type"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_type == 1?'个人注册':scope.row.user_type == 2?'公司注册':scope.row.user_type == 3?'普通商家':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="评论"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="content"
            ></el-table-column>

            <el-table-column
              label="点赞次数"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="like_num"
              sortable
            >
            <template slot-scope="scope">
              <span v-if="scope.row.like_num">{{scope.row.like_num}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
            </el-table-column>

            <el-table-column
              label="评论时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
              sortable
            >
              <template slot-scope="scope">
              <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="140" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="deleteInfo(scope.row)">删除</el-button>
                  <el-button size="medium" type="text" @click="previewContent(scope.row)">预览</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            @current-change="currentPageChange"
            :page-size="PageSize"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!--预览图片弹窗-->
    <el-dialog width="400px" custom-class="previewDialog" :visible.sync="previewDialog">
      <span slot="title" class="previewDialog_title">
        <i class="iconfont icon-chakan"></i>预览
      </span>
      <div class="previewDialog_box">
        <p>评论内容</p>
        <div class="comment_content">{{precontent}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "CoolCircleReviewManagement",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "酷圈",
          urls: "/index/coolCircle/CoolCircle",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "酷圈评论管理",
          urls: "/index/coolCircle/CoolCircleManagement",
          icon: "icon-home"
        }
      ],

      plateRadio: "",

      idSearch: "",
      userNameSearch: "",

      tableData: [],

      previewDialog: false,

      // 板块类别
      typeData: [],

      precontent: "",

      // 分页
      PageSize: 25,
      total: null,
      currentpage: 1
    };
  },
  mounted() {
    this.getTypelist();
  },
  methods: {
    getTypelist() {
      let params = {
        menu_type: 2,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code == 200) {
          this.typeData = Object.values(res.data.data);
          // this.plateRadio = this.typeData[0].menu_id;
          this.getlistData()
        }
      });
    },
    getlistData() {
      let params = {
        size: this.PageSize,
        page: this.currentpage,
        user_type: "",
        nickname: this.userNameSearch,
        menu_id: this.plateRadio,
        id: this.idSearch
      };
      this.HttpClient.post("/admin/coolComment/lists",params).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 分页
    currentPageChange(p) {
      this.currentpage = p;
      this.getlistData();
    },
    // 用户类型
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 预览
    previewContent(row) {
      this.precontent = row.content;
      this.previewDialog = true;
    },
    // 删除
    deleteInfo(row){
      console.log(row)
      this.HttpClient.post('/admin/coolComment/destroy',{id:row.id}).then(res => {
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getlistData()
          }, 500);
        }
      })
    }
  }
};
</script>

<style lang="less">
.coolCircleReviewManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .coolCircleReviewManagement_main::-webkit-scrollbar {
    display: none;
  }
  .coolCircleReviewManagement_main {
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
        height: 40px;
        p {
          margin-right: 20px;
        }
        .el-radio-group {
          height: 100%;
          display: flex;
          align-items: center;
          .el-radio {
            padding: 0 20px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              padding: 0;
            }
          }
          .el-radio.is-checked {
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }

      .content_header_search {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .input-with-select {
          margin-right: 20px;
          width: 260px;
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

  /*预览弹窗*/
  .previewDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 10px;
    }
    .previewDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .previewDialog_box {
      p {
        margin-bottom: 5px;
      }
      .comment_content {
        height: 200px;
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px 15px;
      }
    }
  }
}
</style>
