<template>
  <div class="disableBusiness">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="disableBusiness_main">
      <!--标题-->
      <div class="title">
        <p>禁用商家</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="公司对外名称搜索" v-model="companyNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="companyNameSearchFn"></el-button>
            </el-input>
            <el-input placeholder="电话搜索" v-model="accountSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="phoneSearch"></el-button>
            </el-input>
            <el-input placeholder="联系人搜索" v-model="phoneNumberSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="linkmanSearch"></el-button>
            </el-input>
          </div>
          <el-select v-model="handleType" clearable placeholder="请选择禁用类别" @change="filterHandlertype">
              <el-option
                v-for="item in disableType"
                :key="item.review_id"
                :label="item.name"
                :value="item.review_id"
              ></el-option>
            </el-select>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="商家ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="130"
              show-overflow-tooltip
              prop="company_name"
            ></el-table-column>

            <el-table-column
              label="电话"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="phone"
            ></el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              width="130"
              prop="status"
              :filters="[{text: '正常', value: 1}, {text: '禁用', value: 3}]"
              :filter-method="filterHandlerloginstatus"
            >
              <template slot-scope="scope">
                <span>{{scope.row.status == 0?'删除':scope.row.status == 1?'正常':scope.row.status == 2?'注销':scope.row.status == 3?'禁用':scope.row.status == 4?'待审核':scope.row.status == 5?'驳回':scope.row.status == 6?'审核未通过':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="禁用开始时间"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="disable_start"
              sortable
            ></el-table-column>

            <el-table-column
              label="禁用结束时间"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="disable_end"
              sortable
            ></el-table-column>

            <el-table-column label="禁用次数" align="center" width="150" prop="disable_num" sortable></el-table-column>

            <el-table-column label="禁用类别" align="center" width="150" prop="disable_name"></el-table-column>

            <el-table-column label="禁用理由" align="center" width="150" prop="disable_reason"></el-table-column>

            <el-table-column label="操作" align="center" class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="mallReview_btm">
                  <el-button @click="lookdisableImg(scope.row)">查看禁用证据</el-button>
                  <el-button v-if="scope.row.status == 1" @click="disableuseBusiness(scope.row)">禁用</el-button>
                  <el-button v-if="scope.row.status == 3" @click="recoverBtm(scope.row)">恢复</el-button>
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

    <!--图片证据弹窗-->
    <el-dialog :visible.sync="imagesEvidence" width="400px" custom-class="imagesEvidence">
      <span slot="title" class="imagesEvidence_title">
        <i class="iconfont icon-fund"></i>图片证据
      </span>
      <div class="imagesEvidence_main">
        <div class="main_content">
          <div
            @click="innerVisible = true;imgurl = item.images"
            class="content_img"
            v-for="(item,index) in imageData"
            :key="index"
          >
            <img :src="Tools.handleImg(item.images)" alt>
            <span>{{item.created_at}}</span>
          </div>
        </div>
      </div>
      <el-dialog width="30%" :visible.sync="innerVisible" append-to-body>
        <img :src="Tools.handleImg(imgurl)" alt>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imagesEvidence = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--恢复弹窗-->
    <el-dialog :visible.sync="restoreBox" width="400px" custom-class="restoreBox">
      <span slot="title" class="restoreBox_title">
        <i class="iconfont icon-jinyong"></i>恢复
      </span>
      <div class="restoreBox_main">
        <div class="main_content">
          <i class="iconfont icon-warning-circle"></i>
          <div>确定恢复吗？</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="restoreBox = false">取 消</el-button>
        <el-button type="primary" @click="restoreBtm">确 定</el-button>
      </span>
    </el-dialog>

    <!--禁用弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>禁用
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">理由：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" v-model="rejectReason" :rows="4"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">类别：</div>
        <div class="disable_dialog_right">
          <el-radio-group v-model="rejectValue">
            <el-radio
              border
              :label="item.review_id"
              v-for="(item,index) in disableType"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">上传截图：</div>
        <div class="disable_dialog_right">
          <el-upload
            class="img-uploader"
            action="/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="imageUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="forbiddenConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "disableBusiness",
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
          name: "禁用商家",
          urls: "/index/market/businessUser/businessAccount/DisableBusiness",
          icon: "icon-home"
        }
      ],

      companyNameSearch: "", // 公司对外名称搜索
      accountSearch: "", // 公司注册名称搜索
      phoneNumberSearch: "", // 电话搜索
      accountNameSearch: "", // 联系人搜索
      handleType: "", //禁用类别

      tableData: [
        {
          id: 1,
          nickname: "大超超超",
          companyName: "酷耍电子商务有限公司",
          phoneNumber: "12312341234",
          loginStatus: "正常",
          contactName: "小超超超",
          startTime: "2018/12/13",
          endTime: "2018/12/14",
          bansNumber: "15",
          disableCategory: "辣鸡广告",
          disablingReason: "非法广告"
        }
      ],
      rowData: {},
      disableType: [], //禁用类别

      disable: false, // 禁用
      disableDialog: false, // 禁用弹窗
      rejectReason: "", // 禁用理由
      rejectValue: null, // 禁用单选框
      imageUrl: null,

      restore: true, // 恢复
      restoreBox: false, // 恢复弹窗

      imagesEvidence: false, // 图片证据
      innerVisible: false,
      imageData: [], //禁用图片
      imgurl: "",

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
    this.getdisableData()
  },
  methods: {
    // 获取列表
    getlistData() {
      let params = {
        company_name: this.companyNameSearch,
        disable_id: "",
        contacts: this.phoneNumberSearch,
        phone: this.accountSearch,
        disable_id: this.handleType
      };
      this.HttpClient.post("/admin/forbidden/businessLists", params).then(
        res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        }
      );
    },
    // 登录状态筛选
    filterHandlerloginstatus(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 禁用类别
    filterHandlertype() {
      console.log(this.handleType);
      this.getlistData();
    },
    // 公司名称搜索
    companyNameSearchFn() {
      this.getlistData();
    },
    // 电话搜索
    phoneSearch() {
      this.getlistData();
    },
    // 联系人搜索
    linkmanSearch() {
      this.getlistData();
    },
    // 点击恢复
    recoverBtm(row) {
      console.log(row);
      this.restoreBox = true;
      this.rowData = row;
    },
    // 确定恢复
    restoreBtm() {
      this.disable = true;
      this.restoreBox = false;
      this.restore = false;
      console.log(this.rowData.uid);
      this.HttpClient.post("/admin/forbidden/recovery", {
        uid: this.rowData.uid
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    },
    // 确定禁用
    forbiddenConfirm() {
      this.restore = true;
      this.disable = false;
      this.disableDialog = false;
      var str = "";
      this.disableType.forEach(e => {
        if (e.review_id == this.rejectValue) {
          str = e.name;
        }
      });
      let params = {
        uid: this.rowData.uid,
        content: this.rejectReason,
        limit_day: 30,
        review_id: this.rejectValue,
        review_name: str,
        images: this.imageUrl
      };
      this.HttpClient.post("/admin/forbidden/create", params).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    },
    // 获取审核信息
    getdisableData() {
      this.HttpClient.post("/admin/webReview/getList", {
        type: "business"
      }).then(res => {
        if (res.data.code == 200) {
          this.disableType = res.data.data;
          console.log(this.disableType)
        }
      });
    },

    // 图片上传
    imageUpload(file) {
      console.log(file);
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          console.log(res.data.path);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.path;
            this.isshowoldimg = false;
          }
        }
      );
    },

    // 查看禁用证据
    lookdisableImg(row) {
      this.imagesEvidence = true;
      this.HttpClient.post("/admin/forbidden/lists", { uid: row.uid }).then(
        res => {
          console.log(res.data.data);
          if (res.data.code === 200) {
            this.imageData = res.data.data;
          }
        }
      );
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    // 点击禁用
    disableuseBusiness(row) {
      console.log(row);
      this.rowData = row;
      this.disableDialog = true;
      this.getdisableData();
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
  }
};
</script>

