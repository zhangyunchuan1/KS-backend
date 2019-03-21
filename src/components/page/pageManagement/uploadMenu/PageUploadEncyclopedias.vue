<template>
  <div class="pageUploadEncyclopedias">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="pageUploadEncyclopedias_main">
      <!--标题-->
      <div class="title">
        <p>上传百科</p>
      </div>
      <div class="content">
        <div class="content_header">
          <p>板块选择：</p>
          <el-radio-group
            v-model="plateRadio"
            @change="plateRadioBtm"
            v-for="(item,index) in plateData"
            :key="index"
          >
            <el-radio border :label="item.menu_id">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <transition name="el-fade-in-linear">
          <div class="content_box" v-if="plateBox">
            <div class="addBtm">
              <p>新增板块：</p>
              <el-button type="primary" @click="handleAddNewPlate">添加新板块</el-button>
            </div>

            <div class="content_box_list">
              <!--版块列表-->
              <div class="plate_list" v-for="(item,index) in childData" :key="index">
                <div class="plate_name" @click="modifyInfo(item)">{{item.name}}</div>
                <div class="plate_status" @click="plateStatusBtm(item)">
                  <el-button type="success" v-if="item.status == 0">恢复</el-button>
                  <el-button type="danger" v-if="item.status == 1">禁用</el-button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!--添加版块弹窗-->
    <el-dialog width="500px" custom-class="plateDialog" :visible.sync="addPlateDialog" :close-on-click-modal="false">
      <span slot="title" class="plateDialog_title">
        <i class="iconfont icon-edit-square"></i>添加版块
      </span>
      <div class="plateDialog_box">
        <div class="box_list plate_name">
          <p>版块名称：</p>
          <el-input placeholder="输入版块名称" v-model="addName"></el-input>
        </div>
        <div class="box_list_center">
            <div class="box_list">
              <p>分类页图片</p>
              <el-upload
                class="plateImg-uploader"
                action="customize"
                :show-file-list="false"
                :auto-upload="true" 
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAddAvatarUpload"
                :http-request="defaultBehavior"
              >
                <img v-if="addImgUrl" :src="addImgUrl" class="plateImg">
                <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="box_list">
              <p>主页解释：</p>
              <el-input
                type="textarea"
                resize="none"
                :rows="8"
                placeholder="输入主页解释"
                v-model="addhomepageValueDes"
              ></el-input>
            </div>
        </div>
        <div class="box_list_bot">
            <div class="box_list">
              <p>分类页解释：</p>
              <el-input
                type="textarea"
                resize="none"
                :rows="4"
                placeholder="输入分类页解释"
                v-model="addcategorypagesValueDes"
              ></el-input>
            </div>
            <div class="box_list">
              <p>版块解释：</p>
              <el-input type="textarea" resize="none" :rows="4" placeholder="输入版块解释" v-model="adddesinfo"></el-input>
            </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPlateDialog = false">关 闭</el-button>
        <el-button type="primary" @click="addNewInfo">保 存</el-button>
      </span>
    </el-dialog>

    <!--修改版块弹窗-->
    <el-dialog width="500px" custom-class="plateDialog" :visible.sync="modifyPlateDialog" :close-on-click-modal="false">
      <span slot="title" class="plateDialog_title">
        <i class="iconfont icon-edit-square"></i>修改版块
      </span>
      <div class="plateDialog_box">
        <div class="box_list plate_name">
          <p>版块名称：</p>
          <el-input placeholder="输入版块名称" v-model="modifyData.name"></el-input>
        </div>
        <div class="box_list_center">
          <div class="box_list">
            <p>分类页图片：</p>
            <el-upload
              class="plateImg-uploader"
              action="customize"
              :show-file-list="false"
              :auto-upload="true" 
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="defaultBehavior"
            >
              <img v-if="plateImg" :src="Tools.handleImg(plateImg)" class="plateImg">
              <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="box_list">
            <p>主页解释：</p>
            <el-input
              type="textarea"
              resize="none"
              :rows="8"
              placeholder="输入主页解释"
              v-model="modifyData.description"
            ></el-input>
          </div>
        </div>
        <div class="box_list_bot">
          <div class="box_list">
            <p>分类页解释：</p>
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="输入分类页解释"
              v-model="modifyData.long_desc"
            ></el-input>
          </div>
          <div class="box_list">
            <p>上传解释：</p>
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="输入版块解释"
              v-model="modifyData.upload_tips"
            ></el-input>
          </div>
        </div>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPlateDialog = false">关 闭</el-button>
        <el-button type="primary" @click="savemodifyInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "PageUploadEncyclopedias",
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
          name: "上传百科",
          urls: "/index/page/pageManagement/uploadMenu/PageUploadEncyclopedias",
          icon: "icon-home"
        }
      ],

      plateRadio: "", // 版块选择
      plateData: [], //板块数据
      childData: [], //板块下放的内容
      itemValue: {}, //被选中的板块内容
      // itemValueName: "", //被选中的板块内容
      // itemValueDes: "", //被选中的板块内容
      addName:'',//添加名字
      adddesinfo:'',//添加描述
      childpid:null,//添加新版块的父级ID

      plateBox: false, // 版块盒子

      // plateName: "基础理论、设计、 模拟", // 版块名称
      // plateDescription: "123465791234657981654641", // 版块解释

      // plateStatus: false, // 版块状态

      // 修改百科
      plateImg:'',//分类页图片
      // homepageValueDes:'',//主页解释
      categorypagesValueDes:'',//分类页解释
      modifyImg:[],
      modifyData:{},//修改百科数据

      // 添加百科
      addplateImg:[],
      addImgUrl:'',
      addhomepageValueDes:'',//主页解释
      addcategorypagesValueDes:'',//分类页解释

      addPlateDialog: false, // 添加版块

      modifyPlateDialog: false // 修改版块
    };
  },
  mounted() {
    this.getTypedata();
  },
  watch:{
    addPlateDialog(){
      if(this.addPlateDialog == false){
        this.addName = '';
        this.adddesinfo = '';
        this.addhomepageValueDes = '';
        this.addcategorypagesValueDes = '';
        this.addplateImg = [];
      }
    }
  },
  methods: {
    handleAddNewPlate(){
      this.addPlateDialog = true;
      this.addName = '';
      this.adddesinfo = '';
      this.addhomepageValueDes = '';
      this.addcategorypagesValueDes = '';
      this.addplateImg = [];
      this.addImgUrl = '';
    },
    getTypedata() {
      let params = {
        menu_type: 2,
        type: 1
      };
      this.HttpClient.post("/admin/menu/getListWithDel", params).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.plateData = res.data.data;
          for (const i in this.plateData) {
            if (this.plateData.hasOwnProperty(i)) {
              const element = this.plateData[i];
              if (element.menu_id == this.plateRadio) {
                this.childData = element.child;
                this.childpid = element.id
              }
            }
          }
        }
      });
    },
    // 添加新版块
    addNewInfo(){
      let params = {
        menu_type:2,
        name:this.addName,
        description:this.addhomepageValueDes,//主页解释
        long_desc:this.addcategorypagesValueDes,//分类页解释
        upload_tips:this.adddesinfo,//上传解释
        back_images:this.addplateImg,//分类页图片
        pid:this.childpid,
        type:1,
      }
      this.HttpClient.post('/admin/menu/create',params).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          this.addPlateDialog = false
          this.addName = '';
          this.adddesinfo = '';
          this.addhomepageValueDes = '';
          this.addcategorypagesValueDes = '';
          this.addplateImg = '';
          setTimeout(() => {
            this.getTypedata()
          }, 500);
        }
      })
    },
    // 禁用启用操作
    plateStatusBtm(item) {
      let params = {
        menu_type:2,
        id:item.id,
        status:item.status == 1?0:1
      }
      this.HttpClient.post('/admin/menu/changeStatus',params).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getTypedata()
          }, 500);
        }
      })
      
    },
    // 修改板块
    modifyInfo(item) {
      console.log(item);
      let params = {
        menu_id:item.menu_id,
        type:1
      }
      this.HttpClient.get('/admin/menu/getMenuProfile',params).then(res => {
        if(res.data.code === 200){
          console.log(res.data.data)
          this.modifyData = res.data.data;
          this.plateImg = this.modifyData.back_images;
          this.modifyPlateDialog = true;
        }
      })
      // this.itemValue = item;
      // this.itemValueDes = item.description;
      // this.itemValueName = item.name;
      // this.modifyPlateDialog = true;
    },
    // 获取板块下内容
    plateRadioBtm() {
      this.plateBox = true;
      this.getTypedata()
      console.log(this.plateRadio);
      console.log(this.plateData);
    },
    // 保存修改的内容
    savemodifyInfo() {
      console.log(this.modifyData);
      let params = {
        id: this.modifyData.id,
        menu_type: 2,
        name: this.modifyData.name,
        description: this.modifyData.description,//主页解释
        upload_tips:this.modifyData.upload_tips,//上传解释
        pid: this.modifyData.pid,
        long_desc:this.modifyData.long_desc,//分类页解释
        back_images:this.modifyImg,
        type: 1
      };
      this.HttpClient.post("/admin/menu/edit", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.modifyPlateDialog = false;
          this.modifyData = {};
          // this.itemValueName = '';
          // this.itemValueDes = '';
          setTimeout(() => {
            this.getTypedata();
          }, 500);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 修改上传图片
    beforeAvatarUpload(file) {
      console.log(file);
      // this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
      //   res => {
      //     if (res.data.code === 200) {
      //       this.$message.success(res.data.msg);
      //       var obj = {};
      //       obj.name = file.name;
      //       obj.path = res.data.path;
      //       this.modifyImg.push(obj)
      //       this.plateImg = res.data.path.replace("http://cdn.kushualab.com/","");
      //       // this.plateImg = res.data.path;            
      //     }
      //   }
      // );
      if(this.Tools.pictureLimit(file)){
              let that = this;
              //七牛云上传
              let observable = this.$observable(file);
              observable.subscribe({
                next(res){
                  console.log('next',res);    
                },
                error(err){
                  that.$message.error('上传失败!');
                },
                complete(res) {
                  console.log('成功结果', res);
                  that.$message.success('上传成功!');
                  var obj = {};
                  obj.name = file.name;
                  obj.path = that.Urls.imageUrl+res.key;
                  that.modifyImg.push(obj)
                  that.plateImg = (that.Urls.imageUrl+res.key).replace("http://cdn.kushualab.com/","");
                }
              })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
    },
    // 添加上传图片
    beforeAddAvatarUpload(file){
      // this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
      //   res => {
      //     if (res.data.code === 200) {
      //       this.$message.success(res.data.msg);
      //       var obj = {};
      //       obj.name = file.name;
      //       obj.path = res.data.path;
      //       this.addplateImg.push(obj)
      //       this.addImgUrl = res.data.path;
      //       // this.plateImg = res.data.path;            
      //     }
      //   }
      // );
      if(this.Tools.pictureLimit(file)){
              let that = this;
              //七牛云上传
              let observable = this.$observable(file);
              observable.subscribe({
                next(res){
                  console.log('next',res);    
                },
                error(err){
                  that.$message.error('上传失败!');
                },
                complete(res) {
                  console.log('成功结果', res);
                  that.$message.success('上传成功!');
                  var obj = {};
                  obj.name = file.name;
                  obj.path = that.Urls.imageUrl+res.key;
                  that.addplateImg.push(obj)
                  that.addImgUrl = that.Urls.imageUrl+res.key;
                }
              })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
    },
    defaultBehavior(param){},
  }
};
</script>

<style lang="less">
.pageUploadEncyclopedias {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .pageUploadEncyclopedias_main::-webkit-scrollbar {
    display: none;
  }
  .pageUploadEncyclopedias_main {
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
        p {
          margin-right: 20px;
        }
        .el-radio-group {
          margin-right: 10px;
          display: flex;
          align-items: center;
          .el-radio {
            padding: 0 20px;
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

      .content_box {
        margin-top: 50px;
        .addBtm {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          p {
            margin-right: 20px;
          }
        }

        .content_box_list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .plate_list {
            display: flex;
            align-items: center;
            height: 40px;
            margin: 10px;
            .plate_name {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 40px;
              border: 1px solid #dedede;
              box-sizing: border-box;
              cursor: pointer;
            }
            .plate_status {
              display: flex;
              justify-content: center;
              align-items: center;
              .el-button {
                border-top-left-radius: unset;
                border-bottom-left-radius: unset;
              }
            }
          }
        }
      }
    }
  }

  /*添加版块弹窗*/
  .plateDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
    }
    .plateDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .plateDialog_box {
      .plate_name{
        padding:0 20px;
      }
      .box_list {
        p{
          margin-bottom: 5px;
        }
        .plateImg-uploader{
          text-align: center;
          .plateImg{
            width: 178px;
            // height: 178px;
            display: block;
          }
          .el-upload{
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            .plateImg-uploader-icon{
                  font-size: 28px;
                  color: #8c939d;
                  width: 178px;
                  height: 178px;
                  line-height: 178px;
                  text-align: center;
            }
          }
        }
      }
      .box_list:not(:last-child) {
        margin-bottom: 20px;
      }
      .box_list_center{
        display: flex;
        justify-content: space-around;
      }
      .box_list_bot{
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
