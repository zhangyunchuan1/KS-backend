<template>
  <div class="questionManagement">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="question_main">
      <div class="question_title">
        <div class="title">问题管理</div>
      </div>

      <div class="question_header">
        <el-date-picker
            v-model="contentTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getQuestionList">
        </el-date-picker>
        <div class="question_select">
          <el-select v-model="value" placeholder="类型" @change="handleTypeSearch($event)">
            <el-option label="全部" value=" "></el-option>
            <el-option
              v-for="item in options"
              :key="item.menu_id"
              :label="item.name"
              :value="item.menu_id"
            ></el-option>
          </el-select>
        </div>

        <div class="question_search">
          <div>
            <el-input placeholder="昵称搜索" v-model="nickname" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch()"></el-button>
            </el-input>
          </div>

          <div>
            <el-input placeholder="题目搜索" v-model="title" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleTitleSearch()"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="question_content">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column label="ID" align="center" width="65" prop="id" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="问题题目" align="center" prop="title" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="昵称" align="center" prop="nickname" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column label="用户名" align="center" prop="username" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="字数" align="center" prop="word_num" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.word_num === null" style="color:red">无</span>
              <span v-else>{{scope.row.word_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所属板块"
            align="center"
            prop="menu.folder_name"
            width="110">
          </el-table-column>
          <el-table-column
            label="子类"
            align="center"
            prop="menu.menu_1_name"
            width="130"
          ></el-table-column>
          <el-table-column
            label="用户类别"
            align="center"
            :filters="[{text: '个人用户', value: 1}, {text: '专业商家', value: 2}, {text: '普通商家', value: 3}]"
            :filter-method="filterSecondary"
            prop="user_type"
            width="130"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.user_type === 3">普通商家</span>
              <span v-if="scope.row.user_type === 2">专业商家</span>
              <span v-if="scope.row.user_type === 1">个人用户</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="130" prop="created_at" sortable></el-table-column>
          <el-table-column
            label="通过状态"
            align="center"
            :filters="[{text: '未通过', value: 3}, {text: '已通过', value: 1||2}]"
            :filter-method="filterSecondary"
            prop="status"
            width="120"
          >
            <template slot-scope="scope">
              <span class="notpass_color" v-if="scope.row.status === 3">未通过</span>
              <span class="notpass_color" v-if="scope.row.status === 2">未通过</span>
              <span class="normal_color" v-if="scope.row.status === 1">已通过</span>
              <span class="delete_color" v-if="scope.row.status === 0" style="color:red">已删除</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            align="center"
            :filters="[{text: '待审核', value: 2}, {text: '已审核', value: 1}, {text: '已删除', value: 0}, {text: '已驳回', value: 3}]"
            :filter-method="filterSecondary"
            prop="status"
            width="120"
          >
            <template slot-scope="scope">
              <span class="notpass_color" v-if="scope.row.status === 3">已驳回</span>
              <span class="audit_color" v-if="scope.row.status === 2">待审核</span>
              <span class="wait_color" v-if="scope.row.status === 1">已审核</span>
              <span class="delete_color" v-if="scope.row.status === 0" style="color:red">已删除</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="250"
            label="操作"
            fixed="right"
            align="center">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" v-if="scope.row.status===2|| scope.row.status===3" @click="handleOpenApproval(scope.row.question_id)">批准</el-button>
              <el-button type="primary" plain size="mini" v-if="scope.row.status===2|| scope.row.status===1" @click="handleReject(scope.row.question_id,scope.row.id,scope.row.title)">驳回</el-button>
              <el-button type="primary" plain size="mini" @click="updateButton(scope.row.id)">修改</el-button>
              <el-button type="primary" plain size="mini" v-if="scope.row.status===3" @click="handleOpendelete(scope.row.question_id)">删除</el-button>
              <el-button type="primary" plain size="mini" @click="handlePreview(scope.row.id)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          v-if="total"
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
      ></el-pagination>
    </div>

    <!--驳回弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>驳回
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">理由：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" v-model="textarea" :rows="4"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">类别：</div>
        <div class="disable_dialog_right">
          <el-radio
            border
            v-model="disableDialogRadio"
            v-for="(item,index) in rejectList"
            :label="item.id"
            :key="index"
            @change="tt(item)"
          >{{item.name}}</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureReject">确 定</el-button>
      </span>
    </el-dialog>

    <!--批准弹窗-->
    <el-dialog :visible.sync="approveDialog" width="470px" custom-class="approveDialog">
      <span slot="title" class="approveDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="approveDialog_main">
        <i class="iconfont icon-warning-circle"></i>
        <div class="approveDialog_text">确认批准吗？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureApproval">提 交</el-button>
      </span>
    </el-dialog>

    <!--删除弹窗-->
    <el-dialog width="470px" custom-class="deleteDialog" :visible.sync="deleteDialog" center>
      <span slot="title" class="deleteDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="deleteDialog_box">
        <i class="iconfont icon-warning-circle"></i>
        <p>确定删除吗？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";

export default {
  name: "QuestionManagement",
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
          name: "问题",
          urls: "/index/question/question",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "问题管理",
          urls: "/index/question/questionManagement",
          icon: "icon-home"
        }
      ],

      // 筛选下拉
      options: [],
      value: "",
      // 表格
      tableData: [],

      disableDialog: false, // 驳回弹窗
      disableDialogRadio: null,

      textarea: "",
      contentTime:[],

      deleteDialog: false, //删除弹窗

      remarkDialog: false, // 备注信息弹窗

      approveDialog: false, // 批准弹窗

      obtainedDialog: false, // 下架弹窗
      folder_id: null, //板块搜索的ID
      nickname: null, //昵称搜索
      title: null, //问题题目搜索
      questionId: null, //暂存需要操作的问题ID
      rejectList: [], //驳回类别
      rejectData: null, //选中的驳回类别
    };
  },
  mounted() {
    this.getQuestionList();
    this.getFolders()
  },
  methods: {
    // 获取板块列表
    async getFolders () {
      let res = await this.HttpClient.post('/admin/menu/getList', {menu_type: 2, type: 0})
      let data = await res.data
      console.log(data.data)
      if (data.code === 200) {
        this.options = data.data
      }
    },
    //修改按钮
    updateButton(id) {
      this.$router.push({
        path: "/index/question/question-modify",
        query: {
          id: id
        }
      });
    },
    //修改按钮
    handlePreview(id) {
      this.$router.push({
        path: "/index/question/question-preview",
        query: {
          id: id
        }
      });
    },
    //打开删除弹框
    handleOpendelete(id) {
      this.questionId = id;
      this.deleteDialog = true;
    },
    //确认删除
    handleDelete() {
      this.HttpClient.post("/admin/question/changeStatus", {
        question_id: this.questionId,
        status: 0
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getQuestionList();
          }, 350);
          this.deleteDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //选中驳回类别
    tt(data) {
      console.log(data);
      this.rejectData = data;
    },
    //打开驳回弹框
    handleReject(questionId, id, title) {
      this.HttpClient.post("/admin/webReview/getList", {
        type: "upload"
      }).then(res => {
        console.log(res);
        this.rejectList = res.data.data;
      });
      this.questionId = questionId;
      this.disableDialog = true;
    },
    //确认提交驳回
    handleSureReject() {
      this.HttpClient.post("/admin/question/changeStatus", {
        question_id: this.questionId,
        status: 3,
        refuse: this.textarea,
        review_id: this.rejectData.review_id,
        review_name: this.rejectData.name
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getQuestionList();
          }, 350);
          this.disableDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //打开批准弹框
    handleOpenApproval(id) {
      this.questionId = id;
      this.approveDialog = true;
    },
    //确认批准
    handleSureApproval() {
      this.HttpClient.post("/admin/question/changeStatus", {
        question_id: this.questionId,
        status: 1
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code) {
          this.$message.success(res.data.msg);
          this.approveDialog = false;
          setTimeout(() => {
            this.getQuestionList();
          }, 500);
        }
      });
    },
    //根据题目搜索
    handleTitleSearch() {
      this.getQuestionList();
    },
    //根据昵称搜索
    handleNickNameSearch() {
      this.getQuestionList();
    },
    //选择板块搜索
    handleTypeSearch(e) {
      this.folder_id = e;
      this.getQuestionList();
    },
    //获取问题列表
    getQuestionList() {
      this.HttpClient.post("/admin/question/getList", {
        start_time:this.contentTime[0],
        end_time:this.contentTime[1],
        folder_id:this.folder_id,
        nickname: this.nickname,
        title: this.title
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.data;
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
    }
  }
};
</script>

<style lang="less">
.questionManagement {
  .bread {
    margin: 10px;
  }
  .question_main::-webkit-scrollbar {
    display: none;
  }
  .question_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .question_title {
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
      /*刷新*/
      .refresh {
        cursor: pointer;
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }

    /*头部*/
    .question_header {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      padding: 30px 25px;
      .el-date-editor{
        width: 350px;
        margin-right: 30px;
      }
      /*搜索框*/
      .question_search {
        display: flex;
        align-items: center;
        > div {
          margin-left: 30px;
        }
      }
    }

    /*表格*/
    .question_content {
      padding: 0 30px;

      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
            .el-icon-arrow-down{
              color:#fff;
              font-size: 20px;
            }
          }
        }
      }
    }
  }

  /*驳回弹窗*/
  .disableDialog {
    .disableDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
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

  /*批准弹窗*/
  .approveDialog {
    .approveDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .approveDialog_main {
      text-align: center;
      i {
        font-size: 80px;
        color: #15bafe;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
  /*问题弹窗*/
  .deleteDialog {
    .deleteDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box {
      text-align: center;
      i {
        font-size: 80px;
        color: #15bafe;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
}
</style>
