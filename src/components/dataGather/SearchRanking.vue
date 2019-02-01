<template>
  <div class="searchRank">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="search_box">
      <div class="searchtitle">
        <div class="title">搜索排行</div>
      </div>
      <!-- 排行列表 -->
      <div class="search_header" style="width: 80%">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="keyword" label="输入内容" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="search_num" label="搜索次数" width="180"></el-table-column>
          <el-table-column prop="time.date" label="最近一次搜索时间" width="220"></el-table-column>
          <el-table-column prop="status" label="状态" width="200" :filters="[{text: '正常', value: 1}, {text: '删除', value: 2}, {text: '停用', value: 3}]"
      :filter-method="filterHandler">
            <template slot-scope="scope">
              <!-- 1 正常 2 删除 3 停用 -->
              <span>{{scope.row.status===1?'正常':scope.row.status===2?'删除':scope.row.status===0?'禁止':"暂无"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="forbidAndrecoverFn(scope.row)"
              >{{scope.row.status===1?'禁止':"恢复 "}}</el-button>
              <el-button type="text" @click="viewHisinformationFn(scope.row)">查看历史信息</el-button>
              <el-button type="text" @click="addTitleFn(scope.row)">添加小标题</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="total"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
      ></el-pagination>

      <!-- 禁止恢复操作 -->
      <div class="alertbox">
        <el-dialog title="提示" :visible.sync="centerforbidVisible" width="30%" center>
          <p class="tips">确定要{{operate}}吗？</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerforbidVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureforbidFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 添加小标题弹框 -->
      <div class="alertbox">
        <el-dialog title="添加小标题" :visible.sync="centerDialogVisible" width="30%" center>
          <el-input placeholder="请输入内容" v-model="addName" clearable></el-input>
          <div class="chooseplate">
            <div class="plate">选择板块</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="chooseplate">
            <div class="plate">选择类型</div>
            <el-select v-model="typeValue" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureaddnameFn">保 存</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 查看历史信息弹框 -->
      <div class="alertbox">
        <el-dialog title="历史查询" :visible.sync="centerhisDialogVisible" width="60%" center>
          <div class="title">{{queryName}}</div>
          <div class="histable">
            <el-table :data="tablehisData" border style="width: 100%">
              <el-table-column label="搜索时间" align="center" width="180" prop="created_at" sortable></el-table-column>

              <el-table-column label="浏览器" align="center" width="100" prop="browser_name" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.browser_name">{{scope.row.browser_name}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="浏览器版本" align="center" width="100" prop="browser_version" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.browser_version">{{scope.row.browser_version}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="屏幕大小" align="center" width="120" prop="screen_size" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.screen_size">{{scope.row.screen_size}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="移动端类型"
                align="center"
                :render-header="renderEquiptype"
                width="120"
                prop="agent_type"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.agent_type">{{scope.row.agent_type}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="当前页面" align="center" width="200" prop="current_page" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.current_page">{{scope.row.current_page}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="页面地址" align="center" width="180" prop="current_url" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.current_url">{{scope.row.current_url}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column label="昵称" align="center" prop="nickname" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                  <span class="sortout_color" v-else>无</span>
                </template>
              </el-table-column>
            </el-table>
            </div>
            <el-pagination
              v-if="totalNum"
              layout="prev, pager, next"
              :total="totalNum"
              :page-size="pagealertSize"
              @current-change="currentalertChange"
            ></el-pagination>
          
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "SearchRanking",
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
          name: "搜索排行",
          urls: "/index/dataGather/search-ranking",
          icon: "icon-home"
        }
      ],

      // 表格list
      tableData: [],
      centerDialogVisible: false, //添加小标题弹框
      addName: "", //添加的小标题内容
      options: [], //选择板块数据
      value: "", //当前选择的板块
      typeOptions: [
        {
          value: "video",
          label: "视频"
        },
        {
          value: "article",
          label: "文章"
        }
      ], //选择类型数据
      typeValue: "", //当前所选类型
      operate: "", //操作禁止恢复
      operateStatus:null, //操作禁止回复时状态
      centerforbidVisible: false,

      centerhisDialogVisible: false, //查看历史信息弹框
      queryName: "", //查询 内容
      equipType: [
        { text: "手机", value: "手机" },
        { text: "平板", value: "平板" },
        { text: "PC", value: "PC" }
      ],
      equipTypeSelect: "",
      rowData:[], //点击禁止操作选中当前Data
      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数

      tablehisData: [], //弹框历史查询数据
      // 弹框分页
      currentalertPage: 1, // 当前页
      pagealertSize: 7, // 每页显示数量
      totalNum: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistDataFn();
  },
  methods: {
    // 获取搜索排行列表
    getlistDataFn() {
      let params = {
        size: this.pageSize,
        page: this.currentPage
      };
      this.HttpClient.post("/admin/behavior/searchRank", params).then(res => {
        if (res.data.code) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          // console.log(res.data.data);
        }
      });
    },
    //查看历史信息
    viewHisinformationFn(row) {
      this.centerhisDialogVisible = true;
      this.queryName = row.keyword;
      this.gethislistData()
      //   console.log(row);
    },
    // 获取历史记录列表
    gethislistData(){
      let params = {
        size: this.pagealertSize,
        page: this.currentalertPage,
        keyword: this.queryName,
        agent_type:this.equipTypeSelect
      };
      this.HttpClient.post("/admin/behavior/searchHistory", params).then(
        res => {
          console.log(res.data)
          if(res.data.code === 200){
            this.tablehisData = res.data.data.data;
            this.totalNum = res.data.data.total;
          }
          this.equipTypeSelect = '';
        }
      );
    },
    // 获取板块类型
    getTypelist() {
      let params = {
        menu_type: 2,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data;
        }
      });
    },
    // 添加小标题
    addTitleFn(row) {
      this.centerDialogVisible = true;
      this.addName = row.keyword;
      this.getTypelist();
    },
    // 保存添加小标题
    sureaddnameFn() {
      // 调用接口
      let params = {
        type: this.value,
        section: this.typeValue,
        name: this.addName
      };
      this.HttpClient.post("/admin/behavior/addTitle", params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.centerDialogVisible = false;
        }
      });
    },
    // 点击操作中的禁止恢复
    forbidAndrecoverFn(row) {
      this.rowData = row;
      this.centerforbidVisible = true;
      if(row.status === 1){
        this.operate = '禁止'
        this.operateStatus = 0
      }else if(row.status === 0){
        this.operate = '恢复'
        this.operateStatus = 1
      }
    },
    sureforbidFn() {
      // console.log(this.rowData)
      this.centerforbidVisible = false;
      let params = {
        keyword:this.rowData.keyword,
        status:this.operateStatus
      }
      this.HttpClient.post('/admin/behavior/searchStatus',params).then(res => {
        if(res.data.code === 200){
          setTimeout(() => {
            this.getlistDataFn()
          },500)
        }
      })
      // 调用禁止与回复操作按钮接口，再调用获取list
    },
    renderEquiptype(h, { column }) {
      return h(
        "el-select",
        {
          // 'v-model':this.headerSelect,
          props: {
            value: "移动端类型",
            placeholder: "移动端类型"
          },
          on: {
            input: value => {
              this.equipTypeSelect = value;
              this.gethislistData()
              //   调用接口
            }
          }
        },
        [
          this.equipType.map(item => {
            return h("el-option", {
              props: {
                value: item.value,
                label: item.text
              }
            });
          })
        ]
      );
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistDataFn();
    },
    // 弹框分页
    currentalertChange(p) {
      this.currentalertPage = p;
      this.gethislistData();
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
};
</script>

