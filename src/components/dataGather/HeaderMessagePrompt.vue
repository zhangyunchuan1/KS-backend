<template>
  <div class="HeaderMessagePrompt">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="productReview_main">
      <!--标题-->
      <div class="title">
        <p>头部消息提示</p>
      </div>

      <div class="content">
        <!-- <div class="content_header">
                    <el-radio-group v-model="contentHeader" >
                        <el-radio border :label="null">用户类型</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="content_header">
                    <el-radio-group v-model="contentHeader">
                        <el-radio border :label="null">消息类别</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="content_header">
                    <el-radio-group v-model="contentHeader" >
                        <el-radio border :label="null">颜色</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
        </div>-->
        <div class="content_main">
          <div class="content_search">
            <div class="encyclopedia_search">
              <div class="content_select">
                <div class="date_item">
                  <p class="date_label">开始</p>
                  <el-date-picker
                    v-model="searchObj.startTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    class="date_picker_1"
                    type="date"
                    size="mini"
                    clearable
                    placeholder="选择日期"
                    @change="handleStartTime($event)"
                  ></el-date-picker>
                </div>
                <div class="date_item">
                  <p class="date_label">截止</p>
                  <el-date-picker
                    v-model="searchObj.endTime"
                    class="date_picker_1"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    size="mini"
                    clearable
                    placeholder="选择日期"
                    @change="handleEndTime($event)"
                  ></el-date-picker>
                </div>
              </div>
            </div>
          </div>

          <div class="content_table">
            <el-table :data="tableData" :border="true">
              <el-table-column label="昵称" align="center" show-overflow-tooltip width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.nickname || '无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                width="160"
                :filters="[{text: '普通用户', value: 1}, {text: '专业商家 ', value: 2}, {text: '普通商家', value: 3}]"
                :filter-method="filterSecondary"
                show-overflow-tooltip
                prop="user_type"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.user_type === 1">普通用户</span>
                  <span v-if="scope.row.user_type === 2">专业商家</span>
                  <span v-if="scope.row.user_type === 3">普通商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="消息类别"
                align="center"
                width="160"
                :filters="[{text: '注册', value:1}, {text: '订单 ', value: 2}, {text: '修改密码 ', value:3}, {text: '配送 ', value: 4}, {text: '点赞 ', value: 5}, {text: '收入 ', value: 6}, {text: '退款 ', value: 7}]"
                :filter-method="filterSecondary"
                show-overflow-tooltip
                prop="category"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.category === 1">注册</span>
                  <span v-if="scope.row.category === 2">订单</span>
                  <span v-if="scope.row.category === 3">修改密码</span>
                  <span v-if="scope.row.category === 4">配送</span>
                  <span v-if="scope.row.category === 5">点赞</span>
                  <span v-if="scope.row.category === 6">收入</span>
                  <span v-if="scope.row.category === 7">退款</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="消息子类别" show-overflow-tooltip align="center" width="160">
                <template slot-scope="scope">
                  <span>{{scope.row.content.action || '无'}}</span>
                  <!-- <span v-if="scope.row.content === null">无</span>  -->
                </template>
              </el-table-column>

              <el-table-column label="消息内容" align="center" width="300" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.content.info || '无'}}</span>
                  <!-- <span v-if="scope.row.content === null">无</span>   -->
                </template>
              </el-table-column>

              <el-table-column label="颜色" align="center" show-overflow-tooltip width="160">
                <template slot-scope="scope">
                  <!-- <span v-if="scope.row.content === null">无</span> -->
                  <span>{{scope.row.content.color || '无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
                show-overflow-tooltip
                width="120"
                :filters="[{text: '未读', value:0}, {text: '已读', value:1}]"
                :filter-method="filterSecondary"
                prop="flag"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.flag === 0">未读</span>
                  <span v-if="scope.row.flag === 1">已读</span>
                </template>
              </el-table-column>

              <el-table-column
                label="发送时间排列"
                align="center"
                show-overflow-tooltip
                width="180"
                prop="created_at"
              ></el-table-column>

              <el-table-column label="操作" align="center" class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button v-if="scope.row.flag === 0" @click="handleChangeFlag(scope.row)">已读</el-button>
                    <el-button v-if="scope.row.flag === 1" @click="handleChangeFlag(scope.row)">未读</el-button>
                    <el-button @click="handleDelete(scope.row)">删除</el-button>
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
    </div>

    <!--确定改变状态弹窗-->
    <el-dialog :visible.sync="approveDialog" width="400px" custom-class="approveDialog">
      <span slot="title" class="approveDialog_title">
        <i class="iconfont icon-icon-test"></i>更改
      </span>
      <div class="approveDialog_main">
        <div class="main_content">
          <i class="iconfont icon-warning-circle"></i>
          <div v-if="flag === 0">确定更改为已读吗？</div>
          <div v-if="flag === 1">确定更改为未读吗？</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureChange">确 定</el-button>
      </span>
    </el-dialog>
    <!--确定删除弹窗-->
    <el-dialog :visible.sync="delateDialog" width="400px" custom-class="approveDialog">
      <span slot="title" class="approveDialog_title">
        <i class="iconfont icon-icon-test"></i>删除
      </span>
      <div class="approveDialog_main">
        <div class="main_content">
          <i class="iconfont icon-warning-circle"></i>
          <div>确定删除此消息吗？</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delateDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "HeaderMessagePrompt",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "用户行为分析",
          urls: "/index/data-gather",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "头部消息提示",
          urls: "/index/dataGather/header-message-prompt",
          icon: "icon-home"
        }
      ],
      approveDialog: false,
      delateDialog: false,
      contentHeader: null,
      searchObj: {},
      SellerName: null,
      productName: null,
      tableData: null,

      typeList: [],
      flag: null,

      total: null,
      currentPage: 1,

      // 操作ID
      Id: null //更改和删除存储的id
    };
  },
  mounted() {
    this.getTipsList();
  },
  methods: {
    getTipsList() {
      this.HttpClient.post("/admin/behavior/headerSms", {
        date_start: this.searchObj.startTime,
        date_end: this.searchObj.endTime,
        size: 25,
        page: this.currentPage
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    //更改消息状态
    handleChangeFlag(i) {
      console.log(i);
      this.Id = i.message_id;
      this.flag = i.flag;
      this.approveDialog = true;
    },
    //确定更改状态
    handleSureChange() {
      if (this.flag === 0) {
        this.HttpClient.post("/admin/behavior/headerSmsChange", {
          message_id: this.Id,
          flag: 1
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getTipsList();
              this.approveDialog = false;
            }, 500);
          }
        });
      } else if (this.flag === 1) {
        this.HttpClient.post("/admin/behavior/headerSmsChange", {
          message_id: this.Id,
          flag: 0
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getTipsList();
              this.approveDialog = false;
            }, 500);
          }
        });
      }
    },
    //删除弹窗
    handleDelete(i) {
      console.log(i);
      this.Id = i.message_id;
      this.delateDialog = true;
    },
    //确定删除
    handleSureDelete() {
      this.HttpClient.post("/admin/behavior/headerSmsDel", {
        message_id: this.Id
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.getTipsList();
          this.delateDialog = false;
        }
      });
    },
    //选择截止时间
    handleEndTime() {
      console.log(this.searchObj.endTime);
      this.getTipsList();
    },
    //选择开始时间
    handleStartTime(e) {
      console.log(this.searchObj.startTime);
      this.getTipsList();
    },
    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getTipsList();
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style lang="less">
.HeaderMessagePrompt {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .productReview_main::-webkit-scrollbar {
    display: none;
  }
  .productReview_main {
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
      padding: 20px 40px;
      box-sizing: border-box;
      // .content_header{
      //     border-bottom: 1px solid #dedede;
      //     padding-bottom: 20px;
      //     margin-bottom: 10px;
      //     .el-radio{
      //         text-align: center;
      //         padding: 0 20px;
      //         height: 35px;
      //         line-height: 35px;
      //         border-radius: unset;
      //         .el-radio__input{
      //             display: none;
      //         }
      //         .el-radio__label{
      //             padding: 0;
      //         }
      //     }
      //     .el-radio.is-checked{
      //         border-color: #15bafe;
      //         background: #15bafe;
      //         .el-radio__label{
      //             color: #fff;
      //         }
      //     }
      // }

      .content_main {
        /*搜索框*/
        .encyclopedia_search {
          display: flex;
          justify-content: flex-start;
          margin: 20px 0;
          .content_select {
            display: flex;
            .date_item {
              display: flex;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              margin-right: 20px;
              .date_label {
                color: #808080;
                font-size: 12px;
                height: 40px;
                line-height: 40px;
                margin-left: 10px;
              }
              .el-input--mini {
                .el-input__inner {
                  height: 40px;
                  line-height: 40px;
                  border: none !important;
                }
              }
              .date_picker_1 {
                width: 140px;
              }
            }
          }
          > div {
            margin-right: 30px;
          }
        }

        /*表格*/
        .content_table {
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

                .el-input--suffix .el-input__inner {
                  color: #fff;
                  font-weight: 900;
                  border: none;
                  padding: 0;
                  background: #15bafe;
                }
                .el-input__inner::placeholder {
                  color: #fff !important;
                  font-weight: 900 !important;
                }
                .el-input__inner::-webkit-input-placeholder {
                  color: #fff !important;
                  font-weight: 900 !important;
                }
                .el-input__inner::-moz-placeholder {
                  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                  color: #fff !important;
                  font-weight: 900 !important;
                }
                .el-input__inner:-ms-input-placeholder {
                  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                  color: #fff !important;
                  font-weight: 900 !important;
                }
                .el-input__suffix {
                  right: -2px;
                  .el-select__caret {
                    color: #fff;
                  }
                  .el-input__icon {
                    width: 14px;
                  }
                }
                .el-select {
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
          .el-pagination {
            text-align: center;
          }

          /*操作按钮*/
          .mallReview_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .mallReview_btm {
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
        }
      }
    }
  }
}
/*确认批准确认弹窗*/
.approveDialog {
  .approveDialog_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
      margin-right: 15px;
    }
  }
  .approveDialog_main {
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
</style>
