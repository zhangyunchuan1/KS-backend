<template>
  <div class="newInformation">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>对话管理-主管</p>
        <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>

      <div class="content">

        <!--主体内容-->
        <div class="content_main">

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="最新的对话时间"
                align="center"
                width="180"
                prop="updated_at"
                sortable>
              </el-table-column>
              <el-table-column
                label="客服姓名"
                align="center"
                width="220"
                prop="admin_name">
              </el-table-column>

              <el-table-column
                label="用户昵称"
                align="center"
                width="220"
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                width="200"
                prop="user_type">
                <template slot-scope="scope">
                    <span v-if="scope.row.user_type === 1">用户</span>
                    <span v-if="scope.row.user_type === 2">商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="类型"
                align="center"
                width="100"
                prop="dialog_type">
                <template slot-scope="scope">
                    <span v-if="scope.row.dialog_type === 0">任务</span>
                    <span v-if="scope.row.dialog_type === 1">对话</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                width="100"
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
                    <el-button
                      @click="openModalAndGetRowData('chatDialog', scope.row)"
                    >
                      对话
                    </el-button>
                    <el-button
                      @click="openModalAndGetRowData('shieldDialog', scope.row)"
                    >
                      屏蔽用户
                    </el-button>
                    <el-button
                      @click="openModalAndGetRowData('cloneChartDialog', scope.row)"
                    >
                      结束对话
                    </el-button>
                    <el-button
                      @click="openModalAndGetRowData('createTaskDialog', scope.row)"
                    >
                      创建任务
                    </el-button>
                    <el-button>删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!--对话弹窗-->
    <el-dialog
      :visible.sync="chatDialog"
      width="800px"
      custom-class="chatDialog">
      <span slot="title" class="chatDialog_title"><i class="iconfont icon-mail"></i>对话- 是个狼人</span>
      <div class="chatDialog_main">
        <div class="main_content">
          <!--用户-->
          <div class="user_chat chat_list">
            <span>2018/12/6 17:12</span>
            <p>我要退款，你发我两只左脚的鞋</p>
          </div>

          <!--客服-->
          <div class="service_chat chat_list">
            <p class="service_message">
              <span class="service_serviceName">是个猛男</span>
              <span class="service_time">2018/12/6 17:13</span>
            </p>
            <p class="chat_content">亲亲，不能退款呢，我们的脚都是长那样的呢，穿不了是您的问题呢</p>
          </div>

          <!--用户-->
          <div class="user_chat chat_list">
            <span>2018/12/6 17:15</span>
            <p>我要退款，你发我两只左脚的鞋</p>
          </div>
          <!--用户-->
          <div class="user_chat chat_list">
            <span>2018/12/6 17:15</span>
            <p>我要退款，你发我两只左脚的鞋</p>
          </div>
          <!--用户-->
          <div class="user_chat chat_list">
            <span>2018/12/6 17:15</span>
            <p>我要退款，你发我两只左脚的鞋</p>
          </div>
          <!--用户-->
          <div class="user_chat chat_list">
            <span>2018/12/6 17:16</span>
            <p>我要退款，你发我两只左脚的鞋。我要退款，你发我两只左脚的鞋我要退款，你发我两只左脚的鞋。我要退款，你发我两只左脚的鞋</p>
          </div>
          <!--客服-->
          <div class="service_chat chat_list">
            <p class="service_message">
              <span class="service_serviceName">是个猛男</span>
              <span class="service_time">2018/12/6 17:16</span>
            </p>
            <p class="chat_content">亲亲，我退你ma</p>
          </div>

        </div>
        <div class="char_input">
          <el-input
            type="textarea"
            resize="none"
            placeholder="输入回复内容，请文明用语"
            :rows="2"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chatDialog = false">取 消</el-button>
        <el-button type="primary">回 复</el-button>
      </span>
    </el-dialog>

    <!--屏蔽弹窗-->
    <el-dialog
      :visible.sync="shieldDialog"
      width="400px"
      custom-class="shieldDialog">
      <span slot="title" class="shieldDialog_title"><i class="iconfont
      icon-jinyong"></i>屏蔽 - {{row.nickname}}</span>
      <div class="shieldDialog_main">
        <div class="main_content">
          <el-input
            popper-class="content_textarea"
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入屏蔽理由"
            v-model="blockReasons"
          >
          </el-input>

          <div class="content_radio">
            <p>屏蔽类别</p>
            <el-radio-group v-model="shieldRadio">
              <el-radio border :label="1">骂人</el-radio>
              <el-radio border :label="2">要退货</el-radio>
              <el-radio border :label="3">要退款</el-radio>
              <el-radio border :label="4">嫌发货慢</el-radio>
            </el-radio-group>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shieldDialog = false">取 消</el-button>
        <el-button @click="handleBlock" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--结束对话确认框-->
    <el-dialog
      :visible.sync="cloneChartDialog"
      width="400px"
      custom-class="cloneChartDialog">
      <span slot="title" class="cloneChartDialog_title"><i class="iconfont icon-close-circle"></i>结束对话</span>
      <div class="cloneChartDialog_main">
        <div class="main_content">
          <i class="iconfont icon-warning-circle"></i>
          <div>确认结束对话吗？</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cloneChartDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEndMessage">确 定</el-button>
      </span>
    </el-dialog>
    <!--创建任务弹窗-->
    <el-dialog
      :visible.sync="createTaskDialog"
      width="400px"
      custom-class="shieldDialog">
      <span slot="title" class="shieldDialog_title">
        <i class="iconfont icon-edit-square"></i>创建任务
      </span>
      <div class="shieldDialog_main">
        <div class="main_content">
          <div class="content_title">任务备注</div>
          <el-input
            popper-class="content_textarea"
            type="textarea"
            resize="none"
            :rows="2"
            placeholder="请输入内容"
            v-model="taskMarks">
          </el-input>
          <div class="content_title">申请原因</div>
          <el-input
            popper-class="content_textarea"
            type="textarea"
            resize="none"
            :rows="2"
            placeholder="请输入申请原因"
            v-model="taskReason">
          </el-input>
          <div class="content_radio">
            <p>任务类别选择</p>
            <el-radio-group v-model="taskType">
              <el-radio label="1">商城</el-radio>
              <el-radio label="2">活动</el-radio>
              <el-radio label="3">服务</el-radio>
              <el-radio label="4">投诉</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createTaskDialog = false">取 消</el-button>
        <el-button @click="handleCreateTask" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'
    export default {
        name: "DialogueManagementSupervisor",
      components: {
        BreadCrumb,
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
            name: '对话管理-主管',
            urls: '/index/service/DialogueManagementSupervisor',
            icon: 'icon-home'
          }],

          tableData:[],


          // 聊天框
          chatDialog: false,
          innerVisible: false,

          shieldDialog: false,  // 屏蔽弹窗
          shieldRadio: null,    // 屏蔽类型
          blockReasons: '',    // 屏蔽原因

          cloneChartDialog: false,  // 结束对话确认框

          createTaskDialog: false,  // 创建任务弹窗
          taskMarks: '',  // 创建任务备注
          taskReason: '',
          taskType: '',   // 创建任务类别
          row: {}         // 表格当前选中列的数据
        }
      },
      
      mounted () {
        this.getTableData()
      },
      methods: {
        // 获取表格数据
        getTableData (page=1, page_size=25) {
          this.HttpClient.post('/admin/director/message', {page, page_size})
            .then(res => {
              const { code, data: {total, data} } = res.data
              if (code === 200) {
                this.tableData = data
              }
            })
        },

        // 展开对应的弹窗并且获取当前列的数据
        openModalAndGetRowData(modal, row) {
          this[modal] = true
          this.row = row
          
          // 获取对话列表
          if (modal === 'chatDialog') {
            this.getChatRecord({cs_id: this.row.cs_id, list_uid: this.row.user_id, page: 1}) 
          }
        },

        // 屏蔽功能
        handleBlock () {
          const {manager_id} = this.row
          const data = {
            manager_id,
            block_type: this.shieldRadio,
            block_reasons: this.blockReasons,
            block_time: this.getNowFormatDate()
          }
          this.HttpClient.post('/admin/block/user', data)
            .then(res => {
              const { code, msg } = res.data
              if (code === 200) {
                this.$message.success(msg)
              } else {
                this.$message.error(msg)
              }
            })
        },
        // 结束对话
        handleEndMessage () {
          const {manager_id} = this.row
          this.HttpClient.post('/admin/end/message', {manager_id})
            .then(res => {
              const { code, msg } = res.data
              if (code === 200) {
                this.cloneChartDialog = false
                this.$message.success(msg)
              } else {
                this.$message.error(msg)
              }
            })
        },
        // 创建任务
        handleCreateTask () {
          const {customer_id} = this.row
          const data = {
            customer_id,
            remarks: this.taskMarks,
            reasons: this.taskReason,
            type: this.taskType
          }
          this.HttpClient.post('/admin/create/task', data)
            .then(res => {
              const { code, msg } = res.data
              if (code === 200) {
                this.$message.success(msg)
                this.createTaskDialog = false
              }
            })
        },
        // 对话列表
        getChatRecord (data) {
          this.HttpClient.post('/admin/message/info', {...data, page_size: 10})
            .then(res => {
              console.log(res.data)
            })
        },
        // 格式化时间
        getNowFormatDate() {
          var date = new Date()
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = `0${month}`
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = `0${strDate}`
          }
         var currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
         return currentdate
        }
      }
    }
</script>

<style lang="less">
  .newInformation{
    text-align: left;
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
      .char_input{
        margin-top: 20px;
      }
    }
  }

  /*屏蔽弹窗*/
  .shieldDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .shieldDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .shieldDialog_main{
      .main_content{
        box-sizing: border-box;
        .content_radio{
          margin-top: 20px;
          >p{
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #15bafe;
            border-radius: 4px;
            margin-bottom: 5px;
          }
          .el-radio-group{
            display: block;
            width: 100%;
            .el-radio.is-checked{
              background: #15bafe;
              border-color: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
            .el-radio{
              width: 100%;
              margin: 5px 0;
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 40px;
              padding: 0;
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
    }
  }

  /*屏蔽弹窗*/
  .cloneChartDialog{
    .cloneChartDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .cloneChartDialog_main{
      .main_content{
        box-sizing: border-box;
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
    }
  }

  /*创建任务弹窗*/
  .createTaskDialog{
    .createTaskDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .createTaskDialog_main{
      .main_content{
        box-sizing: border-box;
        text-align: center;

      }
    }
  }

</style>
