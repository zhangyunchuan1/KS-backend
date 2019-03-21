<template>
  <div class="newInformation">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>新消息</p>
        <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>

      <div class="content">
        <!--主体内容-->
        <div class="content_main">
          <div class="content_table">
            <el-table :data="tableData" :border="true" :row-class-name="tableRowClassName">
              <el-table-column label="对话创建时间" align="center" width="200" prop="created_at" sortable></el-table-column>

              <el-table-column label="用户昵称" align="center" width="280" prop="nickname"></el-table-column>

              <el-table-column label="用户类型" align="center" width="200" prop="type">
                <template slot-scope="scope">
                  <span v-if="scope.row.type === 1">用户</span>
                  <span v-if="scope.row.type === 2">商家</span>
                </template>
              </el-table-column>

              <el-table-column label="信息内容" align="center" width="650" prop="content"></el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="mallReview_scope"
                fixed="right"
              >
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button @click="handleOpenTalk(scope.row)">对话</el-button>
                    <el-button @click="handleEndMessage(scope.row)">结束对话</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              v-if="total"
              layout="prev, pager, next"
              :total="total"
              :page-size="25"
              @current-change="handleCurrentChange($event)"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--对话弹窗-->
    <el-dialog :visible.sync="chatDialog" width="800px" custom-class="chatDialog">
      <span slot="title" class="chatDialog_title">
        <i class="iconfont icon-mail"></i>
        对话- {{userName}}
      </span>
      <div class="chatDialog_main">
        <div class="main_content" id="neir">
          <div class="neir" v-for="(item,index) in MessageList" :key="index">
            <!-- 用户  判断发送者的id是否是新消息的用户uid，是的话为用户发送的信息 -->
            <div class="user_chat chat_list" v-if="item.send_id === listID">
              <div class="service_time">{{Tools.format(item.send_time)}}</div>
              <p class="service_message">
                <span class="service_serviceName">{{item.send_nickname}}</span>
              </p>
              <p class="user_content">{{item.content}}</p>
            </div>
            <!-- 客服 -->
            <div class="service_chat chat_list" v-if="item.send_id !== listID">
              <div class="service_time">{{item.send_time}}</div>
              <p class="service_message">
                <span class="service_serviceName">{{item.send_nickname}}</span>
              </p>
              <p class="chat_content">{{item.content}}</p>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          v-if="chatTotal"
          layout="prev, pager, next"
          :total="chatTotal"
          :page-size="this.chatpageSize"
          @current-change="chatCurrentChange"
        ></el-pagination>
        <div class="char_input">
          <el-input
            v-model="charContent"
            type="textarea"
            resize="none"
            placeholder="输入回复内容，请文明用语"
            :rows="2"
          ></el-input>
          <!-- @input="changeValue($event)" -->
        </div>
      </div>
      <!--对话丢失弹窗-->
      <el-dialog width="300px" :visible.sync="innerVisible" append-to-body>
        <div class="inner_box">
          <i class="iconfont icon-warning-circle"></i>
          <div>此对话已不存在！</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="chatDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleReply('a-component')">回 复</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "NewInformation",
  components: {
    BreadCrumb
    // serveRepiy,
    // UserRepiy,
    // aComponent
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "商城",
          urls: "/index/mall/Mall",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "客服",
          urls: "/index/mall/service/Service",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "新消息",
          urls: "/index/mall/service/NewInformation",
          icon: "icon-home"
        }
      ],
      tableData: [],
      managerID: "",
      charContent: "", //回复内容
      listID: "",
      // 聊天框
      chatDialog: false,
      innerVisible: false,
      userName: null, //对话人名字
      newMessage:null,  //新消息
      //分页
      total: null, //数据总条数
      pageSize: 25,
      currentPage: 1,

      // 对话历史列表分页
      chatpageSize: 5,
      chatCurrentpage: 1,
      chatTotal: 0,

      textarea: "", //回复内容
      MessageList: [
        {
          name: "飞机",
          type: 1,
          contant: "slkd就是改第一师范；联发科ghg浪费你好浪费更过来看你",
          time: "2018-11-25"
        },
        {
          name: "伐木工",
          type: 0,
          contant: "slkdghg浪费你好浪是否郭德纲费更过来看你",
          time: "2018-11-25"
        },
        {
          name: "非官方个",
          type: 1,
          contant: "slkdghg浪费你好鼎折覆餗浪费更过来看你",
          time: "2018-11-25"
        },
        {
          name: "飞刚发的机",
          type: 0,
          contant: "slkdghg浪费第三个是的发生的你好浪费更过来看你",
          time: "2018-11-25"
        }
      ]
    };
  },
  mounted() {
    this.getMessageList();
    this.socketApi.sendSock();
  },
  methods: {
    
    // changeValue(e){
    //     this.textarea = e;
    //     this.text.text = e;
    // },
    handleOpenTalk(row) {
      console.log(row);
      this.chatDialog = true;
      this.newMessage = row;
      this.managerID = row.manager_id;
      this.listID = row.uid;
      this.userName = row.nickname;
      this.getchatList();
    },
    getchatList() {
      let params = {
        cs_id: localStorage.getItem("userid"),
        list_uid: this.listID,
        page_size: this.chatpageSize,
        page: this.chatCurrentpage
      };
      this.HttpClient.post("/admin/message/info", params).then(res => {
        console.log(res.data);
        this.MessageList = res.data.data.data;
        //添加新消息到聊天框
        this.MessageList.push({
          send_id:this.newMessage.user_id,
          send_time:this.newMessage.created_at,
          send_nickname:this.newMessage.nickname,
          content:this.newMessage.content
        })
        this.chatTotal = res.data.data.total;
      });
    },
    chatCurrentChange(p) {
      this.chatCurrentpage = p;
      this.getchatList();
    },
    // 结束对话
    handleEndMessage(row) {
      const { manager_id } = row;
      this.HttpClient.post("/admin/end/message", { manager_id }).then(res => {
        const { code, msg } = res.data;
        if (code === 200) {
          this.$message.success(msg);
        }
      });
    },
    // 获取当前时间
    dateFtt() {
      var d=new Date();
      var year=d.getFullYear();
      var month=change(d.getMonth()+1);
      var day=change(d.getDate());
      var hour=change(d.getHours());
      var minute=change(d.getMinutes());
      var second=change(d.getSeconds());
      function change(t){
        if(t<10){
        return "0"+t;
        }else{
        return t;
        }
      }
      var time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
      return time;
    },
    //回复
    handleReply(component) {
      // return console.log(component, text)
      //   this.items.push({
      //     component: name,
      //     text: text
      //   })
      // console.log(component)
      let params = {
        manager_id: this.managerID,
        content: this.charContent,
        send_time: this.dateFtt()
      };
      console.log(params);
      this.HttpClient.post("/admin/receive/message", params).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.charContent = "";
          setTimeout(() => {
            this.getchatList();
          }, 500);
        }
      });
    },
    //对话框添加用户消息
    handleAddUserMessage() {},
    //获取对话历史
    getHistoryTalk() {
      // this.HttpClient.post('/admin/customer/message',{
      // })
      // .then(res=>{
      //     console.log(res);
      //     this.tableData = res.data.data;
      // })
    },
    // 获取板块列表
    getMessageList() {
      this.HttpClient.post("/admin/customer/message", {
        page: this.currentPage,
        page_size: this.pageSize
      }).then(res => {
        console.log(res);
        const {
          code,
          data: { total, data }
        } = res.data;
        if (code === 200) {
          this.tableData = data;
          this.total = total;
        }
      });
    },
    // 翻页
    handleCurrentChange(e) {
      this.getMessageList(e);
    },
    // 颜色区分用户和商家
    tableRowClassName({ row, rowIndex }) {
      if (row.type === 1) {
        return "success-row";
      } else if (row.type === 3) {
        return "warning-row";
      }
      return "";
    }
  }
};
</script>

