<template>
  <div class="videoSurvey">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="videoReply_main">
      <!--标题-->
      <div class="title">
        <p>视频调查</p>
      </div>

      <div class="reply_header">
        <div class="reply_select">
          <div class="date_item">
            <p class="date_label">开始</p>
            <el-date-picker
              v-model="serachObj.startTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
              @change="handleStartTime($event)">
            </el-date-picker>
          </div>
          <div class="date_item">
            <p class="date_label">截止</p>
            <el-date-picker
              v-model="serachObj.endTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
              @change="handleEndTime($event)">
            </el-date-picker>
          </div>
        </div>

        <div class="reply_search">
          <div>
            <el-input placeholder="视频标题搜索" v-model="serachObj.topicSearch" class="input-with-select" @input="searchTitle($event)" clearable @clear="getVideoList">
              <el-button slot="append" icon="el-icon-search" @click="handleSearchTitle()"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="用户名搜索" v-model="serachObj.userNameSearch" class="input-with-select" @input="searchUserName($event)" clearable @clear="getVideoList">
              <el-button slot="append" icon="el-icon-search" @click="handleSearchUserName()"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="昵称搜索" v-model="serachObj.nickNameSearch" class="input-with-select" @input="searchNickName($event)" clearable @clear="getVideoList">
              <el-button slot="append" icon="el-icon-search" @click="handleSearchNickName()"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="reply_content_box">

        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%">
          <el-table-column
            label="ID"
            align="center"
            width="65"
            prop="id"
            sortable>
          </el-table-column>

          <el-table-column
            label="视频标题"
            align="center"
            show-overflow-tooltip
            width="180"
            prop="title">
          </el-table-column>

          <el-table-column
            label="昵称"
            align="center"
            show-overflow-tooltip
            width="120"
            prop="nickname">
          </el-table-column>

          <el-table-column
            label="用户名"
            align="center"
            show-overflow-tooltip
            width="120"
            prop="username">
          </el-table-column>

          <el-table-column
            label="所属板块"
            align="center"
            show-overflow-tooltip
            :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}]"
            :filter-method="filterSecondary"
            width="100"
            prop="category_name">
          </el-table-column>

          <el-table-column
            label="视频类别"
            align="center"
            show-overflow-tooltip
            :filters="[{text: '普通视频', value:null}, {text: '教程视频', value:1}]"
            :filter-method="filterSecondary"
            prop="is_course"
            width="125">
            <template slot-scope="scope">
                <span v-if="scope.row.is_course == 0||scope.row.is_course === null">普通视频</span>
                <span v-if="scope.row.is_course !== 0 && scope.row.is_course != null">教程视频</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            show-overflow-tooltip
            width="180"
            prop="created_at"
            sortable>
          </el-table-column>

          <el-table-column
            label="浏览次数排列"
            align="center"
            show-overflow-tooltip
            width="100"
            prop="view_num"
            sortable>
          </el-table-column>

          <el-table-column
            label="点赞次数排列"
            align="center"
            show-overflow-tooltip
            width="100"
            prop="like_num"
            sortable>
          </el-table-column>

          <el-table-column
            label="讨论次数排列"
            align="center"
            show-overflow-tooltip
            width="100"
            prop="comment_num"
            sortable>
          </el-table-column>

          <el-table-column
            label="视频完整度"
            align="center"
            show-overflow-tooltip
            width="130"
            prop="integrity"
            sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.integrity === null">暂无统计</span>
              <span v-if="scope.row.integrity !== null">{{scope.row.integrity}}%</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            class-name="reply_scope">
            <template slot-scope="scope">
              <div class="reply_btm">
                <div>查看视频</div>
                <div>进入个人主页</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          v-if="total"
          layout="prev, pager, next"
          :total="total"
          :page-size="25"
          @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  export default {
    name: "videoReply",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        breadData: [{
          id: 1,
          name: '视频',
          urls: '/index/video/video',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '视频调查',
          urls: '/index/video/videoReply',
          icon: 'icon-home'
        }],

        startTime:null,  //开始时间
        endTime:null,  //结束时间
        topicSearch:null, // 题目搜索
        userNameSearch:null, //用户名
        nickNameSearch:null,  //昵称搜索
        serachObj:{},

        // 表格
        tableData: [],
        total:null,
      }
    },
    mounted(){
        this.getVideoList();
    },
    methods:{
      //题目搜索
      handleSearchTitle(){
          console.log(this.topicSearch)
          this.getVideoList();   
      },
      // 用户名搜索
      handleSearchUserName(){
          console.log(this.userNameSearch)
          this.getVideoList();   
      },
      // 昵称搜索
      handleSearchNickName(){
          console.log(this.nickNameSearch)
          this.getVideoList();   
      },
      //获取视频列表信息
      getVideoList(){
          this.HttpClient.post('/admin/videos/getList',{
            start_time:this.serachObj.startTime,
            end_time:this.serachObj.endTime,
            nickname:this.serachObj.nickNameSearch,
            username:this.serachObj.userNameSearch,
            title:this.serachObj.topicSearch
          })
          .then(res=>{
              console.log(res);
              this.tableData = res.data.data.data;
              this.total = res.data.data.total;
          })
      },
      //标题搜索处理
      searchTitle(e){
          
      },
      //用户名
      searchUserName(e){
          
      },
      //昵称
      searchNickName(e){
          
      },
      //选择开始时间
      handleStartTime(e){
          console.log(this.startTime,this.endTime)
          this.getVideoList(this.startTime,this.endTime,this.nickNameSearch,this.userNameSearch,this.topicSearch);
      },
      //选择结束时间
      handleEndTime(e){
          console.log(this.startTime,this.endTime)
          this.getVideoList(this.startTime,this.endTime,this.nickNameSearch,this.userNameSearch,this.topicSearch);
      },
      filterPlate(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //分页
      currentChange(page) {
        this.currentPage = page;
        this.getVideoList();
      },
    }
  }
</script>

<style lang="less">
  .videoSurvey{
    .bread{
      margin: 10px;
    }
    .videoReply_main::-webkit-scrollbar {display:none}
    .videoReply_main {
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
      .reply_header{
        box-sizing: border-box;
        padding: 0 40px 30px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .reply_select{
          display: flex;
          .date_item{
            display: flex;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            margin-right: 20px;
            .el-input__inner{
              border: none !important;
            }
            .date_label{
              color: #808080;
              font-size: 12px;
              height: 28px;
              line-height: 28px;
              margin-left: 10px;
            }
            .date_picker_1{
              width: 140px;
            }
          }
        }


        /*搜索框*/
        .reply_search{
          display: flex;
          align-items: center;
          >div{
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .reply_content_box {
        box-sizing: border-box;
        padding: 0 40px;
        .el-table {
          thead {
            color: #fff;
            th, tr {
              background-color: #15bafe;
            }
          }
        }

        /*操作按钮*/
        .reply_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .reply_btm {
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
