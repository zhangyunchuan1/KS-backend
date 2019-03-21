<template>
    <div class="liveSharing">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="liveSharing_main">
        <!--标题-->
        <div class="title">
          <p>精彩赛事</p>
        </div>

        <div class="liveSharing_content">
          <div class="survey_header"><el-button class="survey_add" @click="addModal">添加</el-button></div>

          <div class="liveSharing_content_box">

            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="Icon"
                class-name="images"
                align="center"
                width="90">
                <template slot-scope="scope">
                  <img :src="scope.row.icon" />
                </template>
              </el-table-column>

              <el-table-column
                label="标题"
                align="center"
                width="240"
                show-overflow-tooltip
                prop="title">
              </el-table-column>

              <el-table-column
                label="网站链接"
                align="center"
                width="260"
                show-overflow-tooltip
                prop="url">
              </el-table-column>

              <el-table-column
                label="媒体名称"
                align="center"
                show-overflow-tooltip
                width="200"
                prop="created_name">
              </el-table-column>

              <el-table-column
                label="文章撰写时间"
                align="center"
                show-overflow-tooltip
                width="180"
                prop="updated_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center"
                width="180"
                show-overflow-tooltip
                prop="created_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="点击次数"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="view_num"
                sortable>
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
                show-overflow-tooltip
                :filters="[{text: '上线', value: '上线'}, {text: '下架', value: '下架'}]"
                :filter-method="filterSecondary"
                width="120"
                prop="state">
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="liveSharing_scope">
                <template slot-scope="scope">
                  <div class="liveSharing_btm">
                    <el-button size="medium " type="text" v-if="scope.row.state =='下架'" @click="openShareModal(scope.row)">上线</el-button>
                    <el-button size="medium " type="text" v-if="scope.row.state =='上线'" @click="closeShareModal(scope.row)">下架</el-button>
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

      <!--添加弹窗-->
      <el-dialog
        :visible.sync="addLiveDialog"
        width="600px"
        custom-class="addLineDialog">
        <span slot="title" class="addLineDialog_title"><i class="iconfont icon-plus-circle"></i>添加精彩赛事</span>
        <div class="addLineDialog_main">
          <!-- <el-upload
            class="up_img_item"
            action=""
            list-type="picture-card"
            :file-list="images"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="uploadFile"
            :limit=1
            multiple
          > -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="uploadFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

            <!-- <i class="el-icon-plus icon_plus"></i>
          </el-upload> -->

          <div class="addLineInput">
            <el-input v-model="addLiveTile" placeholder="请输入文章标题"></el-input>
            <el-input v-model="addLiveLink" placeholder="请输入网站链接"></el-input>
            <el-input v-model="addLiveMediaName" placeholder="请输入媒体名称"></el-input>
            <el-input v-model="addLiveArtcleTime" placeholder="请输入时间"></el-input>
            <!-- <el-date-picker
              v-model="addLiveArtcleTime"
              type="date"
              placeholder="选择文章时间">
            </el-date-picker> -->
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addLiveDialog = false">取 消</el-button>
          <el-button type="primary" @click="release">发 布</el-button>
        </span>
      </el-dialog>


      <!--下架弹窗-->
      <el-dialog
        :visible.sync="obtainedDialog"
        width="470px"
        custom-class="obtainedDialog">
        <span slot="title" class="obtainedDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="obtainedDialog_main">
          <i class="iconfont icon-warning-circle"></i>
          <div class="obtainedDialog_text">确认下架吗？</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="obtainedDialog">取 消</el-button>
          <el-button type="primary" @click="liveSharingClone">确 定</el-button>
        </span>
      </el-dialog>

      <!--上架弹窗-->
      <el-dialog
        :visible.sync="onlineDialog"
        width="470px"
        custom-class="onlineDialog">
        <span slot="title" class="onlineDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="onlineDialog_main">
          <i class="iconfont icon-warning-circle"></i>
          <div class="onlineDialog_text">确认上线吗？</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onlineDialog">取 消</el-button>
          <el-button type="primary" @click="liveSharingOpen">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 图片查看 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import app from '../../../config/app.js';
  import Moment from 'moment';
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "LiveSharing",
    components:{
      BreadCrumb
    },

    data(){
      return{
        breadData:[{
          id: 1,
          name: '视频',
          urls: '/index/video/encyclopedia',
          icon: 'icon-home'
        },{
          id: 2,
          name: '精彩赛事',
          urls: '/index/video/liveSharing',
          icon: 'icon-home'
        }],
        pageSize: 25, // 每页总数
        total: 0, // 总条数
        currentPage: 1, // 当前页
        dialogImageUrl: '', // 预览图片
        dialogVisible: false, // 预览图片弹窗
        tableData: [], // 表格
        searchObj: {}, // 搜索对象
        liveSharingBtm: true,  // 上架按钮
        obtainedBtm:false ,  // 下架按钮
        obtainedDialog: false,  // 下架警告框
        onlineDialog: false, //上架警告框
        addLiveDialog: false,  // 添加弹窗
        imageUrl: '',  // 文章封面
        addLiveTile:'',  // 文章标题
        addLiveLink:'',  // 网站链接
        addLiveMediaName:'',  // 文章名称
        addLiveArtcleTime:'',  // 文章撰写时间
        // images: [], // 图片列表
        modifyObj: {}, // 操作对象
      }
    },
    created() {
      this.getTableList(null);
    },
    methods:{
      //获取列表数据
      async getTableList(param) {
        let params = {
          page: this.currentPage,
          size: 25,
          type: 2
        };
        if(param) {

        }
        let res = await this.HttpClient.post('/admin/article/getRecommendList', params);
        console.log(res)
        this.tableData = dealWithTable(res.data.data.data);
        this.total = res.data.data.total;
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
      async release() {
        // let icon ;
        // if(this.images && this.images.length > 0) {
        //   icon = this.images[0].url;
        // }
        let res = await this.HttpClient.post('/admin/article/addRecommend', {
          icon: this.imageUrl, 
          title: this.addLiveTile,
          url: this.addLiveLink,
          type: 2,
          created_name: this.addLiveMediaName,
          record_time: this.addLiveArtcleTime
        })
        tools.getApiMessage(res);
        if(res.data.code == '200') this.addLiveDialog = false;
        this.search();
      },
      openShareModal(modifyObj) {
        this.onlineDialog = true;
        this.modifyObj = modifyObj;
      },
      closeShareModal(modifyObj) {
        this.obtainedDialog = true;
        this.modifyObj = modifyObj;
      },
      search() {
        this.getTableList(this.searchObj);
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //附件、图片上传前
      async uploadFile(file){
        // if(this.images.length > 0) return this.$message.warning('只能上传一张图片');
        let res = await this.HttpClient.form('/admin/uploadOneImage',{images:file});
        tools.getApiMessage(res);
        this.imageUrl = res.data.path;
        console.log('image:', this.imageUrl);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      addModal() {
        this.addLiveDialog = true;
        this.images = [];
      },
      //下架
      async liveSharingClone(){
        let res = await this.HttpClient.post('/admin/article/changeRecommendStatus', {
          id: this.modifyObj.id,
          status: 2
        })
        tools.getApiMessage(res);
        if(res.data.code == '200') 
        setTimeout(() => {
            this.obtainedDialog = false;
            this.search();
        }, 500);
      },
      liveSharingBtmClone(){
        this.onlineDialog = true;
      },
      // 上架
      async liveSharingOpen(){
        let res = await this.HttpClient.post('/admin/article/changeRecommendStatus', {
          id: this.modifyObj.id,
          status: 1
        });
        tools.getApiMessage(res);
        if(res.data.code == '200') 
        setTimeout(() => {
            this.onlineDialog = false;
            this.search();
        }, 500);
      },
    }
  }

// 表格数据处理
function dealWithTable(table) {
  if(table && table.length > 0) {
    for(let i in table) {
      table[i].icon = 'http://cdn.kushualab.com/'+table[i].icon;
      // table[i]['icon'] = app.imageUrl + table[i]['icon'];
      if(table[i]['status'] == '1') {
        table[i]['state'] = '上线';
      }else if(table[i]['status'] == '2') {
        table[i]['state'] = '下架';
      }
    }
  }
  return table;
}
</script>

<style lang="less">
  .liveSharing{
    .bread{
      margin: 10px;
    }
    .liveSharing_main::-webkit-scrollbar {display:none}
    .liveSharing_main {
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

      /*主体内容*/
      .liveSharing_content{
        box-sizing: border-box;
        padding: 0 40px 40px;

        /*头部*/
        .survey_header{
          box-sizing: border-box;
          padding-bottom:10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .survey_add{
            display: inline-block;
            padding: 10px 35px;
            background: #15bafe;
            color: #fff;
            font-size: 14px;
            border: none;
            border-radius: unset;
          }
        }

        /*表格*/
        .liveSharing_content_box {
          box-sizing: border-box;
          .el-table {
            .el-icon-arrow-down{
              font-size: 20px;
              color:#fff;
            }
            .images{
              width: 48px;
              height: 48px;
              .cell{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  width: 100%;
                }
              }
            }

            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .liveSharing_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .liveSharing_btm {
                display: flex;
                align-items: center;
                .el-button:not(:last-child) {
                  border-right: 1px solid #ebeef5;
                }
                .el-button {
                  min-height: 47px;
                  height: 100%;
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
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


  /*添加弹窗*/
  .addLineDialog{
    .addLineDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 10px;
      }
    }
    .addLineDialog_main{
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 500px;
        height: 275px;
        line-height: 275px;
        text-align: center;
      }
      .avatar {
        width: 500px;
        height: 275px;
        display: block;
      }

      /*上传图片*/
      // .images-uploader .el-upload {
      //   border: 1px dashed #d9d9d9;
      //   border-radius: 6px;
      //   cursor: pointer;
      //   position: relative;
      //   overflow: hidden;
      // }
      // .images-uploader .el-upload:hover {
      //   border-color: #409EFF;
      // }
      // .images-uploader-icon {
      //   font-size: 28px;
      //   color: #8c939d;
      //   width: 178px;
      //   height: 178px;
      //   line-height: 178px;
      //   text-align: center;
      // }
      // .images {
      //   width: 178px;
      //   height: 178px;
      //   display: block;
      // }

      .addLineInput{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        flex-wrap: wrap;
        /*input框*/
        .el-input{
          margin: 10px 0;
          width: 200px;
        }
      }

    }
  }

  /*下架警告框弹窗*/
  .obtainedDialog{
    .obtainedDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .obtainedDialog_main{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }

  /*上架警告框弹窗*/
  .onlineDialog{
    .onlineDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .onlineDialog_main{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }

</style>