<style lang="less">
.newInformation {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .newInformation_main::-webkit-scrollbar {
    display: none;
  }
  .newInformation_main {
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
      padding: 20px 40px;

      .content_main {
        /*表格*/
        .content_table {
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
            .success-row {
              background: #f0f9eb;
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
        }
      }
    }
  }
}

/*对话弹窗*/
.chatDialog {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .chatDialog_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
      margin-right: 15px;
    }
  }
  .chatDialog_main {
    .main_content {
      box-sizing: border-box;
      border: 1px solid #dedede;
      padding: 15px;
      height: 500px;
      overflow: auto;

      .chat_list:not(:last-child) {
        margin-bottom: 20px;
      }
      .neir {
        /*用户聊天*/
        .user_chat {
          text-align: left;
          span {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
            // padding-left: 15px;
            display: block;
          }
          .user_content {
            background: #15bafe;
            color: #fff;
            padding: 5px 10px;
            max-width: 500px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
          .service_time {
            font-size: 12px;
            margin-left: 10px;
            text-align: center;
            padding: 15px 0;
          }
          .service_message {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .service_serviceName {
              border-bottom: 2px solid #15bafe;
              font-size: 14px;
              color: #222;
            }
          }
        }

        /*客服聊天*/
        .service_chat {
          text-align: right;
          .service_time {
            font-size: 12px;
            margin-left: 10px;
            text-align: center;
            padding: 15px 0;
          }
          .service_message {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .service_serviceName {
              border-bottom: 2px solid #15bafe;
              font-size: 14px;
              color: #222;
            }
          }
          .chat_content {
            max-width: 500px;
            margin: 0 0 0 auto;
            background: #f2f2f2;
            font-size: 14px;
            color: #222;
            padding: 5px 10px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
        }
      }
    }
    .char_input {
      margin-top: 20px;
    }
  }
}
.inner_box {
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
</style>