<style lang="less">
.disableBusiness {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .disableBusiness_main::-webkit-scrollbar {
    display: none;
  }
  .disableBusiness_main {
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

/*恢复弹窗*/
.restoreBox {
  .restoreBox_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
      margin-right: 15px;
    }
  }
  .restoreBox_main {
    .main_content {
      box-sizing: border-box;
      text-align: center;
      i {
        font-size: 80px;
        color: #15bafe;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
}

/*禁用弹窗*/
.disableDialog {
  .disableDialog_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
    }
  }
  .disable_dialog_box:not(:last-child) {
    margin-bottom: 20px;
  }
  .disable_dialog_box {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    /*单选框*/
    .disable_dialog_right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 275px;
      /*单选框样式*/
      .el-radio:nth-child(1) {
        margin-top: 0;
      }
      .el-radio.is-checked {
        background: #15bafe;
        border-color: #15bafe;
        .el-radio__label {
          color: #fff;
        }
      }
      .el-radio {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 275px;
        margin: 10px auto;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding: 0;
        }
      }
    }

    /*上传框*/
    .img-uploader {
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

/*图片证据弹窗*/
.imagesEvidence {
  .imagesEvidence_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
      margin-right: 15px;
    }
  }
  .imagesEvidence_main {
    .main_content {
      box-sizing: border-box;
      text-align: center;
      display: flex;
      align-items: center;
      .content_img:not(:last-child) {
        margin-right: 15px;
      }
      .content_img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
        span {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 3px 10px;
          background: #15bafe;
          color: #fff;
        }
      }
    }
  }
}
</style>
