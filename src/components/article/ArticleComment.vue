<template>
  <div class="articleComment">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="articleComment_box">
      <div class="title">评论管理</div>
      <div class="articleComment_main">
        <!--总数表格-->
        <div class="articleComment_statistics">
          <div class="article_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>评论总数 {{statisticsTotal}}
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in statisticsData" :key="item.id">
                <p>{{item.name}}</p>
                <p>{{item.num}}</p>
              </div>
            </div>
          </div>
          <!-- <el-table :data="statisticsData" class="statisticsTable">
            <el-table-column row-class-name="tableHeader" prop="totalnum" align="center" label="评论总数">
              
              <el-table-column prop="automobile" align="center" label="汽车"></el-table-column>
              <el-table-column prop="motorcycle" align="center" label="摩托车"></el-table-column>
              <el-table-column prop="drone" align="center" label="无人机"></el-table-column>
              <el-table-column prop="smartDevice" align="center" label="智能设备"></el-table-column>
            </el-table-column>
          </el-table> -->
        </div>

        <!--列表-->
        <div class="articleComment_content">
          <form>
            <div class="content_header">
              <el-date-picker
                v-model="contentTime"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getCommentList"
              ></el-date-picker>

              <div class="content_header_search">
                <el-input
                  placeholder="文章名称"
                  clearable
                  v-model="articleTitle"
                  @keyup.13.native="getCommentList"
                  @clear="getCommentList"
                >
                  <el-button slot="append" icon="el-icon-search" @click="getCommentList"></el-button>
                </el-input>
                <el-input
                  placeholder="昵称搜索"
                  clearable
                  v-model="nickname"
                  @keyup.13.native="getCommentList"
                  @clear="getCommentList"
                >
                  <el-button slot="append" icon="el-icon-search" @click="getCommentList"></el-button>
                </el-input>
              </div>
            </div>

            <div class="content_table" style="width:80%">
              <el-table :data="contentData" border style="width: 100%">
                <el-table-column prop="id" sortable width="80px" align="center" label="ID"></el-table-column>
                <el-table-column
                  prop="nickname"
                  width="100"
                  show-overflow-tooltip
                  align="center"
                  label="昵称"
                ></el-table-column>
                <el-table-column
                  prop="actual_name"
                  width="110px"
                  show-overflow-tooltip
                  align="center"
                  label="用户名"
                ></el-table-column>
                <el-table-column
                  prop="category_name"
                  width="110px"
                  align="center"
                  show-overflow-tooltip
                  label="类别"
                  :filters="typelistData"
                  :filter-method="filterTag"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.category_name">{{scope.row.category_name}}</span>
                  <span v-else class="">暂无</span>
                </template>
                </el-table-column>
                <el-table-column
                  prop="source_title"
                  width="120px"
                  align="center"
                  show-overflow-tooltip
                  label="文章名称"
                ></el-table-column>
                <el-table-column width="200" align="center" show-overflow-tooltip label="评论内容">
                  <template slot-scope="scope">
                    <div class="commentContent" v-html="scope.row.content"></div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="review"
                  width="120px"
                  show-overflow-tooltip
                  align="center"
                  label="禁用类别"
                  :filters="tableforbiddenList"
                  :filter-method="filterTag"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.review">{{scope.row.review}}</span>
                    <span v-else>无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  width="160px"
                  align="center"
                  show-overflow-tooltip
                  sortable
                  label="评价时间"
                ></el-table-column>
                <el-table-column
                  sortable
                  width="120px"
                  show-overflow-tooltip
                  align="center"
                  label="通过状态"
                >
                  <template slot-scope="scope">
                    <div>{{scope.row.status===1?'已通过':scope.row.status===2?'未审核':scope.row.status===3?'未通过':scope.row.status===4?'下架':'删除'}}</div>
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
                    <div class="notpass_color" @click="rejectButton(scope.row.answer_id)" v-if="scope.row.status!==3">禁用</div>
                    <div class="delete_color" @click="deleteButton(scope.row.answer_id)" v-if="scope.row.status!==1">删除</div>
                    <div @click="previewButton(scope.row.id)">预览</div>
                    <div class="normal_color" @click="recoverButton(scope.row.answer_id)" v-if="scope.row.status!==1">恢复</div>
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
    </div>

    <!--禁用框-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>禁用
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">禁用类别：</div>
        <div class="disable_dialog_right">
          <el-radio-group v-model="disableDialogRadio" size="small">
            <el-radio
              :label="item"
              border
              v-for="(item,index) in forbiddenList"
              :key="index"
            >{{item.name}}</el-radio>
            <!-- <el-radio label="2" border disabled>备选项2</el-radio> -->
          </el-radio-group>
          <!-- <el-radio border v-model="disableDialogRadio" label="1">无效评论</el-radio>
          <el-radio border v-model="disableDialogRadio" label="2">故意装怪</el-radio>
          <el-radio border v-model="disableDialogRadio" label="3">色情</el-radio>
          <el-radio border v-model="disableDialogRadio" label="4">不友善</el-radio>-->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmReject">确 定</el-button>
      </span>
    </el-dialog>

    <!--禁用框-->
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

    <!--查看评论框-->
    <el-dialog width="400px" custom-class="previewDialog" :visible.sync="previewDialog">
      <span slot="title" class="previewDialog_title">
        <i class="iconfont icon-chakan"></i>评论预览
      </span>
      <div class="previewDialog_box">
        <div class="previewDialog_box_title">评论内容：</div>
        <div class="previewDialog_content" v-html="previewContent"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false">取 消</el-button>
        <el-button type="primary" @click="previewDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";

