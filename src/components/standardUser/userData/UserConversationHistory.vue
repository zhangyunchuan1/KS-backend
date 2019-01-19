<template>
  <div class="userConversationHistory">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userConversationHistory_main">
      <!--标题-->
      <div class="title">
        <p>用户对话历史</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              @change="changeTimeFn"
              v-model="searchTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

          <div class="content_header_search">
            <el-input placeholder="对话ID搜索" v-model="chatIDSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
            <el-input placeholder="用户昵称搜索" v-model="userNickName" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
            <el-input placeholder="对方昵称搜索" v-model="othersNickname" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="对话ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="180"
              show-overflow-tooltip
              prop="user_nickname"
            ></el-table-column>

            <el-table-column
              label="登录状态"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="user_status"
              :filters="[{text: '正常', value: 1}, {text: '禁用', value: 3}]"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_status==1?'正常':scope.row.user_status==3?'禁用':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="对方昵称"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="list_nickname"
            ></el-table-column>

            <el-table-column
              label="对方类型"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="list_uid_type"
              :filters="[{text: '用户', value: 1}, {text: '商家', value: 2}, {text: '客服', value: 3}]"
              :filter-method="filterTypeHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.list_uid_type==1?'用户':scope.row.list_uid_type==2?'商家':scope.row.list_uid_type==3?'客服':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="事件名称"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="eventName"
            >
              <template slot-scope="scope">
                <span>{{scope.row.list_uid_type==1?'用户':scope.row.list_uid_type==2?'商家':scope.row.list_uid_type==3?'客服':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="对话创建时间"
              align="center"
              width="200"
              show-overflow-tooltip
              prop="created_at"
            ></el-table-column>

            <el-table-column
              label="对话结束时间"
              align="center"
              width="200"
              show-overflow-tooltip
              prop="updated_at"
            ></el-table-column>

            <el-table-column
              label="对话次数"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="dialog_num"
              sortable
            ></el-table-column>

            <el-table-column
              label="对话状态"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="dl_status"
            >
              <template slot-scope="scope">
                <span>{{scope.row.dl_status==1?'正常':scope.row.dl_status==2?'屏蔽':''}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="lookchatInfoFn(scope.row)">查看对话</el-button>
                </div>
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

    <!--对话弹窗-->
    <el-dialog width="500px" custom-class="chatDialog" :visible.sync="chatDialog">
      <span slot="title" class="chatDialog_title">
        <i class="iconfont icon-xiaoxi"></i>{{rowdata.user_nickname}} 与 {{rowdata.list_nickname}} 的对话
      </span>
      <div class="chatDialog_box">
        <span>{{rowdata.created_at}} - 开始对话</span>
        <div v-for="(item,index) in dialogData" :key="index">
        <!--他人-->
        <div class="othersChat" v-if="item.send_id == rowdata.uid">
          <p>{{item.content}}</p>
        </div>

        <!--商户-->
        <div class="ownChat" v-if="item.send_id == rowdata.list_uid">
          <p>{{item.content}}</p>
        </div>
</div>
        <span>{{rowdata.updated_at}} - 结束对话</span>
      </div>
      <el-pagination
        v-if="dialogtotal"
        layout="prev, pager, next"
        :total="dialogtotal"
        :page-size="pagedialogSize"
        @current-change="currentdialogChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "UserConversationHistory",

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
          name: "用户对话历史",
          urls: "/index/standardUser/userData/UserConversationHistory",
          icon: "icon-home"
        }
      ],

      searchTime: "", // 选择时间

      chatIDSearch: "", // 聊天对话ID搜索
      userNickName: "", // 用户昵称搜索
      othersNickname: "", // 对方昵称搜索

      tableData: [],

      chatDialog: false, // 对话弹窗
      // userID:'',//用户ID
      // listuserID:'',//对方ID
      dialogData:[],
      rowdata:{},
      // starttime:'',
      // endtime:'',

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数

       // 弹框分页
      currentdialogPage: 1, // 当前页
      pagedialogSize: 8, // 每页显示数量
      dialogtotal: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    getlistData() {
      let params = {
        page_size: this.pageSize,
        page: this.currentPage,
        order_by: "dialog_num_low",
        user_nickname: this.userNickName,
        other_nickname: this.othersNickname,
        created_at: this.searchTime ? this.searchTime[0] : "",
        updated_at: this.searchTime ? this.searchTime[1] : "",
        id: this.chatIDSearch
      };
      this.HttpClient.post("/admin/userdialog/history", params).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          console.log(res.data.data.data);
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
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
    // 对方类型选择
    filterTypeHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 查看对话
    lookchatInfoFn(row) {
      console.log(row);
      console.log(row.uid);
      console.log(row.list_uid);
      this.chatDialog = true;
      this.rowdata = row
      // this.userID = row.uid;
      // this.listuserID = row.list_uid
      // this.starttime = row.created_at
      // this.endtime = row.updated_at
      this.getchatlistData()
    },
    getchatlistData(){
      let params = {
        list_uid:this.rowdata.list_uid,
        user_id:this.rowdata.uid,
        page_size:this.pagedialogSize,
        page:this.currentdialogPage
      }
      this.HttpClient.post("/admin/dialog/info",params).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.dialogtotal = res.data.data.total
          this.dialogData = res.data.data.data
        }
      });
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    // 弹框分页
    currentdialogChange(p){
      this.currentdialogPage = p;
      this.getchatlistData()
    }
  }
};
</script>

<style lang="less">
.userConversationHistory {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .userConversationHistory_main::-webkit-scrollbar {
    display: none;
  }
  .userConversationHistory_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .el-icon-arrow-down:before {
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
  /*对话弹窗*/
  .chatDialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 20px;
    }
    .chatDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .chatDialog_box {
      max-height: 500px;
      overflow: auto;
      box-sizing: border-box;
      padding: 10px 15px;
      border: 1px solid #dedede;
      span {
        display: block;
        text-align: center;
        font-size: 12px;
        color: #222;
        margin: 10px 0;
      }
      .othersChat {
        text-align: left;
        width: 60%;
        p {
          display: inline-block;
          background: #15bafe;
          color: #fff;
          padding: 4px 20px;
          margin: 3px 0;
        }
      }
      .ownChat {
        text-align: right;
        width: 60%;
        margin: 0 0 0 auto;
        p {
          display: inline-block;
          background: #f2f2f2;
          color: #222;
          padding: 4px 20px;
          margin: 3px 0;
          text-align: left;
        }
      }
    }
  }
}
</style>
