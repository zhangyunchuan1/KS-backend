<template>
  <div class="PageUploadmall">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="PageUploadmall_main">
      <!--标题-->
      <div class="title">
        <p>上传商品</p>
      </div>
      <div class="content">
        <div class="content_box">
          <div class="content_list" v-for="(item,index) in listData" :key="index" @click="modifyInfoFn(item)">
            <p class="hover_head">hover后：</p>
            <div class="list_img">
              <img :src="Tools.handleImg(item.images)" alt>
            </div>
            <p class="hover_center">hover前：</p>
            <div class="list_img">
              <img :src="Tools.handleImg(item.images_beforehover)" alt>
            </div>
            <!-- <div class="list_icon">
              <i class="iconfont" :class="item.icon"></i>
            </div> -->
            <p class="list_name">{{item.name}}</p>
            <!-- <p class="en_name">{{item.color}}</p> -->
          </div>
          <div class="addcontent_list" @click="addmodifyInfoFn">
            <i class="el-icon-plus"></i>
            <!-- <p class="list_name">{{item.name}}</p> -->
            <!-- <div class="en_name">car</div> -->
          </div>
        </div>
      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog width="500px" custom-class="modifyDialog" :visible.sync="modifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <!-- <p>修改图片</p> -->
      <div class="modifyDialog_box">
        <div class="box_list">
          <p class="reminder">hover后：</p>
          <el-upload
            class="plateImg-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforehoverAvatarUpload"
          >
            <img v-if="hoverplateImg" :src="hoverplateImg" class="plateImg">
            <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="box_list">
          <p class="reminder">hover前：</p>
          <el-upload
            class="plateImg-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="plateImg" :src="plateImg" class="plateImg">
            <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div style="margin:10px 0;padding:0 25px;">
            <el-input
              placeholder="只能输入中文"
              v-model="plateName"
              clearable>
            </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="savemodifyInfo">保 存</el-button>
      </span>
    </el-dialog>
    <!--添加弹窗-->
    <el-dialog width="500px" custom-class="modifyDialog" :visible.sync="addmodifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>添加新版块
      </span>
      <p style="text-align:center;">添加ICON</p>
      <div class="modifyDialog_box">
        <div class="box_list">
          
            <p class="reminder">hover后：</p>
            <el-upload
              class="plateImg-uploader"
              action
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeaddAvatarUpload">
              <img v-if="addImageUrl" :src="addImageUrl" class="plateImg">
              <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="box_list">
            <p class="reminder">hover前：</p>
            <el-upload
              class="plateImg-uploader"
              action
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforehoveraddAvatarUpload">
              <img v-if="addhoverImageUrl" :src="addhoverImageUrl" class="plateImg">
              <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
            </el-upload>
          </div>
      </div>
      <div style="margin:10px 0;padding:0 25px;">
            <el-input
              @change="changecnName"
              placeholder="只能输入中文"
              v-model="addInfocnName"
              clearable>
            </el-input>
          </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addmodifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="saveaddInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import Tools from "@/utils/tools";
