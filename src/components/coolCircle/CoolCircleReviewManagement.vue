<template>
  <div class="coolCircleReviewManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="coolCircleReviewManagement_main">
      <!--标题-->
      <div class="title">
        <p>酷圈评论管理</p>
      </div>

      <div class="content">
        <div class="content_header">
          <p>板块选择</p>
          <el-radio-group v-model="plateRadio" @change="getlistData">
            <el-radio
              border
              label=""
            >全部</el-radio>
            <el-radio
              border
              :label="item.menu_id"
              v-for="(item,index) in typeData"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="content_header_search">
          <el-input placeholder="酷圈ID搜索" v-model="idSearch" clearable @change="getlistData" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
          </el-input>
          <el-input placeholder="用户昵称搜索" v-model="userNameSearch" @change="getlistData" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
          </el-input>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="酷圈ID" align="center" width="150" prop="id" sortable></el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="nickname"
            ></el-table-column>

            <el-table-column
              label="用户类型"
              align="center"
              width="120"
              show-overflow-tooltip
              :filters="[{text: '个人注册', value: 1}, {text: '公司注册', value: 2}, {text: '普通商家', value: 3}]"
              :filter-method="filterHandler"
              prop="user_type"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_type == 1?'个人注册':scope.row.user_type == 2?'公司注册':scope.row.user_type == 3?'普通商家':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="评论"
              align="center"
              show-overflow-tooltip
              width="220"
              prop="content"
            ></el-table-column>

            <el-table-column
              label="附件数量"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="attachment_sum"
              sortable
            >
            <template slot-scope="scope">
              <span v-if="scope.row.attachment_sum">{{scope.row.attachment_sum}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
            </el-table-column>

            <el-table-column
              label="评论时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
              sortable
            >
              <template slot-scope="scope">
              <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="140" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="deletedialogInfo(scope.row)">删除</el-button>
                  <el-button size="medium" type="text" @click="previewfileContent(scope.row)">预览</el-button>
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

    <!-- 预览弹框 -->
    <el-dialog
      width="550px"
      title="预览"
      custom-class="previewPictureDialog"
      :visible.sync="previewFileDialog"
    > 
      <div class="contentbox">
        <span>内容</span>
        <div class="contentfile">
          {{previewContent.content}}
        </div>
      </div>
      <div class="contentbox">
        <span>附件</span>
        <div class="contentfile">
          <!-- {{previewContent.content}} -->
          <div style="width:100%" v-if="previewContent.image">
            <div v-for="(item,index) in previewContent.image" :key="index">
              <div class="images" v-if="item.type === '1'">
                <img
                  :src="item.path"
                  alt
                  @click="viewImages(item.path)"
                >
              </div>
              <div class="video" v-if="item.type === '3'">
                <video muted="muted" loop="loop"
                  :src="item.path"
                  @click="viewVideos(item.path)"
                  
                ></video>
              </div>
              <!-- 文件 -->
              <div class="attachment" v-if="item.type === '2'">
                <div class="file-icon" @mouseenter="enterDownload" @mouseleave="leaveDownload">
                      <i class="el-icon-document"></i>
                      <p :title="item.name">{{item.name}}</p>
                      <div class="download" :class="isShowdownload?'showdownload':''">
                        <a :href="item.path+'?attname='">下载</a>
                      </div>
                    </div>
              </div>
            </div>
            
          </div>
          
          
        </div>
      </div>
    </el-dialog>

    <!--预览图片弹窗-->
    <!--预览图片弹窗-->
    <el-dialog
      width="550px"
      custom-class="previewPictureDialog"
      :visible.sync="previewPictureDialog"
    >
      <span slot="title" class="previewPictureDialog_title">
        <i class="iconfont icon-image"></i>预览图片
      </span>
      <div class="previewPictureDialog_box">
        <img :src="imgPath" alt>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewPictureDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--预览视频弹窗-->
    <el-dialog width="650px" custom-class="previewVideoDialog" :visible.sync="previewVideoDialog">
      <span slot="title" class="previewVideoDialog_title">
        <i class="iconfont icon-image"></i>预览视频
      </span>
      <div class="previewVideoDialog_box">
        <video id="video1" controls :src="videoPath"></video>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewVideoDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--确认删除弹框-->
    <el-dialog width="650px" title="删除" center custom-class="sureDeleteDialog" :visible.sync="previewdeleteDialog">
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewdeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "CoolCircleReviewManagement",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "酷圈",
          urls: "/index/coolCircle/CoolCircle",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "酷圈评论管理",
          urls: "/index/coolCircle/CoolCircleManagement",
          icon: "icon-home"
        }
      ],

      plateRadio: "",

      idSearch: "",
      userNameSearch: "",

      tableData: [],

      previewDialog: false,

      // 板块类别
      typeData: [],

      precontent: "",

      // 分页
      PageSize: 25,
      total: null,
      currentpage: 1,

      previewContent:{},
      previewFileDialog:false,

      deleteData:{},
      previewdeleteDialog:false,
      // 附件文件
      isShowdownload:false,//显示下载
      // 预览视频
      previewVideoDialog:false,
      videoPath:'',
      //预览图片
      imgPath:'',
      previewPictureDialog:false,
    };
  },
  mounted() {
    this.getTypelist();
  },
  watch:{
    previewVideoDialog(){
      var video1 = document.getElementById('video1');
      if(this.previewVideoDialog == false){
        video1.pause();
      }
    },
  },
  methods: {
    // 查看图片
    viewImages(imgurl) {
      this.previewPictureDialog = true;
      this.imgPath = imgurl;
    },
    // 查看视频
    viewVideos(videourl) {
      this.previewVideoDialog = true;
      this.videoPath = videourl;
    },
    enterDownload(){
      this.isShowdownload = true;
    },
    leaveDownload(){
      this.isShowdownload = false;
    },
    getTypelist() {
      let params = {
        menu_type: 2,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code == 200) {
          this.typeData = Object.values(res.data.data);
          // this.plateRadio = this.typeData[0].menu_id;
          this.getlistData()
        }
      });
    },
    getlistData() {
      let params = {
        size: this.PageSize,
        page: this.currentpage,
        user_type: "",
        nickname: this.userNameSearch,
        menu_id: this.plateRadio,
        id: this.idSearch
      };
      this.HttpClient.post("/admin/coolComment/lists",params).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // 分页
    currentPageChange(p) {
      this.currentpage = p;
      this.getlistData();
    },
    // 用户类型
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 预览
    previewfileContent(row) {
      this.previewContent = row;
      console.log(this.previewContent)
      // this.precontent = row.content;
      // this.previewDialog = true;
      this.previewFileDialog = true;
    },
    deletedialogInfo(row){
      this.deleteData = row;
      this.previewdeleteDialog = true;
    },
    // 删除
    deleteInfo() {
        this.HttpClient.post('/admin/coolComment/destroy',{id:this.deleteData.id}).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            this.previewdeleteDialog = false;
            setTimeout(() => {
              this.getlistData()
            }, 500);
          }
        })
    }
    // 删除
    // deleteInfo(row){
    //   console.log(row)
    //   this.HttpClient.post('/admin/coolComment/destroy',{id:row.id}).then(res => {
    //     if(res.data.code == 200){
    //       this.$message.success(res.data.msg)
    //       setTimeout(() => {
    //         this.getlistData()
    //       }, 500);
    //     }
    //   })
    // }
  }
};
</script>

