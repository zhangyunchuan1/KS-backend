<template>
  <div class="PageUploadmarket">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="PageUploadmarket_main">
      <!--标题-->
      <div class="title">
        <p>上传淘货</p>
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
            <p class="en_name" v-if="item.color">
              <span class="color_num" :style="'background:'+item.color[0]"></span>
              <span>{{item.color[0]}}</span>
            </p>
            <p class="en_name" v-if="item.color">
              <span class="color_num" :style="'background:'+item.color[1]"></span>
              <span>{{item.color[1]}}</span>
            </p>
          </div>
          <div class="addcontent_list" @click="addmodifyInfoFn">
            <i class="el-icon-plus"></i>
            <!-- <p class="list_name">{{item.name}}</p>
            <div class="en_name">car</div> -->
          </div>
        </div>
      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog width="500px" custom-class="modifyDialog" :visible.sync="modifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="modifyDialog_box">
        <!-- <div class="box_list">
          <el-tag>{{plateName}}</el-tag>
        </div> -->
        <!-- <p>修改图片</p> -->
        <div class="box_list">
          <div class="hover_left">
            <p>hover前：</p>
            <el-upload
              class="plateImg-uploader"
              action="customize"
              :auto-upload="true" 
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="defaultBehavior">
              <img v-if="plateImg" :src="plateImg" class="plateImg">
              <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="hover_right">
            <p>hover后：</p>
            <el-upload
              class="plateImg-uploader"
              action="customize"
              :auto-upload="true" 
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforehoverAvatarUpload"
              :http-request="defaultBehavior">
              <img v-if="hoverplateImg" :src="hoverplateImg" class="plateImg">
              <i v-else class="el-icon-plus plateImg-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div style="margin-top:10px" class="bot_input">
          <el-input
            placeholder="请输入颜色色号"
            v-model="plateColor"
            clearable>
          </el-input>
          </div>
          <div style="margin:10px 0" class="bot_input">
             <el-input
            placeholder="请输入颜色色号"
            v-model="plateColor1"
            clearable>
          </el-input>
          </div>
          <div class="bot_input">
            <el-input
              placeholder="只能输入中文"
              v-model="plateName"
              clearable>
            </el-input>
          </div>
          
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="savemodifyInfo">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 向icon列表中添加icon -->
    <!-- <el-dialog
      title="添加icon"
      :visible.sync="isshowaddIcon"
      width="30%"
      center>
      <el-input
        placeholder="请输入内容"
        v-model="addiconValue"
        clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isshowaddIcon = false">取 消</el-button>
        <el-button type="primary" @click="sureAddIconFn">确 定</el-button>
      </span>
    </el-dialog> -->


    <!--添加弹窗-->
    <el-dialog width="500px" custom-class="modifyDialog" :visible.sync="addmodifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>添加新版块
      </span>
      <p style="text-align:center;">添加ICON</p>
      <p style="text-align:center;">图片大小为32*32像素</p>
      <div class="modifyDialog_box">
        <div class="box_list">
          <div class="hover_left">
            <p class="reminder">hover前：</p>
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
          <div class="hover_right">
            <p class="reminder">hover后：</p>
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
          <div style="margin-top:10px" class="bot_input">
            <el-input
              placeholder="请输入颜色色号"
              v-model="addInfoColor"
              clearable>
            </el-input>
          </div>
          <div style="margin:10px 0" class="bot_input">
            <el-input
              placeholder="请输入颜色色号"
              v-model="addInfoColor1"
              clearable>
            </el-input>
          </div>
          <div class="bot_input">
            <el-input
              @change="changecnName"
              placeholder="只能输入中文"
              v-model="addInfocnName"
              clearable>
            </el-input>
          </div> 
        
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
  name: "PageUploadmarket",
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
          name: "上传淘货",
          urls: "/index/page/pageManagement/uploadMenu/PageUploadmarket",
          icon: "icon-home"
        }
      ],

      listData: [], //列表数据
      addplateImg:[],
      addImageUrl:'',

      plateImg: "",
      hoverplateImg:'',
      plateName: "",
      plateColor:'',
      plateColor1:'',
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
      addInfoColor:'',
      addInfoColor1:'',
      addhoverplateImg:[],//添加的hover后图片
      addhoverImageUrl:'',//添加的hover后图片地址


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
        menu_type:2,
        type:5
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
      this.plateIcon = item.icon;
      this.plateColor = item.color?item.color[0]:'';
      this.plateColor1 = item.color?item.color[1]:'';
      if(item.images_beforehover){
        this.plateImg = Tools.handleImg(item.images_beforehover);
      }else{
        this.plateImg = '';
      }
      if(item.images){
        this.hoverplateImg = Tools.handleImg(item.images);
      }else{
        this.hoverplateImg = '';
      }
      this.modifyDialog = true;
      this.geticonData();
    },
    // 保存修改
    savemodifyInfo(){
      // plateEnname
      console.log(this.plateData)
      console.log(this.addplateImg)
      if(this.addplateImg.length === 0){
        var obj = {};
        obj.name = this.plateData.name;
        obj.path = this.plateImg;
        this.addplateImg.push(obj)
      }
      var arr = [];
      arr.push(this.plateColor);
      arr.push(this.plateColor1)
      this.modifyDialog = false;
      let params = {
        name:this.plateName,
        id:this.plateData.id,
        menu_type:2,
        color:arr,
        images:[{name:this.plateName,path:this.hoverplateImg}],
        images_beforehover:this.addplateImg,
        icon:this.plateIcon,
        type:5,
        pid:0,
        description:this.plateData.name
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
                  that.plateImg = that.Urls.imageUrl+res.key;
                }
              })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
    },
    // 修改hover后
    beforehoverAvatarUpload(file){
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
                  that.hoverplateImg = that.Urls.imageUrl+res.key;
                }
              })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
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
      this.addhoverImageUrl = '';
      this.addhoverplateImg = [];
      this.addInfoColor = '';
      this.addInfoColor1 = '';
      this.addInfocnName = '';
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
      var arr1 = [];
      arr1.push(this.addInfoColor);
      arr1.push(this.addInfoColor1);
      let params = {
        menu_type:2,
        name:this.addInfocnName,
        color:arr1,
        images_beforehover:this.addplateImg,
        images:this.addhoverplateImg,
        icon:this.iconValue,
        pid:0,
        type:5
      }
      this.HttpClient.post('/admin/menu/create',params).then(res =>{
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.addmodifyDialog = false;
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      })
    },
    defaultBehavior(param){},
  }
};
</script>

<style lang="less">
.PageUploadmarket {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .PageUploadmarket_main::-webkit-scrollbar {
    display: none;
  }
  .PageUploadmarket_main {
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
          height: 250px;
          box-sizing: border-box;
          margin: 10px;
          // padding-top: 10px;
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
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 40%;
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
          .en_name{
            display: flex;
            align-items: center;
            span{
              margin-left: 13px;
              line-height: 22px;
            }
          }
          p {
            text-align: center;
            font-size: 14px;
            padding: 4px 0;
            height: 18px;
            line-height: 18px;
            .color_num{
              display: block;
              width: 5px;
              height: 12px;
            }
          }
          span{
            font-size: 14px;
            padding: 0px 10px;
            height: 22px;
          }
        }
        .addcontent_list{
          width: 150px;
          height: 250px;
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
      .bot_input{
        padding: 0 30px;
      }
      .box_list:not(:last-child) {
        margin-bottom: 20px;
      }
      .box_list {
        display:flex;
        justify-content: space-around;
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