<style lang='less'>
.searchRank {
  .bread {
    margin: 10px;
  }
  .search_box {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .searchtitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;
      .title {
        font-size: 20px;
        color: #222;
      }
    }
    .search_header {
      display: flex;
      align-items: center;
      padding: 0 15px 15px 15px;
      margin: 20px 0;
      .el-table th {
        background: #15bafe;
      }
      .el-table th > .cell {
        text-align: center;
        color: #fff;
        .el-table__column-filter-trigger i{
          color:#fff;
        }
      }
    }
    .alertbox {
      .tips{
        text-align: center;
        font-size: 18px;
      }
      .title {
        width: 110px;
        height: 40px;
        background: #15bafe;
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        margin: 10px 0;
      }
      .chooseplate {
        display: flex;
        margin: 10px 0;
        .plate {
          width: 110px;
          height: 40px;
          color: #fff;
          background: #15bafe;
          line-height: 40px;
          text-align: center;
          margin-right: 10px;
          border-radius: 4px;
        }
      }
      .histable {
        .el-select {
          padding: 0;
          padding-left: 5px;
          .el-input {
            padding: 0;
            .el-input__inner {
              border: none;
              padding: 0;
            }
            .el-input__suffix {
              right: -2px;
            }
          }
        }
      }
    }

    // .videolist_box {
    //   border: 1px solid #dedede;
    //   padding: 20px;
    //   .onevideo {
    //     display: flex;

    //     .title {
    //       border: 1px solid #dedede;
    //       padding: 10px 15px;
    //       font-size: 14px;
    //       align-items: center;
    //       border-radius: 4px;
    //       cursor: pointer;
    //     }
    //     .el-button {
    //       margin: 0 20px 0px 5px;
    //     }
    //   }
    // }
  }
}
</style>
