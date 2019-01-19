<template>
  <div class="replyManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="replyManagement_main">
      <!--标题-->
      <div class="title">
        <p>回复管理</p>
      </div>

      <div class="reply_content">
        <div class="reply_header">
          <div class="reply_select">
            <div class="date_item">
              <p class="date_label">开始</p>
              <el-date-picker
                v-model="startTime"
                class="date_picker_1"
                type="date"
                size="mini"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div class="date_item">
              <p class="date_label">截止</p>
              <el-date-picker
                v-model="endTime"
                class="date_picker_1"
                type="date"
                size="mini"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>

          <div class="reply_search">
            <div>
              <el-input placeholder="文章名称搜索" v-model="topicSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div>
              <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div>
              <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>

        <div class="reply_content_box">
          <el-table :data="tableData" :border="true" style="width: 100%">
            <el-table-column label="ID" align="center" width="65" prop="id" sortable></el-table-column>

            <el-table-column
              label="昵称"
              align="center"
              show-overflow-tooltip
              width="90"
              prop="nickname"
            ></el-table-column>

            <el-table-column
              label="用户名"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="username"
            ></el-table-column>

            <el-table-column
              label="问题题目"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="source_title"
            ></el-table-column>

            <el-table-column
              label="类别"
              align="center"
              show-overflow-tooltip
              :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}]"
              :filter-method="filterSecondary"
              width="80"
              prop="menu"
            ></el-table-column>

            <el-table-column
              label="回复内容"
              align="center"
              show-overflow-tooltip
              width="280"
              prop="content"
            ></el-table-column>

            <el-table-column
              label="禁用类别"
              align="center"
              show-overflow-tooltip
              :filters="[{text: '无', value: '无'}, {text: '不友善', value: '不友善'}]"
              :filter-method="filterSecondary"
              width="120"
              prop="review_name"
            ></el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              show-overflow-tooltip
              width="125"
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column
              label="通过状态"
              align="center"
              show-overflow-tooltip
              :filters="[{text: '已通过', value: '已通过'}, {text: '未通过', value: '未通过'}]"
              :filter-method="filterSecondary"
              width="125"
            >
              <template slot-scope="scope">
                <p>{{scope.row.status}}</p>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="reply_scope">
              <template slot-scope="scope">
                <div class="reply_btm">
                  <div @click="forbidUseFn(scope.row)">禁用</div>
                  <div>删除</div>
                  <div>预览</div>
                  <div>恢复</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            @current-change="CurrentChange"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div class="bottom">
        <div>数量：120</div>
      </div>
    </div>

    <!--禁用弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>禁用
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">类别：</div>
        <div class="disable_dialog_right">
          <el-radio-group v-model="disableDialogRadio">
            <el-radio
              border
              :label="item"
              v-for="(item,index) in disableData"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureforbidType">确 定</el-button>
      </span>
    </el-dialog>

    <!--预览弹窗-->
    <el-dialog width="400px" custom-class="viewDialog" :visible.sync="viewDialog">
      <span slot="title" class="viewDialog_title">
        <i class="iconfont icon-chakan"></i>预览
      </span>
      <div class="view_dialog_box">
        <p>评论内容：</p>
        <div class="view_content">
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
          占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位
        </div>
      </div>
    </el-dialog>

    <!--删除框-->
    <DeleteModal></DeleteModal>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";
