<template>
    <div class="liveSharing">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="liveSharing_main">
        <!--标题-->
        <div class="title">
          <p>优文分享</p>
        </div>

        <div class="liveSharing_content">
          <div class="survey_header"><el-button class="survey_add" @click="addModal">添加</el-button></div>

          <div class="liveSharing_content_box">

            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="图片"
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
                show-overflow-tooltip
                width="240"
                prop="title">
              </el-table-column>

              <el-table-column
                label="网站链接"
                align="center"
                show-overflow-tooltip
                width="260"
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
                width="200"
                prop="updated_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="创建时间"
                show-overflow-tooltip
                align="center"
                width="160"
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
                <template slot-scope="scope">
                  <span v-if="scope.row.view_num">{{scope.row.view_num}}</span>
                  <span v-else class="sortout_color">0</span>
                </template>
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
                show-overflow-tooltip
                :filters="[{text: '上线', value: '上线'}, {text: '下架', value: '下架'}]"
                :filter-method="filterSecondary"
                width="120"
                prop="state">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.state}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                class-name="liveSharing_scope">
                <template slot-scope="scope">
                  <div class="liveSharing_btm">
                    <el-button size="medium" type="text" v-if="scope.row.state =='下架'" @click="openShareModal(scope.row)">上线</el-button>
                    <el-button size="medium" type="text" v-if="scope.row.state =='上线'" @click="closeShareModal(scope.row)">下架</el-button>
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
        width="470px"
        custom-class="addLineDialog">
        <span slot="title" class="addLineDialog_title"><i class="iconfont icon-plus-circle"></i>添加优文分享</span>
        <div class="addLineDialog_main">
          <!-- <el-upload
            class="up_img_item"
            action=""
            list-type="picture-card"
            :file-list="images"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="uploadFile"
            multiple
          >
            <i class="el-icon-plus icon_plus"></i>
          </el-upload> -->  

          <!-- element 上传图片按钮 -->
          <div>
              <!-- 上传图片按钮 -->
              <el-upload class="uploader"
                          :action="$uploadPath"
                          :data="imageUpData"
                          name="file"
                          :show-file-list="false"
                          :before-upload="beforeUpload"
                          :on-success="handleUploadSuccess">
                  <img v-if="fileInfo.url"
                        :src="fileInfo.url"
                        class="upload">
                  <i v-else class="el-icon-plus uploader-icon"></i>
              </el-upload>
          </div>
                

          <div class="addLineInput">
            <el-input v-model="addLiveTile" placeholder="请输入文章标题"></el-input>
            <el-input v-model="addLiveLink" placeholder="请输入网站链接"></el-input>
            <el-input v-model="addLiveMediaName" placeholder="请输入媒体名称"></el-input>
            <el-date-picker
              v-model="addLiveArtcleTime"
              type="date"
              placeholder="选择文章时间">
            </el-date-picker>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addLiveDialog = false">取 消</el-button>
          <el-button type="primary" @click="release">发 布</el-button>
        </span>
      </el-dialog>



      <!-- 图片裁剪 -->
      <el-dialog
        :visible.sync="isShowCropper"
        width="470px"
        custom-class="obtainedDialog">
        <!-- vueCropper 剪裁图片实现-->
                <div class="vue-cropper-box container"
                     v-if="isShowCropper">
                    <div class="vue-cropper-content">
                        <vue-cropper ref="cropper"
                            :img="option.img"
                            :outputSize="option.outputSize"
                            :outputType="option.outputType"
                            :info="option.info"
                            :infoTrue="option.infoTrue"
                            :canScale="option.canScale"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber"
                            :fixedBox="option.fixedBox"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :centerBox="option.centerBox"></vue-cropper>
                    </div>
                    <div class="vue-cropper-button">
                        <el-button v-if="isShowCropper"
                                   type="danger"
                                   @click="onCubeImg">确定裁剪图片
                        </el-button>
                    </div>
                </div>
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
  import {VueCropper} from "vue-cropper";
  import BreadCrumb from '@/components/public/BreadCrumb';
  import app from '../../../config/app.js';
  import Moment from 'moment';
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "LiveSharing",
    components:{
      BreadCrumb,
      VueCropper
    },

    data(){
      return{
        breadData:[{
          id: 1,
          name: '文章',
          urls: '/index/article/encyclopedia',
          icon: 'icon-home'
        },{
          id: 2,
          name: '优文分享',
          urls: '/index/article/liveSharing',
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
        images: [], // 图片列表
        modifyObj: {}, // 操作对象


       imageUpData:{},// 图片上传参数
        imgSrc:'',// 背景图片地址
        fileInfo: {},// 图片信息
        isShowCropper: false,// 是否显示截图框
        //裁剪组件的基础配置option
        option: {
            img: '',                         // 裁剪图片的地址
            info: true,                      // 裁剪框的大小信息
            infoTrue:true,                   // 展示真实图片大小
            outputSize: 1,                   // 裁剪生成图片的质量
            outputType: 'jpeg',              // 裁剪生成图片的格式
            canScale: true,                 // 图片是否允许滚轮缩放
            autoCrop: true,                  // 是否默认生成截图框
            autoCropWidth: 48,             // 默认生成截图框宽度
            autoCropHeight: 48,             // 默认生成截图框高度
            fixed: true,                     // 是否开启截图框宽高固定比例
            fixedNumber: [48,48],         // 截图框的宽高比例
            fixedBox:true,                   // 截图框是否固定大小
            centerBox:false,                  // 截图框是否限制在图片内
            canMove:true,                    // 图片能否拖动
            canMoveBox:true,                 // 截图框能否拖动
        },
      }
    },
    created() {
      this.getTableList(null);
    },
    methods:{
      async getTableList(param) {
        let params = {
          page: this.currentPage,
          size: 25,
          type: 1
        };
        if(param) {

        }
        let res = await this.HttpClient.post('/admin/article/getRecommendList', params);
        this.tableData = dealWithTable(res.data.data.data);
        this.total = res.data.data.total;
        console.log(res);
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
      async release() {
        let icon;
        if(this.images && this.images.length > 0) {
          icon = this.images[0].url;
        }
        let res = await this.HttpClient.post('/admin/article/addRecommend', {
          icon: icon, 
          title: this.addLiveTile,
          url: this.addLiveLink,
          type: 1,
          created_name: this.addLiveMediaName,
          record_time: Moment(this.addLiveArtcleTime).format('YYYY-MM-DD HH:mm:ss')
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
      // async uploadFile(file){
      //   console.log(this.images)
      //   this.images = [];
      //   if(this.images.length > 0) return this.$message.warning('只能上传一张图片');
      //   let res = await this.HttpClient.form('/admin/uploadOneImage',{images:file});
      //   // console.log(res.data)
      //   tools.getApiMessage(res);
      //   this.images.push({name:file.name,url:res.data.path});
      //   console.log(this.images);
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      addModal() {
        this.addLiveDialog = true;
        this.images = [];
        console.log(this.images);
      },
      async liveSharingClone(){
        let res = await this.HttpClient.post('/admin/article/changeRecommendStatus', {
          id: this.modifyObj.id,
          status: 2
        })
        tools.getApiMessage(res);
        if(res.data.code == '200') 
        setTimeout(() => {
            this.search();
            this.obtainedDialog = false;
        }, 500);
      },
      liveSharingBtmClone(){
        this.onlineDialog = true;
      },
      async liveSharingOpen(){
        let res = await this.HttpClient.post('/admin/article/changeRecommendStatus', {
          id: this.modifyObj.id,
          status: 1
        });
        tools.getApiMessage(res);
        if(res.data.code == '200') 
        setTimeout(() => {
            this.search();
            this.onlineDialog = false;
        }, 500);
      },


      beforeUpload(file,fileList){
        console.log(file);
        const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
        let self = this;
        let render = new FileReader();
        render.readAsDataURL(file);
        return new Promise((resolve,reject) =>{
            render.onload = function () {
                self.imageUpData.token = self.$getQiNiuToken({saveKey:file.name});
                console.log(self.imageUpData);
                resolve(true)
            };
        });
    },
    handleUploadSuccess(response,file,fileList){
        console.log(response);
        this.imgSrc = this.$imagePath + file.response.key;
        this.fileInfo = response;
        this.fileUpload = file;
        //上传成功后将图片地址赋值给裁剪框显示图片
        // console.log(this.imgSrc)
        this.$nextTick(() => {
            this.option.img = this.imgSrc;
            this.isShowCropper = true;
            console.log(this.option);
        })
    },
    // 确定裁剪图片
    onCubeImg() {
        // 获取cropper的截图的base64 数据
        this.$refs.cropper.getCropData(data => {
            this.fileInfo.url = data;
            this.isShowCropper = false;

            //先将显示图片地址清空，防止重复显示
            this.option.img = '';

            //将剪裁后base64的图片转化为file格式
            let file = this.convertBase64UrlToBlob(data);
            file.name = this.fileUpload.name;

            //将剪裁后的图片执行上传
            // this.uploadFile(file).then(res => {
            //     this.form.content = res.file_id    //将上传的文件id赋值给表单from的content
            // })
            console.log(file);
            this.uploadFile(file)
            // this.HttpClient.form(this.$uploadPath,{file:file,token:this.$getQiNiuToken({saveKey:file.name})})
            //     .then(res=>{
            //         console.log(res);
            //         // this.$message.success('上传成功!');
            //         this.uploadFile(this.$imagePath + res.data.key)
            //     })
            //     .catch(error=>{
            //         console.log(error);
            //         this.$message.error('上传失败!')
            //     })
        })
    },
    uploadFile(file){
      console.log(file)
      let params = {
        images:file,
        type:'article'
      }
        this.HttpClient.form('/admin/uploadOneImage',params)
            .then(res=>{
                if(res.data.code===200){
                    this.$message.success(res.data.msg);
                    this.isShowCropper=false;
                    this.dialogVisible=false;
                    this.imgSrc='';
                    this.fileInfo={};
                    setTimeout(()=>{
                        this.getCompanyInfo()
                    },500)
                }else{
                    this.$message.error(res.data.msg)
                }
            })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    },

    }
  }

// 表格数据处理
function dealWithTable(table) {
  if(table && table.length > 0) {
    for(let i in table) {
      table[i]['icon'] = app.imageUrl + table[i]['icon'];
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

            // thead {
            //   color: #fff;
            //   th, tr {
            //     background-color: #15bafe;
            //   }
            // }
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

      /*上传图片*/
      .images-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .images-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .images-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .images {
        width: 178px;
        height: 178px;
        display: block;
      }

      .addLineInput{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        /*input框*/
        .el-input{
          margin: 10px 0;
          width: 200px;
        }
      }

    }
  }
  .vue-cropper-box{
      .vue-cropper-content {
          display: flex;
          display: -webkit-flex;
          justify-content: flex-end;
          -webkit-justify-content: flex-end;
          width:400px;
          height:200px;
          margin-bottom:20px;

          .vue-cropper {
              display:flex;
              align-items:center;
              justify-content:center;
              /*width: 600px;*/
              /*height: 100px;*/
          }
      }
      .vue-cropper-button{
          display:flex;
          align-items:center;
          justify-content:center;
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
