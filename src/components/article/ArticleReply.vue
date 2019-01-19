<template>
  <div class="articleReply">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="articleReply_main">
      <!--标题-->
      <div class="title">回复管理</div>
      <!--列表-->
      <div class="articleReply_content">
        <form>
          <div class="content_header">
            <el-date-picker
              v-model="contentTime"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getReplyList"
            ></el-date-picker>

            <div class="content_header_search">
              <el-input
                placeholder="文章名称"
                clearable
                v-model="articleTitle"
                @keyup.13.native="getReplyList"
                @clear="getReplyList"
              >
                <el-button slot="append" icon="el-icon-search" @click="getReplyList"></el-button>
              </el-input>
              <el-input
                placeholder="昵称搜索"
                clearable
                v-model="nickname"
                @keyup.13.native="getReplyList"
                @clear="getReplyList"
              >
                <el-button slot="append" icon="el-icon-search" @click="getReplyList"></el-button>
              </el-input>
            </div>
          </div>

          <div class="content_table">
            <el-table :data="contentData" border style="width: 100%">
              <el-table-column prop="id" sortable width="80px" show-overflow-tooltip align="center" label="ID"></el-table-column>
              <el-table-column prop="nickname" width="120px" show-overflow-tooltip align="center" label="昵称"></el-table-column>
              <el-table-column prop="username" width="110px" show-overflow-tooltip align="center" label="用户名"></el-table-column>
              <el-table-column
                prop="menu"
                show-overflow-tooltip
                width="110px"
                align="center"
                label="类别"
                :filters="[{ text: '汽车', value: '汽车'}
                  , { text: '摩托车', value: '摩托车'}
                  , { text: '无人机', value: '无人机'}
                  , { text: '智能设备', value: '智能设备'}
                  ]"
                :filter-method="filterHandler"
              ></el-table-column>
              <el-table-column prop="source_title" show-overflow-tooltip width="200px" align="center" label="文章名称"></el-table-column>
              <el-table-column prop="content" show-overflow-tooltip width="190px" align="center" label="回复内容"></el-table-column>
              <el-table-column prop="review_name" show-overflow-tooltip width="120px" align="center" label="禁用类别"></el-table-column>
              <el-table-column prop="created_at" show-overflow-tooltip width="180px" align="center" sortable label="评价时间"></el-table-column>
              <el-table-column width="120px" show-overflow-tooltip align="center" label="通过状态">
                <template slot-scope="scope">
                  <div>{{scope.row.status===1?'已通过':scope.row.status===2?'未审核':scope.row.status===3?'未通过':scope.row.status===4?'已下架':'删除'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="operating"
                align="center"
                fixed="right"
                class-name="contentOperating"
                label="操作"
              >
                <template slot-scope="scope">
                  <div @click="rejectButton(scope.row.comment_id)" v-if="scope.row.status!==3">禁用</div>
                  <div @click="deleteButton(scope.row.comment_id)" v-if="scope.row.status!==1 && scope.row.status!==0">删除</div>
                  <div @click="previewButton(scope.row.id)">预览</div>
                  <div @click="recoverButton(scope.row.comment_id)" v-if="scope.row.status!==1">恢复</div>
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
          <div class="quantity_btm">数量：{{total}}</div>
        </form>
      </div>
    </div>

    <!--禁用框-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>禁用
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">禁用类别：</div>
        <div class="disable_dialog_right">
          <el-radio
            border
            v-model="disableDialogRadio"
            :label="item.id"
            v-for="(item,index) in reviewData"
            :key="index"
          >{{item.name}}</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmReject">确 定</el-button>
      </span>
    </el-dialog>

    <!--恢复框-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="recoverDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>恢复
      </span>
      <div class="disable_dialog_box">
        <i class="iconfont icon-warning-circle"></i>
        <p>确定恢复吗？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recoverDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmRecover">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看回复框-->
    <el-dialog width="400px" custom-class="previewDialog" :visible.sync="previewDialog">
      <span slot="title" class="previewDialog_title">
        <i class="iconfont icon-chakan"></i>回复预览
      </span>
      <div class="previewDialog_box">
        <div class="previewDialog_box_title">回复内容：</div>
        <div class="previewDialog_content" v-html="previewContent"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false">取 消</el-button>
        <el-button type="primary" @click="previewDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除框-->
    <modalDelete ref="delete" @doDelete="confirmDelete"></modalDelete>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import ModalDelete from "@/components/public/modalDelete";

export default {
  name: "ArticleReply",
  components: {
    BreadCrumb,
    ModalDelete
  },
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
          name: "回复管理",
          urls: "/index/article/ArticleReply",
          icon: "icon-home"
        }
      ],
      userOptions: [
        {
          value: 1,
          label: "公司"
        },
        {
          value: 2,
          label: "普通用户"
        }
      ],

      // 日期筛选
      contentTime: null,

      // 主体表格
      contentData: [],

      // 禁用弹窗
      disableDialog: false,
      disableDialogRadio: null, // 禁用类别选择
      reviewData: [], //禁用类型数据

      //恢复弹窗
      recoverDialog: false,

      // 预览弹窗
      previewDialog: false,

      //删除确认框
      modalDelete: false,

      articleTitle: "", //文章标题搜索
      nickname: "", //昵称搜索
      currentPage: 1, //当前页
      pageSize: 25, //每页显示数量
      total: 0, //总记录数
      id: "", //回复id
      previewContent: "" //预览内容
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    /***************数据相关******************/
    //获取回复列表
    getReplyList() {
      let parameters = {
        type: 1,
        page: this.currentPage,
        size: this.pageSize
      };
      if (this.articleTitle) {
        parameters.source_title = this.articleTitle;
      }
      if (this.nickname) {
        parameters.nickname = this.nickname;
      }
      console.log(this.contentTime);
      if (this.contentTime !== null) {
        parameters.start_time = this.contentTime[0];
        parameters.end_time = this.contentTime[1];
      }
      this.HttpClient.post("/admin/comment/getList", parameters).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data.data);
          this.contentData = res.data.data.data.data;
          this.total = res.data.data.data.total;
        }
      });
    },
    //状态改变事件
    changeStatus(status) {
      let parameters = {
        comment_id: this.id,
        status: status
      };
      if (status === 3) {
        parameters.review = this.disableDialogRadio;
      }
      this.HttpClient.post("/admin/comment/changeStatus", parameters).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.getReplyList();
            }, 500);
          } else {
            this.$message.error("操作失败");
          }
        }
      );
    },
    //禁用按钮事件
    rejectButton(id) {
      this.id = id;
      this.disableDialog = true;
      this.HttpClient.post("/admin/webReview/getList", {
        type: "upload"
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.reviewData = res.data.data;
        }
      });
    },
    //删除按钮事件
    deleteButton(id) {
      this.id = id;
      this.$refs.delete.deleteDialog = true;
    },
    //恢复按钮事件
    recoverButton(id) {
      this.id = id;
      this.recoverDialog = true;
    },
    //确认禁用
    confirmReject() {
      this.disableDialog = false;
      this.changeStatus(3);
    },
    //确认删除
    confirmDelete(bool) {
      if (bool) {
        this.changeStatus(0);
      }
    },
    //确认恢复
    confirmRecover() {
      this.recoverDialog = false;
      this.changeStatus(1);
    },
    //预览按钮事件
    previewButton(id) {
      this.previewDialog = true;
      this.HttpClient.post("/admin/comment/preview", { id: id }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.previewContent = res.data.data;
        }
      });
    },

    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getReplyList();
    }
  },
  created() {
    this.getReplyList();
  }
};
</script>