export default {
  name: "ArticleComment",
  components: {
    BreadCrumb,
    DeleteModal
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
          name: "评论管理",
          urls: "/index/article/comment",
          icon: "icon-home"
        }
      ],
      // 总数表格
      statisticsTotal:0,
      statisticsData:[],
      typelistData:[],

      // 日期筛选
      contentTime: "",

      // 主体表格
      contentData: [], //评论列表

      // 禁用弹窗
      tableforbiddenList:[],
      forbiddenList: [], //禁用类别列表  /** liushuya 2019-01-04 */
      disableDialog: false,
      disableDialogRadio: {}, // 禁用类别选择

      //恢复弹框
      recoverDialog: false,

      // 预览弹窗
      previewDialog: false,

      articleTitle: "", //文章标题搜索
      nickname: "", //昵称搜索
      currentPage: 1, //当前页
      pageSize: 25, //每页显示数量
      total: 0, //总记录数
      answerId: "", //评论id
      previewContent: "" //预览评论内容
    };
  },
  methods: {
    getTypeList(){
      let parameters = {
        menu_type:2,
        type:6
      }
      this.HttpClient.post('/admin/menu/getList',parameters).then(res => {
        if(res.data.code === 200){
          
          console.log(res)
          Object.values(res.data.data).forEach(item => {
            var obj = {};
            obj.text = item.name;
            obj.value = item.name;
            console.log(obj)
            this.typelistData.push(obj);
          })
          console.log(this.typelistData)
        }
      })
    },
    filterTag(value, row, column) {
      const property = column['property'];
        return row[property] === value;
    },
    // filterHandler(value, row, column) {
    //   const property = column["property"];
    //   return row[property] === value;
    // },
    getTotalData(){
      this.HttpClient.post('/admin/answers/getAnswerCount',{type:'article'}).then(res => {
        console.log(res.data.data)
        if(res.data.code === 200){
          this.statisticsTotal = res.data.data.total;
          this.statisticsData = res.data.data.info;
        }
      })
    },

    /***************数据相关**************/
    /** liushuya 2019-01-04 */
    // 获取禁用类别列表
    getforbidList() {
      this.HttpClient.post("/admin/webReview/getList", {
        type: "answers"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.forbiddenList = res.data.data;
          this.forbiddenList.forEach(item => {
            var obj = {};
            obj.text = item.name;
            obj.value = item.name;
            this.tableforbiddenList.push(obj)
          })
        }
      });
    },
    //获取评论列表
    getCommentList() {
      let parameters = {
        type: 1,
        page: this.currentPage,
        size: this.pageSize
      };
      if (this.articleTitle) {
        parameters.source_title = this.articleTitle;
      }
      if (this.nickname) {
        parameters.user_name = this.nickname;
      }
      if (this.contentTime.length > 0) {
        parameters.start_time = this.contentTime[0];
        parameters.end_time = this.contentTime[1];
      }
      this.HttpClient.post("/admin/answers/getList", parameters).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.contentData = res.data.data.data;
          this.total = res.data.data.total;
          this.statisticsData.totalnum = this.total;
        }
      });
    },
    //状态改变事件
    changeStatus(status) {
      console.log(this.disableDialogRadio);
      let parameters = {
        answer_id: this.answerId,
        status: status
      };
      if (status === 3) {
        parameters.review = this.disableDialogRadio.name;
        parameters.review_id = this.disableDialogRadio.review_id;
      }
      this.HttpClient.post("/admin/answers/changeStatus", parameters).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            this.disableDialog = false;
            setTimeout(() => {
              this.getCommentList();
            }, 500);
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },
    //禁用按钮事件
    rejectButton(id, status) {
      this.disableDialog = true;
      this.answerId = id;
      this.getforbidList(); /** liushuya 2019-01-04 */
    },
    //删除按钮事件
    deleteButton(id) {
      this.answerId = id;
      this.$refs.delete.deleteDialog = true;
    },
    //恢复按钮事件
    recoverButton(id) {
      this.answerId = id;
      this.recoverDialog = true;
    },
    //预览按钮事件
    previewButton(id) {
      this.previewDialog = true;
      this.HttpClient.post("/admin/answers/preview", { id: id }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.previewContent = res.data.data.content;
        }
      });
    },
    //确认禁用
    confirmReject() {
      let status = 3;
      // if (this.rejectStatus !== 3) {
      //   status = 3;
      // } else {
      //   status = 1;
      // }
      this.changeStatus(status);
    },
    //确认删除
    confirmDelete() {
      this.changeStatus(0);
    },
    //确认恢复
    confirmRecover() {
      this.recoverDialog = false;
      this.changeStatus(1);
    },
    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getCommentList();
    }
  },
  created() {
    this.getCommentList();
    this.getforbidList();
    this.getTotalData();
    this.getTypeList();
  }
};
</script>

<style lang="less">
.articleComment {
  margin: 10px;
  .bread {
    margin-bottom: 10px;
  }
  .articleComment_box::-webkit-scrollbar {
    display: none;
  }
  .articleComment_box {
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

    /*内容*/
    .articleComment_main {
      padding: 30px 45px;
      /*总数表格*/
      .articleComment_statistics {
        width: 420px;
        .article_table{
          display: inline-block;
          .table_title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            background: #15bafe;
            color: #fff;
            .iconfont{
              margin-right: 10px;
              position: relative;
              top: 2px;
            }
          }
          .table_box{
            display: flex;
            align-items: center;
            .table_box_list{
              min-width: 100px;
              p{
                border: 1px solid #dedede;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
              }
            }
          }
        }
        /*表格头*/
        .el-table__header-wrapper {
          .is-group {
            tr:nth-child(1) {
              background: #15bafe;
              th {
                background: #15bafe;
                .cell {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }

    /*列表*/
    .articleComment_content {
      margin-top: 40px;
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
          // color: #fff;
          // th {
          //   background: #15bafe;
          // }
        // }

        .commentContent {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

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

  /*评论预览*/
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

.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dialog {
    margin: 0 !important;
  }
}
</style>
