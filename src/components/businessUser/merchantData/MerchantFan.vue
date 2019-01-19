<template>
  <div class="merchantFan">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="merchantFan_main">
      <!--标题-->
      <div class="title">
        <p>商家的关注者</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="nickNameSearchFn"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="商家ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="商家昵称"
              align="center"
              width="220"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column label="关注者人数" align="center" width="180" prop="follow" sortable></el-table-column>

            <el-table-column label="性别比例" align="center" width="380">
              <template slot-scope="scope">
                <div v-if="scope.row.follow==0" class="sexRatio">
                  <p>
                    男性:
                    <span>0%</span>
                  </p>
                  <p>
                    保密:
                    <span>0%</span>
                  </p>
                  <p>
                    女性:
                    <span>0%</span>
                  </p>
                </div>
                <div v-else class="sexRatio">
                  <p>
                    男性:
                    <span>{{(scope.row.fans_male/scope.row.follow)*100}}%</span>
                  </p>
                  <p>
                    保密:
                    <span>{{(scope.row.fans_other/scope.row.follow)*100}}%</span>
                  </p>
                  <p>
                    女性:
                    <span>{{(scope.row.fans_female/scope.row.follow)*100}}%</span>
                  </p>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="喜好"
              align="center"
              show-overflow-tooltip
              width="400"
              prop="like"
            >
            <template slot-scope="scope">
                <div class="sexRatio">
                  <p>
                    文章:
                    <span>{{scope.row.article_percent}}%</span>
                  </p>
                  <p>
                    视频:
                    <span>{{scope.row.video_percent}}%</span>
                  </p>
                  <p>
                    百科:
                    <span>{{scope.row.encyc_percent}}%</span>
                  </p>
                  <p>
                    问题:
                    <span>{{scope.row.question_percent}}%</span>
                  </p>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="viewFansFn(scope.row)">查看关注者</el-button>
                  <el-button size="medium" type="text">商家页面</el-button>
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

    <!--查看关注者弹窗-->
    <el-dialog width="550px" custom-class="viewFansDialog" :visible.sync="viewFansDialog">
      <span slot="title" class="viewFansDialog_title">
        <i class="iconfont icon-team"></i>
        查看关注者 - {{nickname}}
      </span>
      <div class="viewFans_dialog_box">
        <p v-for="(item,index) in fansData" :key="index">{{item.nickname}}</p>
      </div>
      <el-pagination
        v-if="totaldialog"
        layout="prev, pager, next"
        :total="totaldialog"
        :page-size="pageSize"
        @current-change="currentdialogChange"
      ></el-pagination>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewFansDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "MerchantFan",
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
          name: "商家数据",
          urls: "/index/market/businessUser/merchantData/MerchantData",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "商家的关注者",
          urls: "/index/market/businessUser/merchantData/MerchantFan",
          icon: "icon-home"
        }
      ],

      nickNameSearch: "", // 昵称搜索

      tableData: [],
      fansData: [],
      nickname: "",

      viewFansDialog: false, // 查看粉丝弹窗

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数

      // 弹框分页
      dialogID:'',
      currentdialogPage: 1, // 当前页
      pageSizedialog:10,
      totaldialog: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      let params = {
        nickname: this.nickNameSearch
      };
      this.HttpClient.post("/admin/follow/businessLists", params).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 查看关注者
    viewFansFn(row) {
      console.log(row);
      this.nickname = row.nickname;
      this.viewFansDialog = true;
      this.dialogID = row.uid
      this.getdialoglist()
    },
    getdialoglist(){
      let params = {
        uid: this.dialogID,
        type: true,
        size:this.pageSizedialog,
        page:this.currentdialogPage
      };
      this.HttpClient.post("/admin/follow/lists", params).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.fansData = res.data.data.data;
          console.log(this.fansData)
          this.totaldialog = res.data.data.total
        }
      });
    },
    // 昵称搜索
    nickNameSearchFn() {
      this.getlist();
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlist();
    },
    // 弹框分页
    currentdialogChange(p) {
      this.currentdialogPage = p;
      this.getdialoglist();
    }
  }
};
</script>

<style lang="less">
.merchantFan {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .merchantFan_main::-webkit-scrollbar {
    display: none;
  }
  .merchantFan_main {
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

        .sexRatio {
          display: flex;
          align-items: center;
          justify-content: space-around;
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

/*查看关注者弹窗*/
.viewFansDialog {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .viewFansDialog_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
      color: #15bafe;
      font-size: 18px;
    }
  }
  .viewFans_dialog_box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-height: 300px;
    overflow: auto;
    p {
      margin: 10px;
      padding: 5px 15px;
      border: 1px solid #dedede;
    }
  }
}
</style>
