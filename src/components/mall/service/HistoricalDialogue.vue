<template>
  <div class="HistoricalDialogue">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>历史对话</p>
        <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>
        <div class="question_search">
          <div>
            <el-input placeholder="用户昵称搜索搜索" v-model="nickNameSearch" class="input-with-select" @input="search($event)">
              <el-button slot="append" icon="el-icon-search" @click="handleTitleSearch"></el-button>
            </el-input>
          </div>
        </div>

      <div class="content">

        <!--主体内容-->
        <div class="content_main">

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true"
              :row-class-name="tableRowClassName">
              <el-table-column
                label="对话结束时间"
                align="center"
                width="200"
                prop="updated_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="用户昵称"
                align="center"
                width="280"
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                width="200"
                prop="type">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">用户</span>
                    <span v-if="scope.row.type === 2">商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="信息内容"
                align="center"
                width="250"
                prop="content">
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
                width="180"
                prop="status">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">未开始</span>
                  <span v-if="scope.row.status === 2">已回复</span>
                  <span v-if="scope.row.status === 3">未回复</span>
                  <span v-if="scope.row.status === 4">已结束</span>
                  <span v-if="scope.row.status === 5">被屏蔽</span>
                  <span v-if="scope.row.status === 6">已交接</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button @click="handleOpenTalk(scope.row)">查看对话</el-button>
                    <el-button  @click="handleOpenShield(scope.row)">屏蔽原因</el-button>
                    <el-button @click="handleOpenRelieveShield(scope.row)">解除屏蔽</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
          v-if="total"
          layout="prev, pager, next"
          :total="total"
          :page-size="25"
          @current-change="handleCurrentChange($event)">
      </el-pagination>

    <!--对话弹窗--> 
    <el-dialog
      :visible.sync="chatDialog"
      width="800px"
      custom-class="chatDialog">
      <span slot="title" class="chatDialog_title"><i class="iconfont icon-mail"></i>对话-王大锤</span>
      <div class="chatDialog_main">
        <div class="main_content" id="neir">
          <div class="neir" v-for="(item,index) in MessageList" :key="index">
              <!-- 用户 -->
              <div class="user_chat chat_list" v-if="item.type === 1">
                <span>{{item.name}}</span>
                <p>{{item.contant}}</p>
              </div>
              <!-- 客服 -->
              <div class="service_chat chat_list" v-if="item.type === 0">
                <p class="service_message">
                  <span class="service_serviceName">{{item.name}}</span>
                  <span class="service_time">{{item.time}}</span>
                </p>
                <p class="chat_content">{{item.contant}}</p>
              </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chatDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--驳回弹窗-->
      <el-dialog
        width="470px"
        custom-class="disableDialog"
        :visible.sync="disableDialog">
        <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>屏蔽原因</span>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">理由：</div>
          <div class="disable_dialog_right">
            <el-input
              type="textarea"
              resize="none"
              v-model="textarea"
              :rows="4">
            </el-input>
          </div>
        </div>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">屏蔽类别：</div>
          <div class="disable_dialog_right">
            <el-radio border v-for="(item,index) in 2" :label="item.id" :key="index" >{{item.name}}不靠谱</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureReject">确 定</el-button>
      </span>
      </el-dialog>
      <!--解除屏蔽弹窗-->
      <el-dialog
        width="470px"
        custom-class="deleteDialog"
        :visible.sync="deleteDialog"
        center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="deleteDialog_box">
          <i class="iconfont icon-warning-circle"></i>
          <p>确定解除屏蔽吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleRecovery">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  
  export default {
    name: "HistoricalDialogue",
    
    components: {
      BreadCrumb,
      // serveRepiy,
      // UserRepiy,
      // aComponent

    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/mall/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '客服',
          urls: '/index/service/Service',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '历史对话',
          urls: '/index/service/HistoricalDialogue',
          icon: 'icon-home'
        }],
        tableData:[],
        MessageList:[{
          name:'飞机',
          type:1,
          contant:'slkd就是改第一师范；联发科ghg浪费你好浪费更过来看你',
          time:'2018-11-25'
        },{
          name:'伐木工',
          type:0,
          contant:'slkdghg浪费你好浪是否郭德纲费更过来看你',
          time:'2018-11-25'
        },{
          name:'非官方个',
          type:1,
          contant:'slkdghg浪费你好鼎折覆餗浪费更过来看你',
          time:'2018-11-25'
        },{
          name:'飞刚发的机',
          type:0,
          contant:'slkdghg浪费第三个是的发生的你好浪费更过来看你',
          time:'2018-11-25'
        }],
        total:null,
        textarea:'',
        nickNameSearch:null,  //用户昵称搜索
        chatDialog:false, 
        disableDialog:false,
        deleteDialog:null,
      }
    },
    mounted () {
      this.getTableData()
    },
    methods:{
      // 获取列表数据
      getTableData () {
        this.HttpClient.post('/admin/message/manager')
          .then(res => {
            const { code, data } = res.data
            if (code === 200) {
              this.tableData = data
            }
          })
      },
        handleOpenRelieveShield(){
            this.deleteDialog = true;
        },
        handleRecovery(){

        },
        handleSureReject(){

        },
        search(){

        },
        handleTitleSearch(){

        },
        handleOpenTalk(){
            this.chatDialog = true;
        },
        handleOpenShield(){
            this.disableDialog = true;
        },
        handleCurrentChange(e){
            console.log(e)
        },
        tableRowClassName({row, rowIndex}) {
            if (row.type === 1) {
            return 'success-row';
            } else if (row.type === 3) {
            return 'warning-row';
            }
            return '';
        }
    }
  }
