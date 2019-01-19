<template>
  <div class="encyclopediaSurvey">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="encyclopediaSurvey_main">
      <!--标题-->
      <div class="title">
        <p>百科调查</p>
      </div>

      <div class="survey_header">
        <div class="survey_select">
          <div class="date_item">
            <p class="date_label">开始</p>
            <el-date-picker
              v-model="startTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
          <div class="date_item">
            <p class="date_label">截止</p>
            <el-date-picker
            @change="getlistData"
              v-model="endTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>

        <div class="survey_search">
          <div>
            <el-input placeholder="百科标题搜索" v-model="topicSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="survey_content_box">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column label="ID" align="center" width="100" prop="id" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="百科标题" align="center" width="200" prop="title" show-overflow-tooltip></el-table-column>

          <el-table-column label="昵称" align="center" width="90" prop="nickname" show-overflow-tooltip></el-table-column>

          <el-table-column label="用户名" align="center" width="120" prop="username" show-overflow-tooltip></el-table-column>

          <el-table-column
            label="所属板块"
            align="center"
            width="100"
            prop="category.folder_name"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="创建时间" align="center" width="180" prop="created_at" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="浏览次数排列" align="center" width="130" prop="view_num" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="点赞次数排列" align="center" width="130" prop="like_num" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="讨论次数排列" align="center" width="130" prop="comment_num" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="百科完整度" align="center" width="130" prop="integrity" sortable show-overflow-tooltip></el-table-column>

          <el-table-column label="操作" align="center" class-name="survey_scope">
            <template slot-scope="scope">
              <div class="survey_btm">
                <div>预览</div>
                <div>进入个人主页</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @current-change="currentPageChange"
          :page-size="PageSize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "EncyclopediaSurvey",
  components: {
    BreadCrumb
  },
  data() {
    return {
      breadData: [
        {
          id: 1,
          name: "百科",
          urls: "/index/encyclopedia/encyclopedia",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "百科数据调查",
          urls: "/index/encyclopedia/encyclopediaSurvey",
          icon: "icon-home"
        }
      ],

      startTime: "", //开始时间
      endTime: "", //结束时间
      topicSearch: "", // 题目搜索
      userNameSearch: "", //用户名
      nickNameSearch: "", //昵称搜索

      // 表格
      tableData: [],

      // 分页
      PageSize: 25,
      total: null,
      currentpage: 1
    };
  },

  mounted() {
    this.getlistData();
  },
  methods: {
    // 获取数据调查列表
    getlistData() {
      let params = {
        size:this.PageSize,
        page:this.currentpage,
        start_time:this.startTime,
        end_time:this.endTime,
        nickname:this.nickNameSearch,
        username:this.userNameSearch,
        title:this.topicSearch
      }
      this.HttpClient.post("/admin/encyclopedias/getList", params).then(
        res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total
          }
        }
      );
    },
    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 分页
    currentPageChange(p) {
      this.currentpage = p;
      this.getlistData();
    }
  }
};
</script>

<style lang="less">
.encyclopediaSurvey {
  .bread {
    margin: 10px;
  }
  .encyclopediaSurvey_main::-webkit-scrollbar {
    display: none;
  }
  .encyclopediaSurvey_main {
    background: white;
    margin: 10px 10px 0 10px;
    height: calc(100vh - 150px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    padding-bottom: 50px;
    overflow-y: auto;

    /*标题*/
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dedede;
    }

    /*头部*/
    .survey_header {
      box-sizing: border-box;
      padding: 0 40px 30px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .survey_select {
        display: flex;
        .date_item {
          display: flex;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          margin-right: 20px;
          .el-input__inner {
            border: none !important;
          }
          .date_label {
            color: #808080;
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            margin-left: 10px;
          }
          .date_picker_1 {
            width: 140px;
          }
        }
      }

      /*搜索框*/
      .survey_search {
        display: flex;
        align-items: center;
        > div {
          margin-left: 30px;
        }
      }
    }

    /*表格*/
    .survey_content_box {
      box-sizing: border-box;
      padding: 0 40px;
      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
          }
        }
      }

      /*操作按钮*/
      .survey_scope {
        padding: 0;
        .cell {
          line-height: unset;
          .survey_btm {
            display: flex;
            align-items: center;
            div:not(:last-child) {
              border-right: 1px solid #ebeef5;
            }
            div {
              min-height: 47px;
              height: 100%;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
