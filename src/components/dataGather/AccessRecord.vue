<template>
  <div class="AccessRecord">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="productReview_main">
      <!--标题-->
      <div class="title">
        <p>访问记录</p>
      </div>

      <div class="content">
        <div class="content_main">
          <div class="content_table">
            <el-table :data="tableData" :border="true">
              <el-table-column
                label="IP地址"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="ip"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.ip">{{scope.row.ip}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="通信厂商"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="operator"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.operator === '172.0.0.1'">本地</span>
                  <span v-else>{{scope.row.operator}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="浏览器"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="browser_name"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.browser_name">{{scope.row.browser_name}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="浏览器版本"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="browser_version"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.browser_version">{{scope.row.browser_version}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="屏幕大小"
                align="center"
                width="80"
                show-overflow-tooltip
                prop="screen_size"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.screen_size">{{scope.row.screen_size}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="设备类型"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="agent_type"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.agent_type">{{scope.row.agent_type}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="国家"
                align="center"
                show-overflow-tooltip
                width="90"
                prop="country"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.country">{{scope.row.country}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="地区"
                align="center"
                show-overflow-tooltip
                width="90"
                prop="area"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.area">{{scope.row.area}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="访问页面"
                align="center"
                show-overflow-tooltip
                width="120"
                prop="current_page"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.current_page">{{scope.row.current_page}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="访问时间"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="access_time"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.access_time">{{scope.row.access_time}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="离开时间"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="leave_time"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.leave_time">{{scope.row.leave_time}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="上行速度"
                align="center"
                show-overflow-tooltip
                width="80"
                prop="upstream_rate"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.upstream_rate">{{scope.row.upstream_rate}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="下载速度"
                align="center"
                width="80"
                show-overflow-tooltip
                prop="downstream_rate"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.downstream_rate">{{scope.row.downstream_rate}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="服务器请求处理时间"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="handle_time"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.handle_time">{{scope.row.handle_time}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="页面地址"
                align="center"
                show-overflow-tooltip
                width="100"
                prop="current_url"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.current_url">{{scope.row.current_url}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="昵称"
                align="center"
                show-overflow-tooltip
                width="80"
                prop="nickname"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                  <span class="sortout_color" v-else>无</span>
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
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "AccessRecord",
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
          urls: "/index/market/Market",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "访问记录",
          urls: "/index/market/marketProduct/MarketProduct",
          icon: "icon-home"
        }
      ],
      approveDialog: false,
      contentHeader: null,
      searchObj: {},
      SellerName: null,
      productName: null,
      tableData: [],

      typeList: [],

      total: null,
      currentPage: 1
    };
  },
  mounted() {
    this.getAccessRecordList();
  },
  methods: {
    // 获取访问记录
    getAccessRecordList() {
      this.HttpClient.post("/admin/behavior/accessRecord", {
        size: 25,
        page: this.currentPage
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.data;
        for (let i in this.tableData) {
          this.tableData[i].access_time = this.getLocalTime(
            this.tableData[i].access_time
          );
        }
        this.total = res.data.data.total;
      });
    },
    //时间戳转换时间格式
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getAccessRecordList();
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style lang="less">
.AccessRecord {
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
      .content_main {
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
        }
      }
    }
  }
}
</style>
