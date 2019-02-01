<template>
  <div class="pagePlateManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="pagePlateManagement_main">
      <!--标题-->
      <div class="title">
        <p>版块管理</p>
      </div>
      <div class="content">
        <div class="content_box">
          <div class="content_list" v-for="(item,index) in listData" :key="index" @click="modifyInfoFn(item)">
            <div class="list_img">
              <img :src="Tools.handleImg(item.images)" alt>
            </div>
            <p class="en_name">{{item.en_name}}</p>
            <p class="list_name">{{item.name}}</p>
          </div>
          <div class="content_list" @click="addmodifyInfoFn">
            <i class="el-icon-plus"></i>
            <!-- <p class="list_name">{{item.name}}</p> -->
            <!-- <div class="en_name">car</div> -->
          </div>
        </div>
      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog width="300px" custom-class="modifyDialog" :visible.sync="modifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="modifyDialog_box">
        <div class="box_list">
          <el-tag>{{plateName}}</el-tag>
        </div>
        <div class="box_list">
          <p>修改图片</p>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button @click="savemodifyInfo">保 存</el-button>
      </span>
    </el-dialog>

    <!--添加弹窗-->
    <el-dialog width="300px" custom-class="modifyDialog" :visible.sync="addmodifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>添加新版块
      </span>
      <div class="modifyDialog_box">
        <div class="box_list">
          <p>添加ICON</p>
          <p class="reminder">图片大小为32*32像素</p>
          <el-upload
            class="plateImg-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeaddAvatarUpload"
          >
            <img v-if="addImageUrl" :src="addImageUrl" class="plateImg">
            <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
          </el-upload>
          <div style="margin:10px 0">
            <el-input
          @change="changecnName"
            placeholder="只能输入中文"
            v-model="addInfocnName"
            clearable>
          </el-input>
          </div>
          
          <el-input
          @change="changeName"
            placeholder="只能输入英文字母"
            v-model="addInfoName"
            clearable>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addmodifyDialog = false">关 闭</el-button>
        <el-button @click="saveaddInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "PagePlateManagement",
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
          name: "版块管理",
          urls: "/index/page/pageManagement/uploadMenu/PagePlateManagement",
          icon: "icon-home"
        }
      ],

      listData: [], //列表数据
      addplateImg:[],
      addImageUrl:'',

      plateImg: "",
      plateName: "",
      plateID:'',
      addInfoName:'',//添加输入的英文字母
      addInfocnName:'',//中文

      addmodifyDialog:false,//添加弹窗
      modifyDialog: false // 修改弹窗
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    changeName(){
      if(!/^[a-zA-Z]+$/.test(this.addInfoName)){ 
        console.log(/^[a-zA-Z]$/.test(this.addInfoName))
        this.$message.warning('只允许输入英文！');
        this.addInfoName = '';
      }
    },
    changecnName(){
      if(!/^[\u4e00-\u9fa5]+$/.test(this.addInfocnName)){ 
        console.log(/^[\u4e00-\u9fa5]+$/.test(this.addInfocnName))
        this.$message.warning('只允许输入英文！');
        this.addInfocnName = '';
      }
    },
    getlistData() {
      this.HttpClient.post("/admin/menuFolder/lists").then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.listData = res.data.data;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    modifyInfoFn(item) {
      this.plateID = item.menu_id;
      this.plateName = item.name;
      this.plateImg = 'http://cdn.kushualab.com/' + item.images
      this.modifyDialog = true;
      console.log(item);
    },
    // 保存修改
    savemodifyInfo(){
      this.modifyDialog = false;
      let params = {
        menu_id:this.plateID,
        images:this.plateImg
      };
      console.log(params);
      this.HttpClient.post('/admin/menuFolder/edit',params).then(res => {
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
    // 添加新版块
    addmodifyInfoFn(){
      this.addmodifyDialog = true;
    },
    saveaddInfo(){
      let params = {
        menu_type:2,
        name:this.addInfocnName,
        en_name:this.addInfoName,
        images:this.addplateImg,
        pid:0,
        type:0
      }
      this.HttpClient.post('/admin/menu/create',params).then(res =>{
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.addmodifyDialog = false;
        }
      })
    }
  }
};
</script>

<style lang="less">
.pagePlateManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .pagePlateManagement_main::-webkit-scrollbar {
    display: none;
  }
  .pagePlateManagement_main {
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
        .content_list {
          width: 150px;
          height: 150px;
          box-sizing: border-box;
          margin: 10px;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          .list_img {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 50%;
            }
          }
          i{
            font-size: 28px;
            color: #8c939d;
            width: 149px;
            height: 149px;
            line-height: 149px;
            text-align: center;
          }
          p {
            text-align: center;
            font-size: 16px;
            padding: 2px 0;
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
      }
    }
  }
}
</style>
