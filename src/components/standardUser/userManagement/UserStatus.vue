<template>
  <div class="userStatus">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userStatus_main">
      <!--标题-->
      <div class="title">
        <p>用户状态</p>
      </div>

      <div class="content">
        <div class="content_header">

          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch"></el-button>
            </el-input>
            <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleUserNameSearch"></el-button>
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
              label="用户昵称"
              align="center"
              width="140"
              show-overflow-tooltip
              prop="nickname">
            </el-table-column>

            <el-table-column
              label="用户名"
              align="center"
              width="140"
              show-overflow-tooltip
              prop="username">
            </el-table-column>

            <el-table-column
              label="电话"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="phone">
            </el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">正常</span>
                <span v-if="scope.row.status === 3">禁用</span>
              </template>
            </el-table-column>

            <el-table-column
              label="禁用次数"
              align="center"
              width="120"
              prop="disable_num"
              sortable>
            </el-table-column>

            <el-table-column
              label="剩余禁用时间（天）"
              align="center"
              width="200"
              prop="surplusDay"
              sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">0</span>
                <span v-else>{{scope.row.surplusDay}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="禁用类别"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="disable_name">
              <template slot-scope="scope">
                <span v-if="scope.row.disable_name">{{scope.row.disable_name}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="禁用理由"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="disable_reason">
              <template slot-scope="scope">
                <span v-if="scope.row.disable_reason">{{scope.row.disable_reason}}</span>
                <span v-else class="sortout_color">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" v-if="scope.row.status === 1" @click="handleProhibit(scope.row)">禁用</el-button>
                  <el-button size="medium" type="text" v-if="scope.row.status === 3" @click="handleRecovery(scope.row)">恢复</el-button>
                  <el-button size="medium" type="text" v-if="scope.row.status === 3" @click="handleSeePic(scope.row)">查看照片</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
              v-if="total"
              layout="prev, pager, next"
              :total="total"
              :page-size="25"
              @current-change="currentChange"
          ></el-pagination>
        </div>

      </div>
    </div>

    <!--禁用弹窗-->
    <el-dialog
      width="580px"
      custom-class="disableDialog"
      :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>禁用</span>
      <div class="disableDialog_main">
        <div class="disableDialog_left">
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
            <div class="disable_dialog_left">类别：</div>
            <div class="disable_dialog_right">
              <el-radio border v-model="disableDialogRadio" v-for="(item,index) in examineList" :label="item" :key="index">{{item.name}}</el-radio>
            </div>
          </div>
          <!-- <div class="disable_dialog_box">
            <div class="disable_dialog_left">自定义：</div>
            <div class="disable_dialog_right">
              <el-input type="number" v-model="forbiddenDays" placeholder="输入自定义禁用天数"></el-input>
            </div>
          </div> -->
        </div>
        <div class="disableDialog_right">
          <p>上传截图：</p>
          <el-upload
            class="screenshot-uploader"
            action="http://test.kslab.com/api/article/null"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="screenshot">
            <i v-else class="el-icon-plus screenshot-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveProhibit">确 定</el-button>
      </span>
    </el-dialog>

    <!--恢复弹窗-->
    <el-dialog
      width="400px"
      custom-class="restoreDialog"
      :visible.sync="restoreDialog">
      <span slot="title" class="restoreDialog_title"><i class="iconfont icon-huifu"></i>恢复</span>
      <div class="restore_dialog_box">
        <i class="iconfont icon-warning-circle"></i>
        <p>确认恢复吗？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="restoreDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveRecovery" >确 定</el-button>
      </span>
    </el-dialog>

    <!--查看图片弹窗-->
    <el-dialog
      width="400px"
      custom-class="viewImageDialog"
      :visible.sync="viewImageDialog">
      <span slot="title" class="viewImageDialog_title"><i class="iconfont icon-image"></i>查看图片</span>
      <div class="viewImage_dialog_box">
        <img :src="Tools.handleImg(evidenceObj.images)" alt="">
        <p>
          <span>{{evidenceObj.username}}</span>
          <span>{{evidenceObj.disable_end}}</span>
        </p>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserStatus",
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
            name: "用户状态",
            urls: "/index/standardUser/userManagement/UserStatus",
            icon: "icon-home"
          }
        ],

        nickNameSearch: '', // 昵称搜索
        userNameSearch: '',  // 用户名搜索

        tableData: [],

        currentObj:{},   //当前禁用对象
        disableDialog: false,  // 禁用弹窗
        textarea: null ,  // 禁用理由
        disableDialogRadio: null,  // 禁用类别
        imageUrl: '',  // 上传截图
        uploadImgUrl:'',  //上传后返回的地址
        examineList:[],  //禁用类别
        // forbiddenDays:null,  //禁用天数

        restoreDialog: false,  // 恢复弹窗

        viewImageDialog: false,  // 查看图片
        // viewImage: '',
        evidenceObj:{},  //查看图片数据

        total:null,  
        currentPage:1,  //当前页
      }
    },
    mounted(){
      this.getUserStatusList();
    },
    methods:{
      //获取用户状态列表
      getUserStatusList(){
        this.HttpClient.post('/admin/forbidden/userLists',{
            size:25,
            page:this.currentPage,
            nickname:this.nickNameSearch,
            username:this.userNameSearch
        })
        .then(res=>{
          console.log(res);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          for(let i in this.tableData){ 
              let date1 = new Date(this.tableData[i].created_at);
              let date2 = new Date(this.tableData[i].disable_end);
              this.tableData[i].surplusDay =parseInt((date2 - date1)/(24 * 60 * 60 * 1000));
          }
        })
      },
      //打开禁用弹框
      handleProhibit(i){
        console.log(i);
        this.currentObj = i;
        this.disableDialog = true;
        this.getExamineList();
      },
      //确认禁用
      handleSaveProhibit(){
        console.log(this.disableDialogRadio)
        this.HttpClient.post('/admin/forbidden/create',{
            uid:this.currentObj.uid,
            content:this.textarea,
            limit_day:this.disableDialogRadio.limit_day,
            review_id:this.disableDialogRadio.review_id,
            review_name:this.disableDialogRadio.name,
            images:this.uploadImgUrl
        })
        .then(res=>{
          console.log(res);
          if(res.data.code === 200){
              this.$message.success(res.data.msg);
              this.textarea = '';
              this.disableDialogRadio = '';
              // this.forbiddenDays = '';
              this.imageUrl = '';
              setTimeout(() => {
                  this.getUserStatusList();
                  this.disableDialog = false;
              }, 500);
          }
        })

        this.restoreDialog = false;
        this.disable = true;
      },
      //获取用户审核信息
      getExamineList(){
        this.HttpClient.post('/admin/webReview/getList',{
            type:'users'
        })
        .then(res=>{
          console.log(res);
          this.examineList = res.data.data;
        })
      },
      //打开恢复弹窗
      handleRecovery(i){
        this.currentObj = i;
        this.restoreDialog = true;
      },
      //确认恢复
      handleSaveRecovery(){
        this.HttpClient.post('/admin/forbidden/recovery',{
            uid:this.currentObj.uid
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getUserStatusList();
                    this.restoreDialog = false;
                }, 500);
            }
        })
      },
      //查看图片
      handleSeePic(i){
        console.log(i)
        this.HttpClient.post('/admin/forbidden/imageInfo',{
            uid:i.uid
        })
        .then(res=>{
            console.log(res)
            this.evidenceObj = res.data.data;
            console.log(this.evidenceObj)
            this.evidenceObj.images = JSON.parse(this.evidenceObj.images);
            this.viewImageDialog = true;
        })
        
      },
      //昵称搜索
      handleNickNameSearch(){
        this.getUserStatusList();
      },
      //用户名搜索
      handleUserNameSearch(){
        this.getUserStatusList();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传截图只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传截图大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        this.HttpClient.form('/admin/uploadOneImage',{
            images:file
        })
        .then((res) => {
            console.log(res)
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                this.uploadImgUrl = res.data.path;
            }else{
                this.$message.error(res.data.msg);
            }
        })
      },
      //分页
      currentChange(p){
        this.currentPage = p;
        this.getUserStatusList();
      },

    }
  }