export default {
  name: "ReplyManagement",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
      breadData: [
        {
          id: 1,
          name: "问题",
          urls: "/index/question/question",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "回复管理",
          urls: "/index/question/replyManagement",
          icon: "icon-home"
        }
      ],

      startTime: "", //开始时间
      endTime: "", //结束时间
      topicSearch: "", // 题目搜索
      userNameSearch: "", //用户名
      nickNameSearch: "", //昵称搜索

      // 表格
      tableData: [
        {
          id: "1",
          nickName: "大颗颗",
          userName: "一个大颗颗",
          replyTitle: "如何给汽车加油",
          plate: "汽车",
          replyContent: "首先。。汽车。。其次。。然后。。",
          disable: "无",
          time: "2018.11.28",
          status: "已通过"
        },
        {
          id: "2",
          nickName: "大颗颗",
          userName: "一个大颗颗",
          replyTitle: "如何给汽车加油",
          plate: "汽车",
          replyContent: "首先。。汽车。。其次。。然后。。",
          disable: "无",
          time: "2018.11.25",
          status: "已通过"
        }
      ],

      choseData:{},

      disableDialog: false, // 禁用弹窗
      disableData: [], //禁用数据
      disableDialogRadio: "",

      // 分页
      currentPage: 1,
      total: null,

      viewDialog: false // 预览弹窗
    };
  },
  mounted() {
    this.getreplyData();
  },
  methods: {
    // 获取列表
    getreplyData() {
      let params = {
        type: 3,
        page: this.currentPage,
        start_time: this.startTime,
        end_time: this.endTime,
        source_title: this.topicSearch,
        user_name: this.userNameSearch,
        nickname: this.nickNameSearch
      };
      this.HttpClient.post("/admin/comment/getList", params).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.tableData = res.data.data.data.data;
          this.total = res.data.data.data.total;
        }
      });
    },
    // 禁止
    forbidUseFn(row) {
      console.log(row)
      this.choseData = row;
      this.disableDialog = true;
      this.getoperateFn();
    },
    // 确定禁止类别
    sureforbidType() {
      console.log(this.disableDialogRadio);
      let params = {
        comment_id:this.choseData.comment_id,
        review: this.disableDialogRadio.name,
        review_id: this.disableDialogRadio.review_id,
        status: 3
      };
      this.HttpClient.post("/admin/comment/changeStatus",params).then(res => {
        console.log(res.data);
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          this.disableDialog = false
          setTimeout(() => {
            this.getreplyData()
          }, 500);
        }
      });
    },
    // 操作
    getoperateFn() {
      let params = {
        type: "comments"
      };
      this.HttpClient.post("/admin/webReview/getList", params).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.disableData = res.data.data;
        }
      });
    },
    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 分页
    CurrentChange(p) {
      this.currentPage = p;
      this.getreplyData();
    }
  }
};
</script>

<style lang="less">
.replyManagement {
  .bread {
    margin: 10px;
  }
  .replyManagement_main::-webkit-scrollbar {
    display: none;
  }
  .replyManagement_main {
    background: white;
    margin: 10px 10px 0 10px;
    height: calc(100vh - 150px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    padding-bottom: 50px;

    /*标题*/
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dedede;
    }

    .reply_content {
      text-align: left;
      padding: 0 40px;

      /*头部*/
      .reply_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;

        .reply_select {
          display: flex;
          .date_item {
            display: flex;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            margin-right: 20px;
            .el-input__inner {
              border: none !important;
            }
            .date_label {
              color: #808080;
              font-size: 12px;
              height: 28px;
              line-height: 28px;
              margin-left: 10px;
            }
            .date_picker_1 {
              width: 140px;
            }
          }
        }

        /*搜索框*/
        .reply_search {
          display: flex;
          align-items: center;
          > div {
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .reply_content_box {
        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }

        /*操作按钮*/
        .reply_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .reply_btm {
              display: flex;
              align-items: center;
              div:not(:last-child) {
                border-right: 1px solid #ebeef5;
              }
              div {
                min-height: 47px;
                height: 100%;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    /*底部数据*/
    .bottom {
      display: flex;
      align-items: center;
      padding-left: 40px;
      margin: 20px 0;
      div {
        background: #15bafe;
        color: #fff;
        padding: 10px 20px;
        margin-right: 20px;
        font-size: 14px;
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
        font-size: 20px;
        color: #15bafe;
      }
    }
    .disable_dialog_box:not(:last-child) {
      margin-bottom: 20px;
    }
    .disable_dialog_box {
      display: flex;
      align-items: flex-start;
      justify-content: center;
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

  /*预览弹窗*/
  .viewDialog {
    .viewDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        font-size: 20px;
        color: #15bafe;
      }
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .view_dialog_box {
      text-align: left;
      > p {
        font-size: 14px;
        color: #000;
        margin-bottom: 15px;
      }
      .view_content {
        height: 300px;
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
}
</style>
