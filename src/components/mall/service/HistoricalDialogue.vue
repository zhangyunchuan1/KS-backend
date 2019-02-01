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
                prop="end_time"
                sortable
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                label="用户昵称"
                align="center"
                width="280"
                prop="nickname"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                width="200"
                prop="type"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">用户</span>
                    <span v-if="scope.row.type === 2">商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="信息内容"
                align="center"
                width="300"
                prop="content"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
                width="180"
                prop="status"
                :filters="[{ text: '未开始', value: 1}, { text: '已回复', value: 2}, { text: '未回复', value: 3}, { text: '已结束', value: 4}, { text: '被屏蔽', value: 5}, { text: '已交接', value: 6}]"
                :filter-method="filterHandler"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">未开始</span>
                  <span v-if="scope.row.status === 2">已回复</span>
                  <span v-if="scope.row.status === 3">未回复</span>
                  <span v-if="scope.row.status === 4">已结束</span>
                  <span :class="notpass_color" v-if="scope.row.status === 5">被屏蔽</span>
                  <span v-if="scope.row.status === 6">已交接</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                min-width="200"
                flexd="right">
                <template slot-scope="scope">
                  
                    <el-button type="primary" plain size="mini" @click="handleOpenTalk(scope.row)">查看对话</el-button>
                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 5" @click="handleOpenShield(scope.row)">屏蔽原因</el-button>
                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 5" @click="handleOpenRelieveShield(scope.row)">解除屏蔽</el-button>
                  
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div style="text-align:center;">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="25"
          @current-change="handleCurrentChange($event)">
      </el-pagination>
    </div>

    <!--对话弹窗--> 
    <el-dialog
      :visible.sync="chatDialog"
      width="800px"
      custom-class="chatDialog">
      <span slot="title" class="chatDialog_title"><i class="iconfont icon-mail"></i>对话-{{nickname}}</span>
      <div class="chatDialog_main">
        <div class="main_content" id="neir">
          <div class="neir" v-for="(item,index) in MessageList" :key="index">
              <!-- 用户 -->
              <div class="user_chat chat_list" v-if="item.type === 2">
                <span>{{item.send_nickname}}&nbsp;{{item.send_time}}</span>
                <p>{{item.content}}</p>
              </div>
              <!-- 客服 -->
              <div class="service_chat chat_list" v-if="item.type === 1">
                <p class="service_message">
                  <span class="service_serviceName">{{item.send_nickname}}</span>
                  <span class="service_time">{{item.send_time}}</span>
                </p>
                <p class="chat_content">{{item.content}}</p>
              </div>
          </div>
        </div>
      </div>
      <div class="fenye">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total2">
        </el-pagination>
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
              :rows="4"
              @current-change="handleCurrentChangeMessage($event)">
            </el-input>
          </div>
        </div>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">屏蔽类别：</div>
          <div class="disable_dialog_right">
              <el-radio border :label="radioValue" >{{radioValue}}</el-radio> 
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">关 闭</el-button>
        <!-- <el-button type="primary" @click="handleSureReject">确 定</el-button> -->
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
        MessageList:[],
        total:null,
        textarea:'',
        nickname:'',
        managerId:null,
        nickNameSearch:null,  //用户昵称搜索
        chatDialog:false, 
        disableDialog:false,
        deleteDialog:null,
        shieldList:[],  //屏蔽类别
        radioValue:null,
        total2:null,
        csId:null,
        uId:null,
        //分页
        currentPage:1,
        currentPage2:1,
      }
    },
    mounted () {
      this.getTableData()
    },
    methods:{
      // 获取列表数据
      getTableData () {
        this.HttpClient.post('/admin/history/message',{
          page:this.currentPage,
          page_size:25,
          nickname:this.nickNameSearch
        })
          .then(res => {
            const { code, data } = res.data;
            console.log(res)
            if (code === 200) {
              this.tableData = data.data;
              this.total = res.data.data.total;
            }
          })
      },
        handleOpenRelieveShield(i){
            this.deleteDialog = true;
            this.managerId = i.manager_id;
        },
        handleRecovery(){
            this.HttpClient.post('/admin/block/cancel',{
              manager_id:this.managerId
            })
            .then(res => {
                console.log(res);
                if(res.data.code === 200){
                    setTimeout(() => {
                        this.getTableData();
                        this.deleteDialog = false;
                    }, 500);
                }
            })
        },
        //确定屏蔽用户
        handleSureReject(){
          
        },
        search(){

        },
        handleTitleSearch(){
          this.getTableData();
        },
        handleOpenTalk(i){
            this.chatDialog = true;
            this.nickname = i.nickname;
            this.csId = i.cs_id;
            this.uId = i.uid;
            this.getMessageInfo();
        },
        getMessageInfo(){
            this.HttpClient.post('/admin/message/info',{
              cs_id:this.csId,
              list_uid:this.uId,
              page_size:6,
              page:this.currentPage2
            })
            .then(res => {
              console.log(res);
              this.MessageList = res.data.data.data;
              this.total2 = res.data.data.total;
            })
        },
        handleOpenShield(i){
            this.disableDialog = true;
            this.textarea = i.block_reasons;

            this.HttpClient.post('/admin/webReview/getList',{
              type:'answers'
            })
            .then(res => {
              console.log(res);
              res.data.data.forEach(item => {
                if(i.block_type === item){
                    this.radioValue = item.name;
                }
              });
            })
        },
        handleCurrentChange(p){
            console.log(p);
            this.currentPage = p;
            this.getTableData();
        },
        handleCurrentChangeMessage(p){
            console.log(p)
            this.currentPage2 = p;
            this.getMessageInfo();
        },
        tableRowClassName({row, rowIndex}) {
            if (row.type === 1) {
            return 'success-row';
            } else if (row.type === 3) {
            return 'warning-row';
            }
            return '';
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },
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
    .fenye{
        text-align: center;
    }
    .chatDialog_main{
      .main_content{
        box-sizing: border-box;
        border: 1px solid #dedede;
        padding: 15px;
        height: 500px;
        overflow: auto;

        .chat_list{
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
                  .el-icon-arrow-down{
                    font-size: 20px;
                    color:#fff;
                  }
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