<style lang="less">
.articleReply {
  padding: 10px;
  /*面包屑*/
  .bread {
    margin-bottom: 10px;
  }
  .articleReply_main::-webkit-scrollbar {
    display: none;
  }
  .articleReply_main {
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
    .articleReply_content {
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
          .el-input:last-child {
            margin-left: 20px;
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

  /*禁用弹窗*/
  .disableDialog {
    .disableDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
      }
    }
    .disable_dialog_box {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;

      i {
        width: 100%;
        font-size: 80px;
        color: #15bafe;
      }
      p {
        width: 100%;
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }

      /*单选框*/
      .disable_dialog_right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 275px;
        /*单选框样式*/
        .el-radio:nth-child(1) {
          margin-top: 0;
        }
        .el-radio.is-checked {
          background: #15bafe;
          border-color: #15bafe;
          .el-radio__label {
            color: #fff;
          }
        }
        .el-radio {
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 275px;
          margin: 10px auto;
          .el-radio__input {
            display: none;
          }
          .el-radio__label {
            padding: 0;
          }
        }
      }
    }
  }

  /*回复预览*/
  .previewDialog {
    .previewDialog_title {
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
    .previewDialog_box {
      .previewDialog_box_title {
        font-size: 14px;
        color: #000;
        display: flex;
        align-items: center;
      }
      .previewDialog_content {
        width: 100%;
        height: 350px;
        overflow: auto;
        border: 1px solid #e8e8e8;
        margin-top: 10px;
        text-align: justify;
        padding: 10px;
      }
    }
  }
}
</style>
