<template>
  <div class="recruitSocialRecruitment">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <div class="title">
        <p>社会招聘</p>
        <p>
          <img src="../../assets/image/new.png" alt>
          <span>刷新</span>
        </p>
      </div>
      <div class="content_contain">
        <div class="choice">
          <div class="choice-left">
            <div style="display:flex;margin-right:10px">
              <!-- 姓名搜索 -->
              <el-input placeholder="请输入姓名" v-model="nameSearch" clearable></el-input>
              <el-button type="primary" icon="el-icon-search" @click="getlistData"></el-button>
            </div>
            <div style="display:flex;margin-right:10px">
              <!-- 学校搜索 -->
              <el-input placeholder="请输入学校名" v-model="schoolSearch" clearable></el-input>
              <el-button type="primary" icon="el-icon-search" @click="getlistData"></el-button>
            </div>
            <div style="display:flex;margin-right:10px">
              <!-- 职位搜索 -->
              <el-select v-model="positionID" placeholder="请选择" @change="getlistData">
                <el-option
                  v-for="item in positionData"
                  :key="item.positions_id"
                  :label="item.name"
                  :value="item.positions_id"
                ></el-option>
              </el-select>
            </div>
            <div style="display:flex;margin-right:10px">
              <!-- 教育程度搜索 -->
              <el-select v-model="educationSearch" placeholder="请选择教育程度" @change="getlistData">
                <el-option
                  v-for="item in educationOptions"
                  :key="item.label"
                  :label="item.value"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="tables">
          <el-table
            :data="list"
            border
            :stripe="true"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:0}"
            :row-style="{height:'40px'}"
            :cell-style="{padding:0}"
            style="width: 100%"
          >
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-checkbox></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" width="130"></el-table-column>
            <el-table-column prop="email" label="Email" width="200"></el-table-column>
            <el-table-column prop="school" label="学校" width="150"></el-table-column>
            <el-table-column prop="education" label="教育程度" width="80"></el-table-column>
            <el-table-column prop="major" label="专业" width="120"></el-table-column>
            <el-table-column prop="position_name" label="应聘职位" width="150"></el-table-column>
            <el-table-column prop="created_at" label="申请时间" width="200" sortable></el-table-column>
            <el-table-column prop="demand" label="特殊要求" width="120"></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100"
              :filters="[{text: '删除', value: 0}, {text: '正常', value: 1}, {text: '已邀请面试', value: 2}, {text: '拒绝', value: 3}, {text: '通过', value: 4},{text: '待审核', value: 5}]"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.status==0?'删除':scope.row.status==1?'正常':scope.row.status==2?'已邀请面试':scope.row.status==3?'拒绝':scope.row.status==4?'通过':scope.row.status==5?'待审核':''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="handleContact(scope.$index)">联系方式</el-button>
                <el-button size="small" type="text">
                  <a href download>简历</a>
                </el-button>
                <el-button
                  size="small"
                  type="text"
                  v-if="scope.row.status==3"
                  @click="deleteFn(scope.$index)"
                >删除</el-button>
                <el-button
                  size="small"
                  type="text"
                  @click="handleOperation(scope.$index,scope.row)"
                  v-if="scope.row.status!==3 && scope.row.status!==4"
                >操作</el-button>
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
    <!-- 查看联系方式 -->
    <el-dialog :visible.sync="seeVisible" width="470px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>联系方式：</span>
      </div>
      <div class="dlog">
        <p class="info">电话：</p>
        <div class="info-neir">{{phone}}</div>
        <p class="info">邮箱：</p>
        <div class="info-neir">{{email}}</div>
        <div class="btn">
          <el-button type="primary" @click="seeVisible = false">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 操作 -->
    <el-dialog :visible.sync="operationVisible" width="335px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>操作：</span>
      </div>
      <div class="dlog">
        <div class="pass" @click="pass">通过</div>
        <div class="nopass" @click="refuse">拒绝</div>
        <div class="interview" @click="interview" v-if="selectObj.status!==2">邀请面试</div>
        <div class="btn">
          <el-button type="primary" @click="operationVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 邀请面试 -->
    <!--发邮件-->
    <el-dialog :visible.sync="interviewDialog" width="800px" custom-class="mail_visible">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-faxian examine_icon"></i>
        <span>发邮件</span>
      </div>
      <div class="mail_content">
        <div class="mail_title">收件人</div>
        <div class="mail_body">
          <div class="recipient_email">{{email}}</div>
        </div>
      </div>
      <div class="mail_content">
        <div class="mail_title">模块选择</div>
        <div class="mail_select">
          <el-radio-group v-model="plateValue">
            <el-radio-button label="邀请面试"></el-radio-button>
            <el-radio-button label="拒绝申请"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="mail_content">
        <div class="mail_title">标题</div>
        <div class="mail_input">
          <el-input v-model="mailTitle"></el-input>
        </div>
      </div>
      <div class="mail_content">
        <div class="mail_title">内容编辑</div>
        <div class="mail_edit">
          <div class="edit-box">
            <div id="editor">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row>
          <el-button type="primary" class="btn_foot" @click="interviewDialog = false;">取消</el-button>
          <el-button type="primary" class="btn_foot" @click="sendInterviewFn">发送</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "../public/BreadCrumb";