</script>

<style lang="less">
  .userStatus {
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userStatus_main::-webkit-scrollbar {
      display: none;
    }
    .userStatus_main {
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

    /*驳回弹窗*/
    .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }

      .disableDialog_main{
        display: flex;
        align-items: flex-start;
        /*左侧内容*/
        .disableDialog_left{
          margin-right: 15px;
          .disable_dialog_box:not(:last-child){
            margin-bottom: 20px;
          }
          .disable_dialog_box{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            .disable_dialog_left{
              min-width: 60px;
              text-align: right;
            }
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
                margin: 5px auto;
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

        /*右侧截图*/
        .disableDialog_right{
          height: 100%;
          .screenshot-uploader{
            margin-top: 10px;
            .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            }
            .el-upload:hover {
              border-color: #409EFF;
            }
            .screenshot-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .screenshot {
              width: 178px;
              height: 178px;
              display: block;
            }
          }
        }
      }
    }

    /*恢复弹窗*/
    .restoreDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
      }
      .restoreDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .restore_dialog_box{
        text-align: center;
        i{
          font-size: 90px;
          color: #15bafe;
        }
        p{
          margin-top: 15px;
        }
      }
      .dialog-footer{
        a{
          color: #606266;
          text-decoration: none;
        }
      }
    }


    /*查看图片弹窗*/
    .viewImageDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 20px;
      }
      .viewImageDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .viewImage_dialog_box{
        position: relative;
        img{
          width: 100%;
        }
        p{
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          span{
            padding: 0 20px;
            line-height: 30px;
            background: rgba(0,0,0,0.5);
            color: #fff;
          }
        }
      }
      .dialog-footer{
        a{
          color: #606266;
          text-decoration: none;
        }
      }
    }

  }
</style>
