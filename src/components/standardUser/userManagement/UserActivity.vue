<template>
    <div class="userActivity">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="userActivity_main">
        <!--标题-->
        <div class="title">
          <p>用户活跃度</p>
        </div>

        <div class="content">
          <div class="content_chart">

          </div>

          <div class="content_header">
            <div class="content_header_search">
              <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="initData(nickNameSearch)"></el-button>
              </el-input>
              <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="initData('', userNameSearch)"></el-button>
              </el-input>
            </div>
          </div>

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="ID"
                align="center"
                width="80"
                prop="id"
                sortable>
              </el-table-column>

              <el-table-column
                label="用户昵称"
                align="center"
                width="220"
                show-overflow-tooltip
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户名"
                align="center"
                show-overflow-tooltip
                width="220"
                prop="username">
              </el-table-column>

              <el-table-column
                label="电话"
                align="center"
                show-overflow-tooltip
                width="220"
                prop="phone">
              </el-table-column>

              <el-table-column
                label="余额"
                align="center"
                show-overflow-tooltip
                width="180"
                prop="balance"
                sortable>
              </el-table-column>

              <el-table-column
                label="平均登陆时间（天）"
                align="center"
                show-overflow-tooltip
                width="200"
                prop="average_login"
                sortable>
              </el-table-column>

              <el-table-column
                label="电量"
                align="center"
                show-overflow-tooltip
                width="220"
                prop="electric"
                sortable>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="table_scope">
                <template slot-scope="scope">
                  <div class="scope_btm">
                    <el-button size="medium" type="text" @click="sendMessageFn(scope.row)">发私信</el-button>
                    <el-button size="medium" type="text">查看用户页面</el-button>
                  </div>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :current-page.sync="currentPage"
              :page-size="25"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>

        </div>
      </div>

      <!--查看私信弹窗-->
      <el-dialog
        width="400px"
        custom-class="chatDialog"
        :visible.sync="chatDialog">
        <span slot="title" class="chatDialog_title"><i class="iconfont icon-message"></i>发私信</span>
        <div class="chat_dialog_box" v-for="(item,index) in messageData " :key="index">
          <div class="chat_list chat_user" v-if="item.receive_id !== userID">
            <div class="chat_time">{{item.send_time}}</div>
            <div class="chat_message">{{item.content}}</div>
          </div>
          <div class="chat_list chat_admin" v-if="item.receive_id == userID">
            <div class="chat_time">{{item.send_time}}</div>
            <div class="chat_message">{{item.content}}</div>
          </div>
        </div>
        <div class="chat_input">
          <el-input placeholder="输入私信内容" v-model="messageContent" clearable  @keyup.enter='sendContent'></el-input>
          <el-button type="primary" @click="sendContent">发送</el-button>
        </div>
         <el-pagination
              layout="prev, pager, next"
              :total="totalmessage"
              :current-page.sync="currentmessagePage"
              :page-size="10"
              @current-change="handleCurrentmessageChange"
            >
            </el-pagination>
      </el-dialog>

    </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserActivity",
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
          }, {
            id: 2,
            name: "用户账户",
            urls: "/index/standardUser/userManagement/UserManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户活跃度",
            urls: "/index/standardUser/userManagement/UserActivity",
            icon: "icon-home"
          }
        ],

        nickNameSearch: '',
        userNameSearch: '',
        messageContent:'',//私信内容
        userID:'',

        tableData:[],

        chatDialog: false,  // 发私信弹窗
        total: 0,          // 总的数据
        currentPage: 1,     // 当前页码

        // messageInfo:{},
        messageData:[],
        totalmessage: 0,          // 总的数据
        currentmessagePage: 1     // 当前页码
      }
    },

    mounted () {
      this.initData()
    },

    methods: {
     timestampToTime(timestamp) {
        var date = new Date(timestamp*1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y+M+D+h+m+s;
    },
      handleCurrentmessageChange(p){
        this.currentmessagePage = p;
        this.getmessageList();
      },
      // 私信列表
      getmessageList(){
        this.HttpClient.post('/admin/user/message',{user_id:this.userID,page_size:4,page:this.currentmessagePage}).then(res => {
          // console.log(res.data)
          // if(res.data.code === 200){
            this.messageData = res.data.data
            this.totalmessage = res.data.total
            this.messageData.forEach(item => {
              item.send_time = this.timestampToTime(item.send_time)
            })
            console.log(this.messageData)
          // }
        })
      },
      initData(nickname='', user_name='', page=1) {
        const data = {
          nickname,
          user_name,
          page
        }

        this.HttpClient.post('/admin/users/liveness', data)
          .then(res => {
            if (res.data.code === 200) {
              const { data: { data, total, current_page } } = res.data
              if (data) {
                this.tableData = data
                this.total = total
                this.currentPage = current_page
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
      },

      // 翻页之类的
      handleCurrentChange(val) {
        this.initData('', '', val)
      },

      // 发私信
      sendMessageFn(row){
        this.messageInfo = row;
        this.chatDialog = true;
        this.userID = row.uid;
        this.getmessageList()
      },
      // 点击发送
      sendContent(){
        
        console.log((Date.parse(new Date()))/1000)
        let params = {
          receive_id:this.userID,
          content:this.messageContent,
          send_time:(Date.parse(new Date()))/1000
        }
        this.HttpClient.post('/admin/private/message',params).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
            this.messageContent = ''
            setTimeout(() => {
              this.getmessageList()
            }, 500);
          }
        })
      },
    }
  }
</script>

<style lang="less">
  .userActivity{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userActivity_main::-webkit-scrollbar {
      display: none;
    }
    .userActivity_main {
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
          .content_header_search{
            display: flex;
            align-items: center;
            .input-with-select{
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
          .el-table::before{
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }
          .table_avatar{
            margin: 0 auto;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-content: center;
            overflow: hidden;
            img{
              width: 100%;
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
                .el-button{
                  border: none;
                  background: transparent;
                }
              }
            }
          }
          .el-pagination{
            text-align: center;
            margin-top: 20px;
          }
        }
      }
    }

    /*发私信弹窗*/
    .chatDialog{
      .el-dialog__body{
        padding: 0 0 20px 20px;
      }
      .chatDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .chat_dialog_box{
        // height: 300px;
        overflow: auto;

        .chat_list{
          padding-right: 20px;
          margin-bottom: 10px;
          .chat_time{
            margin: 10px 0 5px 0;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        }
        .chat_user{
          .chat_message{
            display: inline-block;
            padding: 3px 10px;
            background: #15bafe;
            color: #fff;
            max-width: 60%;
            border-radius: 2px;
          }
        }

        .chat_admin{
          text-align: right;
          .chat_message{
            display: inline-block;
            padding: 3px 10px;
            background: #dedede;
            color: #000;
            max-width: 60%;
            border-radius: 2px;
            margin: 0 0 0 auto;
          }
        }

      }

      .chat_input{
        display: flex;
        align-items: center;
        padding-top: 10px;
        margin-right: 20px;
        margin-top: 15px;
        border-top: 1px solid #dedede;

        .el-input{
          margin-right: 20px;
          .el-input__inner{
            height: 30px;
            line-height: 30px;
          }
        }
        .el-button{
          padding: 7px 20px;
        }
      }
    }

  }
</style>
