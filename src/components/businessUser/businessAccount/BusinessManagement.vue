<template>
  <div class="businessManagement">
    <div class="businessManagement">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="businessManagement_main">
        <!--标题-->
        <div class="title">
          <p>商家账号管理</p>
        </div>

        <div class="content">
          <div class="content_header">
            <div class="content_header_search">
              <el-input
                placeholder="用户名搜索"
                v-model="userNameSearch"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search" @click="userNameSearchFn"></el-button>
              </el-input>
            </div>
            <div class="content_header_search">
              <el-input
                placeholder="公司名字搜索"
                v-model="companyNameSearch"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search" @click="companynameSearchFn"></el-button>
              </el-input>
            </div>
            <div class="content_header_search">
              <el-select v-model="status" clearable placeholder="审核状态" @change="filterStatus">
                <el-option value="0" label="删除"></el-option>
                <el-option value="1" label="正常"></el-option>
                <el-option value="2" label="注销"></el-option>
                <el-option value="3" label="禁用"></el-option>
                <!-- <el-option value="4" label="待审核"></el-option> -->
              </el-select>
            </div>
          </div>

          <div class="content_table">
            <el-table :data="tableData" :border="true">
              <el-table-column label="商家ID" align="center" width="100" prop="id"></el-table-column>

              <el-table-column
                label="商家昵称"
                align="center"
                width="180"
                show-overflow-tooltip
                prop="company_name"
              ></el-table-column>

              <el-table-column
                label="账号"
                align="center"
                show-overflow-tooltip
                width="240"
                prop="username"
              ></el-table-column>

              <el-table-column label="商标LOGO" align="center" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                  <div class="trademark_list">
                    <img :src="Tools.handleImg(scope.row.avatar)" alt>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="法人姓名" align="center" width="150" prop="legal_person"></el-table-column>

              <el-table-column label="法人身份证" align="center" width="240" prop="legal_idcard"></el-table-column>

              <el-table-column
                label="余额"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="balance"
              ></el-table-column>

              <el-table-column label="操作" align="center" class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button @click="modifyPsdFn(scope.row)">修改登录密码</el-button>
                    <el-button @click="modifybasicInfoFn(scope.row)">修改基本信息</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-if="total"
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--修改基本信息弹窗-->
    <el-dialog
      width="400px"
      custom-class="modifyInformationDialog"
      :visible.sync="modifyInformationDialog"
    >
      <span slot="title" class="modifyInformationDialog_title">
        <i class="iconfont icon-xinxi"></i>基本信息
      </span>
      <div class="modifyInformation_dialog_box">
        <div class="dialog_left">头像：</div>
        <div class="dialog_right">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="imageUpload"
          >
            <img
              v-if="!imageUrl&&this.rowData.avatar !==''"
              :src="Tools.handleImg(this.rowData.avatar)"
              class="avatar">
            <img v-else-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="modifyInformation_dialog_box">
        <div class="dialog_left">签名：</div>
        <div class="dialog_right">
          <el-input v-model="signature"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="savemodifyInfoFn">保 存</el-button>
      </span>
    </el-dialog>

    <!--修改密码弹窗-->
    <el-dialog width="350px" custom-class="modifyPassWord" :visible.sync="modifyPassWord">
      <span slot="title" class="modifyPassWord_title">
        <i class="iconfont icon-mima"></i>修改密码
      </span>
      <div class="modifyPassWord_box">
        <el-input placeholder="输入新密码" v-model="newPassWord"></el-input>
        <el-input placeholder="重复输入新密码" v-model="repetnewPassWord"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPassWord = false">取 消</el-button>
        <el-button type="primary" @click="savePassWordFn">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "BusinessManagement",
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
        },
        {
          id: 2,
          name: "商家账户",
          urls: "/index/market/businessUser/businessAccount/BusinessAccount",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "商家账号管理",
          urls: "/index/market/businessUser/businessAccount/BusinessManagement",
          icon: "icon-home"
        }
      ],
      
      userNameSearch: '',  // 用户名搜素
      companyNameSearch: "", // 公司对外名称搜索
      status:  '',  // 审核状态

      tableData: [],

      modifyInformationDialog: false, // 基本信息弹窗
      imageUrl: "", // 头像
      signature: "", // 签名

      modifyPassWord: false, // 修改密码弹窗
      rowData: {},
      newPassWord: "", //新密码
      repetnewPassWord: "", //重复新密码

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    // 获取列表
    getlistData() {
      let params = {
        company_name: this.companyNameSearch,
        user_name: this.userNameSearch,
        status: this.status
      };
      this.HttpClient.post("/admin/business/lists", params).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 用户名搜索
    userNameSearchFn () {
      this.getlistData()
    },
    // 公司名搜索
    companynameSearchFn() {
      this.getlistData();
    },
    // 审核状态筛选
    filterStatus (val) {
      this.getlistData();
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传
    imageUpload(file) {
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          // console.log(res.data.path);
          console.log('res is:', res)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.path;
            this.isshowoldimg = false;
          }
        }
      );
    },
    // 点击修改基本信息
    modifybasicInfoFn(row) {
      this.rowData = row;
      this.modifyInformationDialog = true;
    },
    // 点击修改密码
    modifyPsdFn(row) {
      this.modifyPassWord = true;
      this.rowData = row;
    },
    // 保存修改基本信息
    savemodifyInfoFn() {
      // console.log(this.rowData.avatar)
      var str = this.imageUrl
      str=str.replace("http://cdn.kushualab.com/","");
      // console.log(this.imageUrl)

      let params = {
        company_id: this.rowData.company_id,
        nickname: this.rowData.company_name,
        register_logo: "",
        license: this.rowData.license,
        legal_person: this.rowData.legal_person,
        address_register: "",
        address_manage: "",
        duty: "",
        avatar: str || this.rowData.avatar,
        signature: this.signature
      };
      this.HttpClient.post("/admin/business/editProfile", params).then(res => {
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
          this.modifyInformationDialog = false;
          setTimeout(() => {
            this.getlistData()
            this.signature = ''
            this.imageUrl = ''
          }, 500);
        }
      });
    },
    // 确定保存新密码
    savePassWordFn() {
      if (this.newPassWord !== this.repetnewPassWord) {
        this.$message.warning("两次密码输入不一致");
        return;
      } else {
        let params = {
          uid: this.rowData.uid,
          password: this.repetnewPassWord
        };
        this.HttpClient.post("/admin/business/updatePwd", params).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
            this.modifyPassWord = false
          }else{
            this.$message.warning(res.data.msg)
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.businessManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .businessManagement_main::-webkit-scrollbar {
    display: none;
  }
  .businessManagement_main {
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
        /* justify-content: space-between; */

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
        }

        .trademark_list {
          display: flex;
          align-items: center;
          justify-content: center;
          img:not(:last-child) {
            margin-right: 15px;
          }
          img {
            width: 50px;
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

        .el-pagination {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
}

/*修改基本信息弹窗*/
.modifyInformationDialog {
  .el-dialog__body {
    padding-top: 0;
  }
  .modifyInformationDialog_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
      color: #15bafe;
      font-size: 18px;
    }
  }
  .modifyInformation_dialog_box {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    .dialog_left {
      background: #15bafe;
      color: #fff;
      padding: 5px 20px;
      margin-right: 15px;
    }

    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}

/*修改密码弹窗*/
.modifyPassWord {
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .modifyPassWord_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
      color: #15bafe;
      font-size: 18px;
    }
  }
  .modifyPassWord_box {
    .el-input:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