export default {
  name: "RecruitSocialRecruitment",
  components: { BreadCrumb },
  data() {
    return {
      phone: "18996657240",
      email: "1028580665@qq.com",
      seeVisible: false,
      operationVisible: false,
      breadData: [
        {
          id: 1,
          name: "招聘",
          urls: "/index",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "社会招聘",
          urls: "/index/RecruitSocialRecruitment",
          icon: "icon-home"
        }
      ],
      options: [
        {
          value: "1",
          label: "由高到低"
        },
        {
          value: "2",
          label: "由低到高"
        }
      ],
      value: "",
      plateValue: "", // 板块选中值
      list: [], //原始数组
      slist: [], //渲染数组
      index: "",
      mailTitle: "", // 邮件标题
      interviewDialog: false,
      textarea: "", //文本域输入内容
      nameSearch: "", //姓名搜索
      schoolSearch: "", //学校搜索
      educationOptions: [
        { value: "小学", label: 1 },
        { value: "初中", label: 2 },
        { value: "高中", label: 3 },
        { value: "大学专科", label: 4 },
        { value: "大学本科", label: 5 },
        { value: "研究生", label: 6 },
        { value: "博士生", label: 7 }
      ],
      educationSearch: null, //教育程度搜索
      positionID: "", //职位ID
      positionData: [], //职位数据
      opennum: 0,
      selectObj: {}, //点击操作选中的内容

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
    this.getpositionData();
  },
  methods: {
    getpositionData() {
      this.HttpClient.post("/admin/position/getList").then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.positionData = res.data.data;
        }
      });
    },
    getlistData() {
      let params = {
        school: this.schoolSearch,
        name: this.nameSearch,
        education_type: this.educationSearch,
        positions_id: this.positionID
      };
      this.HttpClient.post("/admin/positionApply/getList", params)
        .then(res => {
          console.log(res.data.data);
          this.list = res.data.data.data;
          this.total = res.data.data.total;
        })
        .catch(e => {
          console.log("请求失败" + e);
        });
    },
    handleOperation(index, row) {
      this.selectObj = row;
      this.operationVisible = true;
      this.index = index;
      this.email = this.list[index].email;
    },
    handleContact(index) {
      this.seeVisible = true;
      // console.log(this.list[index].phone)
      this.phone = this.list[index].phone;
      this.email = this.list[index].email;
    },
    // 点击删除
    deleteFn(index) {
      this.index = index;
      console.log(this.list[this.index]);
      this.operateFn(0)
    },
    operateFn(status){
      this.HttpClient.post("/admin/positionApply/changeStatus", {
        id: this.list[this.index].id,
        status: status
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.operationVisible = false;
            this.index = "";
            setTimeout(() => {
              this.getlistData();
            }, 500);
          }
        })
        .catch(e => {
          console.log("请求失败" + e);
        });
    },
    //点击通过
    pass() {
      console.log(this.list[this.index]);
      this.operateFn(4)
    },
    //点击拒绝
    refuse() {
      console.log(this.list[this.index]);
      this.operateFn(3)
    },
    // 点击邀请面试
    interview() {
      this.interviewDialog = true;
      var E = require("wangeditor");
      var editor = new E("#editor");
      // 自定义菜单配置
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      this.opennum++;
      setTimeout(() => {
        console.log(this.opennum);
        if (this.opennum > 1) {
          return;
        } else {
          editor.create();
        }
      }, 500);
    },
    // 点击发送
    sendInterviewFn() {
      this.interviewDialog = false;
      this.operateFn(2)
    },
    // 状态选择
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

