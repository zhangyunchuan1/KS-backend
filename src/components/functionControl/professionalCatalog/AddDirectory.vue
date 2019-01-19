<template>
  <div class="addDirectory">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>添加目录</p>
      </div>

      <div class="content">
        <!--类别-->
        <div class="content_plate">
          <p><el-button type="primary" class="addDirectory_btm" @click="handleAddCategory(0,0)">添加类别</el-button></p>
          <el-radio-group v-model="plateRadio" @change="plateBtm($event)">
            <el-radio border v-for="(item,index) in plateList" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <!--一级目录-->
        <el-collapse-transition>
          <div class="content_list" v-if="primaryDirectory">
            <div class="content_list_header">
              <p>一级目录</p>
              <el-button @click="handleAddDirectory(1)">添加</el-button>
            </div>
            <div class="content_list_box">
              <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtm($event)">
                <el-radio border v-for="(item,index) in firstLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>
        <!--二级目录-->
        <el-collapse-transition>
          <div class="content_list" v-if="secondaryDirectory">
            <div class="content_list_header">
              <p>二级目录</p>
              <el-button @click="handleAddDirectory(2)">添加</el-button>
            </div>
            <div class="content_list_box">
              <el-radio-group v-model="secondaryDirectoryRadio" @change="secondaryDirectoryBtm($event)">
                <el-radio border v-for="(item,index) in twoLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>
        <!--三级目录-->
        <el-collapse-transition>
          <div class="content_list" v-if="threelDirectory">
            <div class="content_list_header">
              <p>三级目录</p>
              <el-button @click="handleAddDirectory(3)">添加</el-button>
            </div>
            <div class="content_list_box">
              <el-radio-group v-model="threelDirectoryRadio">
                <el-radio border v-for="(item,index) in threeLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>

    <!--添加类别弹窗-->
    <el-dialog
      :visible.sync="addCategoryDialog"
      width="470px"
      custom-class="addDirectoryDialog">
      <span slot="title" class="addDirectoryDialog_title"><i class="iconfont icon-orderedlist"></i>添加类别</span>
      <div class="addDirectoryDialog_main">
        <div class="dialog_main_header">
          <p>类别名称：</p>
          <el-input placeholder="输入类别名称" v-model="CategoryName"></el-input>
        </div>
        <div class="dialog_images">
          <el-upload
            action="http://test.kslab.com/api/article/null"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeFileUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="dialog_textarea">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入简介内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveCategory">保 存</el-button>
      </span>
    </el-dialog>

    <!--添加目录弹窗-->
    <el-dialog
      :visible.sync="addDirectoryDialog"
      width="470px"
      custom-class="addDirectoryDialog">
      <span slot="title" class="addDirectoryDialog_title"><i class="iconfont icon-orderedlist"></i>添加目录</span>
      <div class="addDirectoryDialog_main">
        <div class="dialog_main_header">
          <p>目录名称：</p>
          <el-input placeholder="输入目录名称" v-model="CategoryName"></el-input>
        </div>
        <div class="dialog_images">
          <el-upload
            action="http://test.kslab.com/api/article/null"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeFileUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="dialog_textarea">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入简介内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDirectoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveDirectory">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'

  export default {
    name: "AddDirectory",
    components: {
      BreadCrumb,
    },
    data() {
      return {
        // 面包屑
        breadData: [{
          id: 1,
          name: '功能控制',
          urls: '/index/functionControl/FunctionControl',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '专业目录',
          urls: '/index/market/functionControl/professionalCatalog/ProfessionalCatalog',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '添加目录',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],

        plateRadio: null,  // 类别单选框

        primaryDirectory: false,
        primaryDirectoryRadio: null,  // 一级目录单选框
        secondaryDirectory: false,
        secondaryDirectoryRadio: null,  // 二级目录单选框
        threelDirectory: false,
        threelDirectoryRadio: null,  // 三级目录单选框

        addCategoryDialog: false,  //  添加类别
        addDirectoryDialog: false,  // 添加目录

        dialogImageUrl: '',
        dialogVisible: false,
        textarea: null,

        //目录列表
        plateList:[],  //板块列表
        firstLevelDirectory:[],  //一级目录
        twoLevelDirectory:[],  //二级目录
        threeLevelDirectory:[],  //三级目录

        //添加目录存储的id
        firstPid:null,
        twoPid:null,
        threePid:null,
        zeroMenuId:null,
        firstMenuId:null,
        twoMenuId:null,
        type:null,  //几级目录
        imgUrl:null, //上传成功的图片返回的地址
        fileList:[],
        fileList2:[],
        CategoryName:null,  //类别名称
      }
    },
    mounted(){
      this.getMenuList(); 
    },
    methods:{
      //保存添加的目录
      handleSaveDirectory(){
          // console.log(this.CategoryName,this.textarea,this.imgUrl);
          let pid = null;
          console.log(this.firstPid,this.type)
          if(this.type === 1){
              console.log(this.zeroMenuId);
              pid = this.firstPid
          }else if(this.type === 2){
              console.log(this.firstMenuId);
              pid = this.twoPid
          }else if(this.type === 3){
              console.log(this.twoMenuId);
              pid = this.threePid
          }
          
          this.HttpClient.post('/admin/menu/create',{
                menu_type : 3,
                pid :pid,
                type :this.type,
                name:this.CategoryName,
                description:this.textarea,
                images:this.imgUrl
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.imgUrl = null;
                    this.CategoryName = null;
                    this.textarea = null;
                    if(this.type === 1){
                        this.twoLevelDirectory = [];
                        this.threeLevelDirectory = [];
                        this.secondaryDirectory = false;
                        this.threelDirectory = false;
                        this.primaryDirectoryRadio = null;
                        this.secondaryDirectoryRadio = null;
                        this.threelDirectoryRadio = null;
                       setTimeout(() => {
                            this.getNextList(this.zeroMenuId);
                            this.addDirectoryDialog = false;
                       }, 1000);
                    }else if(this.type === 2){
                        this.threeLevelDirectory = [];
                        this.threelDirectory = false;
                        this.secondaryDirectoryRadio = null;
                        this.threelDirectoryRadio = null;
                        setTimeout(() => {
                            this.getNextList(this.firstMenuId);
                            this.addDirectoryDialog = false;
                        }, 1000);
                    }else if(this.type === 3){
                        this.threelDirectoryRadio = null;
                        setTimeout(() => {
                            this.getNextList(this.twoMenuId);
                            this.addDirectoryDialog = false;
                        }, 1000);
                    }
                }
            })
      },
      //保存类别添加
      handleSaveCategory(){
          console.log(this.CategoryName,this.textarea,this.imgUrl)
          this.HttpClient.post('/admin/menu/create',{
                menu_type : 3,
                pid : 0,
                type :0,
                name:this.CategoryName,
                description:this.textarea,
                images:this.imgUrl
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.imgUrl = null;
                    this.CategoryName = null;
                    this.textarea = null;
                    this.firstLevelDirectory = [];
                    this.twoLevelDirectory = [];
                    this.threeLevelDirectory = [];
                    this.primaryDirectory = false;
                    this.secondaryDirectory = false;
                    this.threelDirectory = false;
                    this.primaryDirectoryRadio = null;
                    this.getMenuList();
                    this.addCategoryDialog = false;
                }
            })
      },
      //上传图片
      beforeFileUpload(file,fileList){
          console.log(file,this.fileList)
          var FromData = new FormData();
                FromData.append('token', window.localStorage.token);
                FromData.append('images', file);
                this.$ajax.post('http://test.kslab.com/api/admin/uploadOneImage', FromData)
                .then((res) => {
                    console.log(res)
                    if(res.data.code === 200){
                        this.imgUrl = res.data.path;
                    }
                })
      },
      //添加板块
      handleAddCategory(type,pid){
          console.log(type,pid);
          this.addCategoryDialog = true;
      },
      //添加目录
      handleAddDirectory(e){
          console.log(e);
          this.type = e; 
          if(e === 1){
              console.log(this.firstPid);
          }else if(e === 2){
              console.log(this.twoPid);
          }else if(e === 3){
              console.log(this.threePid);
          }
          this.addDirectoryDialog = true;
      },
      //获取目录
      getMenuList(pid){
          this.HttpClient.post('/admin/menu/getList',{
                menu_type : 3,
                type :0
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
            })
      },
      // 获取板块下一级目录
      getNextList(menu_id){
          this.HttpClient.post('/admin/menu/getOneChild',{
                menu_type : 3,
                menu_id :menu_id
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    if(res.data.data.child.length > 0){
                        if(res.data.data.child[0].type === 1){
                            this.firstLevelDirectory = res.data.data.child;
                            this.firstPid = res.data.data.child[0].pid;
                            this.zeroMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.child[0].type === 2){
                            this.twoLevelDirectory = res.data.data.child;
                            this.twoPid = res.data.data.child[0].pid;
                            this.firstMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.child[0].type === 3){
                            this.threeLevelDirectory = res.data.data.child;
                            this.threePid = res.data.data.child[0].pid;
                            this.twoMenuId = res.data.data.info.menu_id;
                        }
                    }else{
                        if(res.data.data.info.type === 0){
                            this.firstLevelDirectory = [];
                            this.firstPid = res.data.data.info.id;
                            this.zeroMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.info.type === 1){
                            this.twoLevelDirectory = [];
                            this.twoPid = res.data.data.info.id;
                            this.firstMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.info.type === 2){
                            this.twoMenuId = res.data.data.info.menu_id;
                            this.threePid = res.data.data.info.id;
                            this.threeLevelDirectory = [];
                        }
                    }
                }
            })
      },
      plateBtm(e){
        console.log(e)
        this.twoLevelDirectory = [];
        this.threeLevelDirectory = [];
        this.getNextList(e)
        this.primaryDirectory = true;
        this.secondaryDirectory = false;
        this.threelDirectory = false;
        this.primaryDirectoryRadio = null;
      },
      primaryDirectoryBtm(e){
        console.log(e)
        this.threeLevelDirectory = [];
        this.getNextList(e)
        this.secondaryDirectory = true;
        this.threelDirectory = false;
        this.secondaryDirectoryRadio = null;
      },
      secondaryDirectoryBtm(e){
        console.log(e)
        this.getNextList(e)
        this.threelDirectory = true;
        this.threelDirectoryRadio = null;
      },


      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }

    }

  }
