<template>
  <div class="titleData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="titleData_main">
      <!--标题-->
      <div class="title">
        <p>标题数据</p>
      </div>

      <div class="content">
        <div class="content_type">
          <div class="type_title">类型选择：</div>
          <el-radio-group v-model="typeSelection" @change="typeSelectionBtm">
            <el-radio border :label="7">视频</el-radio>
            <el-radio border :label="6">文章</el-radio>
          </el-radio-group>
        </div>

        <div class="content_type content_type_bottom">
          <div class="type_title">板块选择：</div>
          <el-radio-group v-model="plateSelection" @change="changeType">
            <el-radio
              border
              :label="item.menu_id"
              v-for="(item,index) in menuList"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <transition name="el-fade-in-linear">
          <div class="content_type_box" v-show="typeBoxShow">
            <el-radio-group v-model="titleSelection" @change="changetitleSelect">
              <el-radio
                border
                :label="item.id"
                v-for="(item,index) in titleList"
                :key="index"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </transition>

        <div class="content_table">
          <div class="content_table_header">当前标题下的总数量：{{titleCount}}</div>
          <el-table :data="tableData" :border="true">
            <el-table-column
              :label="this.typeSelection == 6?'文章ID':'视频ID'"
              align="center"
              show-overflow-tooltip
              width="90"
              prop="id"
            ></el-table-column>

            <el-table-column
              :label="this.typeSelection == 6?'文章标题':'视频标题'"
              align="center"
              show-overflow-tooltip
              prop="title"
            ></el-table-column>

            <el-table-column label="所属板块" align="center" width="190" prop="plate">
              <template slot-scope="scope">
                <span>{{titletext}}</span>
              </template>
            </el-table-column>

            <el-table-column label="用户类型" align="center" width="130" prop="type">
              <template slot-scope="scope">
                <span>{{scope.row.type == 1?'用户':'商家'}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="200"
              show-overflow-tooltip
              prop="nickname"
            >
            </el-table-column>

            <el-table-column label="燃料/电量" align="center" width="130" prop="fuel_electric" ></el-table-column>

            <el-table-column label="浏览次数" align="center" width="130" prop="view_num" ></el-table-column>

            <el-table-column label="点赞次数" align="center" width="130" prop="like_num" ></el-table-column>

            <el-table-column label="评论次数" align="center" width="130" prop="comment_num" ></el-table-column>

            <el-table-column
              label="分配时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="relation_time"
            ></el-table-column>
          </el-table>

          <div class="pagination">
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
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "TitleData",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "功能控制",
          urls: "/index/functionControl/FunctionControl",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "板块标题管理",
          urls:
            "/index/market/functionControl/plateTitleManagement/PlateTitleManagement",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "标题数据",
          urls: "/index/market/functionControl/plateTitleManagement/TitleData",
          icon: "icon-home"
        }
      ],

      typeSelection: 7, // 类型选择
      plateSelection: "", // 板块选择

      typeBoxShow: false,

      tableData: [],//列表数据
      menuList: [], //板块列表
      titleList: [], // 小标题列表
      titleSelection: "", //选中小标题id
      titletext:'',
      titleCount:null,//标题数量

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getTypelist();
  },
  methods: {
    // 获取菜单列表
    getTypelist() {
      let params = {
        menu_type: 2,
        type: this.typeSelection
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        console.log(res.data.data);
        if (res.data.code === 200) {
            this.menuList = res.data.data;
        }
      });
    },
    // 选择板块类型
    changeType() {
      this.typeBoxShow = true;
      console.log(this.plateSelection);
      var url = "";
      if (this.typeSelection == 6) {
        url = "/admin/articleTitle/getList";
        this.gettitlelist(url);
      } else {
        url = "/admin/videoTitle/getList";
        this.gettitlelist(url);
      }
    },
    gettitlelist(url) {
      this.HttpClient.post(url, { type: this.plateSelection }).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.titleList = res.data.data;
          } else {
            this.titleList = []
            this.tableData = []
          }
        } else {
          this.titleList = []
          this.tableData = []
        }
      });
    },
    // 选择小标题
    changetitleSelect() {
      console.log(this.titleSelection);
      if (this.typeSelection == 6) {
        var str = "1";
      } else if (this.typeSelection == 7) {
        var str = "2";
      }
      this.titleList.forEach(item => {
        console.log(this.titleSelection)
        if(item.id == this.titleSelection){
          this.titletext = item.name
        }
      })
      let params = {
        type: str,
        title_id: this.titleSelection,
        page:this.currentPage,
        page_size:this.pageSize,
      };
      this.HttpClient.post("/admin/title/getList", params).then(res => {
        if(res.data.code == 200){
          console.log(res.data)
          this.tableData = res.data.data.data
          this.total = res.data.data.total
          this.titleCount = res.data.count
          console.log(this.tableData)
        }
      });
    },
    // 类型选择
    typeSelectionBtm() {
      console.log(this.typeSelection);
      this.getTypelist();
      this.plateSelection = null;
      this.typeBoxShow = false;
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.changetitleSelect();
    }
  }
};
</script>

<style lang="less">
.titleData {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .titleData_main::-webkit-scrollbar {
    display: none;
  }
  .titleData_main {
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

      .content_type {
        display: flex;
        align-items: center;
        height: 40px;
        margin-bottom: 20px;
        .type_title {
          display: inline-block;
          padding: 0 15px;
          background: #15bafe;
          color: #fff;
          height: 100%;
          line-height: 40px;
          margin-right: 30px;
        }

        .el-radio-group {
          height: 100%;
          line-height: 40px;
          .el-radio {
            height: 100%;
            line-height: 40px;
            padding: 0 20px;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              padding: 0;
            }
          }

          .el-radio.is-checked {
            border-color: #15bafe;
            background: #15bafe;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }

      .content_type_box {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border: 1px solid #dedede;
        max-width: 900px;
        .el-radio.is-bordered {
          margin-bottom: 10px;
        }
        .el-radio__input {
          display: none;
        }
        .type_list {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          margin: 5px;
          border: 1px solid #dedede;
          font-size: 14px;
          color: #666;
        }
      }

      .content_table {
        margin: 20px 0;
        text-align: right;
        .content_table_header {
          display: inline-block;
          margin-bottom: 20px;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          background: #15bafe;
          color: #fff;
        }

        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }
        .encyclopedia_btm {
          display: flex;
          justify-content: space-around;
        }
        .pagination {
          margin: 20px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
