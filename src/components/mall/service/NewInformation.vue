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
            <el-table
              :data="tableData"
              :border="true"
              :row-class-name="tableRowClassName">
              <el-table-column
                label="对话创建时间"
                align="center"
                width="200"
                prop="created_at"
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
                width="650"
                prop="content">
              </el-table-column>

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
          </div>
        </div>
      </div>
    </div>

    <!--对话弹窗-->
    <el-dialog
      :visible.sync="chatDialog"
      width="800px"
      custom-class="chatDialog">
      <span slot="title" class="chatDialog_title"><i class="iconfont icon-mail"></i>对话- {{userName}}</span>
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

        <div class="char_input">
          <el-input
            type="textarea"
            resize="none"
            placeholder="输入回复内容，请文明用语"
            :rows="2"
            @input="changeValue($event)"></el-input>
        </div>

      </div>
      <!--对话丢失弹窗-->
      <el-dialog
        width="300px"
        :visible.sync="innerVisible"
        append-to-body>
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
        <el-button type="primary" @click="handleReply('a-component', 'text')">回 复</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
          v-if="total"
          layout="prev, pager, next"
          :total="total"
          :page-size="25"
          @current-change="handleCurrentChange($event)">
      </el-pagination>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  export default {
    name: "NewInformation",
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
          urls: '/index/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '客服',
          urls: '/index/mall/service/Service',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '新消息',
          urls: '/index/mall/service/NewInformation',
          icon: 'icon-home'
        }],
        tableData:[],
        // 聊天框
        chatDialog: false,
        innerVisible: false,
        userName:null,  //对话人名字
        //分页
        total:null,  //数据总条数
        textarea:'',  //回复内容
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
      }
    },
    mounted(){
        this.getMessageList();
    },
    methods:{
        changeValue(e){
            this.textarea = e;
            this.text.text = e;
        },
        handleOpenTalk(){
            this.chatDialog = true;
        },
        // 结束对话
      handleEndMessage (row) {
        const {manager_id} = row
        this.HttpClient.post('/admin/end/message', {manager_id})
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
            }
          })
      },
        //回复
        // handleReply(component, text){
        //   return console.log(component, text)
        //     this.items.push({
        //       component: name,
        //       text: text
        //     })
        // },
        //对话框添加用户消息
        handleAddUserMessage(){
        },
        //获取对话历史
        getHistoryTalk(){
            // this.HttpClient.post('/admin/customer/message',{

            // })
            // .then(res=>{
            //     console.log(res);
            //     this.tableData = res.data.data;
            // })
        },
        // 获取板块列表
        getMessageList (page=1, page_size=25) {
            this.HttpClient.post('/admin/customer/message', { page, page_size })
              .then( res=> {
                const { code, data: { total, data } } = res.data
                if (code === 200) {
                  this.tableData = data 
                  this.total = total
                }
              })
        },
        // 翻页
        handleCurrentChange(e){
          this.getMessageList(e)
        },
      // 颜色区分用户和商家
      tableRowClassName({row, rowIndex}) {
        if (row.type === 1) {
          return 'success-row'
        } else if (row.type === 3) {
          return 'warning-row'
        }
          return ''
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
      .char_input{
        margin-top: 20px;
      }
    }
  }
  .inner_box{
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
</style>