</script>

<style lang="less">
  .addDirectory{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .addDirectory_main::-webkit-scrollbar {
      display: none
    }
    .addDirectory_main {
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

        /*类别框*/
        .content_plate{
          >p{
            .el-button--primary{
              background-color: #15bafe;
              border-color: #15bafe;
            }
          }
          .addDirectory_btm{
            margin-bottom: 15px;
          }

          .el-radio-group{
            height: 40px;
            line-height: 40px;
            .el-radio{
              height: 100%;
              line-height: 40px;
              padding: 0 30px;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
            .el-radio.is-checked{
              background: #15bafe;
              color: #fff;
              border-color: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
          }

        }

        /*目录*/
        .content_list{
          margin-top: 40px;
          border-top: 1px solid #dedede;
          padding-top: 40px;
          .content_list_header{
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            p{
              height: 40px;
              line-height: 40px;
              padding: 0 20px;
              background: #15bafe;
              color: #fff;
              margin-right: 30px;
            }
            .el-input{
              width: 200px;
              margin-right: 10px;
            }
          }
          .content_list_box{
            .el-radio-group{
              height: 40px;
              line-height: 40px;
              .el-radio{
                height: 100%;
                line-height: 40px;
                padding: 0 20px;
                .el-radio__input{
                  display: none;
                }
                .el-radio__label{
                  padding: 0;
                }
              }
              .el-radio.is-checked{
                background: #15bafe;
                color: #fff;
                border-color: #15bafe;
                .el-radio__label{
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }



  /*批准弹窗*/
  .addDirectoryDialog{
    .addDirectoryDialog_title{
      display: flex;
      align-items: center;
      color: #666;

      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 10px;
      }
    }
    .addDirectoryDialog_main{
      .dialog_main_header{
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        p{
          margin-right: 10px;
        }
        .el-input{
          flex: 1;
        }
      }
      .dialog_images{
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 15px;
        margin-bottom: 30px;

        .el-upload--picture-card,
        .el-upload-list--picture-card .el-upload-list__item{
          width: 80px;
          height: 80px;
          line-height: 80px;
        }
      }
    }
  }
</style>