</script>

<style lang="less">
  .HistoricalDialogue{
    text-align: left;
    /*对话*/ 
    .chatDialog{
    .el-dialog__body{
      padding-top: 0;
      padding-bottom: 0;
    }
    .chatDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .chatDialog_main{
      .main_content{
        box-sizing: border-box;
        border: 1px solid #dedede;
        padding: 15px;
        height: 500px;
        overflow: auto;

        .chat_list:not(:last-child){
          margin-bottom: 20px;
        }
        .neir{
        /*用户聊天*/
        .user_chat{
          span{
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
            padding-left: 15px;
            display: block;
          }
          p{
            background: #15bafe;
            color: #fff;
            padding: 5px 10px;
            max-width: 500px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
        }
      
        /*客服聊天*/
        .service_chat{
          text-align: right;
          .service_message{
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .service_serviceName{
              border-bottom: 2px solid #15bafe;
              font-size: 14px;
              color: #222;
            }
            .service_time{
              font-size: 12px;
              margin-left: 10px;
            }

          }
          .chat_content{
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
    }
  }
  .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
        }
      }
      .disable_dialog_box:not(:last-child){
        margin-bottom: 20px;
      }
      .disable_dialog_box{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        /*单选框*/
        .disable_dialog_right{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 275px;
          /*单选框样式*/
          .el-radio:nth-child(1){
            margin-top: 0;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label{
              color: #fff;
            }
          }
          .el-radio{
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 275px;
            margin: 10px auto;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
        }
      }
    }
    .bread{
      margin: 10px;
    }
    .newInformation_main::-webkit-scrollbar {display:none}
    .newInformation_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

        /*搜索框*/
        .question_search{
          display: flex;
          align-items: center;
          >div{
              margin-top: 20px;
            margin-left: 40px;
          }
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

      .content{
        box-sizing: border-box;
        padding: 20px 40px;

        .content_main{
          /*表格*/
          .content_table {
            box-sizing: border-box;
            .el-table--border::after,
            .el-table--group::after,
            .el-table::before{
              background: unset;
            }
            .el-table {
              border: none;
              border-left: 1px solid #ebeef5;
                .warning-row {
                    background: rgb(202, 169, 106);
                }

                .success-row {
                    background: #f0f9eb;
                }
              thead {
                color: #fff;
                th, tr {
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
                  .el-button{
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
    /*解除屏蔽*/ 
    .deleteDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  /*对话弹窗*/
  .chatDialog{
    .el-dialog__body{
      padding-top: 0;
      padding-bottom: 0;
    }
    .chatDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .chatDialog_main{
      .main_content{
        box-sizing: border-box;
        border: 1px solid #dedede;
        padding: 15px;
        height: 500px;
        overflow: auto;

        .chat_list:not(:last-child){
          margin-bottom: 20px;
        }
        .neir{
        /*用户聊天*/
        .user_chat{
          span{
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
            padding-left: 15px;
            display: block;
          }
          p{
            background: #15bafe;
            color: #fff;
            padding: 5px 10px;
            max-width: 500px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
        }
      
        /*客服聊天*/
        .service_chat{
          text-align: right;
          .service_message{
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .service_serviceName{
              border-bottom: 2px solid #15bafe;
              font-size: 14px;
              color: #222;
            }
            .service_time{
              font-size: 12px;
              margin-left: 10px;
            }

          }
          .chat_content{
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
    }
  }

</style>

