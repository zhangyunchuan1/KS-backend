<template>
  <div class="changePassword">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="changePassword_main">
      <!--标题-->
      <div class="title">
        <p>提现密码修改</p>
      </div>
      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="商家ID搜索" v-model="idSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-input placeholder="商家昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
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
              width="90"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="160"
              show-overflow-tooltip
              prop="nickname">
              <template slot-scope="scope">
                <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="商家工商全称"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="company_name">
              <template slot-scope="scope">
                <span v-if="scope.row.company_name">{{scope.row.company_name}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="当前金额"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="balance">
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="200"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="updateCashPass(scope.row)">修改密码</el-button>
                  <el-button size="medium" type="text" @click="checkRecord(scope.row)">查看记录</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--验证身份弹窗-->
    <el-dialog
      width="400px"
      custom-class="verificationDialog"
      :visible.sync="verificationDialog">
      <span slot="title" class="verificationDialog_title"><i class="iconfont icon-securityCode-b"></i>确定身份</span>
      <div class="verificationDialog_box">
        <div class="box_list">
          <p>输入密码：</p>
          <el-input v-model="adminPass" placeholder="输入后台密码"></el-input>
        </div>
        <div class="box_list">
          <p>手机验证码：</p>
          <el-input placeholder="输入验证码" v-model="codeNum">
            <input slot="append" class="codeBtm" type="button" v-model="codeMsg" @click="getCode" :disabled="codeDisabled" />
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="verificationDialog = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改密码弹窗-->
    <el-dialog
      width="300px"
      custom-class="changePasswordDialog"
      :visible.sync="changePasswordDialog">
      <span slot="title" class="changePasswordDialog_title"><i class="iconfont icon-mima"></i>修改密码</span>
      <div class="changePasswordDialog_box">
        <el-input v-model="newPass" placeholder="输入您的新提现密码"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureChangePass">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看记录弹窗-->
    <el-dialog
      width="400px"
      custom-class="viewRecordDialog"
      :visible.sync="viewRecordDialog">
      <span slot="title" class="viewRecordDialog_title"><i class="iconfont icon-lishijilu"></i>查看记录</span>
      <div class="viewRecordDialog_box">
        <div class="box_list" v-for="(item,index) in recordData" :key="index">
          <p class="list_title">
            <span class="normal_color">{{item.name}}</span>
            <span>{{item.created_at}}</span>
          </p>
          <p class="list_message">{{item.content}}</p>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "ChangePassword",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "现金管理",
            urls: "/index/cashManagement/CashManagement",
            icon: "icon-home"
          }, {
            id: 2,
            name: "商家管理",
            urls: "/index/cashManagement/businessWithdraw/BusinessWithdraw",
            icon: "icon-home"
          }, {
            id: 3,
            name: "提现密码修改",
            urls: "/index/cashManagement/businessWithdraw/ChangePassword",
            icon: "icon-home"
          }
        ],

        idSearch: '',
        nickNameSearch: '',

        tableData: [],
        // 分页
        currentPage: 1, // 当前页
        pageSize: 25, // 每页显示数量
        total: 0, // 数据总条数

        verificationDialog: false,  // 验证弹窗
        codeDisabled: false, // 是否禁用按钮
        countdown: 60, // 倒计时秒数
        adminPass:'',//后台密码
        codeMsg: '获取验证码',
        timer: null,
        codeNum:null,//获取验证码
        recordData:[],

        changePasswordDialog: false,  // 修改密码
        userID:'',
        newPass:'',

        viewRecordDialog: false,  // 查看记录

      }
    },
    mounted(){
      this.getlistData();
    },
    methods: {
      // 获取验证码
      getCode() {
        console.log(111111)
        this.HttpClient.get('/admin/withdraw/sendSmsCode').then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
          }
        })
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.countdown > 0 && this.countdown <= 60) {
              this.countdown--;
              if (this.countdown !== 0) {
                this.codeMsg = "重新发送(" + this.countdown + ")";
                this.codeDisabled = true;
              } else {
                clearInterval(this.timer);
                this.codeMsg = "获取验证码";
                this.countdown = 60;
                this.timer = null;
                this.codeDisabled = false;
              }
            }
          }, 1000)
        }
      },
      // 获取列表数据
      getlistData(){
        let params = {
          size:this.pageSize,
          page:this.currentPage
        }
        this.HttpClient.get('/admin/withdraw/listsEditPass',params).then(res => {
          console.log(res.data)
          if(res.data.code == 200){
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        })
      },
      // 点击操作修改密码
      updateCashPass(row){
        this.verificationDialog = true;
        console.log(row)
        this.userID = row.uid;
      },
      // 分页
      currentChange(p) {
        this.currentPage = p;
        this.getlistData();
      },

      // 修改密码
      changePassword(){
        console.log(this.codeNum)
        this.verificationDialog = false;
        let params = {
          pwd:this.adminPass,
          verify_code:this.codeNum
        }
        this.HttpClient.post('/admin/withdraw/checkAdmin',params).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            this.changePasswordDialog = true;
            this.adminPass = '';
            this.codeNum = '';
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      sureChangePass(){
        let params = {
          uid:this.userID,
          pwd:this.newPass
        }
        this.HttpClient.post('/admin/withdraw/editPayPass',params).then(res => {
          console.log(res.data)
          if(res.data.code === 200){
            this.$message.success(res.data.msg);
            this.changePasswordDialog = false;
            this.newPass = '';
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      // 查看记录
      checkRecord(row){
        console.log(row)
        this.HttpClient.post('/admin/withdraw/editPwdLog',{uid:row.uid}).then(res => {
          console.log(res.data);
          if(res.data.code === 200){
            this.recordData = res.data.data;
            this.viewRecordDialog = true;            
          }
        })
      }

    }
  }
</script>

<style lang="less">
  .changePassword{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .changePassword_main::-webkit-scrollbar {
      display: none;
    }
    .changePassword_main {
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

    /*验证弹窗*/
    .verificationDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 20px;
        padding-right: 0;
      }
      .verificationDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .verificationDialog_box{
        padding-right: 20px;
        .box_list:not(:last-child){
          margin-bottom: 15px;
        }
        .box_list{
          display: flex;
          align-items: center;
          p{
            width: 100px;
          }
          .el-input{
            flex: 1;
          }
        }
        .el-input-group__append{
          padding: 0;
          .codeBtm{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 10px 10px;
            outline:none;
          }
        }
      }
    }

    /*修改密码弹窗*/
    .changePasswordDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 20px;
      }
      .changePasswordDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .changePasswordDialog_box{

      }
    }

    /*查看记录弹窗*/
    .viewRecordDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 20px;
        padding-right: 0;
      }
      .viewRecordDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .viewRecordDialog_box{
        max-height: 400px;
        padding-right: 20px;
        overflow: auto;
        .box_list:not(:last-child){
          margin-bottom: 15px;
        }
        .box_list{
          border: 1px solid #dedede;
          box-sizing: border-box;
          padding: 5px;
          .list_title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #999;
            margin-bottom: 5px;
          }
          .list_message{
            display: flex;
            align-items: center;
          }
        }
      }
    }

  }
</style>
