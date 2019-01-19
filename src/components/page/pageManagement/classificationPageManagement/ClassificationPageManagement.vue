<template>
  <div class="classificationPageManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="classificationPageManagement_main">
      <!--标题-->
      <div class="title">
        <p>百科问题分类页管理</p>
      </div>
      <div class="content">
        <div class="content_header">
          <div class="header_list">
            <p>类别选择</p>
            <el-radio-group v-model="typeRadio" @change="handleChangeCategory">
              <el-radio border :label="2" >问题</el-radio>
              <el-radio border :label="1" >百科</el-radio>
            </el-radio-group>
          </div>
          <transition name="el-fade-in-linear">
          <div class="header_list" v-if="plateBox">
            <p>板块选择</p>
            <el-radio-group v-model="plateRadio" @change="handleChangePlate">
              <el-radio border v-for="(item,index) in plateList" :label="item" :key="index">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          </transition>
          <transition name="el-fade-in-linear">
          <div class="header_list" v-if="firstDirectoryBox">
            <p>一级目录</p>
            <el-radio-group v-model="firstDirectory" @change="handleChangeFirstDirectory">
              <el-radio border v-for="(item,index) in firstDirectoryList" :label="item" :key="index">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          </transition>
        </div>
        <transition name="el-fade-in-linear">
        <div class="content_main" v-if="previewBox">
          <div class="main_preview">
            <img :src="imageUrl" alt="">
            <h3>{{catalogTitle}}</h3>
            <span></span>
            <p>{{previewText}}</p>
          </div>
          <div class="modifyBtm">
            <el-button type="primary" @click="handleModify">修改</el-button>
          </div>
        </div>
        </transition>

      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog
        width="500px"
        custom-class="modifyDialog"
        :visible.sync="modifyDialog">
      <span slot="title" class="modifyDialog_title"><i class="iconfont icon-edit-square"></i>修改</span>
      <div class="modifyDialog_box">
        <div class="box_list">
          <p>板块描述：</p>
          <el-input type="textarea" :rows="5" resize="none" v-model="previewText"></el-input>
        </div>
        <div class="box_list">
          <p>板块图片：</p>
          <el-upload
              class="avatar-uploader"
              action="http://test.kslab.com/api/article/null"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "ClassificationPageManagement",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "页面",
            urls: "/index/page/Page",
            icon: "icon-home"
          }, {
            id: 2,
            name: "页面管理",
            urls: "/index/page/pageManagement/PageManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "百科问题分类页管理",
            urls: "/index/page/pageManagement/classificationPageManagement/ClassificationPageManagement",
            icon: "icon-home"
          }
        ],

        typeRadio: '',  // 类别选择
        plateRadio: {},  // 板块选择
        firstDirectory: '',  // 一级目录

        plateBox: false,  // 板块单选框
        
        firstDirectoryBox: false,  // 一级目录单选框
        previewBox: false,  // 预览盒子

        previewBackground: '',
        previewText: '',

        modifyDialog: false,  // 修改弹窗
        imageUrl: '',

        plateList:[],  //板块列表
        firstDirectoryList:[],  //一级目录

        catalogTitle:'',  //目录标题

        imgUrl:'',  //上传后返回的地址

        currentObj:{},  //当前选中的菜单
      }
    },
    methods: {
      //点击修改
      handleModify(){
          this.modifyDialog = true;
          
      },
      //保存修改
      handleSave(){
        console.log(this.previewText,this.imgUrl);
        let params = {
            menu_type:2,
            type:this.typeRadio,
            name:this.currentObj.name,
            description:this.currentObj.description,
            id:this.currentObj.id,
            pid:this.currentObj.pid,
            images:this.imgUrl,
            long_desc:this.previewText
        }
        console.log(params)
        this.HttpClient.post('/admin/menu/edit',params)
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                this.imageUrl = this.imgUrl;
                this.plateBox = false;
                this.firstDirectoryBox = false;
                this.previewBox = false;
                this.typeRadio = '';
                setTimeout(() => {
                    this.getList(this.typeRadio);
                    this.modifyDialog = false;
                }, 500);  
            }
        })
      },
      getList(type){
        this.HttpClient.post('/admin/menu/getList',{
            menu_type:2,
            type:type
        })
        .then(res=>{
            console.log(res);
            this.plateList = res.data.data;
            console.log(this.plateList)
        })
      },
      //切换类别
      handleChangeCategory(){
        console.log(this.typeRadio);
        this.getList(this.typeRadio);
        this.plateBox = true;
        this.firstDirectoryBox = false;
        this.previewBox = false;
      },
      //切换板块
      handleChangePlate(){
        console.log(this.plateRadio);
        this.firstDirectory = null,
        // this.getNextList(this.plateRadio,1);  //获取一级菜单
        this.firstDirectoryList = this.plateRadio.child;
        this.firstDirectoryBox = true;
        this.previewBox = false;
      },
      //切换一级目录
      handleChangeFirstDirectory(){
        this.previewBox = true;
        this.imageUrl ='';
        console.log(this.firstDirectory);
        this.currentObj = this.firstDirectory;
        this.previewBackground = this.firstDirectory.back_images;
        this.imageUrl = this.firstDirectory.images;
        console.log(this.imageUrl)
        this.catalogTitle = this.firstDirectory.name;
        this.previewText = this.firstDirectory.long_desc;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        this.HttpClient.form('/admin/uploadOneImage',{
            images:file
        })
        .then((res) => {
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                this.imgUrl = res.data.path;
            }
        })

      }
    }
  }
