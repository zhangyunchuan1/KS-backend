<template>
  <div class="videoTitle">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">视频标题</div>
      </div>
      <!-- 板块选择 -->
      <div class="videotitle_header">
          <div class="choosetitle">板块选择</div>
        <el-radio-group v-model="selectVideotitle" size="small">
          <el-radio
            @change="changeModel(item)"
            :label="item.menu_id"
            v-for="(item,index) in menuList"
            :key="index"
            border
          >{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <!-- 添加小标题 -->
      <div class="ws-videotitle_header">
        <el-radio v-model="radio7" label="1" border>视频标题</el-radio>
        <!-- <el-input placeholder="请输入内容" v-model="addTypetitle" clearable></el-input> -->
        <el-button style="margin-left:15px;" type="primary" icon="el-icon-plus" @click="handleOpenCreate"></el-button>
      </div>
      <!-- 列表 -->
      <div class="videotitle_header videolist_box">
        <div class="onevideo" v-for="(item,index) in listData" :key="index">
          <div>
            <img :src="Tools.judgeFullPath(item.icon)" alt="">
            <div class="title">{{item.name}}</div>
            <div>
              <el-button class="el-icon-edit" size="mini" type="info" plain @click="changeNameFn(item)"></el-button>
              <el-button class="el-icon-delete" size="mini" type="danger" plain @click="deleteFn(item)"></el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 修改弹框 -->
      <div class="alertbox">
        <el-dialog title="修改" :visible.sync="centerDialogVisible" width="30%" center>
          <el-input placeholder="请输入内容" v-model="changeName" clearable></el-input>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="imageUpload">
            <img
              v-if="!imageUrl !==''"
              :src="imageUrl"
              class="avatar">
            <img v-else-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureChangenameFn">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="createDialogVisible" width="400px" left>
        <el-input placeholder="请输入内容" v-model="addTypetitle" clearable></el-input>
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="imageUpload">
            <!-- <img v-if="!imageUrl !==''" :src="imageUrl" class="avatar">
            <img v-else-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTypetitleFn">保 存</el-button>
        </span>
    </el-dialog>
    <!--删除弹窗-->
      <ModalDelete ref="delete" @doDelete="confirmDelete"></ModalDelete>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import ModalDelete from '@/components/public/modalDelete'
export default {
  name: "VideoTitle",
  components: {
    BreadCrumb,
    ModalDelete
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "功能控制",
          urls: "/index/functionControl",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "板块标题管理",
          urls:
            "/index/functionControl/plateTitleManagement/plate-title-management",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "视频标题",
          urls: "/index/functionControl/plateTitleManagement/video-title",
          icon: "icon-home"
        }
      ],

      selectVideotitle: "", //视频标题板块选择
      menuList: {}, //视频标题板块选择菜单
      radio7: "1",
      addTypetitle: "", //添加小标题
      uploadeImgUrl:'',
      imageUrl:'',
      centerDialogVisible: false,
      createDialogVisible:false,
      changeName: "", //修改名
      listData:[],//列表数据
      videoTitleId: '',      // 小标题ID
      deleteId:null,
    };
  },
  mounted() {
    this.getTypelist()
  },
  methods: {
    //选择图片上传
    imageUpload(file){
      console.log(file)
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          // console.log(res.data.path);
          console.log('res is:', res)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.path;
            this.uploadeImgUrl = res.data.path;
            this.isshowoldimg = false;
          }
      });
    },
    handleAvatarSuccess(){

    },
    //   获取视频标题列表
    getlistData() {
      console.log(this.selectVideotitle)
        let params = {
            type:this.selectVideotitle
        }
        this.HttpClient.post('/admin/videoTitle/getList',params).then(res=>{
          console.log(res)
            if(res.data.code === 200){
              if (res.data.data.length) {
                this.listData = res.data.data
              } else {
                this.listData = [] 
              }
            } else {
                this.listData = [] 
            }
        })
    },
    // 获取菜单列表
    getTypelist(){
      let params = {
        menu_type:2,
        type:7
      }
      this.HttpClient.post('/admin/menu/getList',params).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          this.menuList = res.data.data;
          this.selectVideotitle = this.menuList[1].menu_id;
          this.getlistData()
        }
      })
    },
    // 视频标题板块选择
    changeModel(val) {
      this.selectVideotitle = val.menu_id;
      this.getlistData();
    },
    //打开添加弹窗
    handleOpenCreate(){
      this.createDialogVisible = true;
      this.imageUrl = '';
    },
    // 新增视频小标题
    addTypetitleFn() {
      //调取接口
      let params = {
          name:this.addTypetitle,
          type:this.selectVideotitle,
          icon:this.uploadeImgUrl
      }
      console.log(params)
      this.HttpClient.post("/admin/videoTitle/create",params).then(res => {
          if(res.data.code === 200){
            this.$message.success(res.data.msg)
              setTimeout(() => {
                  this.getlistData();
                  this.createDialogVisible = false;
              },500)
              this.addTypetitle = ''
          }
      })
    },
    // 点击修改title，跳出弹框
    changeNameFn(i) {
      this.changeName = i.name;
      this.videoTitleId = i.id;
      this.imageUrl = this.Tools.judgeFullPath(i.icon);
      this.centerDialogVisible = true;
    },
    // 确定修改标题
    sureChangenameFn() {
      const data = {
        id: this.videoTitleId,
        name: this.changeName,
        type: this.selectVideotitle,
        icon: this.imageUrl
      }
      this.HttpClient.post('/admin/videoTitle/edit', data)
        .then(res => {
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.centerDialogVisible = false
            this.changeName = ''
            setTimeout(() => {
              this.getlistData()
            }, 500)
          }
        })
    },
    // 删除
    deleteFn(val) {
        console.log(val);
        this.deleteId = val.id;
        this.$refs.delete.deleteDialog=true;
    },
    //确认删除
    confirmDelete(){
        let params = {
            id:this.deleteId
        }
        this.HttpClient.post('/admin/videoTitle/destroy',params).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.msg)
                setTimeout(() => {
                    this.getlistData();
                },500)
            }
        })
    },
  }
};
</script>