export default {
  name: "PageUploadmall",
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
        },
        {
          id: 2,
          name: "页面管理",
          urls: "/index/page/pageManagement/PageManagement",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "上传菜单",
          urls: "/index/page/pageManagement/uploadMenu/UploadMenu",
          icon: "icon-home"
        },
        {
          id: 4,
          name: "上传商品",
          urls: "/index/page/pageManagement/uploadMenu/PageUploadmall",
          icon: "icon-home"
        }
      ],

      listData: [], //列表数据
      addplateImg:[],
      addImageUrl:'',

      plateImg: "",
      plateName: "",
      plateColor:'',
      plateID:'',
      plateIcon:'',
      plateData:{},
      addInfoName:'',//添加输入的英文字母
      addInfocnName:'',//中文

      // 添加icon
      iconData: [{
        value: '选项1',
        label: 'icon-yonghuguanli'
      }, {
        value: '选项2',
        label: 'icon-xiajia'
      }],
      iconValue: '',
      isshowaddIcon:false,//添加icon弹框
      addiconValue:'',//添加的icon

      // 修改
      hoverplateImg:'',

      // 添加图片
      addhoverplateImg:[],
      addhoverImageUrl:'',  

      addmodifyDialog:false,//添加弹窗
      modifyDialog: false // 修改弹窗
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    // 确定添加icon
    sureAddIconFn(){
      this.HttpClient.post('/admin/menuIcon/create',{icon:this.addiconValue}).then(res => {
        if(res.data.code === 200){
          this.$message.success(res.data.msg);
          this.isshowaddIcon = false;
          setTimeout(() => {
            this.geticonData();
          }, 500);
        }else{
          this.$message.warning(res.data.msg);
        } 
      })
    },
    // 添加icon
    addIconFn(){
      this.isshowaddIcon = true;
    },
    changecnName(){
      if(!/^[\u4e00-\u9fa5]+$/.test(this.addInfocnName)){ 
        console.log(/^[\u4e00-\u9fa5]+$/.test(this.addInfocnName))
        this.$message.warning('只允许输入英文！');
        this.addInfocnName = '';
      }
    },
    getlistData() {
      // this.HttpClient.post("/admin/menuFolder/lists").then(res => {
      //   if (res.data.code == 200) {
      //     console.log(res.data.data);
      //     this.listData = res.data.data;
      //   }
      // });
      let params = {
        menu_type:1,
        type:0
      }
      this.HttpClient.post('/admin/menu/getList',params).then(res => {
        if(res.data.code === 200){
          this.listData = Object.values(res.data.data);
          console.log(this.listData)
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    modifyInfoFn(item) {
      console.log(item)
      this.plateData = item;
      this.plateID = item.menu_id;
      this.plateName = item.name;
      this.plateColor = item.color;
      this.plateIcon = item.icon;
      this.plateImg = Tools.handleImg(item.images_beforehover);;
      this.hoverplateImg = Tools.handleImg(item.images);;
      this.modifyDialog = true;
      this.geticonData();
    },
    // 保存修改
    savemodifyInfo(){
      // plateEnname
      console.log(this.plateData)
      console.log(this.addplateImg)
      if(this.addplateImg.length == 0){
        var obj = {};
        obj.name = this.plateData.name;
        obj.path = this.plateImg;
        this.addplateImg.push(obj)
      }
      this.modifyDialog = false;
      let params = {
        name:this.plateName,
        id:this.plateData.id,
        menu_type:1,
        // color:this.plateColor,
        images:[{name:this.plateName,path:this.hoverplateImg}],
        images_beforehover:this.addplateImg,
        // images:this.addplateImg,
        // icon:this.plateIcon,
        type:0,
        pid:0,
        // description:this.plateData.name
          // menu_id:this.plateID,
        // images:this.plateData.images,
        // en_name:this.plateEnname,
        // icon:this.plateData.icon
      };
      console.log(params);
      this.HttpClient.post('/admin/menu/edit',params).then(res => {
        console.log(res.data);
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getlistData()
          }, 500);
        }
      })
    },
    // 上传图片
    beforeAvatarUpload(file) {
      console.log(file);
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.plateImg = res.data.path;            
          }
        }
      );
    },
    beforehoverAvatarUpload(file){
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.hoverplateImg = res.data.path;            
          }
        }
      );
    },
    // 修改
    beforeaddAvatarUpload(file) {
      console.log(file);
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            var obj = {};
            obj.name = file.name;
            obj.path = res.data.path;
            this.addplateImg.push(obj)
            this.addImageUrl = res.data.path;
            console.log(this.addplateImg)
          }
        }
      );
    },
    // 添加hover前
    beforehoveraddAvatarUpload(file){
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            var obj = {};
            obj.name = file.name;
            obj.path = res.data.path;
            this.addhoverplateImg.push(obj)
            this.addhoverImageUrl = res.data.path;
            console.log(this.addplateImg)
          }
        }
      );
    },
    // 添加新版块
    addmodifyInfoFn(){
      this.addmodifyDialog = true;
      this.addImageUrl = '';
      this.addplateImg = [];
      this.addhoverplateImg = [];
      this.addhoverImageUrl = '';
      this.addInfocnName = '';
      // this.geticonData()
    },
    geticonData(){
      this.HttpClient.post('/admin/menuIcon/lists').then(res => {
        if(res.data.code === 200){
          this.iconData = res.data.data;
          console.log(this.iconData)
        }
      })
    },
    saveaddInfo(){
      let params = {
        menu_type:1,
        name:this.addInfocnName,
        // color:this.addInfoName,
        images:this.addplateImg,
        images_beforehover:this.addhoverplateImg,
        // icon:this.iconValue,
        pid:0,
        type:0
      }
      this.HttpClient.post('/admin/menu/create',params).then(res =>{
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.addmodifyDialog = false;
          this.addImageUrl = '';
          this.addInfoName = '';
          this.addhoverImageUrl = '';
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      })
    }
  }
};
</script>

<style lang="less">
.PageUploadmall {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .PageUploadmall_main::-webkit-scrollbar {
    display: none;
  }
  .PageUploadmall_main {
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
      display: flex;
      align-items: center;
      .content_box{
        box-sizing: border-box;
        padding: 30px 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .content_list:hover{
          box-shadow: 10px 10px 15px #bfbfbf;
        }
        .content_list {
          width: 150px;
          height: 265px;
          box-sizing: border-box;
          margin: 10px;
          // box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
          box-shadow: 1px 1px 15px #bfbfbf;
          border-radius: 20px;
          cursor: pointer;
          .hover_head{
            background: #bfbfbf;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            color:#fff;
          }
          .hover_center{
            background: #bfbfbf;
            color:#fff;
          }
          .list_img {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 50%;
            }
          }
          .list_icon{
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              font-size: 28px;
              color: #8c939d;
              width: 149px;
              height: 50px;
              line-height: 50px;
              text-align: center;
            }
          }
          i{
            font-size: 28px;
            color: #8c939d;
            width: 149px;
            height: 100px;
            line-height: 100px;
            text-align: center;
          }
          p {
            text-align: center;
            font-size: 14px;
            padding: 2px 0;
            height: 18px;
          }
          span{
            font-size: 14px;
            padding: 0px 10px;
            height: 22px;
          }
        }
        .addcontent_list{
          width: 150px;
          height: 265px;
          box-sizing: border-box;
          margin: 10px;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
          i{
            font-size: 28px;
            color: #8c939d;
            width: 149px;
            height: 100px;
            line-height: 265px;
            text-align: center;
          }
        }
      }
    }
  }

  /*修改弹窗*/
  .modifyDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
    }
    .modifyDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .modifyDialog_box {
      display: flex;
      justify-content: space-around;
      .box_list:not(:last-child) {
        margin-bottom: 20px;
      }
      .box_list {
        p {
          margin-bottom: 10px;
          text-align: center;
        }
        .reminder{
          font-size: 12px;
          color: #8c939d;
        }
        .plateImg-uploader {
          text-align: center;
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409eff;
          }
          .plateImg-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .plateImg {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        // .el-select{
        //   width: 100%;
        // }
        .content-icon{
          width: 150px;
          height: 100px;
          line-height: 100px;
          border: 1px solid #dedede;
          border-radius: 4px;
          margin: 0 auto;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>