</script>

<style lang="less">
  .classificationPageManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .classificationPageManagement_main::-webkit-scrollbar {
      display: none;
    }
    .classificationPageManagement_main {
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
        .content_header{
          .header_list{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            >p{
              margin-right: 20px;
            }
            .el-radio-group{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .el-radio{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 15px;
                .el-radio__input{
                  display: none;
                }
                .el-radio__label{
                  padding: 0;
                }
              }
              .el-radio.is-checked{
                background: #15bafe;
                border-color: #15bafe;
                .el-radio__label{
                  color: #fff;
                }
              }
            }
          }
        }

        .content_main{
          .main_preview{
            max-width: 1200px;
            height: 200px;
            overflow: hidden;
            position: relative;
            z-index: 1;
            background: #000000;
            box-sizing: border-box;
            padding: 10px 30px;
            img{
              width: 180px;
              height: 180px;
              position: absolute;
              z-index: 0;
              right: 30px;
              top: 10px;
            }
            h3{
              position: relative;
              font-size: 16px;
              display: inline-block;
              background:linear-gradient(to left,rgba(26,148,255,1) 0%, rgba(0,242,254,1) 100%);
              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
            }
            span{
              position: relative;
              display: block;
              width:24px;
              height:2px;
              background:linear-gradient(to left,rgba(26,148,255,1),rgba(0,242,254,1));
              margin: 15px 0;
            }

            p{
              position: relative;
              color: #C8CACC;
              font-size: 14px;
              max-width: 900px;
            }
          }
          .modifyBtm{
            text-align: right;
            width: 1200px;
            margin-top: 10px;
          }
        }
      }
    }

    /*修改弹窗*/
    .modifyDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
      }
      .modifyDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .modifyDialog_box{
        p{
          margin-bottom: 10px;
        }

        .box_list:not(:last-child){
          margin-bottom: 30px;
        }
        .box_list{

          .avatar-uploader{
            .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              box-sizing: border-box;
            }
            .el-upload:hover {
              border-color: #409EFF;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 180px;
              height: 180px;
              line-height: 178px;
              text-align: center;
            }
            .avatar {
              width: 180px;
              height: 180px;
              display: block;
            }
          }
        }
      }
    }

  }
</style>