<style lang='less'>
.videoTitle {
  .el-input{
    text-align: center;
    .el-input__inner{
      width: 200px;
    }
  }
  .bread {
    margin: 10px;
  }
  .video_titlebox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .videopage_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;
      .title {
        font-size: 20px;
        color: #222;
      }
    }
    .videotitle_header {
      display: flex;
      align-items: center;
      padding: 0 15px 15px 15px;
      border-bottom: 1px solid #dedede;
      margin: 20px 0;
      .choosetitle{
          width: 120px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          border-radius: 4px;
          border: 1px solid #dedede;
          margin-right: 10px;
          font-size: 12px;
      }
      .el-radio-group {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .el-radio.is-checked {
        background: #15bafe;
        border-color: #15bafe;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #fff;
      }
      .el-radio {
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        // align-items: center;
        line-height: 25px;
        border: 1px solid #dedede;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding: 0;
        }
      }
      .addcontent {
        .el-input {
          width: 170px;
        }
      }
    }
    .addtitle {
      .el-radio {
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        // align-items: center;
        line-height: 18px;
        border: 1px solid #dedede;
        .el-radio__label {
          font-size: 12px;
        }
      }
    }
    .videolist_box {
      border: 1px solid #dedede;
      padding: 20px;
      flex-wrap: wrap;
      margin: 20px;
      .onevideo {
        // display: flex;
        box-shadow: 5px 5px 20px #d3dbde;
        margin: 10px;
        >div{
          width: 120px;
          box-sizing: border-box;
          img{
            width: 120px;
            height: 120px;
          }
          .title {
            width: 120px;
            border: 1px solid #dedede;
            padding: 10px 15px;
            font-size: 14px;
            align-items: center;
            border-radius: 4px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
          }
          >div{
            margin-top: 2px;
            display: flex;
            .el-button{
              width: 50%;
            }
          }
          
        }
      }
    }
  }
  // 上传icon
  .avatar-uploader {
    text-align: center;
    margin-top: 15px;
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
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
}
.ws-videotitle_header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  .el-radio.is-bordered{
    background: #15bafe;
    border: none;
    .el-radio__label{
    color: #fff;
    } 
  }
  .el-radio__input{
    display: none;
  }
  .el-input {
    width: 200px;
    margin: 0 10px;
  }
}
</style>
