<template>
  <div class="authorityManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="authorityManagement_main">
      <!--标题-->
      <div class="title">
        <p>权限管理</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="公司注册全称搜索" v-model="companyNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleCompanyNameSearch"></el-button>
            </el-input>
            <el-input placeholder="公司昵称搜索" v-model="accountSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleAccountSearch"></el-button>
            </el-input>
            <el-input placeholder="手机搜索" v-model="phoneNumberSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handlePhoneNumberSearch"></el-button>
            </el-input>
            <el-input placeholder="联系人搜索" v-model="accountNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleAccountNameSearch"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="商家ID"
              align="center"
              width="90"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="130"
              show-overflow-tooltip
              prop="username">
            </el-table-column>

            <el-table-column
              label="工商注册全称"
              align="center"
              show-overflow-tooltip
              width="240"
              prop="company_name">
            </el-table-column>

            <el-table-column
              label="电话"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="phone">
              <template slot-scope="scope">
                <span>{{'+'+scope.row.country_code+' '+scope.row.phone}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              width="130"
              prop="status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">正常</span>
                <span v-if="scope.row.status === 3||scope.row.status === 5">禁用</span>
              </template>
            </el-table-column>

            <el-table-column
              label="联系人姓名"
              align="center"
              width="140"
              prop="contacts">
            </el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="created_at"
              sortable>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="mallReview_btm">
                  <el-button @click="handleUpdateContacts(scope.row)">更新联系人</el-button>
                  <el-button @click="handleModifyInfo(scope.row.company_id)">修改公司登记信息</el-button>
                  <el-button>查看公司简介</el-button>
                  <el-button @click="updateRole(scope.row)">角色分配</el-button>
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

    <!--更新联系人弹窗-->
    <el-dialog
      width="280px"
      custom-class="modifyContactDialog"
      :visible.sync="modifyContactDialog">
      <span slot="title" class="modifyContactDialog_title"><i class="iconfont icon-edit-square"></i>更新联系人</span>
      <div class="modifyContact_dialog_box">
        <el-input v-model="contacts" placeholder="联系人姓名"></el-input>
        <el-input v-model="telephone" placeholder="公司联系电话"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyContactDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveUpdate">保 存</el-button>
      </span>
    </el-dialog>

    <!--角色分配弹窗-->
    <el-dialog
      width="280px"
      custom-class="roleDialog"
      :visible.sync="roleDialog">
      <span slot="title" class="roleDialog_title"><i class="iconfont icon-team"></i>角色分配</span>
      <div class="role_dialog_box">
        <el-radio-group v-model="roleRadio">
          <el-radio-button :label="2">专业商家</el-radio-button>
          <el-radio-button :label="3">普通商家</el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleUpdateRole">保 存</el-button>
      </span>
    </el-dialog>

    <!--修改资质弹窗-->
    <el-dialog
      width="700px"
      custom-class="modifyCompany"
      :visible.sync="modifyCompanyDialog">
      <span slot="title" class="modifyCompany_title"><i class="iconfont icon-edit-square"></i>修改公司登记信息</span>
      <div class="modifyCompany_box">
        <div class="reviewList">
          <span>公司全称</span>
          <el-input v-model="modifyObj.name" placeholder="公司全称（无字数限制，无特殊字符）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司对外名字或者注册商标名称</span>
          <el-input v-model="modifyObj.nickname" placeholder="填写公司对外名字或者注册商标名称（汉字和英文加数字）"></el-input>
        </div>
        <div class="reviewList">
          <span>执照号</span>
          <el-input v-model="modifyObj.license_num" placeholder="执照号（数字和英文字母）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司法人姓名</span>
          <el-input v-model="modifyObj.legal_person" placeholder="公司法人姓名（中英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>法人身份证号</span>
          <el-input v-model="modifyObj.legal_idcard" placeholder="法人身份证号（数字+英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司注册地址</span>
          <el-input v-model="modifyObj.address_register" placeholder="公司注册地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司经营地址</span>
          <el-input v-model="modifyObj.address_manage" placeholder="公司经营地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司税号</span>
          <el-input v-model="modifyObj.duty" placeholder="公司税号"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyCompanyDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveInfo">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"
  export default {
    name: "AuthorityManagement",
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
          }, {
            id: 2,
            name: "商家账户",
            urls: "/index/market/businessUser/businessAccount/BusinessAccount",
            icon: "icon-home"
          }, {
            id: 3,
            name: "权限管理",
            urls: "/index/market/businessUser/businessAccount/AuthorityManagement",
            icon: "icon-home"
          }
        ],

        companyNameSearch: '',  // 公司对外名称搜索
        accountSearch: '',  // 公司注册名称搜索
        phoneNumberSearch: '',  // 电话搜索
        accountNameSearch: '',  // 联系人搜索

        tableData:[],

        modifyContactDialog: false,  // 更新联系人弹窗

        roleDialog: false,  // 角色分配弹窗
        roleRadio: 2,

        modifyCompanyDialog: false,  //修改弹窗
        modifyObj:{},  //修改对象

        contacts:null,  //联系人
        telephone:null,  //联系电话

        total:null,  //分页
        currentPage:1,  //当前页
      }
    },
    mounted(){
        this.getBusinessLists();
    },
    methods:{
      //公司名称搜索
      handleCompanyNameSearch(){
        this.getBusinessLists();
      },
      //账号搜索
      handleAccountSearch(){
        this.getBusinessLists();
      },
      //手机搜索
      handlePhoneNumberSearch(){
        this.getBusinessLists();
      },
      //联系人姓名搜索
      handleAccountNameSearch(){
        this.getBusinessLists();
      },
      // 获取商家列表
      getBusinessLists(){
        this.HttpClient.post('/admin/business/lists',{
            size:25,
            page:this.currentPage,
            status:1,
            company_name:this.companyNameSearch,
            user_name:this.accountSearch,
            phone:this.phoneNumberSearch,
            contacts: this.accountNameSearch
        })
        .then(res=>{
          console.log(res)
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            this.companyNameSearch = '';
            this.accountSearch = '';
            this.phoneNumberSearch = '';
        })
      },

      // 打开角色分配弹窗
      updateRole (row) {
        this.modifyObj = row;
        this.roleRadio = row.type;
        this.roleDialog = true
      },
      // 保存更新后的角色分配
      handleUpdateRole () {
        const data = {
          uid: this.modifyObj.uid,
          type: this.roleRadio
        }
        this.HttpClient.post('/admin/business/updateType', data)
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              this.roleDialog = false
              setTimeout(() => {
                this.getBusinessLists()
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      },
      //打开更新联系人弹窗
      handleUpdateContacts(i){
        console.log(i);
        this.modifyObj = i;
        this.contacts = i.contacts;
        this.telephone = i.phone;
        this.modifyContactDialog = true;
      },
      //保存修改联系人
      handleSaveUpdate(){
        this.HttpClient.post('/admin/business/updateContact',{
            uid:this.modifyObj.uid,
            contacts:this.contacts,
            telphone:this.telephone,
        })
        .then(res => {
          const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              this.contacts = ''
              this.telephone = ''
              this.modifyContactDialog = false
              setTimeout(() => {
                this.getBusinessLists()
              }, 500)
            } else {
                this.$message.error(msg)
            }
        })
      },
      //打开修改公司登记信息弹窗
      handleModifyInfo(company_id){
        this.HttpClient.get('/admin/business/editProfile',{ company_id:company_id })
        .then(res => {
          console.log(res.data)
          this.modifyObj = res.data.data
        })
        this.modifyCompanyDialog = true
      },
      //确认修改公司登记信息
      handleSaveInfo(){
        console.log(this.modifyObj);
        this.HttpClient.post('/admin/business/editProfile',{
            company_id:this.modifyObj.company_id,
            nickname:this.modifyObj.nickname,
            license_num:this.modifyObj.license_num,
            legal_person:this.modifyObj.legal_person,
            legal_idcard:this.modifyObj.legal_idcard,
            address_register:this.modifyObj.address_register,
            address_manage:this.modifyObj.address_manage,
            duty:this.modifyObj.duty
        })
        .then(res => {
          const { code, msg } = res.data
          if(code === 200){
            this.$message.success(msg)
            this.modifyCompanyDialog = false
            setTimeout(() => {
              this.getBusinessLists()
            }, 500)
          } else {
            this.$message.error(msg)
          }
        })
      },
      //分页
      currentChange(p){
        this.currentPage = p;
        this.getBusinessLists();
      },
    }
  }
</script>

<style lang="less">
  .authorityManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .authorityManagement_main::-webkit-scrollbar {
      display: none;
    }
    .authorityManagement_main {
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

        .content_header{
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

          .el-pagination{
            text-align: center;
            margin-top: 20px;
          }

        }

      }
    }
  }

  /*更新联系人弹窗*/
  .modifyContactDialog{
    .modifyContactDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .modifyContact_dialog_box{
      .el-input:not(:last-child){
        margin-bottom: 20px;
      }
    }
  }

  /*角色分配弹窗*/
  .roleDialog{
    .roleDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .role_dialog_box{
      text-align: center;
    }
  }


  /*修改公司登记信息弹窗*/
  .modifyCompany{
    .el-dialog__body{
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .modifyCompany_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .modifyCompany_box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .reviewList{
        width: 45%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          padding: 5px 15px;
          background: #15bafe;
          color: #fff;
          margin-bottom: 5px;
        }
      }
    }

    .contactInformation{
      .title{
        padding: 5px 10px;
        display: inline-block;
        background: #15bafe;
        color: #fff;
        margin-bottom: 10px;
      }
      .contactInformation_main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-input{
          width: 45%;
        }
      }
    }
  }

</style>
