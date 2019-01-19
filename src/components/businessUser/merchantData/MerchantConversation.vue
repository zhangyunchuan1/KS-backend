<template>
  <div class="merchantConversation">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="merchantConversation_main">
      <!--标题-->
      <div class="title">
        <p>商家对话</p>
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
            <el-input placeholder="对话ID搜索" v-model="chatIDSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="gettablelistData"></el-button>
            </el-input>
            <el-input placeholder="商家昵称搜索" v-model="BusinessNickName" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="gettablelistData"></el-button>
            </el-input>
            <el-input placeholder="对方昵称搜索" v-model="othersNickname" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="gettablelistData"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="对话ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="180"
              show-overflow-tooltip
              prop="user_nickname"
            ></el-table-column>

            <el-table-column
              label="登录状态"
              align="center"
              width="120"
              prop="user_status"
              :filters="[{text: '正常', value: 1}, {text: '禁用', value: 3}]"
              :filter-method="filterHandlerloginstatus"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_status == 1?'正常':scope.row.user_status == 3?'禁用':''}}</span>
              </template>
            </el-table-column>

            <el-table-column label="对方昵称" align="center" width="180" prop="list_nickname"></el-table-column>

            <el-table-column label="事件名称" align="center" width="120" prop="type">
              <template slot-scope="scope">
                <span>{{scope.row.type == 1?'活动':scope.row.type == 2?'服务':scope.row.type == 3?'商城':scope.row.type == 4?'他人':scope.row.type == 5?'淘货':scope.row.type == 6?'购物车':scope.row.type == 7?'关注':scope.row.type == 8?'客服':scope.row.type == 9?'视频':''}}</span>
              </template>
            </el-table-column>

            <el-table-column label="对话创建时间" align="center" width="200" prop="created_at"></el-table-column>

            <el-table-column label="对话结束时间" align="center" width="200" prop="updated_at"></el-table-column>

            <el-table-column label="对话次数" align="center" width="120" prop="dialog_num" sortable></el-table-column>

            <el-table-column label="对话状态" align="center" width="120" prop="dl_status">
              <template slot-scope="scope">
                <span>{{scope.row.dl_status == 1?'正常':'屏蔽'}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="lookChatFn(scope.row)">查看对话</el-button>
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
        <i class="iconfont icon-xiaoxi"></i>
        {{bussinessName}} 与 {{userName}} 的对话
      </span>
      <div class="chatDialog_box">
        <span>{{starttime}} - 开始对话</span>
        <div v-for="(item,index) in chatData" :key="index">
          <!--他人-->
          <div class="othersChat" v-if="dialoguserID == item.send_id">
            <p>{{item.content}}</p>
          </div>

          <!--商户-->
          <div class="ownChat" v-if="dialogID == item.send_id">
            <p>{{item.content}}</p>
          </div>
        </div>
        <span>{{endtime}} - 结束对话</span>
      </div>
      <el-pagination
        v-if="totaldialog"
        layout="prev, pager, next"
        :total="totaldialog"
        :page-size="pageSize"
        @current-change="currentdialogChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "MerchantConversation",
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
          name: "商家对话",
          urls: "/index/market/businessUser/merchantData/MerchantConversation",
          icon: "icon-home"
        }
      ],

      searchTime: "", // 选择时间

      chatIDSearch: "", // 聊天对话ID搜索
      BusinessNickName: "", // 商家昵称搜索
      othersNickname: "", // 对方昵称搜索
      chatNumSearch: "dialog_num_low", //对话次数

      tableData: [],

      chatDialog: false, // 对话弹窗
      bussinessName: "", //商家名称
      userName: "", //用户名称

      // 聊天框
      chatData:[],//聊天数据

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数
      // 弹框分页
      dialogID: "", //对方ID
      dialoguserID: "", //用户ID
      starttime:'',//开始时间
      endtime:'',//结束时间
      currentdialogPage: 1, // 当前页
      pageSizedialog: 10,
      totaldialog: 0 // 数据总条数
    };
  },
  mounted() {
    this.gettablelistData();
  },
  methods: {
    gettablelistData() {
      let params = {
        page_size: this.pageSize,
        page: this.currentPage,
        order_by: this.chatNumSearch,
        user_nickname: this.BusinessNickName,
        other_nickname: this.othersNickname,
        id: this.chatIDSearch,
        created_at: this.searchTime ? this.searchTime[0] : "",
        updated_at: this.searchTime ? this.searchTime[1] : "",
        user_status: "",
        other_type: ""
      };
      this.HttpClient.post("/admin/shopdialog/history", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 登录状态筛选
    filterHandlerloginstatus(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 时间区间筛选
    timeSearchFn() {
      console.log(this.searchTime);
      this.gettablelistData();
    },
    // 查看对话
    lookChatFn(row) {
      console.log(row);
      this.chatDialog = true;
      this.dialogID = row.list_uid;
      this.dialoguserID = row.uid
      this.bussinessName = row.user_nickname;
      this.userName = row.list_nickname;
      this.starttime = row.created_at
      this.endtime = row.updated_at
      this.getchatlist()
    },
    getchatlist(){
      let params = {
        page_size: this.pageSizedialog,
        page: this.currentdialogPage,
        list_uid:this.dialogID,
        user_id:this.dialoguserID
      };
      this.HttpClient.post("/admin/dialog/info", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.chatData = res.data.data.data
          this.totaldialog = res.data.data.total
        }
      });
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    // 弹框分页
    currentdialogChange(p) {
      this.currentdialogPage = p;
      this.getchatlist()
    }
  }
};
</script>

<style lang="less">
.merchantConversation {
  text-align: left;

  .bread {
    margin: 10px;
  }

  .merchantConversation_main::-webkit-scrollbar {
    display: none;
  }

  .merchantConversation_main {
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
</style>