<style lang="less">
.coolCircleReviewManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .coolCircleReviewManagement_main::-webkit-scrollbar {
    display: none;
  }
  .coolCircleReviewManagement_main {
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
        height: 40px;
        p {
          margin-right: 20px;
        }
        .el-radio-group {
          height: 100%;
          display: flex;
          align-items: center;
          .el-radio {
            padding: 0 20px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              padding: 0;
            }
          }
          .el-radio.is-checked {
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }

      .content_header_search {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .input-with-select {
          margin-right: 20px;
          width: 260px;
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

  /*预览弹窗*/
  .previewDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 10px;
    }
    .previewDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .previewDialog_box {
      p {
        margin-bottom: 5px;
      }
      .comment_content {
        height: 200px;
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px 15px;
      }
    }
  }

  .contentbox{
    width: 100%;
    span{
      border: 1px solid #dedede;
      padding: 5px 10px;
    }
    .contentfile{
      width: 500px;
      // height: 100px;
      margin: 10px 0;
      border: 1px solid #dedede;
      padding: 10px;
      overflow-y: scroll;
      // display: flex;
      /*图片*/
      .images{
        // height: 150px;
        // display: flex;
        // flex-wrap: wrap;
        img{
          width: 150px;
        }
      }
      /*视频*/
      .video {
        // width: 200px;
        height: 150px;
        display: flex;
        flex-wrap: wrap;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // margin: auto;
        video {
          width: 200px;
        }
      }
      .attachment{
        .file-icon{
            height: 100px;
            width: 100px;
            text-align: center;
            position: relative;
            padding-top: 20px;
            overflow: hidden;
            border: 1px solid #dedede;
            .download{
              width: 100px;
              height: 20px;
              font-size: 12px;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              -ms-flex-pack: center;
              justify-content: center;
              position: absolute;
              bottom: -20px;
              left: 0;
              color: #fff;
              background: rgba(0,0,0,.4);
              transition: all .4s linear;
              cursor: pointer; 
              a {  
                text-decoration:none;
                outline: none;
                color:inherit;
              }
            }
            .showdownload{
              bottom: 0px;
            }
            p{
              width: 100%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .el-icon-document:before {
              font-size: 54px;
            }
          }
      }
    }
  }

  .sureDeleteDialog{
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