<style scoped>
.bread {
  margin: 10px;
}
.content::-webkit-scrollbar {
  display: none;
}
.content {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  height: calc(100vh - 100px);
  width: calc(100vw - 221px);
  border-radius: 2px;
  overflow-y: auto;
}
.content_contain {
  padding: 30px 55px;
  box-sizing: border-box;
}
.title {
  text-align: start;
  height: 70px;
  line-height: 70px;
  border-bottom: 2px solid #f2f2f2;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  color: #222222;
}
.choice {
  display: flex;
  justify-content: space-between;
}
.choice-left {
  display: flex;
}
.choice-right {
  display: flex;
}
.tables {
  margin-top: 20px;
}
.dialog_delete_head_title {
  height: 16px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
  color: #a2a2a2;
}
.delete_icon {
  color: #15bafe;
  font-size: 18px;
  top: 1px;
  position: relative;
}
.info-neir {
  height: 35px;
  width: 410px;
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 14px;
  text-align: left;
  line-height: 35px;
}
.dlog {
  text-align: center;
}
.dlog > p {
  margin: 15px 0;
  text-align: left;
}
.btn {
  margin-top: 15px;
}
.pass {
  cursor: pointer;
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #4cd01a;
  /* margin-top: 20px; */
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
.nopass {
  cursor: pointer;
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #f95452;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
.interview {
  cursor: pointer;
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #15bafe;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
</style>
<style lang="less">
.recruitSocialRecruitment {
  .el-table th > .cell {
    text-align: center;
  }
  .el-table th {
    background-color: #15bafe;
  }
  .el-table thead {
    color: #fff;
  }

  .el-icon-arrow-down:before {
    color: #fff;
  }
  .choice {
    .el-select {
      margin-right: 12px;
    }
  }
  /*发邮件弹窗*/
  .mail_visible {
    .dialog_head_title {
      text-align: start;
      font-size: 14px;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 10px;
    }
    .mail_content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      margin-bottom: 15px;

      .mail_title {
        width: 15%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #15bafe;
        margin-right: 10px;
      }
      .mail_body {
        width: 80%;
        height: 40px;
        line-height: 40px;
        border: 1px solid #15bafe;
        border-radius: 3px;
        box-sizing: border-box;
      }
      .mail_select {
        width: 80%;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: #15bafe;
          border-color: #15bafe;
        }
      }
      .mail_input {
        width: 80%;
        .el-input__inner:focus {
          border-color: #15bafe;
        }
      }
      .mail_edit {
        position: relative;
        width: 100%;
        margin-top: 15px;
        text-align: left;
        .icon-huaban4 {
          margin: 5px 0 0 5px;
          font-size: 20px;
          color: #15bafe;
        }
        .mail_edit_body {
          margin-top: 15px;
          height: 192px;

          //富文本
          .ql-toolbar.ql-snow {
            border-left: none;
            border-right: none;
          }
          .ql-container.ql-snow {
            border-left: none;
            border-right: none;
            border-bottom: none;
            height: 150px;
          }
        }
        .mail_basic_info {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;

          .basic_info_item {
            color: #fff;
            font-size: 14px;
            background: #15bafe;
            padding: 5px 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          .basic_info_item:first-child {
            width: 60%;
          }
          .basic_info_item:nth-child(2) {
            width: 40%;
            padding: 6.5px 10px;
          }
          .basic_info_item:nth-child(3) {
            width: 70%;
          }
          .basic_info_item:last-child {
            width: 30%;
          }
        }
      }
    }
  }
}
</style>
