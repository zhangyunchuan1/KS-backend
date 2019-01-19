<template>
  <div class="ArticleBestAuthor">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="articleBestAuthor_main">
      <!--标题-->
      <div class="title">最佳作者</div>
      <!--列表-->
      <div class="articleBestAuthor_content">
        <form>
          <div class="content_header">
            <div class="content_header_search">
              <el-input placeholder="昵称搜索" v-model="nickname" @keyup.13.native="getAuthorList">
                <el-button slot="append" icon="el-icon-search" @click="getAuthorList"></el-button>
              </el-input>
              <el-select
                class="select_type"
                clearable
                v-model="userType"
                placeholder="全部"
                @change="getAuthorList"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="content_table" style="width:80%">
            <el-table :data="contentData" border>
              <el-table-column
                prop="user_id"
                show-overflow-tooltip
                sortable
                width="80px"
                align="center"
                label="ID"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.user_id">{{scope.row.user_id}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nickname"
                show-overflow-tooltip
                width="200px"
                align="center"
                label="昵称"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>
              <el-table-column width="160px" align="center" label="用户类型" show-overflow-tooltip>
                <template
                  slot-scope="scope"
                >{{scope.row.user_type===1?'个人用户':scope.row.user_type===2?'专业商家':'普通商家'}}</template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="article_view"
                width="140px"
                align="center"
                label="总浏览次数"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="article_like"
                width="140px"
                align="center"
                label="总点赞次数"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="article_comment"
                width="140px"
                align="center"
                label="总讨论次数"
              ></el-table-column>
              <el-table-column
                prop="operating"
                align="center"
                class-name="contentOperating"
                label="操作"
                fixed="right"
              >
                <template slot-scope="scope">
                  <div @click="pandect(scope.row)">数据</div>
                  <div>查看用户</div>
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
        </form>
      </div>
    </div>

    <!--数据弹窗-->
    <el-dialog width="400px" custom-class="dataDialog" :visible.sync="dataDialog">
      <span slot="title" class="dataDialog_title">
        <i class="iconfont icon-image"></i>数据
      </span>
      <div class="dataDialog_box">
        <div class="dataDialog_list">
          <div class="dataDialog_list_header">总文章数</div>
          <div class="dataDialog_list_main">{{articleTotal}}</div>
        </div>

        <div class="dataDialog_list">
          <div class="dataDialog_list_header">平均浏览数</div>
          <div class="dataDialog_list_main" v-if="averageViews">{{averageViews}}</div>
          <div class="dataDialog_list_main" v-else>0</div>
        </div>

        <div class="dataDialog_list">
          <div class="dataDialog_list_header">平均点赞数</div>
          <div class="dataDialog_list_main" v-if="averageLikes">{{averageLikes}}</div>
          <div class="dataDialog_list_main" v-else>0</div>
        </div>

        <div class="dataDialog_list">
          <div class="dataDialog_list_header">平均讨论次数</div>
          <div class="dataDialog_list_main" v-if="averageComments">{{averageComments}}</div>
          <div class="dataDialog_list_main" v-else>0</div>
        </div>

        <div class="dataDialog_list">
          <div class="dataDialog_list_header">平均字数</div>
          <div class="dataDialog_list_main" v-if="averageWords">{{averageWords}}</div>
          <div class="dataDialog_list_main" v-else>0</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "ArticleBestAuthor",
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "文章管理",
          urls: "/index/article",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "最佳作者",
          urls: "/index/article/articleBestAuthor",
          icon: "icon-home"
        }
      ],
      userOptions: [
        {
          value: 1,
          label: "个人用户"
        },
        {
          value: 2,
          label: "专业商家"
        },
        {
          value: 3,
          label: "普通商家"
        }
      ],
      userType: "",

      contentData: [], //作者列表

      // 数据弹窗
      dataDialog: false,

      nickname: "", //昵称搜索
      currentPage: 1, //当前页
      pageSize: 25, //每页显示数量
      total: 0, //总记录数

      articleTotal: 0, //文章总数
      averageViews: 0, //平均浏览数
      averageLikes: 0, //平均点赞数
      averageComments: 0, //平均评论数
      averageWords: 0 //平均字数
    };
  },
  components: {
    BreadCrumb
  },
  methods: {
    //获取作者列表
    getAuthorList() {
      let parameters = {
        type: "article",
        page: this.currentPage,
        size: this.pageSize
      };
      if (this.nickname) {
        parameters.nickname = this.nickname;
      }
      if (this.userType) {
        parameters.user_type = this.userType;
      }
      this.HttpClient.post("/admin/users/ranking", parameters).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.contentData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    //数据总览
    pandect(item) {
      this.dataDialog = true;
      this.articleTotal = Number(item.article_total);
      if (this.articleTotal == 0) {
        this.averageViews = 0;
        this.averageLikes = 0;
        this.averageComments = 0;
        this.averageWords = 0;
      } else {
        this.averageViews = (
          Number(item.article_view) / this.articleTotal
        ).toFixed(2);
        this.averageLikes = (
          Number(item.article_like) / this.articleTotal
        ).toFixed(2);
        this.averageComments = (
          Number(item.article_comment) / this.articleTotal
        ).toFixed(2);
        this.averageWords = (Number(item.word_num) / this.articleTotal).toFixed(
          2
        );
      }

      console.log(this.articleTotal);
    },
    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getAuthorList();
    }
  },
  created() {
    this.getAuthorList();
  }
};
</script>

<style lang="less">
.ArticleBestAuthor {
  padding: 10px;
  /*面包屑*/
  .bread {
    margin-bottom: 10px;
  }
  .articleBestAuthor_main::-webkit-scrollbar {
    display: none;
  }
  .articleBestAuthor_main {
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    background: #fff;
    overflow-y: auto;

    /*标题*/
    .title {
      height: 80px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #f2f2f2;
      padding-left: 45px;
      color: #222;
      font-size: 20px;
    }

    /*列表*/
    .articleBestAuthor_content {
      padding: 30px 45px;

      /*头部筛选*/
      .content_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*搜索框*/
        .content_header_search {
          display: flex;
          align-items: center;
          .el-input {
            margin-right: 20px;
          }
        }
      }

      /*表格*/
      .content_table {
        margin-top: 30px;
        /*表格样式*/
        // .has-gutter {
        //   color: #fff;
        //   th {
        //     background: #15bafe;
        //   }
        // }
        /*操作*/
        .contentOperating {
          padding: 0;
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            div {
              flex: 1;
              cursor: pointer;
            }
          }
        }
      }

      /*数量框*/
      .quantity_btm {
        background: #15bafe;
        display: flex;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        max-width: 130px;
        height: 40px;
      }
    }
  }

  /*数据框*/
  .dataDialog {
    .dataDialog_title {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #000;
      .iconfont {
        margin-right: 10px;
        color: #15bafe;
      }
    }
    .el-dialog__body {
      padding: 10px 40px;
    }
    .dataDialog_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .dataDialog_list {
        width: 140px;
        margin: 10px;
        .dataDialog_list_header {
          background: #15bafe;
          color: #fff;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          margin-bottom: 10px;
          height: 40px;
        }
        .dataDialog_list_main {
          border: 1px solid #e8e8e8;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
