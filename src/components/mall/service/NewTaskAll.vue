<template>
  <div class="NewTaskAll">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>新任务-所有</p>
        <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>
      <div class="tiledai">待解决任务</div>
      <div class="content">

        <!--主体内容-->
        <div class="content_main">

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="用户昵称"
                align="center"
                width="200"
                prop="nickname"
                sortable>
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                width="150"
                prop="user_type">
                <template slot-scope="scope">
                    <span v-if="scope.row.user_type === 1">用户</span>
                    <span v-if="scope.row.user_type === 2">商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="援助申请时间"
                align="center"
                width="200"
                prop="created_at">
              </el-table-column>

              <el-table-column
                label="任务类别"
                align="center"
                width="150"
                prop="task_type">
                <template slot-scope="scope">
                    <span v-if="scope.row.task_type === 1">商城</span>
                    <span v-if="scope.row.task_type === 2">活动</span>
                    <span v-if="scope.row.task_type === 3">服务</span>
                    <span v-if="scope.row.task_type === 4">投诉</span>
                </template>
              </el-table-column>

              <el-table-column
                label="援助申请者"
                align="center"
                width="150"
                prop="convtent">
              </el-table-column>
              <el-table-column
                label="申请原因"
                align="reasons"
                width="150"
                prop="reasons">
              </el-table-column>

              <el-table-column
                label="备注"
                align="center"
                width="350"
                prop="remarks">
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="mallReview_scope"
                fixed="right"
              >
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button @click="handleOpenReceive(scope.row)">领取任务</el-button>
                    <el-button @click="handleOpenRemarks(scope.row)">查看备注</el-button>
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
    <!--备注弹窗-->
        <el-dialog
            :visible.sync="RemarksDialog"
            width="600px"
            custom-class="RemarksDialog">
            <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>备注</span>
            <div class="RemarksDialog_main">
                <div class="main_content">
                    <div class="main_content_list">
                        <div class="title">查看备注</div>
                        <el-input
                                type="textarea"
                                :rows="4"
                                resize="none"
                                v-model="remark">
                        </el-input>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RemarksDialog = false">关 闭</el-button>
            </span>
        </el-dialog>
        <!--领取新任务弹窗-->
      <el-dialog
        width="470px"
        custom-class="deleteDialog"
        :visible.sync="deleteDialog"
        center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="deleteDialog_box">
          <i class="iconfont icon-warning-circle"></i>
          <p>确定领取吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleRecovery">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'
  export default {
    name: "NewTaskAll",
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
          name: '新任务-所有',
          urls: '/index/service/NewTaskAll',
          icon: 'icon-home'
        }],
        tableData:[],
        // 聊天框
        chatDialog: false,
        innerVisible: false,
        RemarksDialog:false,
        deleteDialog:false,
        remark:null,
        //分页
        total:null,  //数据总条数
        row: {}
      }
    },
    mounted () {
        this.getMessageList()
    },
    methods:{
        // 获取任务列表
        getMessageList(){
          this.HttpClient.post('/admin/task/list')
          .then(res => {
            const { code, data } = res.data
            if (code === 200) {
              this.tableData = res.data.data
            }
          })
        },

        // 查看备注
        handleOpenRemarks (row) {
          this.RemarksDialog = true
          this.remark = row.remarks
        },

        // 领取任务
        handleOpenReceive (row) {
          this.row = row
          this.deleteDialog = true
        },

        // 确定领取任务
        handleRecovery(){
          this.HttpClient.post('/admin/get/task', {manager_id: this.row.manager_id})
            .then(res => {
              const { code, msg } = res.data
              if (code === 200) {
                this.$message.success(msg)
                this.deleteDialog = false
              } else {
                this.$message.error(msg)
              }
            })
        },

        //分页
        handleCurrentChange(e){
            console.log(e)
        }
    }
  }
</script>

<style lang="less">
  .NewTaskAll{
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
        .tiledai{
            background: #15bafe;
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color:#fff;
            margin:20px 0 0 40px;
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
    /*备注弹窗*/
        .RemarksDialog{
            .el-dialog__body{
                padding-top: 0;
            }
            .RemarksDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                    margin-right: 15px;
                }
            }
            .RemarksDialog_main{
                .main_content{
                    box-sizing: border-box;
                    .main_content_list{
                        margin-bottom: 20px;
                        .title{
                            margin-bottom: 10px;
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
