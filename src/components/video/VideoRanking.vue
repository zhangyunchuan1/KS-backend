<template>
    <div class="videoRanking">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="videoRanking_main">
        <!--标题-->
        <div class="title">
          <p>用户排名</p>
        </div>

        <div class="ranking_content">
          <div class="ranking_header">
            <div class="ranking_search">
              <!-- <div>
                <el-input placeholder="视频标题搜索" v-model="topicSearch" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="用户名搜索" v-model="userNameSearch" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div> -->
              <div>
                <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select" @input="searchNickName($event)" clearable @clear="getVideoUserList">
                  <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch"></el-button>
                </el-input>
              </div>
            </div>
          </div>

          <div class="ranking_content_box">

            <el-table
              :data="tableData"
              :border="true"
              style="width: 886px">
              <el-table-column
                label="ID"
                align="center"
                width="65"
                prop="user_id"
                sortable>
              </el-table-column>

              <el-table-column
                label="昵称"
                align="center"
                width="130"
                show-overflow-tooltip
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户类别"
                align="center"
                show-overflow-tooltip
                :filters="[{text: '个人', value: 1}, {text: '专业商家', value: 2}, {text: '普通商家', value: 3}]"
                :filter-method="filterSecondary"
                prop="user_type"
                width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.user_type === 1">个人</span>
                    <span v-if="scope.row.user_type === 2">专业商家</span>
                    <span v-if="scope.row.user_type === 3">普通商家</span>
                </template>
              </el-table-column>

              <el-table-column
                label="总浏览次数"
                align="center"
                width="130"
                show-overflow-tooltip
                prop="video_view"
                sortable>
              </el-table-column>

              <el-table-column
                label="总点赞次数"
                align="center"
                show-overflow-tooltip
                width="130"
                prop="video_like"
                sortable>
              </el-table-column>

              <el-table-column
                label="总讨论次数"
                align="center"
                show-overflow-tooltip
                width="130"
                prop="video_comment"
                sortable>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="ranking_scope"
                width="200">
                <template slot-scope="scope">
                  <div class="ranking_btm">
                    <div @click="handleSeeData(scope.row)">数据</div>
                    <div>查看用户</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>


      <!--禁用弹窗-->
      <el-dialog
        width="400px"
        custom-class="dataDialog"
        :visible.sync="dataDialog">
        <span slot="title" class="dataDialog_title"><i class="iconfont icon-shuju"></i>数据</span>
        <div class="data_dialog_box">
          <div class="data_dialog_list">
            <p>总视频数</p>
            <span>{{allVideoNum}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均浏览次数</p>
            <span>{{averageViewNum}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均点赞次数</p>
            <span>{{averageLikeNum}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均讨论次数</p>
            <span>{{averageDiscussNum}}</span>
          </div>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  export default {
    name: "VideoRanking",
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
          name: '用户排名',
          urls: '/index/video/videoRanking',
          icon: 'icon-home'
        }],

        allVideoNum:0,  //视频总数
        averageViewNum:0,  //平均浏览数
        averageLikeNum:0,  //平均点赞数
        averageDiscussNum:0,  //平均讨论数
        
        nickNameSearch:null,  //昵称搜索

        // 表格
        tableData: [],

        dataDialog: false,  // 数据弹窗

      }
    },
    mounted(){
      this.getVideoUserList();
    },
    methods:{
      // 查看数据
      handleSeeData(i){
          console.log(i)
          this.allVideoNum = i.video_total;
          this.averageViewNum = i.video_view/i.video_total;
          this.averageLikeNum = i.video_like/i.video_total;
          this.averageDiscussNum = i.video_comment/i.video_total;
          this.dataDialog = true;
      },
      //根据昵称搜索
      handleNickNameSearch(){
          this.getVideoUserList();
      },
      //获取视频用户排名数据
      getVideoUserList(){
          this.HttpClient.post('/admin/users/ranking',{
              type:'video',
              nickname:this.nickNameSearch,

          })
          .then(res=>{
              console.log(res);
              this.tableData = res.data.data.data;
          })
      },
      searchNickName(e){
          console.log(this.nickNameSearch)
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
    }
  }
</script>

<style lang="less">
  .videoRanking{
    .bread{
      margin: 10px;
    }
    .videoRanking_main::-webkit-scrollbar {display:none}
    .videoRanking_main {
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

      .ranking_content{
        box-sizing: border-box;
        padding: 0 40px;
        /*头部*/
        .ranking_header{
          box-sizing: border-box;
          padding-bottom:30px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          /*搜索框*/
          .ranking_search{
            display: flex;
            align-items: center;
            >div{
              margin-right: 30px;
            }
          }
        }

        /*表格*/
        .ranking_content_box {
          box-sizing: border-box;
          .el-table {
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .ranking_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .ranking_btm {
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

    /*数据弹窗*/
    .dataDialog{
      .el-dialog__body{
        padding-top: 0;
      }
      .dataDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          font-size: 20px;
          color: #15bafe;
        }
      }
      .data_dialog_box{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        .data_dialog_list{
          width: 140px;
          margin: 10px;
          box-sizing: border-box;
          p{
            border: 1px solid #15bafe;
            padding: 10px 0;
            width: 100%;
            margin-bottom: 10px;
            background: #15bafe;
            color: #fff;
            border-radius: 5px;
          }
          span{
            margin-top: -1px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 80px;
            border: 1px solid #dedede;
          }
        }

      }
    }
  }
</style>
