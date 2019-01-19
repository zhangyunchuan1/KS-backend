<template>
  <div class="userBindingManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userBindingManagement_main">
      <!--标题-->
      <div class="title">
        <p>用户绑定管理</p>
      </div>

      <div class="content">
        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="ID" align="center" width="120" prop="id" sortable></el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="220"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column label="头像" align="center" width="220" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="avatar_img">
                  <img :src="Tools.handleImg(scope.row.avatar)" alt>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="用户名"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="username"
            ></el-table-column>

            <el-table-column label="绑定情况" align="center" width="240" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" v-if="scope.row.weChat" @click="weChat(scope.row)">微信</el-button>
                  <el-button size="medium" type="text" v-if="scope.row.alipay" @click="alipay(scope.row)">支付宝</el-button>
                  <el-button size="medium" type="text" v-if="scope.row.qq" @click="qq(scope.row)">QQ</el-button>
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

    <!--账号详情弹窗-->
    <el-dialog
      width="400px"
      custom-class="accountDetailsDialog"
      :visible.sync="accountDetailsDialog"
    >
      <span slot="title" class="accountDetailsDialog_title">
        <i class="iconfont icon-xinxi"></i>账号详情
      </span>
      <div class="accountDetails_dialog_box">
        <div class="content_list">
          <p>第三方平台</p>
          <span>{{platform}}</span>
        </div>
        <div class="content_list">
          <p>第三方昵称</p>
          <span>{{platdata.social_name}}</span>
        </div>
        <div class="content_list">
          <p>ID</p>
          <span>{{platdata.social_id}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "UserBindingManagement",
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
        },
        {
          id: 2,
          name: "用户账户",
          urls: "/index/standardUser/userManagement/UserManagement",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "用户绑定管理",
          urls: "/index/standardUser/userManagement/UserBindingManagement",
          icon: "icon-home"
        }
      ],

      tableData: [],

      accountDetailsDialog: false, // 账号详情
      platform: "", //第三方平台
      platdata:{},

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted(){
    this.getlistData()
  },
  methods: {
    getlistData(){
      let params = {
        size:this.pageSize,
        page:this.currentPage
      }
      this.HttpClient.post('/admin/users/threePartyAccountList',params).then(res => {
        // console.log(res.data)
        if(res.data.code == 200){
          this.total = res.data.data.total
          this.tableData = res.data.data.data
        }
      })
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    weChat(row) {
      this.accountDetailsDialog = true;
      this.platform = "微信";
      var type = '0'
      this.getdialogdata(row.uid,type)
    },
    alipay(row) {
      this.accountDetailsDialog = true;
      this.platform = "支付宝";
      var type = '2'
      this.getdialogdata(row.uid,type)
    },
    qq(row) {
      console.log(row)
      this.accountDetailsDialog = true;
      this.platform = "QQ";
      var type = '1'
      this.getdialogdata(row.uid,type)
    },
    // 查看绑定信息
    getdialogdata(uid,type){
      let params = {
        uid:uid,
        three_party_account_type:type
      }
      this.HttpClient.post('/admin/users/threePartyAccountInfo',params).then(res => {
        if(res.data.code == 200){
          this.platdata = res.data.data
        }
      })
    }
  }
};
</script>

<style lang="less">
.userBindingManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .userBindingManagement_main::-webkit-scrollbar {
    display: none;
  }
  .userBindingManagement_main {
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
        .table_avatar {
          margin: 0 auto;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-content: center;
          overflow: hidden;
          img {
            width: 100%;
          }
        }

        .avatar_img {
          width: 80px;
          height: 80px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          img {
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

  /*账号详情弹窗*/
  .accountDetailsDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 20px;
    }
    .accountDetailsDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .accountDetails_dialog_box {
      .content_list {
        display: flex;
        align-items: center;
        height: 40px;
        text-align: center;
        margin-top: 10px;
        p {
          background: #15bafe;
          color: #fff;
          height: 100%;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          border: 1px solid #dedede;
          margin-left: -1px;
          flex: 2;
          box-sizing: border-box;
          overflow: auto;
        }
      }
    }
  }
}
</style>
