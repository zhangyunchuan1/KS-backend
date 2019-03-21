<template>
  <div class="coolCircleManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="coolCircleManagement_main">
      <!--标题-->
      <div class="title">
        <p>酷圈管理</p>
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
          <el-input placeholder="用户昵称搜索" v-model="userNameSearch" clearable @change="getlistData" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
          </el-input>
        </div>

        <div class="content_table">
          <el-table :data="tableData" :border="true">
            <el-table-column label="酷圈ID" align="center" width="90" prop="id" sortable></el-table-column>

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
              label="城市"
              align="center"
              show-overflow-tooltip
              width="260"
              prop="city"
            ></el-table-column>

            <el-table-column label="来自" align="center" width="160">
              <template slot-scope="scope">
                <div class="images" v-if="scope.row.source_type">
                  <span>{{scope.row.source_type==1?'APP':scope.row.source_type==2?'小程序':scope.row.source_type==3?'PC':'未知'}}</span>
                </div>
              </template>
            </el-table-column>

            <!-- <el-table-column label="来自" align="center" width="160">
              <template slot-scope="scope">
                <div class="images" v-if="scope.row.image_path">
                  <img v-for="(item,index) in scope.row.image_path" :key="index"
                    :src="Tools.handleImg(item.path)"
                    alt
                    @click="viewImages(item.path)"
                  >
                </div>
                <div v-else class="images sortout_color">
                  暂无
                </div>
              </template>
            </el-table-column> -->

            <el-table-column label="内容" align="center" prop="content" show-overflow-tooltip width="300">
              <!-- <template slot-scope="scope">
                <div class="video" v-if="scope.row.videos">
                  <video v-for="(item,index) in scope.row.videos" :key="index"  muted="muted" loop="loop"
                    :src="Tools.handleImg(item.path)"
                    @click="viewVideos(item.path)"
                  ></video>
                </div>
                 <div v-else class="video sortout_color">
                  暂无
                </div>
              </template> -->
            </el-table-column>

            <el-table-column
              label="附件数量"
              align="center"
              show-overflow-tooltip
              width="110"
              sortable
              prop="attachment_sum"
            >
            </el-table-column>

            <el-table-column
              label="点赞次数"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="like_num"
              sortable
            ></el-table-column>

            <el-table-column
              label="评论次数"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="comment_num"
              sortable
            ></el-table-column>

            <el-table-column
              label="上传时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column label="操作" align="center" width="140" fixed="right" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="deletedialogInfo(scope.row)">删除</el-button>
                  <el-button size="medium" type="text" @click="previewFile(scope.row)">预览</el-button>
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
          <div class="images" v-if="previewContent.image_path">
            <img v-for="(item,index) in previewContent.image_path" :key="index"
              :src="Tools.handleImg(item.path)"
              alt
              @click="viewImages(item.path)"
            >
          </div>
          <div class="video" v-if="previewContent.videos">
            <video v-for="(item,index) in previewContent.videos" :key="index"  muted="muted" loop="loop"
              :src="Tools.handleImg(item.path)"
              @click="viewVideos(item.path)"
              
            ></video>
          </div>
          <!-- 文件 -->
          <div class="attachment" v-if="previewContent.attachment">
            <div class="file-icon" v-for="(item,index) in previewContent.attachment" :key="index" @mouseenter="enterDownload" @mouseleave="leaveDownload">
                  <i class="el-icon-document"></i>
                  <p :title="item.name">{{item.name}}</p>
                  <div class="download" :class="isShowdownload?'showdownload':''">
                    <a :href="Tools.handleImg(item.path)+'?attname='">下载</a>
                    <!-- <a :href="Tools.handleImg(item.path)" :download="item.name">下载</a> -->
                  </div>
                </div>
          </div>
        </div>
      </div>
    </el-dialog>

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
        <img :src="Tools.handleImg(imgPath)" alt>
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
        <video id="video1" controls :src="Tools.handleImg(videoPath)"></video>
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
  name: "CoolCircleManagement",
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
          name: "酷圈管理",
          urls: "/index/coolCircle/CoolCircleManagement",
          icon: "icon-home"
        }
      ],

      plateRadio: "",
      userNameSearch: "",

      // 板块类别
      typeData: [],

      tableData: [],

      previewPictureDialog: false, // 预览图片

      previewVideoDialog: false, // 预览视频

      // 分页
      PageSize: 25,
      total: 0,
      currentpage: 1,

      deleteData:{},
      previewdeleteDialog:false,

      // 放大
      imgPath: "", //图片地址
      videoPath: "", //视频地址

      // 预览信息
      previewContent:{},
      previewFileDialog:false,
      isShowdownload:false,//显示下载
    };
  },

  mounted() {
    this.getTypelist();
    // console.log(this.typeData);
    this.getlistData();
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
    enterDownload(){
      this.isShowdownload = true;
    },
    leaveDownload(){
      this.isShowdownload = false;
    },
    // 点击预览
    previewFile(row){
      console.log(row)
      this.previewContent = row;
      this.previewFileDialog = true;
    },
    getTypelist() {
      let params = {
        menu_type: 2,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.typeData = Object.values(res.data.data);
          // this.plateRadio = this.typeData[0].menu_id;
        }
      });
    },
    // 获取列表数据
    getlistData() {
      let params = {
        size: this.PageSize,
        page: this.currentpage,
        user_type: "",
        nickname: this.userNameSearch,
        menu_id: this.plateRadio,
        order_like: "",
        order_comment: ""
      };
      this.HttpClient.post("/admin/cool/lists", params).then(res => {
        console.log(res.data.data);
        if (res.data.code === 200) {
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
    deletedialogInfo(row){
      this.deleteData = row;
      this.previewdeleteDialog = true;
    },
    // 删除
    deleteInfo() {
      this.HttpClient.post("/admin/cool/destroy", { id: this.deleteData.id }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.previewdeleteDialog = false;
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    }
  }
};
</script>

<style lang="less">
.coolCircleManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .coolCircleManagement_main::-webkit-scrollbar {
    display: none;
  }
  .coolCircleManagement_main {
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

        /*图片*/
        .images {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 70px;
            margin: 0 5px;
            cursor: pointer;
          }
        }

        /*视频*/
        .video {
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          video {
            width: 100%;
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

  /*预览图片弹窗*/
  .previewPictureDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
    }
    .previewPictureDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .previewPictureDialog_box {
      img {
        width: 100%;
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

  /*预览视频弹窗*/
  .previewVideoDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
    }
    .previewVideoDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .previewVideoDialog_box {
      video {
        height: 300px;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
